import { Navigation } from "@/components/navigation"
import { VolunteerDonate } from "@/components/volunteer-donate"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

export default function VolunteerPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <VolunteerDonate />
      <Footer />
      <Toaster />
    </div>
  )
}
