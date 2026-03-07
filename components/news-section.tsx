"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { newsWithImages } from "@/lib/data"

export function NewsSection() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary mb-2">Latest News & Updates</h2>
          <p className="text-muted-foreground">తాజా వార్తలు మరియు అప్డేట్లు</p>
          <p className="text-sm text-muted-foreground mt-2">Stay informed about water-logging management initiatives</p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsWithImages.map((news) => (
            <Card key={news.id} className="hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative h-48 w-full">
                <Image src={news.image || "/placeholder.svg"} alt={news.title} fill className="object-cover" />
              </div>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-base leading-snug mb-1 text-balance">{news.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">{news.titleHi}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <Calendar className="h-3 w-3" />
                  <span>{news.date}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{news.excerpt}</p>
                <Button variant="ghost" size="sm" className="w-full justify-between">
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
