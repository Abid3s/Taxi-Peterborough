import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const airports = [
  { value: "LHR", label: "London Heathrow (LHR)" },
  { value: "LGW", label: "London Gatwick (LGW)" },
  { value: "LTN", label: "London Luton (LTN)" },
  { value: "STN", label: "London Stansted (STN)" },
  { value: "EMA", label: "East Midlands Airport (EMA)" },
  { value: "BHX", label: "Birmingham Airport (BHX)" },
  { value: "MAN", label: "Manchester Airport (MAN)" },
];

interface AirportSelectProps {
  onValueChange: (value: string) => void;
  defaultValue?: string;
  disabled?: boolean;
}

export function AirportSelect({ onValueChange, defaultValue, disabled }: AirportSelectProps) {
  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue} disabled={disabled}>
      <SelectTrigger>
        <SelectValue placeholder="Select an airport" />
      </SelectTrigger>
      <SelectContent>
        {airports.map((airport) => (
          <SelectItem key={airport.value} value={airport.value}>
            {airport.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
