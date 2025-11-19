import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Plus, Trash2, TestTube2, Settings } from "lucide-react";
import { toast } from "sonner";

export interface CustomRule {
  id: string;
  pattern: string;
  indicator: string;
  weight: number;
  isRegex: boolean;
  enabled: boolean;
}

interface CustomRulesBuilderProps {
  rules: CustomRule[];
  onRulesChange: (rules: CustomRule[]) => void;
}

export function CustomRulesBuilder({ rules, onRulesChange }: CustomRulesBuilderProps) {
  const [newPattern, setNewPattern] = useState("");
  const [newIndicator, setNewIndicator] = useState("");
  const [newWeight, setNewWeight] = useState([15]);
  const [testMessage, setTestMessage] = useState("");
  const [testResults, setTestResults] = useState<{ rule: CustomRule; matches: number }[]>([]);

  const addRule = () => {
    if (!newPattern.trim() || !newIndicator.trim()) {
      toast.error("Pattern and indicator name are required");
      return;
    }

    try {
      // Test if pattern is valid regex
      new RegExp(newPattern, "gi");

      const rule: CustomRule = {
        id: Date.now().toString(),
        pattern: newPattern,
        indicator: newIndicator,
        weight: newWeight[0],
        isRegex: true,
        enabled: true,
      };

      onRulesChange([...rules, rule]);
      setNewPattern("");
      setNewIndicator("");
      setNewWeight([15]);
      toast.success("Custom rule added!");
    } catch (error) {
      toast.error("Invalid regex pattern. Please check your syntax.");
    }
  };

  const deleteRule = (id: string) => {
    onRulesChange(rules.filter((rule) => rule.id !== id));
    toast.success("Rule deleted");
  };

  const toggleRule = (id: string) => {
    onRulesChange(
      rules.map((rule) =>
        rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
      )
    );
  };

  const updateRuleWeight = (id: string, weight: number) => {
    onRulesChange(
      rules.map((rule) => (rule.id === id ? { ...rule, weight } : rule))
    );
  };

  const testRules = () => {
    if (!testMessage.trim()) {
      toast.error("Please enter a test message");
      return;
    }

    const results = rules
      .filter((rule) => rule.enabled)
      .map((rule) => {
        const regex = new RegExp(rule.pattern, "gi");
        const matches = testMessage.match(regex);
        return {
          rule,
          matches: matches ? matches.length : 0,
        };
      })
      .filter((result) => result.matches > 0);

    setTestResults(results);

    if (results.length === 0) {
      toast("No patterns matched", {
        description: "Your test message didn't trigger any custom rules",
      });
    } else {
      toast.success(`${results.length} pattern(s) matched!`);
    }
  };

  const totalWeight = testResults.reduce(
    (sum, result) => sum + result.rule.weight * result.matches,
    0
  );

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-lg">Custom Rules Builder</h3>
      </div>

      {/* Add New Rule */}
      <div className="space-y-4 mb-6 p-4 bg-muted/50 rounded-lg">
        <h4 className="font-medium text-sm flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create New Rule
        </h4>

        <div className="grid gap-4">
          <div>
            <Label htmlFor="pattern">Regex Pattern</Label>
            <Input
              id="pattern"
              placeholder="e.g., \b(earn|make)\s+\$?\d+k?\b"
              value={newPattern}
              onChange={(e) => setNewPattern(e.target.value)}
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Use JavaScript regex syntax (case-insensitive by default)
            </p>
          </div>

          <div>
            <Label htmlFor="indicator">Indicator Name</Label>
            <Input
              id="indicator"
              placeholder="e.g., Money promises"
              value={newIndicator}
              onChange={(e) => setNewIndicator(e.target.value)}
            />
          </div>

          <div>
            <Label>Weight/Priority: {newWeight[0]}</Label>
            <Slider
              value={newWeight}
              onValueChange={setNewWeight}
              min={1}
              max={50}
              step={1}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Higher weight = stronger spam signal (1-50)
            </p>
          </div>

          <Button onClick={addRule} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Rule
          </Button>
        </div>
      </div>

      {/* Existing Rules */}
      {rules.length > 0 && (
        <div className="space-y-3 mb-6">
          <h4 className="font-medium text-sm">Your Custom Rules ({rules.length})</h4>
          <div className="space-y-2">
            {rules.map((rule) => (
              <div
                key={rule.id}
                className={`p-3 border rounded-lg transition-opacity ${
                  rule.enabled ? "opacity-100" : "opacity-50"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={rule.enabled ? "default" : "outline"}>
                        {rule.indicator}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Weight: {rule.weight}
                      </span>
                    </div>
                    <code className="text-xs bg-muted px-2 py-1 rounded block overflow-x-auto">
                      {rule.pattern}
                    </code>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleRule(rule.id)}
                    >
                      {rule.enabled ? "Disable" : "Enable"}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteRule(rule.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
                {rule.enabled && (
                  <div className="mt-2">
                    <Label className="text-xs">Priority</Label>
                    <Slider
                      value={[rule.weight]}
                      onValueChange={([weight]) => updateRuleWeight(rule.id, weight)}
                      min={1}
                      max={50}
                      step={1}
                      className="mt-1"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Test Area */}
      <div className="space-y-3 p-4 bg-accent/5 rounded-lg border border-border">
        <h4 className="font-medium text-sm flex items-center gap-2">
          <TestTube2 className="h-4 w-4" />
          Test Your Rules
        </h4>

        <Textarea
          placeholder="Paste a message to test against your custom rules..."
          value={testMessage}
          onChange={(e) => setTestMessage(e.target.value)}
          className="min-h-[100px] resize-none"
        />

        <Button onClick={testRules} variant="secondary" className="w-full">
          <TestTube2 className="h-4 w-4 mr-2" />
          Test Rules
        </Button>

        {testResults.length > 0 && (
          <div className="mt-4 p-3 bg-background rounded border">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-sm">Matched Patterns:</span>
              <Badge variant={totalWeight >= 60 ? "destructive" : "outline"}>
                Total Score: {totalWeight}
              </Badge>
            </div>
            <div className="space-y-1">
              {testResults.map((result, idx) => (
                <div key={idx} className="text-sm flex justify-between items-center">
                  <span className="text-muted-foreground">
                    {result.rule.indicator} ({result.matches}×)
                  </span>
                  <span className="font-medium">
                    +{result.rule.weight * result.matches}
                  </span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {totalWeight >= 60
                ? "⚠️ This message would be marked as spam"
                : "✓ This message would pass the filter"}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
