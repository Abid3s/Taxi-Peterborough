import { NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/prisma";
import { z } from "zod";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_test_dummy", {
  typescript: true,
});

const confirmBookingSchema = z.object({
  paymentIntentId: z.string().startsWith("pi_"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { paymentIntentId } = confirmBookingSchema.parse(body);

    // Retrieve the PaymentIntent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== "requires_capture") {
      throw new Error(
        `PaymentIntent status is not 'requires_capture'. Current status: ${paymentIntent.status}`
      );
    }

    const bookingId = paymentIntent.metadata.bookingId;
    if (!bookingId) {
      throw new Error("No bookingId found in PaymentIntent metadata.");
    }

    // Update the booking in the database
    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: "Authorised",
        stripePaymentIntentId: paymentIntent.id,
      },
    });

    return NextResponse.json({ success: true, bookingId: updatedBooking.id });
  } catch (error) {
    console.error("Error confirming booking:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: { message: `Internal Server Error: ${errorMessage}` } },
      { status: 500 }
    );
  }
}
