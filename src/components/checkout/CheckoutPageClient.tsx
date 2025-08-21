"use client";

import React, { useState, useEffect } from "react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";
import { QuoteFormValues } from "@/lib/validators/quote";
import { trackEvent } from "@/lib/analytics";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface CheckoutPageClientProps {
  amount: number;
}

const CheckoutPageClient: React.FC<CheckoutPageClientProps> = ({ amount }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [bookingDetails, setBookingDetails] = useState<QuoteFormValues | null>(
    null
  );

  useEffect(() => {
    const storedDetails = localStorage.getItem("bookingDetails");
    if (storedDetails) {
      setBookingDetails(JSON.parse(storedDetails));
    } else {
      toast.error("Booking details not found. Please start over.");
    }
  }, []);

  useEffect(() => {
    if (!bookingDetails || !amount) return;

    trackEvent({
      name: "checkout_started",
      params: { fare: amount },
    });

    const createPaymentIntent = async () => {
      try {
        const res = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount, bookingDetails }),
        });
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error.message);
        }
        setClientSecret(data.clientSecret);
      } catch (error) {
        toast.error(
          `Failed to initialize payment: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    };
    createPaymentIntent();
  }, [amount, bookingDetails]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  };

  if (!clientSecret || !bookingDetails) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  return (
    <Elements options={options} stripe={stripePromise}>
      <CheckoutForm clientSecret={clientSecret} />
    </Elements>
  );
};

export default CheckoutPageClient;
