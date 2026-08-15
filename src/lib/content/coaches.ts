export interface CoachProfile {
  id: string;
  name: string;
  role: string;
  specialization: string;
  experience: string;
  philosophy: string;
}

/** Editorial placeholders — replace with real portraits when available */
export const COACH_PROFILES: readonly CoachProfile[] = [
  {
    id: "coach-1",
    name: "Coach Profile",
    role: "Head of Strength",
    specialization: "Powerlifting · Olympic Lifting",
    experience: "12+ years",
    philosophy: "Strength is a skill. Train it with intention.",
  },
  {
    id: "coach-2",
    name: "Coach Profile",
    role: "Performance Director",
    specialization: "Conditioning · Athletic Performance",
    experience: "10+ years",
    philosophy: "Output is measurable. Progress is non-negotiable.",
  },
  {
    id: "coach-3",
    name: "Coach Profile",
    role: "Recovery Lead",
    specialization: "Mobility · Recovery Protocols",
    experience: "8+ years",
    philosophy: "Recovery is where adaptation happens.",
  },
] as const;
