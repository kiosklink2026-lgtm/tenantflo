"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useWaitlistFlow } from "./WaitlistFlowContext";

type JoinWaitlistTriggerProps = {
  children: ReactNode;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "onClick">;

export function JoinWaitlistTrigger({
  children,
  className,
  ...rest
}: JoinWaitlistTriggerProps) {
  const { openWaitlist } = useWaitlistFlow();

  return (
    <button type="button" onClick={openWaitlist} className={className} {...rest}>
      {children}
    </button>
  );
}
