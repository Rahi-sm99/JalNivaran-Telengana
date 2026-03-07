"use client"

import { useState } from "react"
import { Menu, X, Bell, AlertTriangle, UserCircle, ShieldCheck, UserPlus, LogOut } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { useRole } from "@/hooks/use-role"

export function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [showAlerts, setShowAlerts] = useState(false)
  const [showLoginMenu, setShowLoginMenu] = useState(false)
  const [showGuestModal, setShowGuestModal] = useState(false)
  const [guestData, setGuestData] = useState({ name: '', phone: '', email: '' })
  const [isSavingGuest, setIsSavingGuest] = useState(false)
  const { role, user, accessDenied, deniedEmail, deniedReason, loading } = useRole()

  const handleLogin = async (loginRole: 'admin' | 'volunteer') => {
    localStorage.setItem('pending-role', loginRole)
    const redirectUrl = typeof window !== 'undefined'
      ? `${window.location.origin}/auth/callback`
      : '/auth/callback'
    try {
      const { error: loginError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: redirectUrl }
      })
      if (loginError) throw loginError
    } catch (error: any) {
      console.error('Login error:', error.message)
      alert('Login failed: ' + error.message)
    }
  }

  const handleGuestLogin = async () => {
    if (!guestData.name.trim() || !guestData.phone.trim()) return
    setIsSavingGuest(true)
    try {
      // Save to localStorage for display
      localStorage.setItem('jal-nivaran-guest', JSON.stringify(guestData))
      // Save to Supabase guest_users table
      await supabase.from('guest_users').insert([{
        email: guestData.email.trim() || null,
        phone: guestData.phone.trim()
      }])
    } catch (err) {
      // Don't block guest access if Supabase insert fails
      console.error('Guest save error:', err)
    } finally {
      setIsSavingGuest(false)
      setShowGuestModal(false)
      setShowLoginMenu(false)
      window.location.reload()
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    localStorage.removeItem('pending-role')
    localStorage.removeItem('jal-nivaran-guest')
    setShowLoginMenu(false)
    window.location.href = "/"
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/alerts", label: "Real-time alerts" },
    { href: "/hotspots", label: "Hotspots & AI" },
    { href: "/emergency", label: "Emergency Resources" },
    { href: "/report", label: "Report Issues" },
    {
      href: "/volunteer",
      label: (role === "admin" || role === "volunteer") ? "Donate" : "Volunteer and Donate"
    },
    { href: "/news", label: "News Feed" },
    {
      href: "/how-we-work",
      label: role === "admin" ? "Volunteer List" :
        role === "volunteer" ? "Assignments" : "How We Work"
    },
  ]

  const emergencyAlerts = [
    { id: 1, title: "Severe Waterlogging", location: "Musi River, Hyderabad", time: "10 mins ago" },
    { id: 2, title: "Flash Flood Warning", location: "Khammam District", time: "25 mins ago" },
    { id: 3, title: "Flood Warning", location: "Godavari, Adilabad", time: "1 hour ago" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      {/* Top Blue decorative line */}
      <div className="h-1 w-full bg-[#87A2FF]"></div>

      <div className="container mx-auto px-4 py-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center shrink-0 mr-6 group">
              <div className="flex items-center gap-4">
                <div className="relative h-24 w-24 shrink-0">
                  <Image
                    src="/images/logo.png.png"
                    alt="Jal Nivaran Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="flex flex-col justify-center border-l-2 border-gray-100 pl-4">
                  <span className="text-gray-500 font-black text-base lg:text-lg leading-tight transition-colors mb-1">
                    Jal Nivaran ( జల్ నివారణ )
                  </span>
                  <div className="flex flex-col text-[#008BB2] font-normal text-[13px] lg:text-[14px] leading-tight mt-0.5">
                    <span>A Telangana Government Initiative</span>
                    <span className="text-[10px] text-gray-400 mt-0.5">తెలంగాణ ప్రభుత్వ చొరవ</span>
                  </div>
                </div>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-4 xl:gap-6 mr-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-[15px] font-medium transition-colors whitespace-nowrap ${isActive
                      ? "text-[#006E8C] font-bold border-b-2 border-[#008BB2]"
                      : "text-[#008BB2] hover:text-[#006E8C]"
                      }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Authentication Section */}
            <div className="relative">
              <button
                onClick={() => setShowLoginMenu(!showLoginMenu)}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-all group"
                aria-label="User Account"
              >
                <div className={`${user && !user.isGuest ? "bg-blue-50" : ""} p-1 rounded-full transition-colors`}>
                  <UserCircle
                    className={`h-8 w-8 transition-colors ${user && !user.isGuest
                      ? "text-blue-600"
                      : "text-gray-700 group-hover:text-primary"
                      }`}
                  />
                </div>
              </button>

              {showLoginMenu && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl border border-blue-100 py-3 z-[60] animate-in fade-in zoom-in duration-200">
                  {user ? (
                    <div className="space-y-1">
                      <div className="px-4 py-3 border-b border-gray-50 mb-2 bg-gray-50/50 rounded-t-xl">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="bg-primary/20 p-2 rounded-full">
                            <UserCircle className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex flex-col overflow-hidden">
                            <p className="text-sm font-bold text-gray-900 truncate">
                              {user.user_metadata?.full_name || user.email?.split("@")[0] || "Guest User"}
                            </p>
                            <p className="text-[10px] font-medium text-gray-500 truncate">{user.email || "Guest Access"}</p>
                          </div>
                        </div>
                        <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">
                          {role === "guest" ? "Guest" : role === "admin" ? "Admin" : role === "volunteer" ? "Volunteer" : "Authorized"}
                        </div>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <div className="px-4 py-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Sign In</div>
                      <button
                        onClick={() => handleLogin("admin")}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 transition-colors border-l-4 border-transparent hover:border-blue-500"
                      >
                        <ShieldCheck className="h-4 w-4 text-blue-600" />
                        Admin Login
                      </button>
                      <button
                        onClick={() => handleLogin("volunteer")}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-primary/10 transition-colors border-l-4 border-transparent hover:border-primary"
                      >
                        <UserCircle className="h-4 w-4 text-primary" />
                        Volunteer Login
                      </button>
                      <button
                        onClick={() => { setShowGuestModal(true); setShowLoginMenu(false) }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-green-50 transition-colors border-l-4 border-transparent hover:border-green-500"
                      >
                        <UserPlus className="h-4 w-4 text-green-600" />
                        Continue as Guest
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Guest Login Modal */}
            {showGuestModal && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in duration-300">
                  <div className="bg-green-50 p-6 text-center border-b border-green-100">
                    <div className="h-14 w-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                      <UserPlus className="h-7 w-7 text-green-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Continue as Guest</h2>
                    <p className="text-xs text-gray-500 mt-1">Enter your basic info to proceed</p>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                        placeholder="Your name"
                        value={guestData.name}
                        onChange={(e) => setGuestData({ ...guestData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
                      <input
                        type="tel"
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                        placeholder="+91 XXXXX XXXXX"
                        value={guestData.phone}
                        onChange={(e) => setGuestData({ ...guestData, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Email <span className="text-gray-400 font-normal text-xs">(optional)</span></label>
                      <input
                        type="email"
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
                        placeholder="your@email.com"
                        value={guestData.email}
                        onChange={(e) => setGuestData({ ...guestData, email: e.target.value })}
                      />
                    </div>
                    <div className="flex gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => setShowGuestModal(false)}
                        className="flex-1 px-4 py-2.5 rounded-xl font-bold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleGuestLogin}
                        disabled={!guestData.name.trim() || !guestData.phone.trim() || isSavingGuest}
                        className="flex-1 px-4 py-2.5 rounded-xl font-bold bg-green-600 text-white hover:bg-green-700 transition-all text-sm disabled:opacity-50"
                      >
                        {isSavingGuest ? 'Saving...' : 'Enter as Guest'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Access Denied Modal */}
            {accessDenied && (() => {
              const isVolunteerTryingAdmin = deniedReason === 'volunteer_tried_admin'
              const isNotApprovedVolunteer = deniedReason === 'not_approved_volunteer'
              return (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                  <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in duration-300">
                    <div className="bg-red-50 p-6 text-center border-b border-red-100">
                      <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
                        <X className="h-8 w-8 text-red-600" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
                      <p className="text-sm text-gray-500 mt-1">{deniedEmail}</p>
                    </div>
                    <div className="p-6 space-y-4">
                      {isVolunteerTryingAdmin && (
                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
                          <p className="text-sm font-bold text-blue-800 mb-1">You are a Volunteer, not an Admin</p>
                          <p className="text-xs text-blue-600">Your account has Volunteer access. Please use <strong>Volunteer Login</strong> instead.</p>
                        </div>
                      )}
                      {isNotApprovedVolunteer && (
                        <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 text-center">
                          <p className="text-sm font-bold text-orange-800 mb-1">Not an Approved Volunteer</p>
                          <p className="text-xs text-orange-600">Your email is not on the approved volunteer list. Please submit a volunteer application on the site and wait for admin approval.</p>
                        </div>
                      )}
                      {!isVolunteerTryingAdmin && !isNotApprovedVolunteer && (
                        <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                          <p className="text-sm font-bold text-gray-800 mb-1">Not Authorized as Admin</p>
                          <p className="text-xs text-gray-600">This account does not have admin privileges. Contact <strong>spandanmondal15@gmail.com</strong> if you believe this is an error.</p>
                        </div>
                      )}
                      <button
                        onClick={() => { window.location.href = "/" }}
                        className="w-full px-4 py-3 rounded-xl font-bold bg-gray-900 text-white hover:bg-gray-700 transition-all"
                      >
                        Go Back to Home
                      </button>
                    </div>
                  </div>
                </div>
              )
            })()}

            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-3 text-lg transition-colors rounded ${isActive
                      ? "text-[#006E8C] font-black bg-gray-50 border-l-4 border-[#008BB2]"
                      : "text-[#008BB2] font-bold hover:bg-gray-50"
                      }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
