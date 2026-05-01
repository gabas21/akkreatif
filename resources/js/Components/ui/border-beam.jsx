import React from "react";
import { cn } from "@/lib/utils";

export const BorderBeam = ({
  className,
  size = 200,
  duration = 12,
  delay = 0,
  colorFrom = "#10b981",
  colorTo = "#34d399",
  borderWidth = 1.5,
  reverse = false,
  style,
}) => {
  return (
    <div
      style={{
        "--size": size,
        "--duration": duration,
        "--delay": `-${delay}s`,
        "--color-from": colorFrom,
        "--color-to": colorTo,
        "--border-width": borderWidth,
        ...style,
      }}
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit]",
        className
      )}
    >
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          padding: borderWidth,
          background: `linear-gradient(#0000, #0000) padding-box, conic-gradient(from calc(var(--angle, 0) * 1deg), transparent 0%, var(--color-from) 10%, var(--color-to) 20%, transparent 30%) border-box`,
          animation: `border-beam-rotate ${duration}s linear ${delay}s infinite ${reverse ? "reverse" : "normal"}`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
      />
      <style>{`
        @property --angle {
          syntax: "<number>";
          inherits: false;
          initial-value: 0;
        }
        @keyframes border-beam-rotate {
          to { --angle: 360; }
        }
      `}</style>
    </div>
  );
};
