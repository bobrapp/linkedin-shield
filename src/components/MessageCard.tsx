import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Shield, AlertTriangle, CheckCircle2 } from "lucide-react";

export interface Message {
  id: string;
  sender: string;
  content: string;
  isSpam: boolean;
  confidence: number;
  timestamp: Date;
  spamIndicators?: string[];
}

interface MessageCardProps {
  message: Message;
  filtered?: boolean;
}

export function MessageCard({ message, filtered }: MessageCardProps) {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-destructive";
    if (confidence >= 70) return "text-warning";
    return "text-accent";
  };

  const getConfidenceBadge = (confidence: number, isSpam: boolean) => {
    if (isSpam) {
      if (confidence >= 90) return { variant: "destructive" as const, icon: Shield };
      if (confidence >= 70) return { variant: "outline" as const, icon: AlertTriangle };
    }
    return { variant: "outline" as const, icon: CheckCircle2 };
  };

  const badge = getConfidenceBadge(message.confidence, message.isSpam);
  const Icon = badge.icon;

  return (
    <Card
      className={`p-4 transition-all duration-300 hover:shadow-md ${
        filtered ? "opacity-40 blur-[2px]" : ""
      } ${message.isSpam && !filtered ? "border-destructive/30" : ""}`}
    >
      <div className="flex gap-4">
        <Avatar className="h-12 w-12 shrink-0">
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
            {message.sender.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-2">
            <h4 className="font-semibold text-foreground truncate">{message.sender}</h4>
            <Badge variant={badge.variant} className="shrink-0 gap-1">
              <Icon className="h-3 w-3" />
              {message.isSpam ? "Spam" : "Safe"}
            </Badge>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
            {message.content}
          </p>
          
          <div className="flex items-center gap-3 text-xs">
            <span className="text-muted-foreground">
              {message.timestamp.toLocaleTimeString()}
            </span>
            <span className={`font-medium ${getConfidenceColor(message.confidence)}`}>
              {message.confidence}% confidence
            </span>
          </div>
          
          {message.spamIndicators && message.spamIndicators.length > 0 && !filtered && (
            <div className="mt-2 pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground mb-1">Spam indicators:</p>
              <div className="flex flex-wrap gap-1">
                {message.spamIndicators.map((indicator, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {indicator}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
