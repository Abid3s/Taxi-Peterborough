'use client'
import { useState } from 'react'

export default function QuoteShell(){
  const [fare,setFare] = useState<number | null>(null)

  return (
    <section id="quote" className="relative bg-white">
      <div className="container grid gap-8 py-12 lg:grid-cols-[1fr_420px]">
        {/* Form card */}
        <div className="rounded-2xl border border-slate-200 bg-white/90 shadow-soft">
          <div className="border-b border-slate-100 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Get an Instant Quote</h2>
            <p className="text-sm text-slate-500">Fill in the journey details below.</p>
          </div>
          <form
            className="p-6 grid gap-5"
            onSubmit={(e)=>{e.preventDefault(); setFare(189)}}
          >
            {/* replace with RHF/Zod controls */}
            <Input label="Pickup postcode or address" placeholder="PE3 7PH, 29 Ivatt Way, Peterborough" />
            <div className="grid grid-cols-2 gap-4">
              <Select label="Airport" options={['Heathrow (LHR)','Gatwick (LGW)','Luton (LTN)','Stansted (STN)','East Midlands (EMA)','Birmingham (BHX)']} />
              <Select label="Terminal" options={['T1','T2','T3','T4','T5','N','S']} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input type="datetime-local" label="Pickup date & time" />
              <Select label="Vehicle" options={['Saloon','Estate','MPV','8-Seater']} />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Select label="Pax" options={['1','2','3','4','5','6','7','8']} />
              <Select label="Bags" options={['0','1','2','3','4','5','6']} />
              <Select label="Options" options={['None','Meet & Greet','Child Seat','Extra Stop']} />
            </div>
            <button className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-white font-semibold shadow-elevate hover:translate-y-[-1px] transition">
              Calculate Fare
            </button>
          </form>
        </div>

        {/* Sticky summary */}
        <aside className="lg:sticky lg:top-24 h-fit rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-soft">
          <h3 className="text-slate-900 font-semibold">Your Quote</h3>
          <div className="mt-4 text-4xl font-bold tracking-tight">
            {fare ? `£${fare}` : <span className="text-slate-400">—</span>}
          </div>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>· Fixed fare. No hidden charges.</li>
            <li>· Secure authorisation (Stripe 3-D Secure).</li>
            <li>· Final confirmation after allocation.</li>
          </ul>
          <button
            disabled={!fare}
            className="mt-6 w-full rounded-xl bg-accent px-5 py-3 font-semibold text-slate-900 disabled:opacity-40"
          >
            Continue to Secure Payment
          </button>
        </aside>
      </div>
    </section>
  )
}

function Input({label, ...rest}: any){
  return (
    <label className="grid gap-2 text-sm">
      <span className="text-slate-600">{label}</span>
      <input {...rest} className="h-11 rounded-xl border border-slate-200 bg-white px-3 outline-none focus:ring-2 focus:ring-emerald-300"/>
    </label>
  )
}
function Select({label, options}:{label:string; options:string[]}){
  return (
    <label className="grid gap-2 text-sm">
      <span className="text-slate-600">{label}</span>
      <select className="h-11 rounded-xl border border-slate-200 bg-white px-3 outline-none focus:ring-2 focus:ring-emerald-300">
        {options.map(o=><option key={o}>{o}</option>)}
      </select>
    </label>
  )
}