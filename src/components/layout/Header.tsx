import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-brand/95 backdrop-blur supports-[backdrop-filter]:bg-brand/80">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-display font-bold text-white sm:inline-block">
              Taxi Peterborough
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/airports" className="text-white/60 transition-colors hover:text-white/90">
              Airports
            </Link>
            <Link href="/pricing" className="text-white/60 transition-colors hover:text-white/90">
              Pricing
            </Link>
            <Link href="/business-accounts" className="text-white/60 transition-colors hover:text-white/90">
              Business
            </Link>
            <Link href="/contact" className="text-white/60 transition-colors hover:text-white/90">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
