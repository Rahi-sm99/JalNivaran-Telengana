import { Navigation } from "@/components/navigation"
import { RealTimeAlerts } from "@/components/real-time-alerts"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

export default function AlertsPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <RealTimeAlerts />
      <Footer />
      <Toaster />
    </div>
  )
}
