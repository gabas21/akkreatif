import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export const BlurFade = ({
  children,
  className,
  variant,
  duration = 0.5,
  delay = 0,
  offset = 24,
  inView = false,
  inViewMargin = "-50px",
  blur = "8px",
}) => {
  const ref = useRef(null);
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin });
  const isVisible = !inView || inViewResult;

  const defaultVariants = {
    hidden: { opacity: 0, y: offset, filter: `blur(${blur})` },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  };

  const combinedVariants = variant || defaultVariants;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={combinedVariants}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};
