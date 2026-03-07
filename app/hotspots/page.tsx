import { Navigation } from "@/components/navigation"
import { HotspotsAnalytics } from "@/components/hotspots-analytics"
import { FloatingAIChatbot } from "@/components/floating-ai-chatbot"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

export default function HotspotsPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HotspotsAnalytics />
      <FloatingAIChatbot />
      <Footer />
      <Toaster />
    </div>
  )
}
