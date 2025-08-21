import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Control } from "react-hook-form";
import { QuoteFormValues } from "@/lib/validators/quote";

interface OptionsAccordionProps {
  control: Control<QuoteFormValues>;
}

export function OptionsAccordion({ control }: OptionsAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Optional Extras</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4 pt-2">
            <FormField
              control={control}
              name="meetAndGreet"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Meet & Greet</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="childSeats"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-4">
                  <FormLabel>Child Seats</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      max="4"
                      className="w-24"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="extraStopAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Extra Stop Address (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter address for extra stop" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
