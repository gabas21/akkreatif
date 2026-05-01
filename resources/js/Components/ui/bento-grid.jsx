"use client";
import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export const BentoGrid = ({ className, children }) => {
  return (
    <div className={cn("grid auto-rows-[18rem] grid-cols-3 gap-4", className)}>
      {children}
    </div>
  );
};

export const BentoGridItem = ({ className, title, description, icon, header }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const background = useMotionTemplate`radial-gradient(200px circle at ${mouseX}px ${mouseY}px, rgba(22,163,74,0.08), transparent 80%)`;

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn(
        "group/bento relative row-span-1 flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-surface p-6 transition-all duration-300 hover:shadow-xl hover:border-secondary/40",
        className
      )}
    >
      {/* Spotlight effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover/bento:opacity-100"
        style={{ background }}
      />

      {header && (
        <div className="relative z-10 mb-4 overflow-hidden rounded-2xl">{header}</div>
      )}

      <div className="relative z-10">
        {icon && (
          <div className="mb-4 w-12 h-12 bg-background border border-border flex items-center justify-center rounded-2xl group-hover/bento:bg-secondary group-hover/bento:border-secondary transition-all duration-500">
            <span className="text-primary group-hover/bento:text-white transition-colors duration-500">
              {icon}
            </span>
          </div>
        )}
        <h3 className="font-display font-semibold text-xl text-primary mb-2 group-hover/bento:text-secondary transition-colors duration-300">
          {title}
        </h3>
        {description && (
          <p className="font-body text-sm text-text-muted leading-relaxed">{description}</p>
        )}
      </div>
    </div>
  );
};
