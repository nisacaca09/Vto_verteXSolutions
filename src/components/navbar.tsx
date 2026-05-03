"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight, Monitor } from "lucide-react";
import { cn } from "../lib/utils";
import { SearchDialog, SearchTrigger } from "../components/search-dialog";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--vto-border)] bg-[var(--vto-bg)]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative h-9 w-9 overflow-hidden rounded-lg">
            <Image src="/VTO_logo.svg" alt="VTO Logo" fill className="object-contain"/>
            </div>
            <div>
              <span className="font-sans text-lg font-bold tracking-wider text-white">VTO</span>
              <span className="ml-1 hidden text-[10px] font-mono text-[var(--vto-text-muted)] sm:inline">verTexsOlution</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-xs font-mono tracking-wide transition-all duration-200 rounded-lg",
                  pathname === link.href
                    ? "text-[var(--vto-primary)] bg-[var(--vto-primary)]/10"
                    : "text-[var(--vto-text-muted)] hover:text-white hover:bg-[var(--vto-bg-elevated)]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <SearchTrigger onClick={() => setSearchOpen(true)} />
            <Link
              href="/login"
              className="hidden rounded-lg border border-[var(--vto-border)] px-4 py-2 text-xs font-mono text-[var(--vto-text-muted)] transition-all hover:border-[var(--vto-primary)] hover:text-white sm:block cursor-pointer"
            >
              Login
            </Link>
            <Link
              href="/contact"
              className="hidden rounded-lg bg-[var(--vto-cta)] px-4 py-2 text-xs font-mono font-semibold text-white transition-all hover:shadow-[0_0_20px_var(--vto-cta-glow)] sm:block cursor-pointer"
            >
              Get Started
              <ChevronRight className="ml-1 inline h-3 w-3" />
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg p-2 text-[var(--vto-text-muted)] transition-colors hover:bg-[var(--vto-bg-elevated)] md:hidden cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-[var(--vto-border)] bg-[var(--vto-bg)]/95 backdrop-blur-xl md:hidden">
          <div className="space-y-1 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block rounded-lg px-4 py-3 text-sm font-mono transition-all",
                  pathname === link.href
                    ? "text-[var(--vto-primary)] bg-[var(--vto-primary)]/10"
                    : "text-[var(--vto-text-muted)] hover:text-white hover:bg-[var(--vto-bg-elevated)]"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-3 border-t border-[var(--vto-border)]">
              <Link href="/login" onClick={() => setIsOpen(false)} className="flex-1 rounded-lg border border-[var(--vto-border)] px-4 py-2.5 text-center text-xs font-mono text-[var(--vto-text-muted)] cursor-pointer">Login</Link>
              <Link href="/contact" onClick={() => setIsOpen(false)} className="flex-1 rounded-lg bg-[var(--vto-cta)] px-4 py-2.5 text-center text-xs font-mono font-semibold text-white cursor-pointer">Get Started</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
    <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}





