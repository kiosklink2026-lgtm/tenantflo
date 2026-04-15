type SectionLabelProps = {
  children: React.ReactNode;
};

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
      {children}
    </p>
  );
}
