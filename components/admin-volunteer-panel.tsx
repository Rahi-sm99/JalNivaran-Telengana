"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Users, ClipboardList, Plus, Trash2, CheckCircle, Clock, AlertTriangle, Send, MapPin } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"

export function AdminVolunteerPanel() {
    const { toast } = useToast()
    const [volunteers, setVolunteers] = useState<any[]>([])
    const [applications, setApplications] = useState<any[]>([])
    const [assignments, setAssignments] = useState<any[]>([])
    const [newVolunteerName, setNewVolunteerName] = useState("")
    const [newVolunteerEmail, setNewVolunteerEmail] = useState("")
    const [taskData, setTaskData] = useState({
        volunteer_name: "",
        description: "",
        deadline: "",
        severity: "Medium",
        importance: "Normal"
    })
    const [reports, setReports] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [isAdding, setIsAdding] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true)
        try {
            const { data: volData } = await supabase.from('volunteers_list').select('*').order('created_at', { ascending: false })
            const { data: appData } = await supabase.from('volunteers').select('*').order('created_at', { ascending: false })
            const { data: assignData } = await supabase.from('tasks_assignments').select('*').order('created_at', { ascending: false })
            const { data: reportData } = await supabase.from('disaster_reports').select('*').order('created_at', { ascending: false })
            setVolunteers(volData || [])
            setApplications(appData || [])
            setAssignments(assignData || [])
            setReports(reportData || [])
        } catch (error) {
            console.error("General error fetching data:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleUpdateReportStatus = async (id: string, status: string) => {
        try {
            const { error } = await supabase.from('disaster_reports').update({ status }).eq('id', id)
            if (error) throw error
            toast({ title: "Report Updated", description: `Status changed to ${status}` })
            fetchData()
        } catch (error: any) {
            toast({ variant: "destructive", title: "Error", description: error.message })
        }
    }

    const handleAddVolunteer = async () => {
        if (!newVolunteerName.trim() || !newVolunteerEmail.trim()) {
            toast({ variant: "destructive", title: "Missing Fields", description: "Please enter both name and email." })
            return
        }

        setIsAdding(true)
        try {
            const trimmedEmail = newVolunteerEmail.toLowerCase().trim()
            console.log("Attempting to add volunteer:", { name: newVolunteerName, email: trimmedEmail })

            const { error } = await supabase.from('volunteers_list').insert([{
                name: newVolunteerName.trim(),
                email: trimmedEmail
            }])

            if (error) {
                console.error("Supabase Insert Error:", error)
                throw error
            }

            toast({ title: "Volunteer Added", description: `${newVolunteerName} has been authorized.` })
            setNewVolunteerName("")
            setNewVolunteerEmail("")
            await fetchData() // Refresh the list
        } catch (error: any) {
            console.error("Volunteer add failed:", error.message)
            toast({
                variant: "destructive",
                title: "Database Error",
                description: error.message || "Failed to add volunteer. Check if 'email' column exists in your Supabase table."
            })
        } finally {
            setIsAdding(false)
        }
    }

    const handleApproveApplication = async (app: any) => {
        try {
            // Add to volunteers_list (authorized login)
            const { error: insertError } = await supabase.from('volunteers_list').insert([{
                name: app.name,
                email: app.email.toLowerCase().trim()
            }])
            if (insertError) throw insertError

            // Remove from pending applications
            await supabase.from('volunteers').delete().eq('id', app.id)

            toast({ title: "Volunteer Approved ✅", description: `${app.name} (${app.email}) can now log in as Volunteer.` })
            fetchData()
        } catch (error: any) {
            toast({ variant: "destructive", title: "Error", description: error.message })
        }
    }

    const handleRejectApplication = async (id: string, name: string) => {
        try {
            await supabase.from('volunteers').delete().eq('id', id)
            toast({ title: "Application Rejected", description: `${name}'s application has been removed.` })
            fetchData()
        } catch (error: any) {
            toast({ variant: "destructive", title: "Error", description: error.message })
        }
    }

    const handleRemoveVolunteer = async (id: string) => {
        try {
            const { error } = await supabase.from('volunteers_list').delete().eq('id', id)
            if (error) throw error
            toast({ title: "Volunteer Removed" })
            fetchData()
        } catch (error: any) {
            toast({ variant: "destructive", title: "Error", description: error.message })
        }
    }

    const handleAssignTask = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!taskData.volunteer_name || !taskData.description) return
        try {
            const { error } = await supabase.from('tasks_assignments').insert([{
                ...taskData,
                status: 'Pending',
                admin_verified: false,
                time: new Date().toLocaleTimeString(),
            }])
            if (error) throw error
            toast({ title: "Task Assigned", description: `Task assigned to ${taskData.volunteer_name}` })
            setTaskData({ volunteer_name: "", description: "", deadline: "", severity: "Medium", importance: "Normal" })
            fetchData()
        } catch (error: any) {
            toast({ variant: "destructive", title: "Error", description: error.message })
        }
    }

    const handleVerifyTask = async (id: string) => {
        try {
            const { error } = await supabase.from('tasks_assignments').update({ admin_verified: true }).eq('id', id)
            if (error) throw error
            toast({ title: "Task Verified" })
            fetchData()
        } catch (error: any) {
            toast({ variant: "destructive", title: "Error", description: error.message })
        }
    }

    return (
        <div className="space-y-8 pb-20">
            {/* Top Stats/Quick View */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-blue-50/50 border-blue-100 shadow-sm">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-4xl font-black text-blue-600">{volunteers.length}</h3>
                                <p className="text-slate-600 text-[13px] font-bold mt-1">Active Volunteers</p>
                            </div>
                            <div className="text-blue-400">
                                <Users className="h-10 w-10 opacity-40" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-orange-50/50 border-orange-100 shadow-sm">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-4xl font-black text-orange-600">{assignments.filter(a => a.status === 'Pending').length}</h3>
                                <p className="text-slate-600 text-[13px] font-bold mt-1">Pending Tasks</p>
                            </div>
                            <div className="text-orange-400">
                                <ClipboardList className="h-10 w-10 opacity-40" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-red-50/50 border-red-100 shadow-sm">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-4xl font-black text-red-600">{reports.length}</h3>
                                <p className="text-slate-600 text-[13px] font-bold mt-1">Citizen Reports</p>
                            </div>
                            <div className="text-red-400">
                                <AlertTriangle className="h-10 w-10 opacity-40" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Volunteer Applications — pending review */}
            <Card className="shadow-xl border-yellow-100 overflow-hidden">
                <CardHeader className="bg-yellow-50 border-b border-yellow-100">
                    <CardTitle className="flex items-center gap-2 text-xl text-yellow-700 font-bold">
                        <Users className="h-6 w-6" />
                        Volunteer Applications
                        {applications.length > 0 && (
                            <span className="ml-2 bg-yellow-500 text-white text-xs font-black px-2 py-0.5 rounded-full">{applications.length} pending</span>
                        )}
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0 max-h-[500px] overflow-y-auto custom-scrollbar">
                    {applications.length === 0 ? (
                        <div className="py-16 text-center">
                            <CheckCircle className="h-12 w-12 text-slate-200 mx-auto mb-4" />
                            <p className="text-slate-400 font-medium">No pending applications.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-100">
                            {applications.map((app) => (
                                <div key={app.id} className="p-5 hover:bg-yellow-50/50 transition-colors">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                                                    <Users className="h-5 w-5 text-yellow-600" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-800">{app.name}</p>
                                                    <p className="text-xs text-slate-500">{app.email} · {app.phone}</p>
                                                </div>
                                            </div>
                                            {app.created_at && (
                                                <p className="text-[10px] text-slate-400 pl-13">Applied: {new Date(app.created_at).toLocaleString()}</p>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            <Button
                                                size="sm"
                                                onClick={() => handleApproveApplication(app)}
                                                className="bg-green-600 hover:bg-green-700 text-white font-bold"
                                            >
                                                <CheckCircle className="h-4 w-4 mr-1" />
                                                Approve
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => handleRejectApplication(app.id, app.name)}
                                                className="text-red-500 hover:bg-red-50 font-bold"
                                            >
                                                <Trash2 className="h-4 w-4 mr-1" />
                                                Reject
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Citizen Reports Section (New) */}
                <Card className="lg:col-span-2 shadow-xl border-red-100 overflow-hidden">
                    <CardHeader className="bg-red-50 border-b border-red-100">
                        <CardTitle className="flex items-center gap-2 text-xl text-red-700 font-bold">
                            <AlertTriangle className="h-6 w-6" />
                            Citizen Case Reports | పౌరుల ఫిర్యాదులు
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 max-h-[600px] overflow-y-auto custom-scrollbar">
                        {reports.length === 0 ? (
                            <div className="py-20 text-center">
                                <AlertTriangle className="h-12 w-12 text-slate-200 mx-auto mb-4" />
                                <p className="text-slate-400 font-medium">No reports submitted yet.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-slate-100">
                                {reports.map((report) => (
                                    <div key={report.id} className="p-6 hover:bg-slate-50 transition-colors">
                                        <div className="flex flex-col md:flex-row gap-6">
                                            {/* Report Image */}
                                            <div className="w-full md:w-48 shrink-0">
                                                {report.image_url ? (
                                                    <a href={report.image_url} target="_blank" rel="noopener noreferrer" className="block relative group">
                                                        <div className="relative aspect-video md:aspect-square rounded-xl overflow-hidden border-2 border-slate-200 shadow-sm">
                                                            <img
                                                                src={report.image_url}
                                                                alt="Report"
                                                                className="object-cover w-full h-full transition-transform group-hover:scale-110"
                                                            />
                                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                                <Plus className="h-6 w-6 text-white" />
                                                            </div>
                                                        </div>
                                                    </a>
                                                ) : (
                                                    <div className="aspect-video md:aspect-square rounded-xl bg-slate-100 flex flex-col items-center justify-center border-2 border-dashed border-slate-200">
                                                        <AlertTriangle className="h-8 w-8 text-slate-300 mb-2" />
                                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">No Image</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Report Details */}
                                            <div className="flex-1 space-y-3">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <h4 className="text-lg font-bold text-slate-900">{report.title}</h4>
                                                        <div className="flex items-center gap-4 mt-1">
                                                            <span className="flex items-center gap-1 text-xs text-slate-500">
                                                                <MapPin className="h-3 w-3" />
                                                                {report.location}
                                                            </span>
                                                            <span className="flex items-center gap-1 text-xs text-slate-500">
                                                                <Clock className="h-3 w-3" />
                                                                {new Date(report.created_at).toLocaleString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <Badge className={
                                                        report.severity === 'severe' ? 'bg-red-600' :
                                                            report.severity === 'moderate' ? 'bg-orange-500' :
                                                                'bg-blue-500'
                                                    }>
                                                        {report.severity.toUpperCase()}
                                                    </Badge>
                                                </div>

                                                <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                                                    {report.description}
                                                </p>

                                                <div className="flex items-center justify-between pt-2">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                                                            <Users className="h-4 w-4 text-slate-500" />
                                                        </div>
                                                        <span className="text-xs font-bold text-slate-700">Reported by: {report.reporter_name}</span>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <Select
                                                            value={report.status}
                                                            onValueChange={(val) => handleUpdateReportStatus(report.id, val)}
                                                        >
                                                            <SelectTrigger className="h-8 text-[10px] font-black uppercase tracking-wider w-32">
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="pending">Pending</SelectItem>
                                                                <SelectItem value="investigating">Investigating</SelectItem>
                                                                <SelectItem value="resolved">Resolved</SelectItem>
                                                                <SelectItem value="spam">Mark as Spam</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Left Side: Volunteer Management */}
                <div className="space-y-8">
                    {/* Volunteer List Column */}
                    <Card className="shadow-lg border-primary/10">
                        <CardHeader className="bg-primary/5 border-b">
                            <CardTitle className="flex items-center gap-2 text-xl text-primary font-bold">
                                <Users className="h-6 w-6" />
                                Volunteer List
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="space-y-4 mb-6">
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Name</Label>
                                    <Input
                                        placeholder="Enter name..."
                                        value={newVolunteerName}
                                        onChange={(e) => setNewVolunteerName(e.target.value)}
                                        className="bg-slate-50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email (Authorized for Login)</Label>
                                    <Input
                                        placeholder="Enter email..."
                                        type="email"
                                        value={newVolunteerEmail}
                                        onChange={(e) => setNewVolunteerEmail(e.target.value)}
                                        className="bg-slate-50"
                                    />
                                </div>
                                <Button onClick={handleAddVolunteer} className="w-full bg-primary hover:bg-primary/90">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Volunteer
                                </Button>
                            </div>
                            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {volunteers.length === 0 ? (
                                    <p className="text-sm text-center text-muted-foreground py-8">No volunteers added yet.</p>
                                ) : (
                                    volunteers.map((vol) => (
                                        <div key={vol.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 group transition-all hover:border-primary/20 hover:bg-white hover:shadow-md">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-700">{vol.name}</span>
                                                <span className="text-[10px] text-muted-foreground truncate max-w-[150px]">{vol.email}</span>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleRemoveVolunteer(vol.id)}
                                                className="text-muted-foreground hover:text-red-500 hover:bg-red-50"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Task Assignment Column */}
                    <Card className="shadow-lg border-primary/10">
                        <CardHeader className="bg-primary/5 border-b">
                            <CardTitle className="flex items-center gap-2 text-xl text-primary font-bold">
                                <ClipboardList className="h-6 w-6" />
                                Assign New Task
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <form onSubmit={handleAssignTask} className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold">Select Volunteer</Label>
                                    <Select onValueChange={(val) => setTaskData({ ...taskData, volunteer_name: val })} value={taskData.volunteer_name}>
                                        <SelectTrigger className="bg-slate-50">
                                            <SelectValue placeholder="Choose a volunteer" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {volunteers.map(v => (
                                                <SelectItem key={v.id} value={v.name}>{v.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label className="text-sm font-semibold">Task Description</Label>
                                    <Input
                                        placeholder="What needs to be done?"
                                        className="bg-slate-50"
                                        value={taskData.description}
                                        onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="text-sm font-semibold">Severity</Label>
                                        <Select onValueChange={(val) => setTaskData({ ...taskData, severity: val })} value={taskData.severity}>
                                            <SelectTrigger className="bg-slate-50">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Low">Low</SelectItem>
                                                <SelectItem value="Medium">Medium</SelectItem>
                                                <SelectItem value="High">High</SelectItem>
                                                <SelectItem value="Critical">Critical</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-sm font-semibold">Importance</Label>
                                        <Select onValueChange={(val) => setTaskData({ ...taskData, importance: val })} value={taskData.importance}>
                                            <SelectTrigger className="bg-slate-50">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Low">Low</SelectItem>
                                                <SelectItem value="Normal">Normal</SelectItem>
                                                <SelectItem value="High">High</SelectItem>
                                                <SelectItem value="Urgent">Urgent</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm font-semibold">Deadline</Label>
                                    <Input
                                        type="datetime-local"
                                        className="bg-slate-50"
                                        value={taskData.deadline}
                                        onChange={(e) => setTaskData({ ...taskData, deadline: e.target.value })}
                                    />
                                </div>
                                <div className="pt-4">
                                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-10 rounded-xl shadow-lg transition-transform hover:scale-[1.02]">
                                        <Send className="h-4 w-4 mr-2" />
                                        Assign Task
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Assignments History */}
            <Card className="shadow-lg border-primary/10 overflow-hidden mt-8">
                <CardHeader className="bg-slate-900 text-white border-b py-4">
                    <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <ClipboardList className="h-6 w-6" />
                            Task Assignments History
                        </div>
                        <Badge variant="outline" className="text-white border-white/20 px-4">
                            Total: {assignments.length}
                        </Badge>
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0 overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 text-slate-500 uppercase text-[10px] tracking-widest font-bold">
                                <th className="px-6 py-4 border-b">Volunteer</th>
                                <th className="px-6 py-4 border-b">Task</th>
                                <th className="px-6 py-4 border-b text-center">Severity</th>
                                <th className="px-6 py-4 border-b">Deadline</th>
                                <th className="px-6 py-4 border-b text-center">Status</th>
                                <th className="px-6 py-4 border-b text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {assignments.map((task) => (
                                <tr key={task.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-slate-700">{task.volunteer_name}</div>
                                        <div className="text-[10px] text-muted-foreground">Assigned at {task.time}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">{task.description}</td>
                                    <td className="px-6 py-4 text-center">
                                        <Badge className={
                                            task.severity === 'Critical' ? 'bg-red-500' :
                                                task.severity === 'High' ? 'bg-orange-500' :
                                                    'bg-blue-500'
                                        }>
                                            {task.severity}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        {new Date(task.deadline).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <Badge variant={task.status === 'Completed' ? 'default' : 'outline'} className={
                                            task.status === 'Completed' ? 'bg-green-500 text-white border-0' : 'text-orange-500 border-orange-200 bg-orange-50'
                                        }>
                                            {task.status}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {task.status === 'Completed' && !task.admin_verified ? (
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => handleVerifyTask(task.id)}
                                                className="text-green-600 hover:bg-green-50 font-bold"
                                            >
                                                <CheckCircle className="h-4 w-4 mr-1" />
                                                Verify
                                            </Button>
                                        ) : task.admin_verified ? (
                                            <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
                                                Verified
                                            </Badge>
                                        ) : (
                                            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">Waiting...</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {assignments.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                                        No assignments found in the database.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </div>
    )
}

