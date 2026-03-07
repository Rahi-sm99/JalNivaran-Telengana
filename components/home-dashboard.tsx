"use client"

import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, Users, Phone, MapPin, CloudRain, Info, Heart } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRole } from "@/hooks/use-role"

export function HomeDashboard() {
  const { role } = useRole()
  const isRestricted = role === "admin" || role === "volunteer"

  return (
    <div className="min-h-screen bg-background">
      <section className="relative min-h-[400px] md:min-h-[480px] overflow-hidden flex items-center">
        <div
          className="absolute inset-0 z-0 bg-black/40 shadow-inner"
          style={{
            backgroundImage: "url('/hero-home.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundBlendMode: "overlay",
          }}
        />
        <div className="absolute inset-0 z-0 bg-black/20" />

        <div className="container mx-auto px-4 relative z-10 py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-3xl pl-4 md:pl-8">
              <h1 className="text-xl md:text-3xl font-light mb-1 text-white drop-shadow-lg leading-tight tracking-tight">
                Water-logging Management & Response System
              </h1>
              <p className="text-lg md:text-xl font-normal text-white/70 mb-4 tracking-tight">
                జల-జమావు నిర్వహణ మరియు ప్రతిస్పందన వ్యవస్థ
              </p>
              <p className="text-base md:text-lg mb-2 text-white/50 font-medium tracking-[0.1em] uppercase">
                TELANGANA JAL NIVARAN PORTAL
              </p>
              <p className="text-xs md:text-sm text-white/40 mb-6 font-normal uppercase tracking-widest">
                జల-జమావు నిర్వహణ మరియు ప్రతిస్పందన వ్యవస్థ్టల్
              </p>
              <p className="text-base md:text-lg mb-10 text-white/90 drop-shadow-sm max-w-lg font-normal leading-relaxed">
                Real-time alerts, resources, and coordination for effective water-logging and flood response across
                Telangana.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/report">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="font-bold text-sm md:text-base px-8 py-6 rounded-xl shadow-xl hover:scale-105 transition-all bg-white text-[#0A2540] hover:bg-gray-100"
                  >
                    Report Water-logging
                  </Button>
                </Link>
                <Link href="/emergency">
                  <Button
                    variant="outline"
                    size="lg"
                    className="bg-transparent backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-[#0A2540] font-bold text-sm md:text-base px-8 py-6 rounded-xl shadow-xl hover:scale-105 transition-all"
                  >
                    Emergency Resources
                  </Button>
                </Link>
              </div>
            </div>

            {/* Minimal Live Alert Bar */}
            <div className="hidden lg:block w-full max-w-md self-end mb-4">
              <div className="bg-black/40 backdrop-blur-md rounded-full px-5 py-3 border border-white/10 flex items-center gap-4 shadow-2xl animate-in fade-in slide-in-from-right duration-700">
                <div className="flex items-center gap-2 shrink-0 border-r border-white/20 pr-4">
                  <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-white font-black text-[10px] tracking-widest uppercase">LIVE</span>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-bold truncate">
                    Flood Warning: Musi river level HIGH - Hyderabad zones on alert
                  </p>
                </div>

                <Link href="/alerts" className="shrink-0">
                  <div className="bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-colors order-last">
                    <Info className="h-3.5 w-3.5 text-white" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-normal mb-1 text-gray-900 tracking-tight">Quick Actions</h2>
            <p className="text-xl md:text-2xl font-normal text-gray-400 mb-4 tracking-tight">వేగవంతమైన చర్యలు</p>
            <p className="text-base text-blue-600 font-normal mb-4 tracking-widest uppercase">FAST RESPONSE</p>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full mb-8"></div>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto font-light">
              Report incidents, access emergency services, and contribute to community safety through our unified response portal.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Link href="/report">
              <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer h-full border-0 bg-white shadow-sm hover:-translate-y-2 group">
                <CardContent className="pt-10 pb-8 px-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-red-50 rounded-2xl p-5 mb-6 group-hover:bg-red-100 transition-colors">
                      <AlertTriangle className="h-10 w-10 text-red-600" />
                    </div>
                    <h3 className="text-2xl font-normal mb-1 text-gray-900 tracking-tight">Report Water-logging</h3>
                    <p className="text-xs font-medium text-red-600 mb-4 tracking-wide uppercase">జల-జమావు నివేదిక (Report Case)</p>
                    <p className="text-base text-gray-600 mb-6 leading-relaxed">
                      Report water accumulation in your area instantly. Help authorities respond quickly to flooding.
                    </p>
                    <div className="inline-flex items-center text-xs font-medium text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full">
                      Avg. Response: 15m
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/emergency">
              <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer h-full border-0 bg-white shadow-sm hover:-translate-y-2 group">
                <CardContent className="pt-10 pb-8 px-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-blue-50 rounded-2xl p-5 mb-6 group-hover:bg-blue-100 transition-colors">
                      <Phone className="h-10 w-10 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-normal mb-1 text-gray-900 tracking-tight">Emergency Helpline</h3>
                    <p className="text-xs font-medium text-blue-600 mb-4 tracking-wide uppercase">అత్యవసర సహాయ హ ెల్పులైన్ (Emergency Line)</p>
                    <p className="text-base text-gray-600 mb-6 leading-relaxed">
                      Access 24/7 emergency support, medical assistance, and rescue services.
                    </p>
                    <div className="space-y-3 w-full">
                      <div className="flex items-center justify-center gap-3 text-lg font-normal text-blue-700 bg-blue-50 py-3 rounded-xl border border-blue-100 shadow-inner">
                        <Phone className="h-5 w-5" />
                        <span>1800-180-5522</span>
                      </div>
                      <div className="text-xs font-medium text-gray-400 uppercase tracking-widest">Telangana State Disaster Management Authority - 24/7 Support</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/volunteer">
              <Card className="hover:shadow-2xl transition-all duration-300 cursor-pointer h-full border-0 bg-white shadow-sm hover:-translate-y-2 group">
                <CardContent className="pt-10 pb-8 px-8">
                  <div className="flex flex-col items-center text-center">
                    <div className={`${isRestricted ? 'bg-pink-50' : 'bg-green-50'} rounded-2xl p-5 mb-6 group-hover:${isRestricted ? 'bg-pink-100' : 'bg-green-100'} transition-colors`}>
                      {isRestricted ? <Heart className="h-10 w-10 text-pink-600" /> : <Users className="h-10 w-10 text-green-600" />}
                    </div>
                    <h3 className="text-2xl font-normal mb-1 text-gray-900 tracking-tight">
                      {isRestricted ? "Donate Support" : "Join Jal-Mitra"}
                    </h3>
                    <p className={`text-xs font-medium ${isRestricted ? 'text-pink-600' : 'text-green-600'} mb-4 tracking-wide uppercase`}>
                      {isRestricted ? "దానం చేయండి (Support with Donation)" : "జల-మిత్ర అవ్వండి (Become a Volunteer)"}
                    </p>
                    <p className="text-base text-gray-600 mb-6 leading-relaxed">
                      {isRestricted
                        ? "Support our mission and help the community by making a secure donation."
                        : "Become a volunteer or support relief efforts with donations and community service."}
                    </p>
                    <div className="space-y-3 w-full">
                      <div className={`flex items-center justify-center gap-3 text-lg font-normal ${isRestricted ? 'text-pink-700 bg-pink-50 border-pink-100' : 'text-green-700 bg-green-50 border-green-100'} py-3 rounded-xl border shadow-inner`}>
                        <Phone className="h-5 w-5" />
                        <span>1800-11-8181</span>
                      </div>
                      <div className="text-xs font-medium text-gray-400 uppercase tracking-widest">Telangana State Disaster Management Authority - Disaster Support</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          <Card className="bg-[#0A2540] text-white border-0 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <CardContent className="py-8 px-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex items-center gap-4 shrink-0">
                  <div className="bg-white/10 rounded-xl p-3">
                    <Info className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-normal tracking-tight leading-none">Emergency Contacts</h3>
                    <p className="text-[10px] font-medium text-white/50 uppercase tracking-[0.2em] mt-2">అత్యవసర సంపర్కాలు</p>
                  </div>
                </div>
                <div className="h-px md:h-12 w-full md:w-px bg-white/10"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1 w-full">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-normal text-white/40 uppercase tracking-widest mb-1">Police</span>
                    <span className="text-2xl font-normal">100</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-normal text-white/40 uppercase tracking-widest mb-1">Fire</span>
                    <span className="text-2xl font-normal">101</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-normal text-white/40 uppercase tracking-widest mb-1">Ambulance</span>
                    <span className="text-2xl font-normal">102</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-all">
              <CardContent className="pt-8 pb-6 px-6">
                <div className="flex items-start gap-4">
                  <div className="bg-cyan-50 rounded-xl p-4 border border-cyan-100">
                    <MapPin className="h-8 w-8 text-cyan-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-normal mb-1 text-gray-900 tracking-tight">Check Area Status</h3>
                    <p className="text-xs font-medium text-cyan-600 mb-3 tracking-wide uppercase">మీ ప్రాంతం స్థితి</p>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      View real-time weather risks and hotspots on our interactive Telangana map with live updates.
                    </p>
                    <Link href="/hotspots">
                      <Button variant="link" className="p-0 h-auto text-cyan-700 font-medium text-xs uppercase tracking-widest">
                        View Hotspot Map →
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-all">
              <CardContent className="pt-8 pb-6 px-6">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                    <CloudRain className="h-8 w-8 text-orange-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-normal mb-1 text-gray-900 tracking-tight">Weather Forecast</h3>
                    <p className="text-xs font-medium text-orange-600 mb-3 tracking-wide uppercase">వాతావరణ ముందస్తు అంచనా</p>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      Heavy rainfall and flood warnings for Telangana. Stay informed with latest Telangana State Disaster Management Authority alerts.
                    </p>
                    <Link href="/alerts">
                      <Button variant="link" className="p-0 h-auto text-orange-700 font-medium text-xs uppercase tracking-widest">
                        View Weather Alerts →
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
