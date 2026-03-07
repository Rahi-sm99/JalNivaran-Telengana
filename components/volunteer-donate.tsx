"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Heart, Users, Phone, Mail, User, IndianRupee, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabase"
import { useRole } from "@/hooks/use-role"

export function VolunteerDonate() {
  const { role } = useRole()
  const { toast } = useToast()
  const [volunteerForm, setVolunteerForm] = useState({
    name: "",
    email: "",
    phone: "",
    agreeTerms: false,
  })

  const [donationData, setDonationData] = useState({
    name: "",
    email: "",
    amount: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDonating, setIsDonating] = useState(false)

  const isRestricted = role === "admin" || role === "volunteer"

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from('volunteer_forms')
        .insert([
          {
            full_name: volunteerForm.name,
            email: volunteerForm.email,
            phone: volunteerForm.phone,
            status: 'pending'
          }
        ])

      if (error) throw error

      toast({
        title: "Registration Successful (నమోదు విజయవంతమైంది)",
        description: "Welcome to Jal-Mitra! Admins will review your request and contact you soon.",
      })
      setVolunteerForm({ name: "", email: "", phone: "", agreeTerms: false })
    } catch (error: any) {
      console.error('Submission error:', error)
      toast({
        variant: "destructive",
        title: "Submission Failed (సమర్పణ విఫలమైంది)",
        description: error.message || "Something went wrong. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDonation = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!donationData.amount) return

    setIsDonating(true)
    try {
      const { error } = await supabase
        .from('donations')
        .insert([
          {
            donor_name: donationData.name,
            donor_email: donationData.email,
            amount: parseFloat(donationData.amount),
            status: 'completed' // In a real app, this would be 'pending' until payment confirmation
          }
        ])

      if (error) throw error

      toast({
        title: "Donation Successful (దానం విజయవంతమైంది)",
        description: `Thank you, ${donationData.name}! Your donation of ₹${donationData.amount} has been received.`,
      })
      setDonationData({ name: "", email: "", amount: "" })
    } catch (error: any) {
      console.error('Donation error:', error)
      toast({
        variant: "destructive",
        title: "Donation Failed (దానం విఫలమైంది)",
        description: error.message || "Something went wrong with the donation process.",
      })
    } finally {
      setIsDonating(false)
    }
  }

  return (
    <section id="volunteer" className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary mb-1">
            {isRestricted ? "Support via Donation" : "Volunteer & Donate"}
          </h2>
          <p className="text-xl font-normal text-muted-foreground mb-2">
            {isRestricted ? "దానం ద్వారా సహాయం చేయండి" : "స్వయంసేవకుడు మరియు దానం చేయండి"}
          </p>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-3"></div>
          <p className="text-sm text-muted-foreground m-0">
            {isRestricted
              ? "Your support keeps Telangana safe | మీ మద్దతు తెలంగాణను సురక్షితంగా ఉంచుతుంది"
              : "Join our mission to help Telangana stay safe | తెలంగాణను సురక్షితంగా ఉంచడంలో సహాయపడండి"}
          </p>
        </div>

        <div className={isRestricted ? "max-w-2xl mx-auto" : "grid grid-cols-1 lg:grid-cols-2 gap-8"}>
          {/* Volunteer Section - Only if not admin or volunteer */}
          {!isRestricted && (
            <Card className="shadow-sm bg-background overflow-hidden border-[#008BB2]/10">
              <CardHeader className="bg-white border-b-2 border-[#008BB2] py-4 px-6">
                <CardTitle className="flex items-center gap-2 text-xl text-[#008BB2] font-bold">
                  <Users className="h-6 w-6 shrink-0" />
                  <span>Become a Jal-Mitra Volunteer</span>
                </CardTitle>
                <p className="text-sm text-gray-500 mt-1 pl-8">
                  జల-మిత్ర స్వయంసేవకుడు అవ్వండి (Community Support)
                </p>
              </CardHeader>
              <CardContent className="pt-6 bg-white">
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Join our network of volunteers helping communities during water-logging emergencies. <br />
                    <span className="text-xs text-muted-foreground/60 italic">జల-జమావు సమయంలో సహాయం చేసే మన స్వయంసేవక నెట్వర్క్‌లో భాగం అవ్వండి.</span>
                  </p>
                </div>

                <form onSubmit={handleVolunteerSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="volunteer-name" className="text-sm font-medium">
                      Full Name <span className="text-[10px] text-muted-foreground ml-1">(పూర్తి పేరు)</span> <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="volunteer-name"
                        value={volunteerForm.name}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, name: e.target.value })}
                        className="pl-10"
                        required
                        placeholder="Enter your full name (మీ పూర్తి పేరు నమోదు చేయండి)"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="volunteer-email" className="text-sm font-medium">
                      Email <span className="text-[10px] text-muted-foreground ml-1">(ఇమైల్)</span> <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="volunteer-email"
                        type="email"
                        value={volunteerForm.email}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, email: e.target.value })}
                        className="pl-10"
                        required
                        placeholder="Enter your email (మీ ఇమైల్ నమోదు చేయండి)"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="volunteer-phone" className="text-sm font-medium">
                      Phone <span className="text-[10px] text-muted-foreground ml-1">(ఫోన్)</span> <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="volunteer-phone"
                        type="tel"
                        value={volunteerForm.phone}
                        onChange={(e) => setVolunteerForm({ ...volunteerForm, phone: e.target.value })}
                        className="pl-10"
                        required
                        placeholder="Enter your phone number (మీ ఫోన్ నంబర్ నమోదు చేయండి)"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={volunteerForm.agreeTerms}
                      onCheckedChange={(checked) =>
                        setVolunteerForm({ ...volunteerForm, agreeTerms: checked as boolean })
                      }
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the volunteer terms and conditions <br />
                      <span className="text-[10px] text-muted-foreground">(నేను స్వయంసేవక నిబంధనలకు అంగీకరిస్తున్నాను)</span>
                    </label>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={!volunteerForm.agreeTerms || isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Registering...
                      </>
                    ) : (
                      <>
                        Register as Volunteer
                        <span className="text-[10px] opacity-70 ml-2 font-normal">
                          (నమోదు చేయండి)
                        </span>
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Donation Section */}
          <Card className="shadow-sm bg-background overflow-hidden border-[#008BB2]/10 h-full">
            <CardHeader className="bg-white border-b-2 border-[#008BB2] py-4 px-6">
              <CardTitle className="flex items-center gap-2 text-xl text-[#008BB2] font-bold">
                <Heart className="h-6 w-6 shrink-0" />
                <span>Support Disaster Relief</span>
              </CardTitle>
              <p className="text-sm text-gray-500 mt-1 pl-8">
                విపత్తు సహాయకార్యాన్ని సమర్థించండి (Make a Donation)
              </p>
            </CardHeader>
            <CardContent className="pt-6 bg-white">
              <div className="mb-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your donation helps us deploy emergency equipment and support affected families across Telangana. <br />
                  <span className="text-xs text-muted-foreground/60 italic">మీ దానం మాకు అత్యవసర మౌలిక సదుపాయాలు మోహరించి తెలంగాణలో ప్రభావిత కుటుంబాలకు సహాయం చేయడానికి సహాయపడుతుంది.</span>
                </p>
              </div>

              <form onSubmit={handleDonation} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="donor-name" className="text-sm font-medium">
                      Full Name <span className="text-[10px] text-muted-foreground ml-1">(పేరు)</span> <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="donor-name"
                        value={donationData.name}
                        onChange={(e) => setDonationData({ ...donationData, name: e.target.value })}
                        className="pl-10"
                        required
                        placeholder="Your Name"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="donor-email" className="text-sm font-medium">
                      Email address <span className="text-[10px] text-muted-foreground ml-1">(ఇమైల్)</span> <span className="text-destructive">*</span>
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="donor-email"
                        type="email"
                        value={donationData.email}
                        onChange={(e) => setDonationData({ ...donationData, email: e.target.value })}
                        className="pl-10"
                        required
                        placeholder="Your Email"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="mb-3 block text-sm font-medium">
                    Select Amount <span className="text-[10px] text-muted-foreground ml-1">(మొత్తం ఎంచుక౏ండి)</span>
                  </Label>
                  <div className="grid grid-cols-3 gap-3">
                    {["500", "1000", "2000"].map((amount) => (
                      <Button
                        key={amount}
                        type="button"
                        variant="outline"
                        onClick={() => setDonationData({ ...donationData, amount: amount })}
                        className={donationData.amount === amount ? "border-primary bg-primary/10" : ""}
                      >
                        ₹{amount}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {["5000", "10000", "25000"].map((amount) => (
                    <Button
                      key={amount}
                      type="button"
                      variant="outline"
                      onClick={() => setDonationData({ ...donationData, amount: amount })}
                      className={donationData.amount === amount ? "border-primary bg-primary/10" : ""}
                    >
                      ₹{amount}
                    </Button>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="custom-amount" className="text-sm font-medium">
                    Or Enter Custom Amount <span className="text-[10px] text-muted-foreground ml-1">(లేదా వేరె మొత్తం నమోదు చేయండి)</span>
                  </Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="custom-amount"
                      type="number"
                      value={donationData.amount}
                      onChange={(e) => setDonationData({ ...donationData, amount: e.target.value })}
                      className="pl-10"
                      placeholder="Enter amount (మొత్తం నమోదు చేయండి)"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={!donationData.amount || isDonating}
                  className="w-full"
                  size="lg"
                >
                  {isDonating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Heart className="mr-2 h-4 w-4" />
                      Donate now (ఇప్పుడే దానం చేయండి)
                    </>
                  )}
                </Button>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    All donations are tax-deductible under Section 80G. You will receive a receipt via email. <br />
                    <span className="text-[10px] text-muted-foreground opacity-70">అన్ని దానాలు సెక్షన్ 80G కింద పనును తగ్గింపుకు అర్హమైనవి.</span>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
