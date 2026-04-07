"use client"

import { motion, useMotionValue, useAnimationFrame, AnimatePresence } from "motion/react";
import { ReactNode, useEffect, useMemo, useState } from "react";

interface FloatingItemProps {
  position: { x: number; y: number };
  ampScale?: number;
  freqScale?: number;
  initialDelay?: number;
  onClick?: () => void;
  children: ReactNode;
  card?: ReactNode;
}

export default function FloatingItem({ position, ampScale = 1, freqScale = 1, initialDelay = 0, onClick, children, card }: FloatingItemProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const params = useMemo(() => ({
    xAmp:   8  + Math.random() * 14,
    yAmp:   10 + Math.random() * 16,
    xFreq:  0.25 + Math.random() * 0.35,
    yFreq:  0.20 + Math.random() * 0.30,
    xPhase: Math.random() * Math.PI * 2,
    yPhase: Math.random() * Math.PI * 2,
  }), []);

  useAnimationFrame((t) => {
    const s = t / 1000;
    const mobileScale = isMobile ? 0.4 : 1;
    x.set(Math.sin(s * params.xFreq * freqScale * mobileScale + params.xPhase) * params.xAmp * ampScale * mobileScale);
    y.set(Math.sin(s * params.yFreq * freqScale * mobileScale + params.yPhase) * params.yAmp * ampScale * mobileScale);
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: initialDelay, ease: "easeOut" }}
      style={{
        position: "absolute",
        left: `calc(50% + ${position.x * 50}vw)`,
        top:  `calc(50% + ${position.y * 50}vh)`,
        transform: "translate(-50%, -50%)",
      }}
      onMouseEnter={() => card && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <motion.div style={{ x, y }}>
        {children}
        <AnimatePresence>
          {hovered && card && (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 6 }}
              animate={{ opacity: 1, scale: 1,    y: 0 }}
              exit={{    opacity: 0, scale: 0.92, y: 6 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              style={{
                position: "absolute",
                top: "100%",
                left: "50%",
                translateX: "-50%",
                marginTop: 5,
                zIndex: 50,
              }}
            >
              {card}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
