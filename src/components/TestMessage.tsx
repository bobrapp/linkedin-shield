import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sparkles, AlertCircle } from "lucide-react";

interface TestMessageProps {
  onTest: (message: string) => Promise<{ isSpam: boolean; confidence: number; indicators: string[] }>;
}

export function TestMessage({ onTest }: TestMessageProps) {
  const [message, setMessage] = useState("");
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<{
    isSpam: boolean;
    confidence: number;
    indicators: string[];
  } | null>(null);

  const handleTest = async () => {
    if (!message.trim()) return;
    
    setTesting(true);
    try {
      const testResult = await onTest(message);
      setResult(testResult);
    } finally {
      setTesting(false);
    }
  };

  const examples = [
    "Hi! I saw your profile and think we could collaborate on exciting opportunities. Let me know if you're interested!",
    "Quick question about your latest project - would love to learn more about your approach.",
    "🔥 URGENT: Make $10k/month working from home! Limited spots available. Click here now!",
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-lg">Test Your Message</h3>
      </div>

      <div className="space-y-4">
        <div>
          <Textarea
            placeholder="Paste a LinkedIn message to test spam detection..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[120px] resize-none"
          />
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleTest}
            disabled={!message.trim() || testing}
            className="flex-1"
          >
            {testing ? "Analyzing..." : "Test Message"}
          </Button>
        </div>

        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Try an example:</p>
          <div className="flex flex-col gap-2">
            {examples.map((example, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                onClick={() => setMessage(example)}
                className="text-left h-auto py-2 whitespace-normal justify-start"
              >
                {example}
              </Button>
            ))}
          </div>
        </div>

        {result && (
          <div className={`p-4 rounded-lg border-2 ${
            result.isSpam 
              ? "bg-destructive/5 border-destructive/30" 
              : "bg-accent/5 border-accent/30"
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className={`h-5 w-5 ${result.isSpam ? "text-destructive" : "text-accent"}`} />
              <span className="font-semibold">
                {result.isSpam ? "⚠️ Spam Detected" : "✓ Legitimate Message"}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Confidence: <span className="font-medium">{result.confidence}%</span>
            </p>
            {result.indicators.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">Detected patterns:</p>
                <div className="flex flex-wrap gap-1">
                  {result.indicators.map((indicator, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {indicator}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
