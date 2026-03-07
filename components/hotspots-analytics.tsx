"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { waterLoggingData2025, getAverageRainfallData, monthNames } from "@/lib/data"
import Image from "next/image"
import { X } from "lucide-react"

export function HotspotsAnalytics() {
  const [selectedMonth, setSelectedMonth] = useState("Jul")
  const [selectedArea, setSelectedArea] = useState<number | null>(null)

  const getVerdictColor = (verdict: "high" | "mid" | "low") => {
    switch (verdict) {
      case "high":
        return "bg-red-500"
      case "mid":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
    }
  }

  const getVerdictText = (verdict: "high" | "mid" | "low") => {
    switch (verdict) {
      case "high":
        return { en: "High Risk", te: "అధిక ప్రమాదం", color: "text-red-600" }
      case "mid":
        return { en: "Moderate", te: "మధ్యస్థం", color: "text-yellow-600" }
      case "low":
        return { en: "Low Risk", te: "తక్కువ ప్రమాదం", color: "text-green-600" }
    }
  }

  const monthIndex = monthNames.indexOf(selectedMonth)
  const avgRainfallData = getAverageRainfallData()

  // Precise positions for each Telangana district on the map image.
  // The map image has:
  //   - Adilabad at top-centre
  //   - Nirmal top-right of Adilabad
  //   - Karimnagar upper-right
  //   - Warangal middle-right
  //   - Bhadradri-Kothagudem far right
  //   - Khammam lower-right
  //   - Nalgonda lower-centre
  //   - Mahbubnagar lower-left
  //   - Rangareddy left of centre-bottom
  //   - Hyderabad centre
  //   - Medchal-Malkajgiri just north of Hyderabad
  //   - Sangareddy / Nizamabad north-west
  // These percentages are calibrated against the reference Telangana map image.
  const districtPositions = [
    { x: "40%", y: "56%" },  // 0: Hyderabad – heart of the state, centre
    { x: "31%", y: "65%" },  // 1: Rangareddy – south-west of Hyderabad
    { x: "44%", y: "47%" },  // 2: Medchal-Malkajgiri – north of Hyderabad
    { x: "24%", y: "43%" },  // 3: Sangareddy – north-west
    { x: "28%", y: "27%" },  // 4: Nizamabad – far north-west
    { x: "57%", y: "25%" },  // 5: Karimnagar – north-east
    { x: "67%", y: "45%" },  // 6: Warangal – east-centre
    { x: "73%", y: "64%" },  // 7: Khammam – south-east
    { x: "55%", y: "68%" },  // 8: Nalgonda – south-centre
    { x: "23%", y: "76%" },  // 9: Mahbubnagar – south-west
    { x: "38%", y: "10%" },  // 10: Adilabad – far north
    { x: "52%", y: "16%" },  // 11: Nirmal – north (east of Adilabad)
  ]

  return (
    <section id="hotspots" className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary mb-1">Hotspots &amp; Analytics</h2>
          <p className="text-xl font-normal text-muted-foreground mb-4">హాట్‌స్పాట్‌లు మరియు విశ్లేషణ</p>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-8"></div>
          <p className="text-sm text-muted-foreground mt-2">
            2025 Water-logging Data &amp; Predictions | 2025 జల-జమావు డేటా
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-start">
          {/* Interactive Map */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-bold">
                Telangana Risk Map
                <span className="text-[10px] text-muted-foreground ml-2">
                  (తెలంగాణ రిస్క్ మ్యాప్)
                </span>
              </CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-muted-foreground">నెల ఎంచుకోండి:</span>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {monthNames.map((month) => (
                      <SelectItem key={month} value={month}>
                        {month} 2025
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative bg-muted/30 rounded-lg overflow-hidden" style={{ paddingBottom: "82%" }}>
                {/* Telangana Map Image Background */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/images/telangana-map.png"
                    alt="Telangana District Map"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* District markers precisely placed over actual map locations */}
                <div className="absolute inset-0 z-20">
                  {waterLoggingData2025.map((area, idx) => {
                    if (idx >= districtPositions.length) return null
                    const pos = districtPositions[idx]
                    const verdict = area.months[monthIndex].verdict
                    const bgColor =
                      verdict === "high" ? "bg-red-500" : verdict === "mid" ? "bg-yellow-500" : "bg-green-500"
                    const ringColor =
                      verdict === "high" ? "bg-red-500" : verdict === "mid" ? "bg-yellow-500" : "bg-green-500"

                    return (
                      <div
                        key={area.area}
                        className="absolute cursor-pointer z-10 transition-transform hover:scale-125"
                        style={{ left: pos.x, top: pos.y, transform: "translate(-50%, -50%)" }}
                        onClick={() => setSelectedArea(idx)}
                        title={area.area}
                      >
                        <div className={`w-5 h-5 rounded-full ${bgColor} shadow-lg border-2 border-white`} />
                        <div className={`absolute inset-0 w-5 h-5 rounded-full ${ringColor} opacity-40 animate-ping`} />
                        <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-black/70 text-white text-[8px] px-1 py-0.5 rounded whitespace-nowrap pointer-events-none">
                          {area.area}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {selectedArea !== null && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 animate-in fade-in zoom-in slide-in-from-bottom-4 duration-300">
                    <div className="bg-gradient-to-br from-white to-primary/5 border-2 border-primary rounded-xl shadow-2xl p-6 min-w-[280px] backdrop-blur-sm">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-xl text-primary">{waterLoggingData2025[selectedArea].area}</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {waterLoggingData2025[selectedArea].areaHi}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedArea(null)
                          }}
                          className="p-1.5 hover:bg-primary/10 rounded-full transition-colors"
                        >
                          <X className="w-5 h-5 text-muted-foreground hover:text-primary" />
                        </button>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center py-2 border-b border-border/50">
                          <span className="text-sm font-medium text-muted-foreground">నెల:</span>
                          <span className="text-sm font-semibold">{selectedMonth} 2025</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-border/50">
                          <span className="text-sm font-medium text-muted-foreground">వర్షపాతం:</span>
                          <span className="text-2xl font-bold text-primary">
                            {waterLoggingData2025[selectedArea].months[monthIndex].rainfall} mm
                          </span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-sm font-medium text-muted-foreground">ప్రమాద స్థాయి:</span>
                          <span
                            className={`text-base font-bold ${getVerdictText(waterLoggingData2025[selectedArea].months[monthIndex].verdict).color}`}
                          >
                            {getVerdictText(waterLoggingData2025[selectedArea].months[monthIndex].verdict).en}
                            {" "}({getVerdictText(waterLoggingData2025[selectedArea].months[monthIndex].verdict).te})
                          </span>
                        </div>
                        <div className="pt-3">
                          <div
                            className={`w-full h-3 rounded-full shadow-inner ${getVerdictColor(
                              waterLoggingData2025[selectedArea].months[monthIndex].verdict,
                            )}`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Legend */}
                <div className="absolute bottom-3 left-3 bg-white/90 p-3 rounded-lg shadow-lg border z-20">
                  <p className="text-xs font-semibold mb-2">ప్రమాద స్థాయి</p>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="text-xs">అధికం (High)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span className="text-xs">మధ్యస్థం (Moderate)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="text-xs">తక్కువ (Low)</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Area List for Selected Month */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{selectedMonth} 2025 - జిల్లా స్థితి (Area Status)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {waterLoggingData2025.map((area) => {
                  const monthData = area.months[monthIndex]
                  const verdictInfo = getVerdictText(monthData.verdict)

                  return (
                    <div key={area.area} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${getVerdictColor(monthData.verdict)}`} />
                        <div>
                          <p className="font-medium text-sm">{area.area}</p>
                          <p className="text-xs text-muted-foreground">{area.areaHi}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-semibold ${verdictInfo.color}`}>{verdictInfo.en} ({verdictInfo.te})</p>
                        <p className="text-xs text-muted-foreground">{monthData.rainfall}mm</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rainfall Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">సగటు వర్షపాతం vs నెల (2025) | Average Rainfall vs Month</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={avgRainfallData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis label={{ value: "Rainfall (mm)", angle: -90, position: "insideLeft" }} />
                <Tooltip />
                <Line type="monotone" dataKey="rainfall" stroke="oklch(0.3 0.08 240)" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
