"use client";

import React from "react";

type ButtonProps = {
  variant?: "primary" | "outline" | "outline-dark" | "ghost";
  size?: "sm" | "md";
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  children: React.ReactNode;
};

const base =
  "inline-flex items-center justify-center font-sans font-medium transition-all duration-150 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 " +
  "disabled:opacity-40 disabled:cursor-not-allowed";

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-white text-black hover:bg-white/90 rounded-full",
  outline:
    "border border-white/30 text-white/70 hover:border-white/50 hover:text-white hover:bg-white/5 rounded-sm",
  "outline-dark":
    "border border-black/20 text-black/60 hover:border-black/50 hover:text-black hover:bg-black/5 rounded-sm",
  ghost: "text-white/50 hover:text-white",
};

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-7 py-3 text-sm",
  md: "px-12 py-5 text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  onClick,
  disabled,
  type = "button",
  className,
  children,
}: ButtonProps) {
  const cls = [base, variants[variant], sizes[size], className]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}
