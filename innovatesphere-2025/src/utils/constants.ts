// Event configuration constants
export const EVENT_CONFIG = {
  name: "InnovateSphere 2025",
  tagline: "Code the Future for Social Good",
  description: "Join the brightest minds for 48 hours of intense innovation, collaboration, and impact. Let's build a better world with AI.",
  dates: {
    start: new Date("2025-10-24"),
    end: new Date("2025-10-26"),
    registration_deadline: new Date("2025-10-20"),
  },
  eventType: "Virtual Event",
  totalPrizes: "$10,000 in Prizes",
  duration: "48 hours",
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