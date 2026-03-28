import { Nav }              from "@/components/layout/nav";
import { Footer }           from "@/components/layout/footer";
import { Hero }             from "@/components/sections/hero";
import { ProblemAgitation } from "@/components/sections/problem-agitation";
import { HowItWorks }       from "@/components/sections/how-it-works";
import { Features }         from "@/components/sections/features";
import { Testimonials }     from "@/components/sections/testimonials";
import { Pricing }          from "@/components/sections/pricing";
import { CreatorEarn }      from "@/components/sections/creator-earn";
import { Faq }              from "@/components/sections/faq";
import { GetStarted }       from "@/components/sections/get-started";
import { FaceDemo }         from "@/components/sections/face-demo";
import { ProgressBar }      from "@/components/ui/progress-bar";

export default function HomePage() {
  return (
    <>
      <ProgressBar />
      <Nav />
      <main>
        <Hero />
        <FaceDemo />
        <ProblemAgitation />
        <HowItWorks />
        <Features />
        <Testimonials />
        <Pricing />
        <CreatorEarn />
        <Faq />
        <GetStarted />
      </main>
      <Footer />
    </>
  );
}
