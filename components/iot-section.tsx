import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cpu, Radio, Activity, AlertCircle } from "lucide-react"

export function IoTSection() {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary mb-2">How It Works</h2>
          <p className="text-muted-foreground">ఇది ఎలా పనిచేస్తుంది</p>
          <p className="text-sm text-muted-foreground mt-2">Smart Municipal Automation with IoT Technology</p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="bg-primary text-primary-foreground">
              <CardTitle className="text-xl">IoT-Enabled Road Safety Assessment | IoT-సక్షమం రోడ్డు సురక్ష మూల్యాంకనం</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* System Diagram */}
                <div className="bg-muted/30 rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-4 text-center">System Architecture</h3>
                  <div className="flex flex-col items-center gap-6">
                    {/* ESP32 */}
                    <div className="w-full">
                      <Card className="bg-card">
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-3">
                            <Cpu className="h-8 w-8 text-primary" />
                            <div>
                              <p className="font-semibold">ESP32 Microcontroller</p>
                              <p className="text-xs text-muted-foreground">Main processing unit</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Connection Arrow */}
                    <div className="flex flex-col items-center">
                      <div className="w-0.5 h-8 bg-border" />
                      <Radio className="h-6 w-6 text-muted-foreground" />
                      <div className="w-0.5 h-8 bg-border" />
                    </div>

                    {/* MPU6050 */}
                    <div className="w-full">
                      <Card className="bg-card">
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-3">
                            <Activity className="h-8 w-8 text-primary" />
                            <div>
                              <p className="font-semibold">MPU6050 Sensor</p>
                              <p className="text-xs text-muted-foreground">6-axis gyroscope & accelerometer</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Connection Arrow */}
                    <div className="flex flex-col items-center">
                      <div className="w-0.5 h-8 bg-border" />
                      <Radio className="h-6 w-6 text-muted-foreground" />
                      <div className="w-0.5 h-8 bg-border" />
                    </div>

                    {/* Central Command */}
                    <div className="w-full">
                      <Card className="bg-primary text-primary-foreground">
                        <CardContent className="pt-6">
                          <div className="flex items-center gap-3">
                            <AlertCircle className="h-8 w-8" />
                            <div>
                              <p className="font-semibold">Central Command Center</p>
                              <p className="text-xs opacity-90">Real-time alert system</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>

                {/* Explanation */}
                <div className="flex flex-col justify-center">
                  <h3 className="font-semibold text-lg mb-4">Automated Road Safety Assessment</h3>
                  <div className="space-y-4 text-sm leading-relaxed">
                    <p className="text-muted-foreground">
                      Municipal and disaster response vehicles across Telangana are equipped with ESP32 microcontrollers connected to MPU6050
                      vibration and tilt sensors.
                    </p>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <p className="font-medium mb-2">Key Features:</p>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>Detects road depressions and uneven surfaces automatically</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>Identifies water-logged patches through vibration patterns</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>GPS coordinates transmitted in real-time</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>Instant alerts sent to central command center</span>
                        </li>
                      </ul>
                    </div>
                    <p className="text-muted-foreground">
                      This automated system enables rapid response to emerging water-logging and landslide situations before they
                      become severe, making Telangana's roads safer for all citizens.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section >
  )
}
