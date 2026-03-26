"use client";

import { motion, type Variants } from "framer-motion";
import { ReactNode } from "react";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

// ── FadeUp ────────────────────────────────────────────────────────────────────
interface FadeUpProps {
  children: ReactNode;
  delay?:   number;
  className?: string;
}
export function FadeUp({ children, delay = 0, className }: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── FadeIn ────────────────────────────────────────────────────────────────────
interface FadeInProps {
  children: ReactNode;
  delay?:   number;
  className?: string;
}
export function FadeIn({ children, delay = 0, className }: FadeInProps) {
  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.span>
  );
}

// ── StaggerParent ─────────────────────────────────────────────────────────────
const staggerParentVariants: Variants = {
  hidden: {},
  visible: (delayChildren: number) => ({
    transition: { staggerChildren: 0.07, delayChildren },
  }),
};

interface StaggerParentProps {
  children:       ReactNode;
  className?:     string;
  delayChildren?: number;
}
export function StaggerParent({ children, className, delayChildren = 0 }: StaggerParentProps) {
  return (
    <motion.div
      variants={staggerParentVariants}
      custom={delayChildren}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── StaggerChild ──────────────────────────────────────────────────────────────
const childVariants: Variants = {
  hidden:  { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease } },
};

interface StaggerChildProps {
  children:  ReactNode;
  className?: string;
}
export function StaggerChild({ children, className }: StaggerChildProps) {
  return (
    <motion.div variants={childVariants} className={className}>
      {children}
    </motion.div>
  );
}
