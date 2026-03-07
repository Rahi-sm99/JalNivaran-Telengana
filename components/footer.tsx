import { Droplets } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Droplets className="h-6 w-6" />
              <div>
                <p className="font-bold text-lg">Jal-Nivaran</p>
                <p className="text-xs opacity-90">జల్-నివారణ</p>
              </div>
            </div>
            <p className="text-sm opacity-90 leading-relaxed">
              Official Telangana portal for real-time weather risk and water-logging monitoring.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>
                <Link href="#home" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#alerts" className="hover:underline">
                  Alerts
                </Link>
              </li>
              <li>
                <Link href="#hotspots" className="hover:underline">
                  Hotspots
                </Link>
              </li>
              <li>
                <Link href="#emergency" className="hover:underline">
                  Emergency
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-3">Contact</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>Emergency: 112</li>
              <li>Telangana Jal Shakti: 1800-425-5505</li>
              <li>Telangana SDMA: 1070 / 1077</li>
              <li>Email: support@jalnivaran.ts.gov.in</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-6 text-center text-sm opacity-90">
          <p>© 2025 Jal-Nivaran - Telangana Government. All rights reserved.</p>
          <p className="mt-1 text-xs">Built with ❤️ for the citizens of Telangana</p>
        </div>
      </div>
    </footer>
  )
}
