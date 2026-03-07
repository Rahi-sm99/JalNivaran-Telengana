import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wifi, Activity, AlertTriangle, MapPin, Radio, Cpu } from "lucide-react"

export function IoTSystemDetails() {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-2">Smart Municipal Automation System</h2>
          <p className="text-muted-foreground">స్మార్ట్ మునిసిపల్ అటోమేషన్ వ్యవస్థ</p>
          <p className="text-sm text-muted-foreground mt-2 max-w-3xl mx-auto">
            Our IoT-based water-logging detection system uses municipal vehicles equipped with sensors to automatically
            detect and report road conditions, water-logging, and infrastructure issues in real-time.
          </p>
        </div>

        {/* System Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Automated Road Safety Assessment</CardTitle>
            <p className="text-sm text-muted-foreground">స్వయంచాలిత రోడ్డు సురక్ష మూల్యాంకనం</p>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/30 rounded-lg p-6 mb-6">
              <p className="text-center font-medium mb-4">
                Municipal vehicles equipped with vibration and tilt sensors (MPU6050) automatically detect road
                depressions and water-logged patches to alert the central command center in real-time.
              </p>
              <p className="text-center text-sm text-muted-foreground">
                నగరపాలక వాహనాలు కంపన మరియు వాలు సెన్సర్ (MPU6050)తో అమర్చబడి రోడ్డు గుంటలు మరియు జలబాధిత ప్రాంతాలను స్వయంచాలితంగాగా గుర్తిస్తాయి మరియు కేంద్ర కమాండ్ సెంటర్కు రియల్-టైమ్‌లో హెచ్చరిస్తాయి.
              </p>
            </div>

            {/* Hardware Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-2 border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <Cpu className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">ESP32 Microcontroller</h3>
                    <p className="text-sm text-muted-foreground mb-3">ESP32 మైక్రోకంట్రోలర్</p>
                    <ul className="text-xs text-left space-y-1">
                      <li>• WiFi & Bluetooth enabled</li>
                      <li>• Low power consumption</li>
                      <li>• Real-time data processing</li>
                      <li>• GPS integration</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <Activity className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">MPU6050 Sensor</h3>
                    <p className="text-sm text-muted-foreground mb-3">MPU6050 సెన్సర్</p>
                    <ul className="text-xs text-left space-y-1">
                      <li>• 6-axis motion tracking</li>
                      <li>• Accelerometer & gyroscope</li>
                      <li>• Detects vibrations & tilts</li>
                      <li>• High precision measurements</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <Radio className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">Cloud Integration</h3>
                    <p className="text-sm text-muted-foreground mb-3">క్లౌడ్ సంయోజనం</p>
                    <ul className="text-xs text-left space-y-1">
                      <li>• Real-time data transmission</li>
                      <li>• Central command dashboard</li>
                      <li>• Alert notifications</li>
                      <li>• Historical data analysis</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* How It Works */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Detection Process | గుర్తింపు ప్రక్రియ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                <li className="flex gap-3">
                  <span className="font-bold text-primary">1.</span>
                  <div>
                    <p className="font-medium">Vehicle Movement Monitoring</p>
                    <p className="text-sm text-muted-foreground">
                      MPU6050 sensors continuously monitor vehicle vibrations, tilts, and sudden movements as municipal
                      vehicles patrol the city.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-primary">2.</span>
                  <div>
                    <p className="font-medium">Anomaly Detection</p>
                    <p className="text-sm text-muted-foreground">
                      ESP32 processes sensor data in real-time to identify abnormal patterns indicating road
                      depressions, potholes, or water-logged areas.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-primary">3.</span>
                  <div>
                    <p className="font-medium">GPS Location Tagging</p>
                    <p className="text-sm text-muted-foreground">
                      Detected issues are automatically tagged with precise GPS coordinates for exact location
                      identification.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-primary">4.</span>
                  <div>
                    <p className="font-medium">Cloud Transmission</p>
                    <p className="text-sm text-muted-foreground">
                      Data is instantly transmitted to the central command center via WiFi/cellular network for
                      immediate action.
                    </p>
                  </div>
                </li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-primary" />
                Benefits & Impact | ప్రయోజనాలు మరియు ప్రభావం
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <div>
                    <p className="font-medium">24/7 Automated Monitoring</p>
                    <p className="text-sm text-muted-foreground">
                      Continuous surveillance without manual intervention reduces response time significantly.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <div>
                    <p className="font-medium">Precise Location Tracking</p>
                    <p className="text-sm text-muted-foreground">
                      GPS-tagged alerts enable rapid deployment of emergency services to exact locations.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <div>
                    <p className="font-medium">Cost-Effective Solution</p>
                    <p className="text-sm text-muted-foreground">
                      Utilizes existing municipal vehicles without requiring dedicated infrastructure.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <div>
                    <p className="font-medium">Data-Driven Decision Making</p>
                    <p className="text-sm text-muted-foreground">
                      Historical data helps identify recurring problem areas for preventive maintenance.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Technical Specifications */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Wifi className="h-5 w-5 text-primary" />
              System Architecture | వ్యవస్థ నిర్మాణం
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1 text-center">
                  <div className="bg-card p-4 rounded-lg shadow-md border-2 border-primary/20 mb-2">
                    <Cpu className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="font-bold">ESP32</p>
                    <p className="text-xs text-muted-foreground">Microcontroller</p>
                  </div>
                  <p className="text-xs">WiFi/BLE</p>
                </div>

                <div className="text-2xl text-primary">→</div>

                <div className="flex-1 text-center">
                  <div className="bg-card p-4 rounded-lg shadow-md border-2 border-primary/20 mb-2">
                    <Activity className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="font-bold">MPU6050</p>
                    <p className="text-xs text-muted-foreground">Sensor</p>
                  </div>
                  <p className="text-xs">I2C Connection</p>
                </div>

                <div className="text-2xl text-primary">→</div>

                <div className="flex-1 text-center">
                  <div className="bg-card p-4 rounded-lg shadow-md border-2 border-primary/20 mb-2">
                    <MapPin className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="font-bold">GPS Module</p>
                    <p className="text-xs text-muted-foreground">Location</p>
                  </div>
                  <p className="text-xs">UART</p>
                </div>

                <div className="text-2xl text-primary">→</div>

                <div className="flex-1 text-center">
                  <div className="bg-card p-4 rounded-lg shadow-md border-2 border-primary/20 mb-2">
                    <Radio className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="font-bold">Cloud Server</p>
                    <p className="text-xs text-muted-foreground">Dashboard</p>
                  </div>
                  <p className="text-xs">HTTPS/MQTT</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-primary/20">
                <p className="text-center text-sm">
                  <span className="font-semibold">System Status:</span> 127 Active Sensors | 89% Network Coverage |
                  Real-time Processing Latency: &lt;2s
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
