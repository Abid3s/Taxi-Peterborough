type AnalyticsEvent =
  | { name: "quote_viewed"; params: { vehicle: string; airport: string } }
  | { name: "checkout_started"; params: { fare: number } }
  | { name: "payment_authorised"; params: { paymentIntentId: string } };

/**
 * A placeholder for a real analytics tracking library like GA4.
 * Currently, it just logs events to the console.
 * @param event The event to track.
 */
export function trackEvent(event: AnalyticsEvent) {
  // In a real app, this would send data to Google Analytics, Segment, etc.
  console.log(`[ANALYTICS EVENT]: ${event.name}`, event.params);
}
