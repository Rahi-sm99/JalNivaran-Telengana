import { Navigation } from "@/components/navigation"
import { HomeDashboard } from "@/components/home-dashboard"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

export default function Page() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HomeDashboard />
      <Footer />
      <Toaster />
    </div>
  )
}
