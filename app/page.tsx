import { Nav }              from "@/components/layout/nav";
import { Footer }           from "@/components/layout/footer";
import { Hero }             from "@/components/sections/hero";
import { IntroBlock }       from "@/components/sections/intro";
import { ProblemAgitation } from "@/components/sections/problem-agitation";
import { HowItWorks }       from "@/components/sections/how-it-works";
import { Features }         from "@/components/sections/features";
import { Testimonials }     from "@/components/sections/testimonials";
import { Pricing }          from "@/components/sections/pricing";
import { Faq }              from "@/components/sections/faq";
import { DemoForm }         from "@/components/sections/demo-form";
import { ProgressBar }      from "@/components/ui/progress-bar";

export default function HomePage() {
  return (
    <>
      <ProgressBar />
      <Nav />
      <main>
        <Hero />
        <IntroBlock />
        <ProblemAgitation />
        <HowItWorks />
        <Features />
        <Testimonials />
        <Pricing />
        <Faq />
        <DemoForm />
      </main>
      <Footer />
    </>
  );
}
