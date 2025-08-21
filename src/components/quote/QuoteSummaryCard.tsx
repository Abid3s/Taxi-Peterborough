import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export interface Quote {
  miles: number;
  eta_minutes: number;
  fare: number;
  breakdown: {
    baseFare: number;
    perMile: number;
    distanceComponent: number;
    nightOrWeekendAdj: number;
    meetAndGreetFee: number;
    extras: number;
  };
  advisory: string | null;
  quoteExpiresAt: string;
}

interface QuoteSummaryCardProps {
  quote: Quote | null;
  isLoading: boolean;
}

export function QuoteSummaryCard({ quote, isLoading }: QuoteSummaryCardProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-3/4" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <div className="space-y-2 pt-2">
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </CardContent>
        <CardFooter className="flex-col space-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-3 w-3/4" />
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="bg-white/95 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="font-display text-ink">Your Quote</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-4xl font-bold">
          <span className="font-display text-accent">{quote ? `£${quote.fare}` : "—"}</span>
        </div>
        <p className="text-sm text-brand-muted">
          {quote
            ? "This is a fixed fare. No hidden charges."
            : "Complete the form to see your fare."}
        </p>
        <ul className="list-disc space-y-1 pl-4 text-sm text-brand-muted">
          <li>Flight tracking included</li>
          <li>Professional, licensed driver</li>
          <li>Free cancellation until dispatch</li>
        </ul>
      </CardContent>
      <CardFooter className="flex-col space-y-2">
        <Link
          href={quote ? `/checkout?fare=${quote.fare}` : "#"}
          passHref
          className="w-full"
          aria-disabled={!quote}
          onClick={(e) => !quote && e.preventDefault()}
        >
          <Button className="w-full" disabled={!quote}>
            Secure Checkout
          </Button>
        </Link>
        <p className="text-xs text-center text-brand-muted">
          {quote
            ? "Secure authorisation now; final confirmation once allocated."
            : ""}
        </p>
      </CardFooter>
    </Card>
  );
}
