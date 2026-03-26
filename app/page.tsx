import { Nav }              from "@/components/layout/nav";
import { Footer }           from "@/components/layout/footer";
import { Hero }             from "@/components/sections/hero";
import { ThreatTicker }     from "@/components/sections/threat-ticker";
import { ProblemAgitation } from "@/components/sections/problem-agitation";
import { Statement }        from "@/components/sections/statement";
import { HowItWorks }       from "@/components/sections/how-it-works";
import { Features }         from "@/components/sections/features";
import { Testimonials }     from "@/components/sections/testimonials";
import { Guarantee }        from "@/components/sections/guarantee";
import { Pricing }          from "@/components/sections/pricing";
import { Faq }              from "@/components/sections/faq";
import { DemoForm }         from "@/components/sections/demo-form";
import { CtaBottom }        from "@/components/sections/cta-bottom";
import { ProgressBar }      from "@/components/ui/progress-bar";

export default function HomePage() {
  return (
    <>
      <ProgressBar />
      <Nav />
      <main>
        <Hero />
        <ThreatTicker />
        <ProblemAgitation />
        <Statement />
        <HowItWorks />
        <Features />
        <Testimonials />
        <Guarantee />
        <Pricing />
        <Faq />
        <DemoForm />
        <CtaBottom />
      </main>
      <Footer />
    </>
  );
}
