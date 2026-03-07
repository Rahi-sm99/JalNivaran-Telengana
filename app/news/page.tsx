import { Navigation } from "@/components/navigation"
import { NewsSection } from "@/components/news-section"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

export default function NewsPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <NewsSection />
      <Footer />
      <Toaster />
    </div>
  )
}
