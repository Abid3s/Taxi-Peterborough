"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  quoteFormSchema,
  type QuoteFormValues,
} from "@/lib/validators/quote";
import { toast } from "sonner";
import { trackEvent } from "@/lib/analytics";

import { AirportSelect } from "./AirportSelect";
import { VehicleChooser } from "./VehicleChooser";
import { DateTimePicker } from "./DateTimePicker";
import { OptionsAccordion } from "./OptionsAccordion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { type Quote } from "./QuoteSummaryCard";

interface QuoteFormProps {
  onQuoteReceived: (quote: Quote | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  currentQuote: Quote | null;
}

export function QuoteForm({
  onQuoteReceived,
  setIsLoading,
  currentQuote,
}: QuoteFormProps) {
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

  const { isSubmitting } = form.formState;

  async function onSubmit(data: QuoteFormValues) {
    setIsLoading(true);
    onQuoteReceived(null);
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
      onQuoteReceived(result as Quote);
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Get an Instant Quote</CardTitle>
        <CardDescription>
          Fill in the details below to get a fixed fare for your journey.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* ... form fields ... */}
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
                      disabled={isSubmitting}
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
                        disabled={isSubmitting}
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
                      disabled={isSubmitting}
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
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
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
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <OptionsAccordion control={form.control} />

            <Button type="submit" className="w-full !mt-8" disabled={isSubmitting}>
              {isSubmitting || currentQuote ? "Recalculate Quote" : "Get Quote"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
