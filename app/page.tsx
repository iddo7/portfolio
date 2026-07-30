"use client"

import { motion } from "motion/react";
import FloatingItem from "@/app/components/FloatingItem";
import { cn } from "@/lib/utils";

const EMAIL = "isaacnegreiros10@gmail.com";

const items = [
  {
    key: "quillz",
    label: "quillz",
    href: "https://www.quillz.co",
    position: { x: 0.34, y: -0.22 },
    className: "text-amber-500",
    card: (
      <div className="w-52 border border-amber-500/20 bg-olive-50/20 backdrop-blur-sm p-3 text-sm text-olive-700 shadow-md">
        <p className="font-medium text-amber-500 mb-1">quillz</p>
        <p className="leading-snug text-olive-600/80">a writing app — think, draft, and refine ideas in one place.</p>
      </div>
    ),
  },
  {
    key: "goodwhen",
    label: "goodwhen",
    href: "https://goodwhen.isaacnegreiros.com",
    position: { x: 0.58, y: 0.08 },
    className: "text-violet-500",
    card: (
      <div className="w-52 border border-violet-500/20 bg-violet-50/50 p-3 text-sm text-violet-950 shadow-md backdrop-blur-sm">
        <p className="mb-1 font-medium text-violet-500">goodwhen</p>
        <p className="leading-snug text-violet-950/70">an accountless availability poll for finding a time that works.</p>
      </div>
    ),
  },
  {
    key: "linked_in",
    label: "linkedin",
    href: "https://www.linkedin.com/in/isaac-negreiros/",
    position: { x: -0.75, y: 0.45 },
  },
  {
    key: "github",
    label: "github",
    href: "https://github.com/iddo7",
    position: { x: -0.65, y: 0.55 },
  },
  {
    key: "instagram",
    label: "instagram",
    href: "https://www.instagram.com/isaac.ngrs/",
    position: { x: -0.55, y: 0.72 },
  },
  {
    key: "email",
    label: EMAIL,
    href: "#",
    position: { x: 0.28, y: 0.38 },
    onClick: () => navigator.clipboard.writeText(EMAIL),
  },
];

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden bg-olive-50">
      <div className="relative h-full flex items-center justify-center">
        <motion.h1
          className="text-2xl md:text-[3rem] font-medium tracking-tight text-muted-foreground"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          hi, I'm isaac negreiros
        </motion.h1>
      </div>

      <div className="absolute inset-0 z-10">
        {items.map(({ key, href, label, position, className, card, onClick }, i) => (
          <FloatingItem
            key={key}
            position={position}
            freqScale={1.5}
            initialDelay={0.3 + i * 0.2}
            card={card}
            onClick={onClick}
          >
            <a
              href={onClick ? undefined : href}
              className={cn("text-base md:text-2xl hover:underline text-olive-600 cursor-pointer", className)}
            >
              {label}
            </a>
          </FloatingItem>
        ))}
      </div>
    </main>
  );
}
