"use client";

import { SectionLabel } from "@/components/landing/SectionLabel";
import { QuizCard } from "@/components/landing/quiz/QuizCard";
import { QuizOption } from "@/components/landing/quiz/QuizOption";
import { QuizProgress } from "@/components/landing/quiz/QuizProgress";
import { QuizResult } from "@/components/landing/quiz/QuizResult";
import {
  computeQuizScore,
  getRiskBand,
  QUIZ_QUESTIONS,
} from "@/components/landing/quiz/quizData";
import { ArrowRight, Check, ChevronLeft, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { JoinWaitlistConfirmForm } from "./JoinWaitlistConfirmForm";
import { useWaitlistFlow } from "./WaitlistFlowContext";

type Phase = "email" | "questions" | "result";

const TOTAL = QUIZ_QUESTIONS.length;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ModalStepper({ active }: { active: 0 | 1 | 2 }) {
  const steps = [
    { n: 1, label: "Your email" },
    { n: 2, label: "Quick check" },
    { n: 3, label: "Your result" },
  ] as const;

  return (
    <nav
      aria-label="Steps"
      className="mb-8 grid grid-cols-3 gap-2 border-b border-neutral-100 pb-8 sm:gap-4"
    >
      {steps.map((s, i) => {
        const done = i < active;
        const current = i === active;
        return (
          <div key={s.label} className="text-center sm:text-left">
            <div
              className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold tabular-nums transition sm:mx-0 sm:mb-2 ${
                current
                  ? "bg-neutral-950 text-white ring-4 ring-neutral-950/10"
                  : done
                    ? "bg-emerald-600 text-white"
                    : "border border-neutral-200 bg-neutral-50 text-neutral-400"
              }`}
            >
              {done ? <Check className="h-4 w-4" strokeWidth={2.5} /> : s.n}
            </div>
            <p
              className={`mt-2 hidden text-[10px] font-semibold uppercase tracking-wide sm:block ${
                current ? "text-neutral-950" : "text-neutral-400"
              }`}
            >
              Step {s.n}
            </p>
            <p
              className={`mt-0.5 text-[11px] font-medium leading-tight sm:text-sm ${
                current ? "text-neutral-900" : "text-neutral-500"
              }`}
            >
              {s.label}
            </p>
          </div>
        );
      })}
    </nav>
  );
}

export function JoinWaitlistModal() {
  const { open, closeWaitlist } = useWaitlistFlow();
  const panelRef = useRef<HTMLDivElement>(null);

  const [formKey, setFormKey] = useState(0);
  const [phase, setPhase] = useState<Phase>("email");
  const [email, setEmail] = useState("");
  const [emailDraft, setEmailDraft] = useState("");
  const [emailError, setEmailError] = useState("");

  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    Array.from({ length: TOTAL }, () => null),
  );

  useEffect(() => {
    if (!open) return;
    setPhase("email");
    setEmail("");
    setEmailDraft("");
    setEmailError("");
    setQuestionIndex(0);
    setAnswers(Array.from({ length: TOTAL }, () => null));
    setFormKey((k) => k + 1);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => {
      if (phase === "email") {
        document.getElementById("join-waitlist-email")?.focus();
      } else if (phase === "questions") {
        document.getElementById("join-quiz-next")?.focus();
      }
    });
    return () => cancelAnimationFrame(id);
  }, [open, phase, questionIndex]);

  const score = computeQuizScore(answers);
  const band = getRiskBand(score);

  const stepIndex: 0 | 1 | 2 =
    phase === "email" ? 0 : phase === "questions" ? 1 : 2;

  const goToNextQuestion = () => {
    if (questionIndex < TOTAL - 1) {
      setQuestionIndex((i) => i + 1);
    } else {
      setFormKey((k) => k + 1);
      setPhase("result");
    }
  };

  const handleSelectOption = (optionIndex: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[questionIndex] = optionIndex;
      return next;
    });
  };

  const handleBack = () => {
    if (phase === "questions" && questionIndex > 0) {
      setQuestionIndex((i) => i - 1);
      return;
    }
    if (phase === "questions" && questionIndex === 0) {
      setPhase("email");
      setEmailDraft(email);
    }
  };

  const validateAndStartQuiz = () => {
    const trimmed = emailDraft.trim().toLowerCase();
    if (!trimmed) {
      setEmailError("Enter your work email to continue.");
      return;
    }
    if (!EMAIL_RE.test(trimmed)) {
      setEmailError("That does not look like a valid email address.");
      return;
    }
    setEmailError("");
    setEmail(trimmed);
    setPhase("questions");
    setQuestionIndex(0);
  };

  const canContinueQuestion = answers[questionIndex] !== null;

  if (!open) return null;

  const q = QUIZ_QUESTIONS[questionIndex];
  const selected = answers[questionIndex];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-neutral-950/40 px-4 py-8 backdrop-blur-sm sm:items-center sm:py-10"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) closeWaitlist();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Join the TenantFlo waitlist"
        className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-neutral-200/90 bg-white shadow-[0_40px_100px_-24px_rgba(15,23,42,0.28)] outline-none"
        tabIndex={-1}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            e.stopPropagation();
            closeWaitlist();
          }
        }}
      >
        <header className="flex items-center justify-between border-b border-neutral-100 bg-white px-5 py-4 sm:px-6">
          <span className="text-sm font-semibold tracking-tight text-neutral-950">
            TenantFlo
          </span>
          <button
            type="button"
            onClick={closeWaitlist}
            className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-950"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="max-h-[min(88vh,760px)] overflow-y-auto px-5 py-8 sm:px-8 sm:py-10">
          <ModalStepper active={stepIndex} />

          {phase === "email" ? (
            <div key="email-phase" className="tf-quiz-panel">
              <div className="text-center">
                <SectionLabel>Waitlist</SectionLabel>
                <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-neutral-950 sm:text-3xl">
                  Start with your work email
                </h2>
                <p className="mx-auto mt-3 max-w-md text-pretty text-sm leading-relaxed text-neutral-600 sm:text-base">
                  We will attach your quick check results to this address when you
                  finish—so nothing is lost if you close the window.
                </p>
              </div>

              <div className="mx-auto mt-8 max-w-md">
                <label
                  htmlFor="join-waitlist-email"
                  className="block text-left text-sm font-medium text-neutral-800"
                >
                  Work email
                </label>
                <input
                  id="join-waitlist-email"
                  type="email"
                  autoComplete="email"
                  value={emailDraft}
                  onChange={(e) => {
                    setEmailDraft(e.target.value);
                    if (emailError) setEmailError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      validateAndStartQuiz();
                    }
                  }}
                  placeholder="name@company.com"
                  className="mt-2 w-full rounded-2xl border border-neutral-200 bg-neutral-50/50 px-4 py-3.5 text-base text-neutral-900 shadow-inner outline-none transition placeholder:text-neutral-400 focus:border-neutral-400 focus:bg-white focus:ring-2 focus:ring-neutral-950/10"
                />
                {emailError ? (
                  <p className="mt-2 text-sm text-red-600" role="alert">
                    {emailError}
                  </p>
                ) : null}
                <button
                  type="button"
                  onClick={validateAndStartQuiz}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-neutral-950 py-3.5 text-sm font-semibold text-white shadow-lg shadow-neutral-900/15 transition hover:bg-neutral-800"
                >
                  Continue to 5 questions
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </button>
                <p className="mt-4 text-center text-xs text-neutral-500">
                  No spam. Early access only.
                </p>
              </div>
            </div>
          ) : null}

          {phase === "questions" ? (
            <div key={`q-${questionIndex}`} className="tf-quiz-panel">
              <div className="mb-6 rounded-2xl border border-neutral-100 bg-neutral-50/80 px-4 py-3 text-center sm:px-5">
                <p className="text-xs text-neutral-500">Joining waitlist as</p>
                <p className="mt-0.5 truncate text-sm font-semibold text-neutral-950">
                  {email}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setPhase("email");
                    setEmailDraft(email);
                  }}
                  className="mt-2 text-xs font-medium text-neutral-600 underline-offset-2 hover:text-neutral-950 hover:underline"
                >
                  Change email
                </button>
              </div>

              <div className="text-center">
                <SectionLabel>Quick check</SectionLabel>
                <h2 className="mt-2 text-balance text-xl font-semibold tracking-tight text-neutral-950 sm:text-2xl">
                  Are missed calls costing you renters?
                </h2>
                <p className="mx-auto mt-2 max-w-md text-pretty text-sm text-neutral-600">
                  Five questions. One minute. Tap an answer, then continue.
                </p>
              </div>

              <div className="mt-8">
                <QuizCard>
                  <QuizProgress current={questionIndex + 1} total={TOTAL} />
                  <h3 className="mt-6 text-lg font-semibold leading-snug tracking-tight text-neutral-950 sm:text-xl">
                    {q.prompt}
                  </h3>
                  <div className="mt-6 flex flex-col gap-3">
                    {q.options.map((opt, i) => (
                      <QuizOption
                        key={opt.label}
                        label={opt.label}
                        selected={selected === i}
                        disabled={false}
                        onSelect={() => handleSelectOption(i)}
                      />
                    ))}
                  </div>
                  <div className="mt-8 flex flex-col gap-3 border-t border-neutral-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="inline-flex items-center justify-center gap-1.5 rounded-full border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 sm:justify-start"
                    >
                      <ChevronLeft className="h-4 w-4" aria-hidden />
                      {questionIndex === 0 ? "Change email" : "Previous"}
                    </button>
                    <button
                      id="join-quiz-next"
                      type="button"
                      disabled={!canContinueQuestion}
                      onClick={goToNextQuestion}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-neutral-950 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:opacity-70 sm:flex-initial sm:min-w-[180px]"
                    >
                      {questionIndex >= TOTAL - 1 ? "See my result" : "Next question"}
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </button>
                  </div>
                </QuizCard>
              </div>
            </div>
          ) : null}

          {phase === "result" ? (
            <div key="result" className="tf-quiz-panel">
              <div className="mb-6 rounded-2xl border border-neutral-100 bg-neutral-50/80 px-4 py-3 text-center sm:px-5">
                <p className="text-xs text-neutral-500">Joining waitlist as</p>
                <p className="mt-0.5 truncate text-sm font-semibold text-neutral-950">
                  {email}
                </p>
                <button
                  type="button"
                  onClick={() => setPhase("email")}
                  className="mt-2 text-xs font-medium text-neutral-600 underline-offset-2 hover:text-neutral-950 hover:underline"
                >
                  Change email
                </button>
              </div>

              <QuizResult band={band}>
                <JoinWaitlistConfirmForm
                  key={formKey}
                  email={email}
                  score={score}
                  band={band}
                  onClose={closeWaitlist}
                />
              </QuizResult>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
