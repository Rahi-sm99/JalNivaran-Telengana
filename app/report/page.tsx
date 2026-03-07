import { Navigation } from "@/components/navigation"
import { ReportArea } from "@/components/report-area"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

export default function ReportPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <ReportArea />
      <Footer />
      <Toaster />
    </div>
  )
}
