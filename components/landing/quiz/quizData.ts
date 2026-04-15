export type RiskBand = "low" | "medium" | "high";

export type QuizAnswerOption = {
  label: string;
  score: number;
};

export type QuizQuestion = {
  prompt: string;
  options: QuizAnswerOption[];
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    prompt: "When a renter calls and you miss it, what usually happens?",
    options: [
      { label: "I call back immediately", score: 0 },
      { label: "I call back later", score: 2 },
      { label: "I send a message", score: 1 },
      { label: "Sometimes nothing", score: 3 },
    ],
  },
  {
    prompt: "How quickly do you respond to new inquiries?",
    options: [
      { label: "Within minutes", score: 0 },
      { label: "Within 1 hour", score: 1 },
      { label: "After a few hours", score: 2 },
      { label: "Same day or later", score: 3 },
    ],
  },
  {
    prompt: "How many renter inquiries do you handle per week?",
    options: [
      { label: "1–5", score: 0 },
      { label: "6–15", score: 1 },
      { label: "16–30", score: 2 },
      { label: "30+", score: 3 },
    ],
  },
  {
    prompt: "Do you know how many inquiries you missed last week?",
    options: [
      { label: "Yes, exactly", score: 0 },
      { label: "Rough idea", score: 1 },
      { label: "Not really", score: 2 },
      { label: "No idea", score: 3 },
    ],
  },
  {
    prompt: "Have you ever had a renter stop responding after a delay?",
    options: [
      { label: "Yes, often", score: 3 },
      { label: "Sometimes", score: 2 },
      { label: "Rarely", score: 1 },
      { label: "Never", score: 0 },
    ],
  },
];

export function computeQuizScore(
  answers: (number | null)[],
): number {
  return QUIZ_QUESTIONS.reduce((sum, q, i) => {
    const idx = answers[i];
    if (idx === null || idx === undefined) return sum;
    const opt = q.options[idx];
    return opt ? sum + opt.score : sum;
  }, 0);
}

export function getRiskBand(score: number): RiskBand {
  if (score <= 4) return "low";
  if (score <= 9) return "medium";
  return "high";
}

export function getResultCopy(band: RiskBand): {
  headline: string;
  body: string;
} {
  switch (band) {
    case "low":
      return {
        headline: "You're doing better than most.",
        body: "Your team seems fairly responsive, but missed renter demand can still slip through when things get busy.",
      };
    case "medium":
      return {
        headline: "You may be losing more renters than you think.",
        body: "Some of your answers suggest missed calls or delayed replies could be quietly hurting your leasing flow.",
      };
    case "high":
    default:
      return {
        headline: "You're likely losing renters every week.",
        body: "Based on your answers, delayed follow-up and missed inquiries may already be costing you potential leases.",
      };
  }
}
