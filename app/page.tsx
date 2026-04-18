import { AudienceSection } from "@/components/landing/AudienceSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { EveryInteractionSection } from "@/components/landing/EveryInteractionSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { FinalCTASection } from "@/components/landing/FinalCTASection";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LostOpportunitiesSection } from "@/components/landing/LostOpportunitiesSection";
import { MoneyLossSection } from "@/components/landing/MoneyLossSection";
import { ObjectionSection } from "@/components/landing/ObjectionSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { WaitlistFlowProvider } from "@/components/landing/waitlist/WaitlistFlowContext";

export default function Home() {
  return (
    <WaitlistFlowProvider>
      <LandingHeader />
      <main>
        <HeroSection />
        <EveryInteractionSection />
        <ProblemSection />
        <MoneyLossSection />
        <HowItWorksSection />
        <LostOpportunitiesSection />
        <AudienceSection />
        <ObjectionSection />
        <PricingSection />
        <FAQSection />
        <ContactSection />
        <FinalCTASection />
      </main>
      <footer className="border-t border-neutral-100 py-10 text-center text-sm text-neutral-500">
        <p>
          <a
            href="mailto:hello@tenantflo.com"
            className="font-medium text-neutral-700 underline-offset-4 transition hover:text-neutral-950 hover:underline"
          >
            hello@tenantflo.com
          </a>
        </p>
        <p className="mt-2">
          © {new Date().getFullYear()} TenantFlo. All rights reserved.
        </p>
      </footer>
    </WaitlistFlowProvider>
  );
}
