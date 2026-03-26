"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FadeUp } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";

const faqData = [
  {
    q: {
      th: "Lisa Modeling Protection คืออะไรกันแน่?",
      en: "What exactly is Lisa Modeling Protection?",
    },
    a: {
      th: "Lisa คือแพลตฟอร์ม AI ที่ช่วยนางแบบ อินฟลูเอนเซอร์ และดาราปกป้องตัวเองในโลกดิจิทัล เราสแกนอินเทอร์เน็ตตลอดเวลาเพื่อหาและลบการนำรูปหน้า เสียง หรือแบรนด์ของคุณไปใช้โดยไม่ได้รับอนุญาต รวมถึง Deepfake และเนื้อหาที่สร้างด้วย AI",
      en: "Lisa is an AI platform that helps models, influencers, and public figures protect themselves online. We continuously scan the internet to find and remove unauthorized use of your face, voice, or brand — including deepfakes and AI-generated content.",
    },
  },
  {
    q: {
      th: "เทคโนโลยีนี้ทำงานยังไง?",
      en: "How does the technology work?",
    },
    a: {
      th: "Lisa ใช้เซิร์ฟเวอร์จำนวนมากทั่วโลกสแกนทุกอย่างที่ถูกอัปโหลดขึ้นอินเทอร์เน็ตในแต่ละวัน ระบบจะเทียบทุกรูปและทุกเสียงกับ \"ลายเซ็น\" ของคุณที่ลงทะเบียนไว้ ถ้าเจออะไรน่าสงสัยก็แจ้งทันที เราประมวลผลเนื้อหาทั้งหมดใน 24 ชั่วโมง ไม่หยุดพัก 365 วัน",
      en: "Lisa uses distributed servers worldwide to scan everything uploaded to the internet daily. Every image and audio clip is compared against your registered \"digital signature\". If anything suspicious is found, you're alerted immediately. We process content 24 hours a day, 365 days a year.",
    },
  },
  {
    q: {
      th: "ข้อมูลส่วนตัวและรูปหน้าของเราจะถูกนำไปใช้ทำอะไร?",
      en: "How is my personal data and biometric information used?",
    },
    a: {
      th: "เราเอาข้อมูลไบโอเมตริกของคุณไปใช้แค่เพื่อค้นหาบนอินเทอร์เน็ตเท่านั้น ไม่แชร์ให้ใคร ไม่ขายข้อมูล ไม่มีโฆษณา และเราไม่เอารูปและเสียงของคุณไปฝึก AI เด็ดขาด",
      en: "Your biometric data is used exclusively for searching the internet on your behalf. We never share it, sell it, or use it for advertising. We absolutely do not use your face or voice to train AI models.",
    },
  },
  {
    q: {
      th: "จับ Deepfake ที่สร้างด้วย AI ได้จริงไหม?",
      en: "Can you really detect AI-generated deepfakes?",
    },
    a: {
      th: "ได้เลย ระบบของเราฝึกมาโดยเฉพาะเพื่อจับเนื้อหา AI ทั้ง Deepfake การสลับหน้า การโคลนเสียง และสื่อที่ถูกดัดแปลงจาก Midjourney, Stable Diffusion, Sora และอื่นๆ",
      en: "Yes. Our system is specifically trained to detect AI content — deepfakes, face swaps, voice clones, and manipulated media from Midjourney, Stable Diffusion, Sora, and others.",
    },
  },
  {
    q: {
      th: "ลบเนื้อหาได้เร็วแค่ไหน?",
      en: "How quickly can content be removed?",
    },
    a: {
      th: "พอคุณกดอนุมัติ เราเริ่มดำเนินการทันทีเลย แต่ละแพลตฟอร์มมีความเร็วต่างกัน แต่โดยเฉลี่ยแล้วไม่เกิน 24 ชั่วโมง เราติดตามทุกคำขอและส่งซ้ำอัตโนมัติ คุณจะได้รับยืนยันตอนที่เนื้อหาหายไปแล้วจริงๆ",
      en: "The moment you approve, we act immediately. Each platform varies in speed, but the average removal time is under 24 hours. We track every request and automatically re-submit. You receive confirmation once content is actually gone.",
    },
  },
  {
    q: {
      th: "เว็บไซต์สำหรับผู้ใหญ่ก็ตรวจสอบด้วยไหม?",
      en: "Do you scan adult content sites too?",
    },
    a: {
      th: "ตรวจสอบด้วยครับ นี่เป็นหนึ่งในปัญหาที่นางแบบเจอบ่อยที่สุด Lisa สแกนเว็บผู้ใหญ่ บอร์ดภาพ และแพลตฟอร์มสมาชิกต่างๆ ด้วย แล้วดำเนินการลบทั้งผ่านช่องทางอัตโนมัติและช่องทางกฎหมาย",
      en: "Yes — this is one of the most common issues models face. Lisa scans adult websites, image boards, and subscription platforms, taking action through automated and legal channels.",
    },
  },
  {
    q: {
      th: "ถ้าเป็นเอเจนซี่ จัดการนักแสดงหลายคนพร้อมกันได้ไหม?",
      en: "Can agencies manage multiple talent at once?",
    },
    a: {
      th: "ได้เลยครับ แผนองค์กรของเราออกแบบมาเพื่อเอเจนซี่โดยเฉพาะ มีแดชบอร์ดรวมดูได้ทีเดียวทั้งสังกัด กำหนดการแจ้งเตือนแยกรายคน ทำรายงานแบบ White-label ได้ พร้อม API และผู้จัดการบัญชีเฉพาะคอยดูแล",
      en: "Absolutely. Our Enterprise plan is built for agencies — unified dashboard across all talent, individual alert controls, white-label reporting, API access, and a dedicated account manager.",
    },
  },
];

export function Faq() {
  const { t, locale } = useLocale();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-[6%] bg-[#0a0a0a]">
      <div className="max-w-3xl mx-auto">

        <FadeUp className="text-center mb-14">
          <div className="inline-block text-white/30 text-[11px] font-medium tracking-[.2em]
                          uppercase mb-4 px-3 py-1 rounded-full border border-white/8">
            {t("faq_eyebrow")}
          </div>
          <h2 className="text-white font-extrabold text-[clamp(28px,5vw,44px)] leading-tight">
            {t("faq_h2")}
          </h2>
        </FadeUp>

        <div className="flex flex-col divide-y divide-white/6 rounded-2xl border border-white/8 overflow-hidden">
          {faqData.map((item, i) => (
            <div key={i} className="bg-[#0f0f0f]">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4
                           px-6 py-5 text-left hover:bg-white/[0.02]
                           transition-colors duration-150"
              >
                <span className={`font-medium text-[15px] leading-snug transition-colors
                  ${open === i ? "text-white" : "text-white/60"}`}>
                  {item.q[locale]}
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-white/30 text-[20px] leading-none flex-shrink-0"
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="px-6 pb-6 text-white/45 text-[14px] leading-relaxed">
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
