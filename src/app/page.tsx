"use client";

import * as React from "react";
import { QuoteForm } from "@/components/quote/QuoteForm";
import {
  QuoteSummaryCard,
  type Quote,
} from "@/components/quote/QuoteSummaryCard";

export default function HomePage() {
  const [quote, setQuote] = React.useState<Quote | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <div className="container px-4 md:px-6">
      <section className="flex flex-col items-center justify-center space-y-4 py-24 text-center">
        <h1 className="font-display text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl">
          Airport Taxis from Peterborough – Fixed Fares, 24/7
        </h1>
        <p className="max-w-[700px] text-white/80 md:text-xl">
          Instant quote. Secure online payment. Heathrow, Gatwick, Luton,
          Stansted, East Midlands & Birmingham.
        </p>
        <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
          <a
            href="#quote-form"
            className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-sm font-medium text-white shadow-brand transition-all hover:bg-accent/90 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50"
          >
            Get an Instant Quote
          </a>
        </div>
      </section>

      <div className="py-6 text-center text-sm text-white/60">
        <p>
          SCA-secure (Stripe) • Licensed partners • Email/SMS confirmations •
          Local support
        </p>
      </div>

      <section id="quote-form" className="py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <QuoteForm
              onQuoteReceived={setQuote}
              setIsLoading={setIsLoading}
              currentQuote={quote}
            />
          </div>
          <div className="relative">
            <div className="lg:sticky lg:top-24">
              <QuoteSummaryCard quote={quote} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
