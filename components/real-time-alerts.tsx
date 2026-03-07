"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Info, AlertCircle, MapPin, Clock } from "lucide-react"

interface Alert {
  id: string
  type: "emergency" | "warning" | "info"
  title: string
  titleHi: string
  location: string
  time: string
  description: string
}

export function RealTimeAlerts() {
  const alerts: Alert[] = [
    {
      id: "1",
      type: "emergency",
      title: "Severe Water-logging",
      titleHi: "తీవ్రమైన జలనిలువు",
      location: "Moosarambagh, Hyderabad",
      time: "10 mins ago",
      description: "Road completely submerged near Musi River bridge. Traffic diverted via Chaderghat.",
    },
    {
      id: "2",
      type: "emergency",
      title: "Flash Flood Alert",
      titleHi: "అకస్మాత్తు వరద హెచ్చరిక",
      location: "Khammam District",
      time: "25 mins ago",
      description: "Godavari River rising rapidly near Bhadrachalam. Low-lying villages on high alert.",
    },
    {
      id: "3",
      type: "warning",
      title: "River Level Alert",
      titleHi: "నది స్థాయి హెచ్చరిక",
      location: "Musi River, Hyderabad",
      time: "35 mins ago",
      description: "Water level approaching danger mark. Residents near Narayanguda alerted.",
    },
    {
      id: "4",
      type: "warning",
      title: "Heavy Rainfall Warning",
      titleHi: "భారీ వర్షపాత హెచ్చరిక",
      location: "Adilabad District",
      time: "45 mins ago",
      description: "IMD issues red alert for Adilabad and Nirmal. Avoid travel to low-lying areas.",
    },
    {
      id: "5",
      type: "info",
      title: "NDRF Deployment",
      titleHi: "NDRF తైనాతీ",
      location: "Warangal District",
      time: "1 hour ago",
      description: "Additional rescue teams deployed in flood-prone areas of Warangal Urban.",
    },
    {
      id: "6",
      type: "info",
      title: "Road Restoration",
      titleHi: "రహదారి పునరుద్ధరణ",
      location: "NH-163, Nalgonda",
      time: "1.5 hours ago",
      description: "Waterlogged stretch cleared. Traffic partially resumed. Drive with caution.",
    },
    {
      id: "7",
      type: "emergency",
      title: "Urban Flooding",
      titleHi: "పట్టణ వరద",
      location: "Sainikpuri, Secunderabad",
      time: "2 hours ago",
      description: "Residential areas submerged. Emergency services deployed.",
    },
    {
      id: "8",
      type: "warning",
      title: "Godavari Flood Warning",
      titleHi: "గోదావరి వరద హెచ్చరిక",
      location: "Karimnagar District",
      time: "2 hours ago",
      description: "IMD predicts heavy to very heavy rainfall. Godavari basin on alert.",
    },
  ]

  const getAlertStyle = (type: Alert["type"]) => {
    switch (type) {
      case "emergency":
        return {
          bgColor: "bg-red-50 dark:bg-red-950/20",
          borderColor: "border-l-4 border-l-red-600",
          badgeVariant: "destructive" as const,
          icon: <AlertCircle className="h-5 w-5 text-red-600" />,
          label: "Emergency",
          labelHi: "అత్యవసరం",
        }
      case "warning":
        return {
          bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
          borderColor: "border-l-4 border-l-yellow-600",
          badgeVariant: "secondary" as const,
          icon: <AlertTriangle className="h-5 w-5 text-yellow-600" />,
          label: "Warning",
          labelHi: "హెచ్చరిక",
        }
      case "info":
        return {
          bgColor: "bg-blue-50 dark:bg-blue-950/20",
          borderColor: "border-l-4 border-l-blue-600",
          badgeVariant: "outline" as const,
          icon: <Info className="h-5 w-5 text-blue-600" />,
          label: "Information",
          labelHi: "సమాచారం",
        }
    }
  }

  return (
    <section id="alerts" className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary mb-2">Real-Time Alerts</h2>
          <p className="text-muted-foreground">నిజ సమయ హెచ్చరికలు</p>
          <p className="text-sm text-muted-foreground mt-2">Live updates on weather and risk situations across Telangana</p>
        </div>

        {/* Alert Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-red-600">3</p>
                  <p className="text-sm text-foreground">Emergency</p>
                </div>
                <AlertCircle className="h-10 w-10 text-red-600 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-900">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-yellow-600">3</p>
                  <p className="text-sm text-foreground">Warning</p>
                </div>
                <AlertTriangle className="h-10 w-10 text-yellow-600 opacity-50" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold text-blue-600">2</p>
                  <p className="text-sm text-foreground">Information</p>
                </div>
                <Info className="h-10 w-10 text-blue-600 opacity-50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alert Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {alerts.map((alert) => {
            const style = getAlertStyle(alert.type)
            return (
              <Card key={alert.id} className={`${style.bgColor} ${style.borderColor} bg-background`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 flex-1">
                      {style.icon}
                      <div>
                        <CardTitle className="text-base font-semibold text-balance">{alert.title}</CardTitle>
                        <p className="text-xs text-muted-foreground mt-0.5">{alert.titleHi}</p>
                      </div>
                    </div>
                    <Badge variant={style.badgeVariant} className="text-xs">
                      {style.label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{alert.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{alert.time}</span>
                  </div>
                  <p className="text-sm text-foreground pt-1">{alert.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
