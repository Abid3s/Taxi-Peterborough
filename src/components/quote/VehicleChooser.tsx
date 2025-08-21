import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const vehicleTypes = [
  { id: "saloon", name: "Saloon", pax: 4, bags: 2 },
  { id: "estate", name: "Estate", pax: 4, bags: 3 },
  { id: "mpv", name: "MPV", pax: 6, bags: 4 },
  { id: "eight", name: "8-Seater", pax: 8, bags: 6 },
];

interface VehicleChooserProps {
  onValueChange: (value: string) => void;
  defaultValue?: string;
  disabled?: boolean;
}

export function VehicleChooser({ onValueChange, defaultValue, disabled }: VehicleChooserProps) {
  return (
    <RadioGroup
      onValueChange={onValueChange}
      defaultValue={defaultValue}
      disabled={disabled}
      className="grid grid-cols-2 gap-4 md:grid-cols-4"
    >
      {vehicleTypes.map((vehicle) => (
        <div key={vehicle.id}>
          <RadioGroupItem
            value={vehicle.id}
            id={vehicle.id}
            className="peer sr-only"
          />
          <Label
            htmlFor={vehicle.id}
            className="flex h-full cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <CardHeader className="p-0">
              <CardTitle>{vehicle.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-0 pt-2 text-sm text-muted-foreground">
              <p>Up to {vehicle.pax} passengers</p>
              <p>Up to {vehicle.bags} bags</p>
            </CardContent>
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
