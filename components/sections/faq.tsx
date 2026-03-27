"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FadeUp } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";
import { dur, ease } from "@/lib/animation";

const faqData = [
  { q:{th:"Lisa Modeling Protection คืออะไร?",en:"What is Lisa Modeling Protection?"},
    a:{th:"Lisa สแกนอินเทอร์เน็ตตลอด 24 ชั่วโมงเพื่อหาและลบการนำรูปหน้า เสียง หรือแบรนด์ของคุณไปใช้โดยไม่ได้รับอนุญาต รวมถึง Deepfake และเนื้อหาที่สร้างด้วย AI",
       en:"Lisa scans the internet 24/7 to find and remove unauthorized use of your face, voice, or brand — including deepfakes and AI-generated content."} },
  { q:{th:"เทคโนโลยีนี้ทำงานยังไง?",en:"How does the technology work?"},
    a:{th:"เราเทียบทุกรูปและเสียงที่ถูกอัปโหลดบนอินเทอร์เน็ตกับลายเซ็นดิจิทัลของคุณ ตลอด 24 ชั่วโมง 365 วัน",
       en:"We compare everything uploaded online against your digital signature — images, audio, and video — continuously, 24/7."} },
  { q:{th:"ข้อมูลส่วนตัวของฉันจะถูกนำไปใช้ทำอะไร?",en:"How is my biometric data used?"},
    a:{th:"ข้อมูลไบโอเมตริกของคุณใช้แค่เพื่อค้นหาบนอินเทอร์เน็ตเท่านั้น เราไม่แชร์ ไม่ขาย และไม่นำไปฝึก AI",
       en:"Your biometric data is used exclusively to search the internet on your behalf. We never share or sell it, and we never use it to train AI models."} },
  { q:{th:"จับ Deepfake ที่สร้างด้วย AI ได้จริงไหม?",en:"Can you detect AI-generated deepfakes?"},
    a:{th:"ได้ ระบบของเราฝึกมาเพื่อจับ Deepfake การสลับหน้า การโคลนเสียง และสื่อที่ดัดแปลงจาก Midjourney, Stable Diffusion, Sora และอื่นๆ",
       en:"Yes. Our system detects deepfakes, face swaps, voice clones, and AI-manipulated media from Midjourney, Stable Diffusion, Sora, and others."} },
  { q:{th:"ลบเนื้อหาได้เร็วแค่ไหน?",en:"How quickly can content be removed?"},
    a:{th:"พอคุณกดอนุมัติ เราเริ่มดำเนินการทันที โดยเฉลี่ยไม่เกิน 24 ชั่วโมง เราติดตามทุกคำขอและส่งซ้ำอัตโนมัติ",
       en:"The moment you approve, we act. Average removal is under 24 hours. We track every request and re-submit automatically if needed."} },
  { q:{th:"เว็บไซต์สำหรับผู้ใหญ่ก็สแกนด้วยไหม?",en:"Do you scan adult content sites?"},
    a:{th:"ใช่ Lisa สแกนเว็บผู้ใหญ่ บอร์ดภาพ และแพลตฟอร์มสมาชิกต่างๆ ด้วย",
       en:"Yes. Lisa scans adult websites, image boards, and subscription platforms through both automated and legal channels."} },
  { q:{th:"เอเจนซี่จัดการนักแสดงหลายคนได้ไหม?",en:"Can agencies manage multiple talent?"},
    a:{th:"ได้ แผน Enterprise มีแดชบอร์ดรวม รายงาน White-label API และผู้จัดการบัญชีเฉพาะ",
       en:"Yes. Enterprise includes a unified dashboard, white-label reporting, API access, and a dedicated account manager."} },
  // ⚠️ Q8: Needs legal review before publishing — GDPR / biometric data policy
  { q:{th:"ข้อมูลของฉัน GDPR compliant ไหม?",en:"Is my data GDPR compliant?"},
    a:{th:"ใช่ เราประมวลผลข้อมูลไบโอเมตริกภายใต้ความยินยอมโดยชัดแจ้งตามมาตรา 9 GDPR ข้อมูลถูกเข้ารหัสและสามารถลบได้ภายใน 72 ชั่วโมงตามคำขอ",
       en:"Yes. We process biometric data under explicit consent per GDPR Article 9. Your data is encrypted at rest, never sold or shared, and can be permanently deleted within 72 hours upon request."} },
  // ⚠️ Q9: Needs policy confirmation — escalation / guarantee triggers
  { q:{th:"ถ้าลบไม่ได้จะทำอย่างไร?",en:"What if you can't remove it?"},
    a:{th:"เราพยายามซ้ำ 3 ครั้งผ่านช่องทางที่แตกต่างกัน หากยังล้มเหลว เราส่งต่อให้ทีมกฎหมายและการรับประกัน Pro ของคุณจะถูกเรียกใช้โดยอัตโนมัติ",
       en:"We make three removal attempts through different channels. If all fail, the case is escalated to our legal team and your Pro guarantee automatically triggers — you won't be charged for that month."} },
  { q:{th:"เริ่มใช้งานได้เร็วแค่ไหน?",en:"How fast can I get started?"},
    a:{th:"สร้างบัญชีฟรีได้ใน 2 นาที สแกนครั้งแรกเสร็จภายใน 1 ชั่วโมง การดูตัวอย่างเป็นทางเลือก ไม่บังคับ",
       en:"Free account takes 2 minutes to create. Your first scan runs within 1 hour of uploading photos. The demo is completely optional — you can start protecting yourself right now without speaking to anyone."} },
];

export function Faq() {
  const { t, locale } = useLocale();
  const [open, setOpen] = useState<number|null>(0);

  return (
    <section id="faq" className="bg-surface-dark py-24 border-t border-white/6 flex flex-col items-center">
      <div className="w-full max-w-3xl px-8">

        <FadeUp className="mb-16 text-center">
          {/* Section marker */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="font-mono text-white/15 text-xs">05</span>
            <div className="w-8 h-px bg-white/10" />
            <span className="text-[10px] tracking-[.3em] uppercase text-white/25 font-sans">FAQ</span>
          </div>
          <h2
            className="font-display font-light text-white"
            style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
          >
            {t("faq_h2")}
          </h2>
        </FadeUp>

        <div className="divide-y divide-white/6">
          {faqData.map((item, i) => (
            <div key={i}>
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex justify-between items-start py-6 text-left gap-6">
                <span className={`font-sans font-medium text-base leading-snug transition-colors
                  ${open === i ? "text-white" : "text-white/60"}`}>
                  {item.q[locale]}
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.18 }}
                  className="text-white/25 text-xl leading-none shrink-0 mt-0.5 font-light">
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div key="c"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: dur.fast, ease: ease.decelerate }}
                    style={{ overflow: "hidden" }}>
                    <div className="pb-6 text-white/50 text-base leading-relaxed font-sans">
                      {item.a[locale]}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
