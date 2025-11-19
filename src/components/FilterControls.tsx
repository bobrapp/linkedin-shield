import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Settings2, RotateCcw } from "lucide-react";

interface FilterControlsProps {
  enabled: boolean;
  onEnabledChange: (enabled: boolean) => void;
  threshold: number;
  onThresholdChange: (threshold: number) => void;
  onReset: () => void;
}

export function FilterControls({
  enabled,
  onEnabledChange,
  threshold,
  onThresholdChange,
  onReset,
}: FilterControlsProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Settings2 className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-lg">Filter Controls</h3>
        </div>
        <Button variant="outline" size="sm" onClick={onReset}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="filter-enabled" className="text-base">
              Enable Spam Filter
            </Label>
            <p className="text-sm text-muted-foreground">
              Automatically hide detected spam messages
            </p>
          </div>
          <Switch
            id="filter-enabled"
            checked={enabled}
            onCheckedChange={onEnabledChange}
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="threshold" className="text-base">
              Detection Threshold
            </Label>
            <span className="text-sm font-medium text-primary">{threshold}%</span>
          </div>
          <Slider
            id="threshold"
            min={50}
            max={99}
            step={1}
            value={[threshold]}
            onValueChange={(value) => onThresholdChange(value[0])}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Messages with confidence above this threshold will be filtered
          </p>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Quick Presets</h4>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onThresholdChange(70)}
                className={threshold === 70 ? "bg-primary/10" : ""}
              >
                Lenient (70%)
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onThresholdChange(80)}
                className={threshold === 80 ? "bg-primary/10" : ""}
              >
                Balanced (80%)
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onThresholdChange(90)}
                className={threshold === 90 ? "bg-primary/10" : ""}
              >
                Strict (90%)
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
