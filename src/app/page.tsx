"use client";

import * as React from "react";
import Hero from "@/components/Hero";
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
      <Hero />

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
