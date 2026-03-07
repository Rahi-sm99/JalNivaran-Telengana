"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cpu, Radio, Activity, MapPin, ArrowRight, ShieldCheck, UserCircle, ClipboardList } from "lucide-react"
import Image from "next/image"
import { useRole } from "@/hooks/use-role"
import { AdminVolunteerPanel } from "@/components/admin-volunteer-panel"
import { VolunteerAssignmentsPanel } from "@/components/volunteer-assignments-panel"

export default function HowWeWorkPage() {
  const { role, user, volunteerData, loading } = useRole()

  const isAdmin = role === "admin"
  const isVolunteer = role === "volunteer"

  const volunteerName = volunteerData?.name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || "Volunteer"

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {isAdmin ? "Volunteer Management | స్వయంసేవక నిర్వహణ" :
                isVolunteer ? "Your Assignments | మీ కార్యములు" :
                  "How It Works | ఇది ఎలా పనిచేస్తుంది"}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {isAdmin ? "Track, add, and assign tasks to Jal-Mitra volunteers across Telangana." :
                isVolunteer ? "View and update the status of tasks assigned to you by the administration." :
                  "Smart Municipal Automation using IoT Integration for Real-time Water-logging Detection"}
            </p>
          </div>

          {loading ? (
            <div className="py-20 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground font-medium">Loading your dashboard...</p>
            </div>
          ) : isAdmin ? (
            <AdminVolunteerPanel />
          ) : isVolunteer ? (
            <VolunteerAssignmentsPanel volunteerName={volunteerName} />
          ) : (
            <>
              <Card className="mb-12 bg-white border-2 border-primary/20">
                <CardHeader className="bg-white border-b">
                  <CardTitle className="text-2xl flex items-center gap-2 text-foreground">
                    <Radio className="h-6 w-6 text-primary" />
                    System Architecture | వ్యవస్థ నిర్మాణం
                  </CardTitle>
                </CardHeader>
                <CardContent className="bg-slate-50 p-6">
                  {/* Smaller 4-card architecture diagram with embedded descriptions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {/* ESP32 Card */}
                    <div className="relative">
                      <Card className="bg-white shadow-md border-2 border-border hover:border-primary transition-colors h-full">
                        <CardContent className="pt-5 pb-4 text-center">
                          <div className="flex justify-center mb-2">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <Cpu className="h-5 w-5 text-primary" />
                            </div>
                          </div>
                          <h3 className="text-base font-bold mb-1 text-foreground">ESP32</h3>
                          <p className="text-xs text-muted-foreground mb-2">Microcontroller</p>
                          <p className="text-xs text-foreground leading-relaxed">
                            Processes sensor data and transmits alerts via WiFi/BLE
                          </p>
                        </CardContent>
                      </Card>
                      <div className="text-center mt-2">
                        <p className="text-xs font-semibold text-foreground">WiFi/BLE</p>
                      </div>
                      <div className="hidden lg:block absolute top-1/3 -right-3 -translate-y-1/2">
                        <ArrowRight className="h-5 w-5 text-primary" />
                      </div>
                    </div>

                    {/* MPU6050 Card */}
                    <div className="relative">
                      <Card className="bg-white shadow-md border-2 border-border hover:border-primary transition-colors h-full">
                        <CardContent className="pt-5 pb-4 text-center">
                          <div className="flex justify-center mb-2">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <Activity className="h-5 w-5 text-primary" />
                            </div>
                          </div>
                          <h3 className="text-base font-bold mb-1 text-foreground">MPU6050</h3>
                          <p className="text-xs text-muted-foreground mb-2">Sensor</p>
                          <p className="text-xs text-foreground leading-relaxed">
                            Detects vibrations and tilt to identify water-logged areas
                          </p>
                        </CardContent>
                      </Card>
                      <div className="text-center mt-2">
                        <p className="text-xs font-semibold text-foreground">I2C Connection</p>
                      </div>
                      <div className="hidden lg:block absolute top-1/3 -right-3 -translate-y-1/2">
                        <ArrowRight className="h-5 w-5 text-primary" />
                      </div>
                    </div>

                    {/* GPS Module Card */}
                    <div className="relative">
                      <Card className="bg-white shadow-md border-2 border-border hover:border-primary transition-colors h-full">
                        <CardContent className="pt-5 pb-4 text-center">
                          <div className="flex justify-center mb-2">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <MapPin className="h-5 w-5 text-primary" />
                            </div>
                          </div>
                          <h3 className="text-base font-bold mb-1 text-foreground">GPS Module</h3>
                          <p className="text-xs text-muted-foreground mb-2">Location</p>
                          <p className="text-xs text-foreground leading-relaxed">
                            Tags each detection with precise GPS coordinates
                          </p>
                        </CardContent>
                      </Card>
                      <div className="text-center mt-2">
                        <p className="text-xs font-semibold text-foreground">UART</p>
                      </div>
                      <div className="hidden lg:block absolute top-1/3 -right-3 -translate-y-1/2">
                        <ArrowRight className="h-5 w-5 text-primary" />
                      </div>
                    </div>

                    {/* Cloud Server Card */}
                    <div>
                      <Card className="bg-white shadow-md border-2 border-border hover:border-primary transition-colors h-full">
                        <CardContent className="pt-5 pb-4 text-center">
                          <div className="flex justify-center mb-2">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <Radio className="h-5 w-5 text-primary" />
                            </div>
                          </div>
                          <h3 className="text-base font-bold mb-1 text-foreground">Cloud Server</h3>
                          <p className="text-xs text-muted-foreground mb-2">Dashboard</p>
                          <p className="text-xs text-foreground leading-relaxed">
                            Displays real-time alerts and analytics on portal
                          </p>
                        </CardContent>
                      </Card>
                      <div className="text-center mt-2">
                        <p className="text-xs font-semibold text-foreground">HTTPS/MQTT</p>
                      </div>
                    </div>
                  </div>

                  {/* System Status Bar */}
                  <div className="bg-white rounded-lg border-2 border-primary/20 p-3">
                    <p className="text-center text-foreground text-sm font-semibold">
                      <span className="font-bold">System Status:</span> 127 Active Sensors | 89% Network Coverage |
                      Real-time Processing Latency: {"<"}2s
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* IoT System Overview */}
              <Card className="mb-8 border-2 border-primary bg-white">
                <CardHeader className="bg-white border-b">
                  <CardTitle className="text-2xl flex items-center gap-2 text-primary">
                    <Cpu className="h-6 w-6" />
                    Smart Municipal Automation System
                  </CardTitle>
                </CardHeader>
                <CardContent className="bg-white">
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    The Jal Nivaran portal leverages cutting-edge IoT technology to provide real-time monitoring and
                    automated detection of water-logged and flood-prone areas across Telangana. Our system uses ESP32 microcontrollers paired
                    with MPU6050 sensors installed in municipal vehicles to detect road depressions and water accumulation.
                  </p>

                  {/* ESP32 Circuit Diagram */}
                  <div className="bg-muted/50 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-semibold mb-4 text-center text-foreground">Hardware Connection Diagram</h3>
                    <div className="relative w-full aspect-[4/3] max-w-2xl mx-auto rounded-lg overflow-hidden border-2 border-border">
                      <Image
                        src="/images/esp32-circuit.png"
                        alt="ESP32 connected to MPU6050 sensor circuit diagram"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="text-sm text-muted-foreground text-center mt-4">
                      ESP32 Microcontroller connected to MPU6050 Vibration & Tilt Sensor
                    </p>
                  </div>

                  {/* Key Feature */}
                  <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg">
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-foreground">
                      <Activity className="h-5 w-5 text-primary" />
                      Automated Road Safety Assessment
                    </h3>
                    <p className="text-lg leading-relaxed text-foreground">
                      Municipal vehicles equipped with vibration and tilt sensors (MPU6050) automatically detect road
                      depressions and water-logged patches to alert the central command center in real-time. This proactive
                      approach enables rapid response and ensures citizen safety during heavy rainfall.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
