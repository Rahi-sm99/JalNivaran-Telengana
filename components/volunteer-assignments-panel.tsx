"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ClipboardList, Clock, AlertTriangle, CheckCircle, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"

export function VolunteerAssignmentsPanel({ volunteerName }: { volunteerName: string }) {
    const { toast } = useToast()
    const [tasks, setTasks] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState<string | null>(null)

    useEffect(() => {
        fetchTasks()
    }, [volunteerName])

    const fetchTasks = async () => {
        setLoading(true)
        try {
            const { data, error } = await supabase
                .from('tasks_assignments')
                .select('*')
                .eq('volunteer_name', volunteerName)
                .order('created_at', { ascending: false })

            if (error) throw error
            setTasks(data || [])
        } catch (error) {
            console.error("Error fetching tasks:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleUpdateStatus = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'Pending' ? 'Completed' : 'Pending'
        setUpdating(id)
        try {
            const { error } = await supabase
                .from('tasks_assignments')
                .update({ status: newStatus })
                .eq('id', id)

            if (error) throw error

            toast({
                title: `Status Updated to ${newStatus}`,
                description: newStatus === 'Completed' ? "Great job! Admin will verify your work soon." : "Task moved back to pending."
            })
            fetchTasks()
        } catch (error: any) {
            toast({ variant: "destructive", title: "Error", description: error.message })
        } finally {
            setUpdating(null)
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200">
                <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
                <p className="text-slate-500 font-medium">Fetching your assignments...</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 leading-tight">Your Assignments</h2>
                    <p className="text-sm text-slate-500 mt-1">Hello {volunteerName}, here are your dedicated tasks.</p>
                </div>
                <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-4 py-1 text-sm font-bold">
                    {tasks.length} {tasks.length === 1 ? 'Task' : 'Tasks'} Assigned
                </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tasks.map((task) => (
                    <Card key={task.id} className={`overflow-hidden transition-all duration-300 border-l-4 ${task.status === 'Completed' ? 'border-l-green-500 bg-green-50/10' : 'border-l-orange-500 bg-white'
                        } hover:shadow-xl`}>
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-2">
                                    <Badge className={
                                        task.severity === 'Critical' ? 'bg-red-500' :
                                            task.severity === 'High' ? 'bg-orange-500' :
                                                'bg-blue-500'
                                    }>
                                        {task.severity}
                                    </Badge>
                                    <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-widest border-slate-200">
                                        {task.importance} Importance
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-1.5 text-slate-400">
                                    <Clock className="h-3.5 w-3.5" />
                                    <span className="text-xs font-medium">Due: {new Date(task.deadline).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <h3 className="text-lg font-bold text-slate-800 mb-3">{task.description}</h3>

                            <div className="flex items-center justify-between mt-8 pt-4 border-t border-slate-100">
                                <div className="flex items-center gap-2">
                                    <div className={`h-2.5 w-2.5 rounded-full ${task.status === 'Completed' ? 'bg-green-500' : 'bg-orange-500 animate-pulse'}`} />
                                    <span className="text-sm font-bold text-slate-600">{task.status}</span>
                                </div>

                                {task.admin_verified ? (
                                    <div className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
                                        <CheckCircle className="h-4 w-4" />
                                        <span className="text-xs font-black uppercase tracking-widest">Verified by Admin</span>
                                    </div>
                                ) : (
                                    <Button
                                        size="sm"
                                        variant={task.status === 'Completed' ? 'outline' : 'default'}
                                        onClick={() => handleUpdateStatus(task.id, task.status)}
                                        disabled={updating === task.id}
                                        className={task.status === 'Completed'
                                            ? "border-green-200 text-green-600 hover:bg-green-50 font-bold"
                                            : "bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-md shadow-orange-100"
                                        }
                                    >
                                        {updating === task.id ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                                        {task.status === 'Completed' ? "Mark as Pending" : "Mark as Completed"}
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {tasks.length === 0 && (
                    <div className="md:col-span-2 py-20 text-center bg-white rounded-2xl border-2 border-dashed border-slate-100">
                        <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ClipboardList className="h-8 w-8 text-slate-300" />
                        </div>
                        <h3 className="text-slate-500 font-bold">No assignments yet</h3>
                        <p className="text-slate-400 text-sm mt-1">Sit tight! Admins will assign tasks to you soon.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
