"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { JoinWaitlistModal } from "./JoinWaitlistModal";

type WaitlistFlowContextValue = {
  open: boolean;
  openWaitlist: () => void;
  closeWaitlist: () => void;
};

const WaitlistFlowContext = createContext<WaitlistFlowContextValue | null>(
  null,
);

export function WaitlistFlowProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openWaitlist = useCallback(() => setOpen(true), []);
  const closeWaitlist = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({
      open,
      openWaitlist,
      closeWaitlist,
    }),
    [open, openWaitlist, closeWaitlist],
  );

  return (
    <WaitlistFlowContext.Provider value={value}>
      {children}
      <JoinWaitlistModal />
    </WaitlistFlowContext.Provider>
  );
}

export function useWaitlistFlow() {
  const ctx = useContext(WaitlistFlowContext);
  if (!ctx) {
    throw new Error("useWaitlistFlow must be used within WaitlistFlowProvider");
  }
  return ctx;
}
