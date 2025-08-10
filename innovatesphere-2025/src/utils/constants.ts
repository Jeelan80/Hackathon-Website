// Event configuration constants
export const EVENT_CONFIG = {
  name: "InnovateSphere 2025",
  tagline: "Code the Future for Social Good",
  description: "Join the brightest minds for 18 hours of intense innovation, collaboration, and impact. Let's build a better world with AI.",
  dates: {
    start: new Date("2025-08-23"),
    end: new Date("2025-08-24"),
    registration_deadline: new Date("2025-08-20"),
  },
  eventType: "Virtual Event",
  totalPrizes: "₹18,000 in Prizes",
  duration: "18 hours",
} as const;

// Color constants
export const COLORS = {
  primary: {
    purple: "#4F46E5",
    blue: "#3B82F6",
    black: "#000000",
  },
  glass: {
    white: "rgba(255, 255, 255, 0.1)",
    border: "rgba(255, 255, 255, 0.2)",
  },
} as const;
// Prize structure
export const PRIZES = [
  {
    rank: 1,
    title: "Grand Prize",
    amount: "₹10,000",
    description: "First Place Winner"
  },
  {
    rank: 2,
    title: "Second Place",
    amount: "₹5,000",
    description: "Runner Up"
  },
  {
    rank: 3,
    title: "Third Place",
    amount: "₹3,000",
    description: "Third Place Winner"
  }
] as const;