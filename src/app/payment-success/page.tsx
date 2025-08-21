"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const paymentIntentId = searchParams.get("payment_intent");

  const [status, setStatus] = useState("verifying");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!paymentIntentId) {
      setStatus("error");
      setError("No payment intent ID found.");
      return;
    }

    const verifyBooking = async () => {
      try {
        const res = await fetch("/api/confirm-booking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentIntentId }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error?.message || "Verification failed.");
        }

        setStatus("success");
        toast.success("Your payment has been authorized and booking confirmed!");
        trackEvent({
          name: "payment_authorised",
          params: { paymentIntentId },
        });

        // Clear the stored booking details
        if (typeof window !== "undefined") {
            localStorage.removeItem("bookingDetails");
        }
      } catch (err) {
        setStatus("error");
        setError(err instanceof Error ? err.message : "An unknown error occurred.");
        toast.error(err instanceof Error ? err.message : "An unknown error occurred.");
      }
    };

    verifyBooking();
  }, [paymentIntentId]);

  return (
    <div className="container py-12 text-center">
      {status === "verifying" && (
        <>
          <h1 className="text-2xl font-bold">Verifying your booking...</h1>
          <p className="text-muted-foreground">Please wait a moment.</p>
        </>
      )}
      {status === "success" && (
        <>
          <h1 className="text-2xl font-bold text-green-600">
            Booking Confirmed!
          </h1>
          <p className="text-muted-foreground">
            Your payment has been successfully authorized. You will receive a
            confirmation email shortly once a driver is allocated.
          </p>
          <Button asChild className="mt-6">
            <Link href="/">Back to Homepage</Link>
          </Button>
        </>
      )}
      {status === "error" && (
        <>
          <h1 className="text-2xl font-bold text-red-600">
            Booking Confirmation Failed
          </h1>
          <p className="text-muted-foreground">
            There was a problem confirming your booking.
          </p>
          <p className="text-sm text-red-700 mt-2">{error}</p>
          <Button asChild className="mt-6">
            <Link href="/">Back to Homepage</Link>
          </Button>
        </>
      )}
    </div>
  );
}

export default function PaymentSuccessPage() {
    return (
        <Suspense fallback={<div>Loading confirmation...</div>}>
            <PaymentSuccessContent />
        </Suspense>
    )
}
