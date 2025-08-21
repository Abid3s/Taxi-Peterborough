import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import prisma from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
  typescript: true,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.log(`❌ Error message: ${errorMessage}`);
    return NextResponse.json(
      { error: `Webhook Error: ${errorMessage}` },
      { status: 400 }
    );
  }

  console.log("✅ Success:", event.id);

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntentSucceeded = event.data.object;
      const bookingIdSucceeded = paymentIntentSucceeded.metadata.bookingId;
      if (bookingIdSucceeded) {
        await prisma.booking.update({
          where: { id: bookingIdSucceeded },
          data: { status: "Captured" }, // Or "Completed" depending on business logic
        });
        console.log(`Booking ${bookingIdSucceeded} status updated to Captured.`);
      }
      break;
    case "payment_intent.canceled":
      const paymentIntentCanceled = event.data.object;
      const bookingIdCanceled = paymentIntentCanceled.metadata.bookingId;
      if (bookingIdCanceled) {
        await prisma.booking.update({
          where: { id: bookingIdCanceled },
          data: { status: "Declined" }, // Or "Cancelled"
        });
        console.log(`Booking ${bookingIdCanceled} status updated to Declined.`);
      }
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
