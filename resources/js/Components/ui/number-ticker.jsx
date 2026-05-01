import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export const NumberTicker = ({
  value,
  startValue = 0,
  direction = "up",
  delay = 0,
  decimalPlaces = 0,
  className,
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(direction === "down" ? value : startValue);

  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => {
      const target = direction === "down" ? startValue : value;
      const start = direction === "down" ? value : startValue;
      const duration = 1800;
      const startTime = performance.now();

      const animate = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutExpo
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = start + (target - start) * ease;
        setCount(parseFloat(current.toFixed(decimalPlaces)));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [inView, value, startValue, direction, delay, decimalPlaces]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {count.toLocaleString("id-ID", { minimumFractionDigits: decimalPlaces, maximumFractionDigits: decimalPlaces })}
    </span>
  );
};
