import { NextResponse } from 'next/server';
import { quoteFormSchema } from '@/lib/validators/quote';
import pricingRules from '@/lib/data/pricing.json';
import { ZodError } from 'zod';

// This is our mock Distance Matrix API call
async function getDistance(origin: string, destination: string) {
  // In a real app, this would call the Google Maps API
  // For now, we return a fixed value for demonstration
  console.log(`Faking distance calculation for ${origin} to ${destination}`);
  return { miles: 97.4, eta_minutes: 150 };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Validate the request body
    const validatedData = quoteFormSchema.parse(body);

    // 2. Mock distance calculation
    const { miles, eta_minutes } = await getDistance(validatedData.pickupPostcode, validatedData.airport);

    // 3. Get pricing rules for the selected vehicle
    const vehicleRules = pricingRules.vehicle[validatedData.vehicle];
    if (!vehicleRules) {
      return NextResponse.json({ error: { code: 'INVALID_VEHICLE', message: 'Selected vehicle type is not available.' } }, { status: 400 });
    }

    // 4. Calculate the fare based on the provided logic
    let price = vehicleRules.baseFare + (miles * vehicleRules.perMile);
    const breakdown = {
      baseFare: vehicleRules.baseFare,
      perMile: vehicleRules.perMile,
      distanceComponent: miles * vehicleRules.perMile,
      nightOrWeekendAdj: 0,
      meetAndGreetFee: 0,
      extras: 0,
    };

    // Add surcharges
    const pickupDate = new Date(validatedData.pickupDate);
    const dayOfWeek = pickupDate.getDay(); // 0=Sun, 6=Sat
    const hour = parseInt(validatedData.pickupTime.split(':')[0]);

    if (hour >= pricingRules.surcharges.nightHours[0] || hour < pricingRules.surcharges.nightHours[1]) {
      const adjustment = price * pricingRules.surcharges.nightPct;
      price += adjustment;
      breakdown.nightOrWeekendAdj += adjustment;
    } else if (dayOfWeek === 0 || dayOfWeek === 6) { // Weekend
      const adjustment = price * pricingRules.surcharges.weekendPct;
      price += adjustment;
      breakdown.nightOrWeekendAdj += adjustment;
    }

    if (validatedData.meetAndGreet) {
      price += pricingRules.surcharges.meetAndGreetFee;
      breakdown.meetAndGreetFee = pricingRules.surcharges.meetAndGreetFee;
      breakdown.extras += pricingRules.surcharges.meetAndGreetFee;
    }
    if (validatedData.childSeats > 0) {
        const childSeatCost = validatedData.childSeats * pricingRules.surcharges.childSeatFee;
        price += childSeatCost;
        breakdown.extras += childSeatCost;
    }
    if (validatedData.extraStopAddress) {
        price += pricingRules.surcharges.extraStopFee;
        breakdown.extras += pricingRules.surcharges.extraStopFee;
    }

    const finalFare = Math.round(price); // Round to nearest pound

    // 5. Construct the response
    const quoteExpiresAt = new Date();
    quoteExpiresAt.setHours(quoteExpiresAt.getHours() + 6); // Quote valid for 6 hours

    const responsePayload = {
      miles,
      eta_minutes,
      fare: finalFare,
      breakdown,
      advisory: null, // AI feature to be added later
      quoteExpiresAt: quoteExpiresAt.toISOString(),
    };

    return NextResponse.json(responsePayload);

  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: { code: 'VALIDATION_ERROR', message: error.format() } }, { status: 400 });
    }
    console.error(error);
    return NextResponse.json({ error: { code: 'INTERNAL_SERVER_ERROR', message: 'An unexpected error occurred.' } }, { status: 500 });
  }
}
