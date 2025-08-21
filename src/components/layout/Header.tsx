import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold sm:inline-block">
              Taxi Peterborough
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/airports" className="text-foreground/60 transition-colors hover:text-foreground/80">
              Airports
            </Link>
            <Link href="/pricing" className="text-foreground/60 transition-colors hover:text-foreground/80">
              Pricing
            </Link>
            <Link href="/business-accounts" className="text-foreground/60 transition-colors hover:text-foreground/80">
              Business
            </Link>
            <Link href="/contact" className="text-foreground/60 transition-colors hover:text-foreground/80">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
