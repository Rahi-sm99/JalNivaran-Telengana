"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Ambulance, Building2, Droplet, Mail, User, MessageSquare, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"
export function EmergencyResources() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const emergencyContacts = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "National Emergency",
      titleHi: "జాతీయ అత్యవసరం",
      number: "112",
      description: "All emergency services",
      descriptionHi: "అన్ని అత్యవసర సేవలు",
    },
    {
      icon: <Ambulance className="h-6 w-6" />,
      title: "Ambulance",
      titleHi: "ఆంబులెన్స్",
      number: "108",
      description: "Medical emergency",
      descriptionHi: "వైద్య అత్యవసరం",
    },
    {
      icon: <Droplet className="h-6 w-6" />,
      title: "Telangana Jal Shakti",
      titleHi: "తెలంగాణ జల్ శక్తి",
      number: "1800-425-5505",
      description: "Water-related issues",
      descriptionHi: "నీటి సమస్యలు",
    },
    {
      icon: <Building2 className="h-6 w-6" />,
      title: "Telangana State Disaster Management Authority",
      titleHi: "తెలంగాణ రాష్ట్ర విపత్తు నిర్వహణ సంస్థ",
      number: "1070",
      description: "Disaster Management",
      descriptionHi: "విపత్తు నిర్వహణ",
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from('resource_requests')
        .insert([
          {
            requester_name: formData.name,
            phone: formData.phone,
            email: formData.email,
            details: formData.message,
            status: 'pending'
          }
        ])

      if (error) throw error

      toast({
        title: "Request Submitted (అర్ధం స్వీకరించబడింది)",
        description: "Emergency support request has been sent to the control center.",
      })
      setFormData({ name: "", email: "", phone: "", message: "" })
    } catch (error: any) {
      console.error('Request error:', error)
      toast({
        variant: "destructive",
        title: "Submission Failed (సమర్పణ విఫలమైంది)",
        description: error.message || "Failed to send request. Please try calling the emergency numbers.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="emergency" className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-2">
          <h2 className="text-3xl font-bold text-primary mb-1">Emergency Resources</h2>
          <p className="text-xl font-normal text-muted-foreground mb-2">అత్యవసర వనరులు</p>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-3"></div>
          <p className="text-sm text-muted-foreground m-0">
            24/7 Emergency helplines and support | 24/7 అత్యవసర సహాయ హెల్పులైన్
          </p>
        </div>

        {/* Emergency Contacts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {emergencyContacts.map((contact, idx) => (
            <Card key={idx} className="border-2 hover:border-primary transition-colors bg-background">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-2">
                  {contact.icon}
                </div>
                <CardTitle className="text-lg text-center text-foreground font-bold leading-none">
                  {contact.title}
                </CardTitle>
                <p className="text-xs text-center text-muted-foreground mt-1">
                  {contact.titleHi}
                </p>
              </CardHeader>
              <CardContent className="text-center">
                <a href={`tel:${contact.number}`} className="block">
                  <p className="text-3xl font-bold text-primary mb-1">{contact.number}</p>
                  <p className="text-sm text-muted-foreground">
                    {contact.description} <br />
                    <span className="text-[10px] opacity-70">{contact.descriptionHi}</span>
                  </p>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Emergency Support Form */}
        <Card className="max-w-2xl mx-auto shadow-sm bg-background overflow-hidden border-[#008BB2]/10">
          <CardHeader className="bg-white border-b-2 border-[#008BB2] py-4 px-6">
            <CardTitle className="text-xl text-[#008BB2] font-bold">
              Emergency Support Request
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              అత్యవసర సహాయం అర్ధించండి (Citizen Request)
            </p>
          </CardHeader>
          <CardContent className="pt-6 bg-white">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Name <span className="text-[10px] text-muted-foreground ml-1">(పేరు)</span> <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="pl-10"
                      required
                      placeholder="Enter your name (మీ పేరు నమోదు చేయండి)"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone <span className="text-[10px] text-muted-foreground ml-1">(ఫోన్)</span> <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="pl-10"
                      required
                      placeholder="Enter phone number (ఫోన్ నంబర్ నమోదు చేయండి)"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email <span className="text-[10px] text-muted-foreground ml-1">(ఇమైల్)</span></Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10"
                    placeholder="Enter email address (ఇమైల్ చిరునామా నమోదు చేయండి)"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">
                  Emergency Details <span className="text-[10px] text-muted-foreground ml-1">(అత్యవసర వివరాలు)</span>{" "}
                  <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="pl-10 min-h-[120px]"
                    required
                    placeholder="Describe the emergency situation and location (స్థితి మరియు స్థలం వివరించండి)"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Request
                    <span className="text-[10px] opacity-70 ml-2 font-normal">
                      (అర్ధం పంపండి)
                    </span>
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
