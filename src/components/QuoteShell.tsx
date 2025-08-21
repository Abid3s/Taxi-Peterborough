'use client'
import { useState } from 'react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  quoteFormSchema,
  type QuoteFormValues,
} from "@/lib/validators/quote";
import { toast } from "sonner";
import { trackEvent } from "@/lib/analytics";
import Link from 'next/link';

import { AirportSelect } from "./quote/AirportSelect";
import { VehicleChooser } from "./quote/VehicleChooser";
import { DateTimePicker } from "./quote/DateTimePicker";
import { OptionsAccordion } from "./quote/OptionsAccordion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { type Quote } from "./quote/QuoteSummaryCard";


export default function QuoteShell(){
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      direction: "to_airport",
      pickupPostcode: "",
      passengers: 1,
      bags: 1,
      meetAndGreet: false,
      childSeats: 0,
      extraStopAddress: "",
    },
  });

  async function onSubmit(data: QuoteFormValues) {
    setIsLoading(true);
    setQuote(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("bookingDetails");
    }

    trackEvent({
      name: "quote_viewed",
      params: { vehicle: data.vehicle, airport: data.airport },
    });

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error?.message || "An unknown error occurred.");
      }
      setQuote(result as Quote);
      toast.success("Your quote is ready!");

      if (typeof window !== "undefined") {
        localStorage.setItem("bookingDetails", JSON.stringify(data));
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to get quote."
      );
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <section id="quote" className="relative bg-white">
      <div className="container grid gap-8 py-12 lg:grid-cols-[1fr_420px]">
        {/* Form card */}
        <div className="rounded-2xl border border-slate-200 bg-white/90 shadow-[0_2px_12px_rgba(2,6,23,0.12)]">
          <div className="border-b border-slate-100 p-6">
            <h2 className="text-lg font-semibold text-slate-900">Get an Instant Quote</h2>
            <p className="text-sm text-slate-500">Fill in the journey details below.</p>
          </div>
          <Form {...form}>
            <form
              className="p-6 grid gap-5"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="direction"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Direction</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-x-4"
                        disabled={isLoading}
                      >
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem value="to_airport" id="to_airport" />
                          </FormControl>
                          <FormLabel htmlFor="to_airport" className="font-normal">
                            To Airport
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2">
                          <FormControl>
                            <RadioGroupItem
                              value="from_airport"
                              id="from_airport"
                            />
                          </FormControl>
                          <FormLabel
                            htmlFor="from_airport"
                            className="font-normal"
                          >
                            From Airport
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="pickupPostcode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pickup Postcode</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., PE3 7PH"
                          {...field}
                          disabled={isLoading}
                          className="h-11 rounded-xl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="airport"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Airport</FormLabel>
                      <AirportSelect
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isLoading}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DateTimePicker control={form.control} />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="passengers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Passengers</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="1"
                          {...field}
                          disabled={isLoading}
                          className="h-11 rounded-xl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bags</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          {...field}
                          disabled={isLoading}
                          className="h-11 rounded-xl"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="vehicle"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Vehicle Type</FormLabel>
                    <FormControl>
                      <VehicleChooser
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <OptionsAccordion control={form.control} />

              <button type="submit" disabled={isLoading} className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-white font-semibold shadow-[0_10px_30px_rgba(2,6,23,0.25)] hover:translate-y-[-1px] transition disabled:opacity-50">
                {isLoading ? "Calculating..." : "Calculate Fare"}
              </button>
            </form>
          </Form>
        </div>

        {/* Sticky summary */}
        <aside className="lg:sticky lg:top-24 h-fit rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-[0_2px_12px_rgba(2,6,23,0.12)]">
          <h3 className="text-slate-900 font-semibold">Your Quote</h3>
          <div className="mt-4 text-4xl font-bold tracking-tight">
            {isLoading ? <span className="text-slate-400">...</span> : (quote ? `£${quote.fare}` : <span className="text-slate-400">—</span>)}
          </div>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>· Fixed fare. No hidden charges.</li>
            <li>· Secure authorisation (Stripe 3-D Secure).</li>
            <li>· Final confirmation after allocation.</li>
          </ul>
          <Link href={quote ? `/checkout?fare=${quote.fare}` : '#'} passHref>
            <button
              disabled={!quote || isLoading}
              className="mt-6 w-full rounded-xl bg-accent px-5 py-3 font-semibold text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: quote ? '#00BFA5' : undefined }}
            >
              Continue to Secure Payment
            </button>
          </Link>
        </aside>
      </div>
    </section>
  )
}
