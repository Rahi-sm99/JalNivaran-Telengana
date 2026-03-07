"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Upload, User, AlertTriangle, FileText, Loader2, Phone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { areas, areasTelugu } from "@/lib/data"
import { supabase } from "@/lib/supabase"
export function ReportArea() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    severity: "",
    description: "",
    reporter_contact: "",
    image: null as File | null,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLocating, setIsLocating] = useState(false)
  const isConfigured = !!process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co'

  const handleAutoLocation = () => {
    if (!("geolocation" in navigator)) {
      toast({
        variant: "destructive",
        title: "Not Supported",
        description: "Your browser doesn't support geolocation."
      })
      return
    }

    setIsLocating(true)
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        // In a real app, you'd use a Geocoding API here. 
        // For now, we'll use the precise coordinates which Admins love for GIS.
        const locationString = `${latitude.toFixed(4)}, ${longitude.toFixed(4)} (GPS Detected)`

        setFormData(prev => ({ ...prev, location: locationString }))
        setIsLocating(false)
        toast({
          title: "Location Detected",
          description: `Current coordinates: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
        })
      },
      (error) => {
        setIsLocating(false)
        toast({
          variant: "destructive",
          title: "Detection Failed",
          description: "Could not get your location. Please check browser permissions."
        })
      }
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    /* ... rest of existing submit logic ... */
    if (!isConfigured) {
      toast({
        variant: "destructive",
        title: "Configuration Error",
        description: "Supabase keys are missing. Please add them to Vercel and redeploy."
      })
      setIsSubmitting(false)
      return
    }

    try {
      let imageUrl = null

      if (formData.image) {
        const file = formData.image
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
        const filePath = `${fileName}`
        const { error: uploadError, data } = await supabase.storage.from('reports').upload(filePath, file)
        if (uploadError) throw new Error(`Upload Failed: ${uploadError.message}`)
        if (data) {
          const { data: { publicUrl } } = supabase.storage.from('reports').getPublicUrl(filePath)
          imageUrl = publicUrl
        }
      }

      const { error } = await supabase.from('disaster_reports').insert([
        {
          title: `Water-logging at ${formData.location}`,
          description: formData.description,
          location: formData.location,
          severity: formData.severity,
          reporter_name: formData.name,
          reporter_contact: formData.reporter_contact,
          image_url: imageUrl,
          status: 'pending'
        }
      ])
      if (error) throw error
      toast({ title: "Report Submitted", description: "Your report has been received. (మీ నివేదిక అందుకుంది)" })
      setFormData({ name: "", location: "", severity: "", description: "", reporter_contact: "", image: null })
    } catch (error: any) {
      toast({ variant: "destructive", title: "Submission Failed", description: error.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] })
    }
  }

  return (
    <section id="report" className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        {!isConfigured && (
          <div className="max-w-3xl mx-auto mb-6 bg-red-100 border-2 border-red-500 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 shrink-0" />
            <p className="text-sm font-bold">Supabase missing. Image/Data will NOT save.</p>
          </div>
        )}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary mb-1">Report Water-logging</h2>
          <p className="text-xl font-normal text-muted-foreground mb-2">జల-జమావును నివేదించండి</p>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-3"></div>
        </div>

        <Card className="max-w-3xl mx-auto shadow-sm bg-background border-[#008BB2]/10 overflow-hidden">
          <CardHeader className="bg-white border-b-2 border-[#008BB2] py-4 px-6 flex flex-row items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-[#008BB2]" />
            <div>
              <CardTitle className="text-xl text-[#008BB2] font-bold">Citizen Water-logging Report</CardTitle>
              <p className="text-sm text-gray-500">పౌరుల జల-జమావు నివేదిక (Citizen Report Form)</p>
            </div>
          </CardHeader>
          <CardContent className="pt-8 bg-white px-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label className="text-sm font-bold text-slate-700">Full Name (పూర్తి పేరు) <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-10 h-11"
                    placeholder="Enter your full name (మీ పూర్తి పేరు నమోదు చేయండి)"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-bold text-slate-700">Phone (ఫోన్) <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="tel"
                    value={formData.reporter_contact}
                    onChange={(e) => setFormData({ ...formData, reporter_contact: e.target.value })}
                    className="pl-10 h-11"
                    placeholder="Enter your phone number (మీ ఫోన్ నంబర్ నమోదు చేయండి)"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-bold text-slate-700">Location (స్థలం) <span className="text-red-500">*</span></Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="pl-10 h-11"
                        placeholder="Click Pin to detect area (పిన్ క్లిక్ చేసి ప్రాంతం గుర్తించండి)"
                        required
                      />
                    </div>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleAutoLocation}
                      disabled={isLocating}
                      className="h-11 bg-[#008BB2] hover:bg-[#008BB2]/90 text-white"
                    >
                      {isLocating ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-bold text-slate-700">Severity Level (తీవ్రత) <span className="text-red-500">*</span></Label>
                  <Select value={formData.severity} onValueChange={(val) => setFormData({ ...formData, severity: val })} required>
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select severity (తీవ్రత ఎంచుకోండి)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low (తక్కువ - Minor accumulation)</SelectItem>
                      <SelectItem value="moderate">Moderate (మధ్యస్థం - Traffic impact)</SelectItem>
                      <SelectItem value="severe">Severe (తీవ్రం - Road blocked)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-bold text-slate-700">Description (వివరణ) <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="pl-10 min-h-[120px] pt-3"
                    placeholder="Describe the situation in detail (పరిస్థితిని విస్తారంగా వివరించండి)"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-bold text-slate-700">Upload Evidence (సాక్ష్యం అప్లోడ్ చేయండి)</Label>
                <div className="border-2 border-dashed rounded-xl p-8 text-center hover:border-[#008BB2] transition-colors bg-slate-50">
                  <Input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  <label htmlFor="image-upload" className="cursor-pointer group">
                    <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground group-hover:text-[#008BB2] transition-colors" />
                    <p className="text-base font-medium text-slate-600 group-hover:text-[#008BB2]">
                      {formData.image ? formData.image.name : "Click to upload incident photo (ఘటన ఫోటో అప్లోడ్ చేయండి)"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">Max Size: 10MB | PNG, JPG, JPEG</p>
                  </label>
                </div>
              </div>

              <Button type="submit" className="w-full bg-[#008BB2] hover:bg-[#008BB2]/90 h-14 text-lg font-bold shadow-lg" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                    Submitting Case...
                  </>
                ) : (
                  <>
                    <AlertTriangle className="mr-3 h-5 w-5" />
                    Submit Report (నివేదిక సమర్పించండి)
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
