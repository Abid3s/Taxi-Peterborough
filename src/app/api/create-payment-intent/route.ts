import { NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { quoteFormSchema } from "@/lib/validators/quote";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
  typescript: true,
});

const createIntentSchema = z.object({
  amount: z.number().min(1),
  bookingDetails: quoteFormSchema,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, bookingDetails } = createIntentSchema.parse(body);

    // Combine date and time into a single ISO string for the database
    const pickupDateTime = new Date(bookingDetails.pickupDate);
    const [hours, minutes] = bookingDetails.pickupTime.split(":");
    pickupDateTime.setHours(parseInt(hours), parseInt(minutes));

    // This is a placeholder. In a real app, you'd have a more robust
    // way to link airports, perhaps by creating them in the DB first.
    // For now, we assume the airport code (e.g., "LHR") is the ID.
    // This will fail if the airport doesn't exist. This is a known limitation for now.
    // A better approach would be to findOrCreate the airport record.
    const airport = await prisma.airport.findUnique({
      where: { code: bookingDetails.airport },
    });

    if (!airport) {
      // For the purpose of this test, let's create it if it doesn't exist.
      // In production, you'd seed this data.
      await prisma.airport.create({
        data: {
          code: bookingDetails.airport,
          name: `${bookingDetails.airport} (auto-created)`,
        },
      });
    }

    const newBooking = await prisma.booking.create({
      data: {
        status: "Draft",
        passengerName: "TBC", // Not collected at this stage
        passengerPhone: "TBC",
        passengerEmail: "TBC",
        pickupAddress: bookingDetails.pickupPostcode,
        dropoffAirportId: bookingDetails.airport, // Using the code as the ID
        flightNo: "", // Not collected yet
        dateTime: pickupDateTime,
        pax: bookingDetails.passengers,
        bags: bookingDetails.bags,
        quote: amount,
        options: {
          meetAndGreet: bookingDetails.meetAndGreet,
          childSeats: bookingDetails.childSeats,
          extraStopAddress: bookingDetails.extraStopAddress,
        },
        distanceMiles: 0, // Mocked for now
        fees: 0, // Not calculated in detail yet
      },
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "gbp",
      automatic_payment_methods: {
        enabled: true,
      },
      capture_method: "manual",
      metadata: {
        bookingId: newBooking.id,
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating PaymentIntent:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: { message: `Internal Server Error: ${errorMessage}` } },
      { status: 500 }
    );
  }
}
