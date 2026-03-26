"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FadeUp } from "@/components/ui/motion";
import { useLocale } from "@/lib/locale-context";

const faqData = [
  { q:{th:"Lisa Modeling Protection คืออะไรกันแน่?",en:"What exactly is Lisa Modeling Protection?"},
    a:{th:"Lisa คือแพลตฟอร์ม AI ที่ช่วยนางแบบ อินฟลูเอนเซอร์ และดาราปกป้องตัวเองในโลกดิจิทัล เราสแกนอินเทอร์เน็ตตลอดเวลาเพื่อหาและลบการนำรูปหน้า เสียง หรือแบรนด์ของคุณไปใช้โดยไม่ได้รับอนุญาต รวมถึง Deepfake และเนื้อหาที่สร้างด้วย AI",
       en:"Lisa is an AI platform that helps models, influencers, and public figures protect themselves online. We continuously scan the internet to find and remove unauthorized use of your face, voice, or brand — including deepfakes and AI-generated content."} },
  { q:{th:"เทคโนโลยีนี้ทำงานยังไง?",en:"How does the technology work?"},
    a:{th:"Lisa ใช้เซิร์ฟเวอร์จำนวนมากทั่วโลกสแกนทุกอย่างที่ถูกอัปโหลดขึ้นอินเทอร์เน็ตในแต่ละวัน ระบบจะเทียบทุกรูปและทุกเสียงกับ \"ลายเซ็น\" ของคุณที่ลงทะเบียนไว้ เราประมวลผลเนื้อหาทั้งหมดใน 24 ชั่วโมง ไม่หยุดพัก 365 วัน",
       en:"Lisa uses distributed servers worldwide to scan everything uploaded to the internet daily. Every image and audio clip is compared against your registered digital signature. We process content 24/7, 365 days a year."} },
  { q:{th:"ข้อมูลส่วนตัวของเราจะถูกนำไปใช้ทำอะไร?",en:"How is my personal and biometric data used?"},
    a:{th:"เราเอาข้อมูลไบโอเมตริกของคุณไปใช้แค่เพื่อค้นหาบนอินเทอร์เน็ตเท่านั้น ไม่แชร์ให้ใคร ไม่ขายข้อมูล และเราไม่เอารูปและเสียงของคุณไปฝึก AI เด็ดขาด",
       en:"Your biometric data is used exclusively to search the internet on your behalf. We never share or sell it, and we do not use your face or voice to train AI models."} },
  { q:{th:"จับ Deepfake ที่สร้างด้วย AI ได้จริงไหม?",en:"Can you really detect AI-generated deepfakes?"},
    a:{th:"ได้เลย ระบบของเราฝึกมาโดยเฉพาะเพื่อจับเนื้อหา AI ทั้ง Deepfake การสลับหน้า การโคลนเสียง และสื่อที่ถูกดัดแปลงจาก Midjourney, Stable Diffusion, Sora และอื่นๆ",
       en:"Yes. Our system is trained specifically to detect AI content — deepfakes, face swaps, voice clones, and manipulated media from Midjourney, Stable Diffusion, Sora, and others."} },
  { q:{th:"ลบเนื้อหาได้เร็วแค่ไหน?",en:"How quickly can content be removed?"},
    a:{th:"พอคุณกดอนุมัติ เราเริ่มดำเนินการทันทีเลย แต่โดยเฉลี่ยแล้วไม่เกิน 24 ชั่วโมง เราติดตามทุกคำขอและส่งซ้ำอัตโนมัติ",
       en:"The moment you approve, we act immediately. Average removal is under 24 hours. We track every request and automatically re-submit if needed."} },
  { q:{th:"เว็บไซต์สำหรับผู้ใหญ่ก็ตรวจสอบด้วยไหม?",en:"Do you scan adult content sites?"},
    a:{th:"ตรวจสอบด้วยครับ Lisa สแกนเว็บผู้ใหญ่ บอร์ดภาพ และแพลตฟอร์มสมาชิกต่างๆ ด้วย",
       en:"Yes. Lisa scans adult websites, image boards, and subscription platforms, acting through both automated and legal channels."} },
  { q:{th:"เอเจนซี่จัดการนักแสดงหลายคนพร้อมกันได้ไหม?",en:"Can agencies manage multiple talent?"},
    a:{th:"ได้เลยครับ แผนองค์กรของเราออกแบบมาเพื่อเอเจนซี่โดยเฉพาะ มีแดชบอร์ดรวม ทำรายงาน White-label ได้ พร้อม API และผู้จัดการบัญชีเฉพาะ",
       en:"Absolutely. Our Enterprise plan includes a unified dashboard, white-label reporting, API access, and a dedicated account manager."} },
];

export function Faq() {
  const { t, locale } = useLocale();
  const [open, setOpen] = useState<number|null>(0);

  return (
    <section id="faq" className="bg-[#050505] py-28 flex flex-col items-center">
      <div className="w-full max-w-2xl px-6 sm:px-8">

        <FadeUp className="text-center mb-12">
          <p className="text-white/25 text-xs font-mono tracking-[.2em] uppercase mb-3">{t("faq_eyebrow")}</p>
          <h2 className="text-white font-extrabold text-[clamp(28px,5vw,48px)] leading-tight tracking-tight">
            {t("faq_h2")}
          </h2>
        </FadeUp>

        <div className="rounded-2xl border border-white/8 overflow-hidden bg-black divide-y divide-white/5">
          {faqData.map((item,i) => (
            <div key={i}>
              <button onClick={() => setOpen(open===i?null:i)}
                className="w-full flex items-start justify-between gap-5 px-6 py-5
                           text-left hover:bg-white/[0.02] transition-colors">
                <span className={`font-medium text-sm leading-snug transition-colors
                  ${open===i?"text-white":"text-white/50"}`}>
                  {item.q[locale]}
                </span>
                <motion.span animate={{ rotate:open===i?45:0 }} transition={{ duration:0.18 }}
                  className="text-white/25 text-xl leading-none shrink-0 mt-0.5">+</motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open===i && (
                  <motion.div key="c"
                    initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }}
                    exit={{ height:0, opacity:0 }}
                    transition={{ duration:0.22, ease:[0.4,0,0.2,1] }}
                    style={{ overflow:"hidden" }}>
                    <div className="px-6 pb-5 text-white/35 text-sm leading-relaxed">{item.a[locale]}</div>
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
