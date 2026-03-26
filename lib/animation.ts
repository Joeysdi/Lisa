export const dur = {
  instant:   0.15,   // micro-interactions (hover, toggle)
  fast:      0.22,   // accordion, panel swap
  base:      0.35,   // StaggerChild
  enter:     0.45,   // FadeUp, page entrances
  slow:      0.60,   // deliberate transitions
} as const;

export const ease = {
  standard:   [0.25, 0.46, 0.45, 0.94] as const,   // FadeUp, entrances
  decelerate: [0.4, 0, 0.2, 1]         as const,   // accordion, panel
  spring:     { type: "spring", stiffness: 400, damping: 30 } as const,
} as const;

export const stagger = {
  base: 0.07,
  slow: 0.12,
} as const;
