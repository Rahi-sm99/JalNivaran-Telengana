import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"

export type UserRole = "admin" | "volunteer" | "guest" | null

// --- The one and only admin ---
const AUTHORIZED_ADMIN = "spandanmondal15@gmail.com"
// ------------------------------

export type DeniedReason =
    | "volunteer_tried_admin"   // a volunteer clicked "Admin Login"
    | "not_approved_volunteer"  // unknown email clicked "Volunteer Login"
    | "not_admin"               // unknown email clicked "Admin Login"
    | null

export function useRole() {
    const [role, setRole] = useState<UserRole>(null)
    const [user, setUser] = useState<any>(null)
    const [volunteerData, setVolunteerData] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [accessDenied, setAccessDenied] = useState(false)
    const [deniedEmail, setDeniedEmail] = useState<string | null>(null)
    const [deniedReason, setDeniedReason] = useState<DeniedReason>(null)

    const checkRole = async () => {
        setLoading(true)
        setAccessDenied(false)
        setDeniedEmail(null)
        setDeniedReason(null)

        try {
            const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()

            // No session: check for guest in localStorage
            if (authError || !authUser) {
                const guest = localStorage.getItem("jal-nivaran-guest")
                if (guest) {
                    setUser(JSON.parse(guest))
                    setRole("guest")
                } else {
                    setUser(null)
                    setRole(null)
                }
                setLoading(false)
                return
            }

            const userEmail = authUser.email?.toLowerCase() ?? ""
            const pendingRole = localStorage.getItem("pending-role") as "admin" | "volunteer" | null
            setUser(authUser)

            // 1. Admin check
            if (userEmail === AUTHORIZED_ADMIN.toLowerCase()) {
                if (pendingRole === "volunteer") {
                    // Admin clicked "Volunteer Login" by mistake — still give them admin
                    setRole("admin")
                    localStorage.removeItem("pending-role")
                    setLoading(false)
                    return
                }
                setRole("admin")
                localStorage.removeItem("pending-role")
                setLoading(false)
                return
            }

            // 2. Approved volunteer check
            const { data: volunteer } = await supabase
                .from('volunteers_list')
                .select('*')
                .eq('email', userEmail)
                .maybeSingle()

            if (volunteer) {
                if (pendingRole === "admin") {
                    // Volunteer tried to log in as Admin → DENY
                    setAccessDenied(true)
                    setDeniedEmail(userEmail)
                    setDeniedReason("volunteer_tried_admin")
                    setRole(null)
                    setUser(null)
                    localStorage.removeItem("pending-role")
                    await supabase.auth.signOut()
                    setLoading(false)
                    return
                }
                // Correct: Volunteer Login
                setRole("volunteer")
                setVolunteerData(volunteer)
                localStorage.removeItem("pending-role")
                setLoading(false)
                return
            }

            // 3. Neither admin nor approved volunteer → DENY
            setAccessDenied(true)
            setDeniedEmail(userEmail)
            setDeniedReason(pendingRole === "admin" ? "not_admin" : "not_approved_volunteer")
            setRole(null)
            setUser(null)
            localStorage.removeItem("pending-role")
            await supabase.auth.signOut()

        } catch (err: any) {
            console.error("Critical Auth Error:", err.message)
            setRole(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        checkRole()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                checkRole()
            } else if (event === 'SIGNED_OUT') {
                const guest = localStorage.getItem("jal-nivaran-guest")
                setRole(guest ? "guest" : null)
                setUser(guest ? JSON.parse(guest) : null)
                setLoading(false)
            }
        })

        return () => { subscription.unsubscribe() }
    }, [])

    return { role, user, volunteerData, loading, accessDenied, deniedEmail, deniedReason, refreshRole: checkRole }
}
