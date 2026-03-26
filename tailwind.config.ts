import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // z-index scale — replaces magic numbers (z-40, z-50, z-[9999])
      zIndex: {
        menu:     "40",
        nav:      "50",
        progress: "9999",
      },
    },
  },
} satisfies Config;
