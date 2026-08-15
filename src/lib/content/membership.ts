export interface MembershipTier {
  id: string;
  name: string;
  price: string;
  period: string;
  features: readonly string[];
  highlighted?: boolean;
}

export const MEMBERSHIP_TIERS: readonly MembershipTier[] = [
  {
    id: "access",
    name: "Access",
    price: "—",
    period: "monthly",
    features: [
      "Full facility access",
      "Open gym hours",
      "Strength & performance zones",
      "Locker & shower access",
    ],
  },
  {
    id: "performance",
    name: "Performance",
    price: "—",
    period: "monthly",
    highlighted: true,
    features: [
      "Everything in Access",
      "Structured programming",
      "Coach check-ins",
      "Recovery zone access",
      "Priority class booking",
    ],
  },
  {
    id: "coaching",
    name: "Coaching",
    price: "—",
    period: "monthly",
    features: [
      "Everything in Performance",
      "1:1 coaching sessions",
      "Custom programming",
      "Nutrition guidance",
      "Progress tracking",
    ],
  },
] as const;
