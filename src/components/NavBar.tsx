'use client'
import Link from 'next/link'

export default function NavBar(){
  return (
    <div className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 border-b border-white/40">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-accent/90"></div>
          <span className="font-semibold tracking-tight">Taxi Peterborough</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-slate-600">
          <Link href="/airports" className="hover:text-slate-900 transition">Airports</Link>
          <Link href="/pricing" className="hover:text-slate-900 transition">Pricing</Link>
          <Link href="/business-accounts" className="hover:text-slate-900 transition">Business</Link>
          <Link href="/contact" className="hover:text-slate-900 transition">Contact</Link>
        </nav>
        <Link
          href="#quote"
          className="inline-flex items-center rounded-full bg-slate-900 px-5 py-2.5 text-white text-sm font-medium shadow-elevate hover:translate-y-[-1px] transition"
        >
          Get an Instant Quote
        </Link>
      </div>
    </div>
  )
}