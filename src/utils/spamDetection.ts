// Simulated spam detection logic for demo purposes
// In production, this would use actual ML models

interface SpamAnalysis {
  isSpam: boolean;
  confidence: number;
  indicators: string[];
}

const spamPatterns = [
  { pattern: /\b(make|earn|get)\s+\$?\d+[k]?\+?\s*(per|\/|a)?\s*(month|week|day)/i, indicator: "Money promises", weight: 25 },
  { pattern: /🔥|💰|💵|💸|⚡/g, indicator: "Excessive emojis", weight: 15 },
  { pattern: /\b(urgent|act now|limited|hurry|quick|fast|don't miss)\b/gi, indicator: "Urgency tactics", weight: 20 },
  { pattern: /\b(guaranteed|100%|proven|secret|exclusive)\b/gi, indicator: "Exaggerated claims", weight: 20 },
  { pattern: /!!!+/g, indicator: "Multiple exclamation marks", weight: 10 },
  { pattern: /\b(click here|link in bio|dm me|reply fast)\b/gi, indicator: "Call to action spam", weight: 18 },
  { pattern: /\b(free consultation|special discount|limited spots?)\b/gi, indicator: "Pressure tactics", weight: 18 },
  { pattern: /\b(investment|crypto|token|returns|profit)\b/gi, indicator: "Investment scheme", weight: 25 },
  { pattern: /\b(10x|100\+|500%|\d{3,}%)\b/g, indicator: "Unrealistic metrics", weight: 20 },
  { pattern: /\b(selected|chosen|congratulations|winner)\b/gi, indicator: "Fake selection claim", weight: 22 },
  { pattern: /^(hey|hi|hello)\s+(there|friend)?!?\s/i, indicator: "Generic greeting", weight: 8 },
];

const legitimacyIndicators = [
  { pattern: /\b(saw your|noticed your|read your|attended your)\b/gi, indicator: "Personal reference", weight: -20 },
  { pattern: /\b(collaborate|partnership|project|workshop|conference)\b/gi, indicator: "Professional opportunity", weight: -15 },
  { pattern: /\b(recruiter|hiring|position|role|opening)\b/gi, indicator: "Legitimate recruiting", weight: -18 },
  { pattern: /\b(no obligations?|interested|curious|thought)\b/gi, indicator: "Respectful approach", weight: -12 },
  { pattern: /\b(would you|are you|could you)\b/gi, indicator: "Polite inquiry", weight: -10 },
];

export function analyzeMessage(content: string): SpamAnalysis {
  let spamScore = 0;
  const detectedIndicators: string[] = [];

  // Check spam patterns
  for (const { pattern, indicator, weight } of spamPatterns) {
    const matches = content.match(pattern);
    if (matches) {
      spamScore += weight * (matches.length > 3 ? 1.5 : 1);
      if (!detectedIndicators.includes(indicator)) {
        detectedIndicators.push(indicator);
      }
    }
  }

  // Check legitimacy indicators
  for (const { pattern, weight } of legitimacyIndicators) {
    const matches = content.match(pattern);
    if (matches) {
      spamScore += weight;
    }
  }

  // Length-based adjustments
  if (content.length < 50) {
    spamScore += 5;
  } else if (content.length > 300) {
    spamScore += 10;
  }

  // Grammar check (very basic)
  const grammarIssues = content.match(/[A-Z]{5,}|\.{3,}|!{2,}/g);
  if (grammarIssues && grammarIssues.length > 2) {
    spamScore += 15;
    if (!detectedIndicators.includes("Poor formatting")) {
      detectedIndicators.push("Poor formatting");
    }
  }

  // Normalize score to 0-100 range
  const normalizedScore = Math.max(0, Math.min(100, spamScore));
  
  // Determine if spam (threshold at 60)
  const isSpam = normalizedScore >= 60;
  
  return {
    isSpam,
    confidence: Math.round(normalizedScore),
    indicators: detectedIndicators,
  };
}

export async function analyzeMessageAsync(content: string): Promise<SpamAnalysis> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return analyzeMessage(content);
}
