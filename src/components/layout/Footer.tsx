import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="py-6 md:px-8 md:py-0 bg-brand/50 backdrop-blur-sm border-t border-white/10">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-white/60 md:text-left">
          © {new Date().getFullYear()} Taxi Peterborough. All rights reserved.
          <br />
          29 Ivatt Way, Peterborough, PE3 7PH
        </p>
        <div className="flex items-center gap-4 text-sm text-white/60">
          <Link href="/terms" className="hover:text-white/90">Terms</Link>
          <Link href="/privacy" className="hover:text-white/90">Privacy</Link>
          <Link href="/refunds" className="hover:text-white/90">Refunds</Link>
        </div>
      </div>
    </footer>
  )
}
