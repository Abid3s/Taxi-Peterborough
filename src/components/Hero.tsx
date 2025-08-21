export default function Hero(){
  return (
    <section className="relative overflow-hidden">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-80 w-[32rem] -translate-x-1/2 rounded-full bg-white/20 blur-3xl" />
      </div>

      <div className="container relative grid gap-10 py-20 lg:grid-cols-2 lg:py-28">
        {/* Copy */}
        <div className="text-white">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs tracking-wide">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            SCA-secure payments · Licensed partners · 24/7
          </p>
          <h1 className="text-4xl/tight sm:text-5xl/tight font-bold drop-shadow">
            Airport Taxis from Peterborough — <span className="text-emerald-300">Fixed Fares</span>, 24/7
          </h1>
          <p className="mt-4 max-w-xl text-white/80">
            Instant quote. Secure online payment. Heathrow, Gatwick, Luton, Stansted, East Midlands & Birmingham.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#quote" className="rounded-full bg-white text-slate-900 px-6 py-3 text-sm font-semibold shadow-elevate hover:translate-y-[-1px] transition">
              Get an Instant Quote
            </a>
            <a href="/pricing" className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white/90 hover:bg-white/10 transition">
              View Pricing
            </a>
          </div>

          {/* Trust icons */}
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 text-white/80">
            <TrustItem title="Stripe 3-D Secure" />
            <TrustItem title="Flight Tracking" />
            <TrustItem title="Meet & Greet" />
            <TrustItem title="Local Support" />
          </div>
        </div>

        {/* Visual */}
        <div className="relative">
          <div className="rounded-2xl bg-white/10 p-2 backdrop-blur shadow-elevate">
            <img
              src="https://images.pexels.com/photos/2026324/pexels-photo-2026324.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Airport terminal"
              className="h-[420px] w-full rounded-xl object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden md:block rounded-2xl bg-white p-4 shadow-elevate">
            <div className="text-xs text-slate-600">On-time promise</div>
            <div className="text-slate-900 font-semibold">Live flight monitoring</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TrustItem({title}:{title:string}){
  return (
    <div className="flex items-center gap-3">
      <div className="h-2 w-2 rounded-full bg-emerald-400" />
      <span className="text-sm">{title}</span>
    </div>
  )
}