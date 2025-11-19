import { CustomRule } from "@/utils/spamDetection";

export interface RuleTemplate {
  id: string;
  name: string;
  description: string;
  category: "crypto" | "mlm" | "recruiting" | "financial" | "urgency";
  rules: Omit<CustomRule, "id">[];
}

export const ruleTemplates: RuleTemplate[] = [
  {
    id: "crypto-schemes",
    name: "Crypto & Investment Schemes",
    description: "Detects cryptocurrency scams, trading schemes, and investment fraud",
    category: "crypto",
    rules: [
      {
        pattern: "\\b(bitcoin|crypto|blockchain|NFT|web3|token|coin)\\s+(investment|opportunity|trading|mining)",
        indicator: "Crypto investment pitch",
        weight: 30,
        isRegex: true,
        enabled: true,
      },
      {
        pattern: "\\b(10x|100x|1000%|guaranteed|passive income)\\s+(returns?|profit|gains?)",
        indicator: "Unrealistic returns promise",
        weight: 35,
        isRegex: true,
        enabled: true,
      },
      {
        pattern: "\\b(DeFi|staking|yield|liquidity pool)\\s+(opportunity|returns|APY)",
        indicator: "DeFi scheme keywords",
        weight: 28,
        isRegex: true,
        enabled: true,
      },
      {
        pattern: "\\b(wallet|exchange|transfer|deposit)\\s+\\$?\\d+[k]?",
        indicator: "Crypto transaction request",
        weight: 25,
        isRegex: true,
        enabled: true,
      },
    ],
  },
  {
    id: "mlm-schemes",
    name: "MLM & Pyramid Schemes",
    description: "Identifies multi-level marketing and pyramid scheme recruitment",
    category: "mlm",
    rules: [
      {
        pattern: "\\b(be your own boss|financial freedom|quit your job|fire your boss)",
        indicator: "MLM freedom pitch",
        weight: 25,
        isRegex: true,
        enabled: true,
      },
      {
        pattern: "\\b(team building|downline|upline|network marketing|direct sales)",
        indicator: "MLM terminology",
        weight: 30,
        isRegex: true,
        enabled: true,
      },
      {
        pattern: "\\b(join (my|our) team|business opportunity|entrepreneur|side hustle)\\s",
        indicator: "Recruitment language",
        weight: 22,
        isRegex: true,
        enabled: true,
      },
      {
        pattern: "\\b(work from (home|anywhere)|laptop lifestyle|location independent)",
        indicator: "Remote work pitch",
        weight: 18,
        isRegex: true,
        enabled: true,
      },
      {
        pattern: "\\b(residual income|passive income|unlimited earning potential)",
        indicator: "Income promises",
        weight: 26,
        isRegex: true,
        enabled: true,
      },
    ],
  },
  {
    id: "fake-recruiters",
    name: "Fake Recruiters & Job Scams",
    description: "Detects fraudulent job offers and fake recruitment messages",
    category: "recruiting",
    rules: [
      {
        pattern: "\\b(selected|chosen|picked|identified)\\s+(you|your profile)\\s+(for|as)",
        indicator: "Fake selection claim",
        weight: 24,
        isRegex: true,
        enabled: true,
      },
      {
        pattern: "\\b(immediate|urgent|quick)\\s+(hire|start|opening|position)",
        indicator: "Urgency in hiring",
        weight: 22,
        isRegex: true,
        enabled: true,
      },
      {
        pattern: "\\b(no experience|training provided|earn while you learn)",
        indicator: "No qualification required",
        weight: 20,
        isRegex: true,
        enabled: true,
      },
      {
        pattern: "\\b(pay|fee|investment|deposit)\\s+(required|upfront|first)",
        indicator: "Payment request red flag",
        weight: 35,
        isRegex: true,
        enabled: true,
      },
      {
        pattern: "\\bDM|message me|reply (fast|quick|ASAP|now)",
        indicator: "Push for immediate response",
        weight: 18,
        isRegex: true,
        enabled: true,
      },
    ],
  },
  {
    id: "financial-spam",
    name: "Financial Spam & Get Rich Quick",
    description: "Catches money-making schemes and financial spam",
    category: "financial",
    rules: [
      {
        pattern: "\\b(make|earn|get)\\s+\\$?\\d+[k]?\\+?\\s*(per|a|/)\\s*(day|week|month|hour)",
        indicator: "Money making promise",
        weight: 28,
        isRegex: true,
        enabled: true,
      },
      {
        pattern: "\\b(cash|money|income|profit)\\s+(now|today|fast|quick|easy)",
        indicator: "Quick money keywords",
        weight: 25,
        isRegex: true,
        enabled: true,
      },
      {
        pattern: "\\b(secret|hidden|insider|exclusive)\\s+(method|strategy|system|formula)",
        indicator: "Secret method claim",
        weight: 27,
        isRegex: true,
        enabled: true,
      },
      {
        pattern: "\\b(risk[- ]free|guaranteed|100%|no risk|cant lose)",
        indicator: "Risk-free guarantee",
        weight: 30,
        isRegex: true,
        enabled: true,
      },
    ],
  },
  {
    id: "urgency-tactics",
    name: "Urgency & Pressure Tactics",
    description: "Identifies high-pressure sales tactics and artificial urgency",
    category: "urgency",
    rules: [
      {
        pattern: "\\b(limited (time|spots?|offer)|only \\d+ (left|remaining|spots?))",
        indicator: "Scarcity tactics",
        weight: 22,
        isRegex: true,
        enabled: true,
      },
      {
        pattern: "\\b(act now|hurry|don't miss|last chance|expires? (soon|today))",
        indicator: "Urgency pressure",
        weight: 20,
        isRegex: true,
        enabled: true,
      },
      {
        pattern: "!!!+|\\bURGENT|\\bEMERGENCY",
        indicator: "Excessive urgency markers",
        weight: 18,
        isRegex: true,
        enabled: true,
      },
      {
        pattern: "\\b(before|within)\\s+(24 hours?|today|tonight|this (week|month))",
        indicator: "Time pressure",
        weight: 19,
        isRegex: true,
        enabled: true,
      },
    ],
  },
];

export const getCategorizedTemplates = () => {
  return {
    crypto: ruleTemplates.filter(t => t.category === "crypto"),
    mlm: ruleTemplates.filter(t => t.category === "mlm"),
    recruiting: ruleTemplates.filter(t => t.category === "recruiting"),
    financial: ruleTemplates.filter(t => t.category === "financial"),
    urgency: ruleTemplates.filter(t => t.category === "urgency"),
  };
};
