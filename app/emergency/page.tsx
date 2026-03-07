import { Navigation } from "@/components/navigation"
import { EmergencyResources } from "@/components/emergency-resources"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

export default function EmergencyPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <EmergencyResources />
      <Footer />
      <Toaster />
    </div>
  )
}
