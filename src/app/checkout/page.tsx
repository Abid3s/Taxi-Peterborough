"use client";

import { useSearchParams } from "next/navigation";
import CheckoutPageClient from "@/components/checkout/CheckoutPageClient";
import { Suspense } from "react";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const fare = searchParams.get("fare");

  if (!fare || isNaN(parseInt(fare))) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold">Invalid Checkout Session</h1>
        <p className="text-muted-foreground">
          The fare is missing or invalid. Please return to the homepage and get
          a new quote.
        </p>
      </div>
    );
  }

  const amount = parseInt(fare, 10);

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-lg">
        <h1 className="text-3xl font-bold">Secure Checkout</h1>
        <p className="mt-2 text-muted-foreground">
          You are about to authorize a payment of{" "}
          <span className="font-bold text-foreground">£{amount}</span> for your
          journey.
        </p>
        <div className="mt-8">
          <CheckoutPageClient amount={amount} />
        </div>
      </div>
    </div>
  );
}


export default function CheckoutPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CheckoutContent />
        </Suspense>
    )
}
