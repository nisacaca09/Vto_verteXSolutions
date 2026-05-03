import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-[var(--vto-border)] bg-[var(--vto-bg-card)]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative h-9 w-9 overflow-hidden rounded-lg">
                <Image
                  src="/VTO_logo.svg"
                  alt="VTO Logo"
                  fill
                  className="object-contain"
                />
              </div>

              <div>
                <span className="font-sans text-lg font-bold tracking-wider text-white">
                  VTO
                </span>
                <span className="ml-1 text-[10px] font-mono text-[var(--vto-text-muted)]">
                  verTexsOlution
                </span>
              </div>
            </div>

            <p className="text-xs leading-relaxed font-mono text-[var(--vto-text-dim)]">
              Solusi teknologi inovatif untuk transformasi digital bisnis Anda.
              Partner terpercaya dalam pengembangan software enterprise.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 font-sans text-sm font-semibold text-white">
              Services
            </h4>
            <ul className="space-y-2.5">
              {[
                "Full Stack Development",
                "Android Development",
                "DevOps Solutions",
                "UI/UX Design",
                "IT Consulting",
              ].map((s) => (
                <li key={s}>
                  <Link
                    href="/services"
                    className="text-xs font-mono text-[var(--vto-text-dim)] transition-colors hover:text-[var(--vto-primary)]"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 font-sans text-sm font-semibold text-white">
              Company
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "About Us", href: "/about" },
                { label: "Portfolio", href: "/portfolio" },
                { label: "Careers", href: "#" },
                { label: "Blog", href: "#" },
                { label: "Contact", href: "/contact" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-xs font-mono text-[var(--vto-text-dim)] transition-colors hover:text-[var(--vto-primary)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-sans text-sm font-semibold text-white">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-xs font-mono text-[var(--vto-text-dim)]">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--vto-primary)]" />
                <span>Jl. Sudirman No. 123, Jakarta Selatan, Indonesia 12190</span>
              </li>

              <li className="flex items-center gap-2 text-xs font-mono text-[var(--vto-text-dim)]">
                <Phone className="h-4 w-4 shrink-0 text-[var(--vto-primary)]" />
                <span>+62 21-1234-5678</span>
              </li>

              <li className="flex items-center gap-2 text-xs font-mono text-[var(--vto-text-dim)]">
                <Mail className="h-4 w-4 shrink-0 text-[var(--vto-primary)]" />
                <span>hello@vertexsolution.id</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--vto-border)] pt-8 sm:flex-row">
          <p className="text-[10px] font-mono text-[var(--vto-text-dim)]">
            © 2026 VTO verTexsOlution. All rights reserved.
          </p>

          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((t) => (
              <a
                key={t}
                href="#"
                className="text-[10px] font-mono text-[var(--vto-text-dim)] transition-colors hover:text-[var(--vto-primary)]"
              >
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}