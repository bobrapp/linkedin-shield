import { Message } from "@/components/MessageCard";

export const sampleMessages: Omit<Message, "timestamp">[] = [
  {
    id: "1",
    sender: "Sarah Chen",
    content: "Hi! I noticed we both work in AI/ML. Would love to connect and potentially collaborate on projects in the future.",
    isSpam: false,
    confidence: 15,
  },
  {
    id: "2",
    sender: "Marketing Genius",
    content: "🔥 URGENT: Make $10,000/month working from home! Join 50,000+ successful entrepreneurs. Limited spots available. Click here NOW to change your life! 💰💰💰",
    isSpam: true,
    confidence: 98,
    spamIndicators: ["Excessive emojis", "Money promises", "Urgency tactics", "Generic greeting"],
  },
  {
    id: "3",
    sender: "David Kumar",
    content: "Hey, saw your talk at TechConf last month. Really insightful points about transformer architectures. Would you be open to discussing your approach?",
    isSpam: false,
    confidence: 8,
  },
  {
    id: "4",
    sender: "Growth Hacker Pro",
    content: "Hi there! I help professionals like you 10x their LinkedIn presence. Check out my proven system that got 100+ clients to 50k followers. Free consultation if you act now!",
    isSpam: true,
    confidence: 92,
    spamIndicators: ["Unsolicited offer", "Exaggerated claims", "Generic pitch", "Pressure tactics"],
  },
  {
    id: "5",
    sender: "Emily Rodriguez",
    content: "Thanks for connecting! I'm building a team for an open-source NLP project and thought your background would be a great fit. No obligations, just curious if you'd be interested.",
    isSpam: false,
    confidence: 12,
  },
  {
    id: "6",
    sender: "Crypto King",
    content: "Hello friend! I have exclusive opportunity for you! Invest in new cryptocurrency token and earn 1000% returns GUARANTEED! Don't miss out! Reply fast before spots fill up!!!",
    isSpam: true,
    confidence: 99,
    spamIndicators: ["Investment scheme", "Unrealistic returns", "Poor grammar", "Multiple exclamation marks", "Generic greeting"],
  },
  {
    id: "7",
    sender: "James Thompson",
    content: "Hi, I'm a recruiter at TechCorp. We have an opening for a Senior ML Engineer that matches your profile. Would you be interested in learning more about the role?",
    isSpam: false,
    confidence: 20,
  },
  {
    id: "8",
    sender: "Digital Marketing Pro",
    content: "Hey! Want to grow your business? I specialize in LinkedIn growth strategies. My clients see 500% engagement boost in 30 days. Special discount for you - 50% off this week only!",
    isSpam: true,
    confidence: 88,
    spamIndicators: ["Unsolicited service", "Time pressure", "Exaggerated metrics", "Generic approach"],
  },
  {
    id: "9",
    sender: "Dr. Lisa Park",
    content: "Hello! I'm organizing a workshop on ethical AI development. Given your work in the field, would you be interested in being a panelist? It's in March, fully remote.",
    isSpam: false,
    confidence: 10,
  },
  {
    id: "10",
    sender: "Success Coach 2024",
    content: "ATTENTION! You've been selected for our elite mentorship program! Transform your career in 90 days or your money back! Only 5 spots left. Click link in bio NOW!",
    isSpam: true,
    confidence: 95,
    spamIndicators: ["Fake selection claim", "Urgency tactics", "Money-back guarantee", "External link push", "All caps"],
  },
];

export function getSampleMessagesWithTimestamps(): Message[] {
  const now = new Date();
  return sampleMessages.map((msg, idx) => ({
    ...msg,
    timestamp: new Date(now.getTime() - (sampleMessages.length - idx) * 60 * 60 * 1000),
  }));
}
