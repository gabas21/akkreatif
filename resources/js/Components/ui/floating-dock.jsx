"use client";
/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/

import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

import { useRef, useState } from "react";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute right-0 bottom-full mb-5 flex flex-col gap-5 items-end"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15, scale: 0.9, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{
                  opacity: 0,
                  y: 10,
                  scale: 0.9,
                  filter: "blur(4px)",
                  transition: { delay: idx * 0.05 },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05, type: "spring", stiffness: 200, damping: 20 }}
                className="flex flex-col items-end gap-2"
              >
                <a
                  href={item.href}
                  className="flex items-center gap-3 px-4 h-14 rounded-full bg-white/95 dark:bg-neutral-900/95 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-black/5 backdrop-blur-xl whitespace-nowrap"
                >
                  <span className="font-body text-sm font-bold text-neutral-700">{item.title}</span>
                  <div className="h-5 w-5 text-neutral-500">{item.icon}</div>
                </a>
                
                {item.subItems && (
                  <div className="flex flex-col gap-1 mr-2 bg-white/80 backdrop-blur-xl p-2 rounded-2xl shadow-lg border border-black/5">
                    {item.subItems.map(sub => (
                      <a 
                        href={sub.href} 
                        key={sub.name} 
                        className="px-4 py-2.5 text-xs font-body font-bold text-neutral-600 hover:text-secondary rounded-xl hover:bg-black/5 text-right w-full transition-colors flex items-center justify-end gap-2"
                      >
                        {sub.name}
                        <div className="w-1 h-1 rounded-full bg-secondary/50" />
                      </a>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-white shadow-xl hover:scale-105 active:scale-95 transition-transform"
      >
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ type: "spring", stiffness: 200, damping: 15 }}>
          <IconLayoutNavbarCollapse className="h-6 w-6" />
        </motion.div>
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden h-[72px] items-end gap-6 rounded-[2.5rem] bg-white/90 border border-black/5 px-6 pb-3.5 md:flex shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-2xl",
        className,
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  subItems,
}) {
  let ref = useRef(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  // Wider detection radius + bigger max size for dramatic dock effect
  let widthTransform = useTransform(distance, [-200, 0, 200], [44, 100, 44]);
  let heightTransform = useTransform(distance, [-200, 0, 200], [44, 100, 44]);

  let widthTransformIcon = useTransform(distance, [-200, 0, 200], [22, 50, 22]);
  let heightTransformIcon = useTransform(
    distance,
    [-200, 0, 200],
    [22, 50, 22],
  );

  // Bouncy spring physics for fluid dock feel
  const springConfig = {
    mass: 0.1,
    stiffness: 200,
    damping: 14,
  };

  let width = useSpring(widthTransform, springConfig);
  let height = useSpring(heightTransform, springConfig);
  let widthIcon = useSpring(widthTransformIcon, springConfig);
  let heightIcon = useSpring(heightTransformIcon, springConfig);

  const [hovered, setHovered] = useState(false);

  return (
    <div 
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn("relative", hovered ? "z-50" : "z-10")}
    >
      <motion.div
        ref={ref}
        style={{ width, height }}
        className="relative flex aspect-square items-center justify-center rounded-full bg-black/5 hover:bg-[#10b981]/10 hover:shadow-inner transition-colors backdrop-blur-md group/icon"

      >
        <a href={href} className="absolute inset-0 z-10 rounded-full" aria-label={title}></a>
        <AnimatePresence>
          {hovered && (
            subItems ? (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95, filter: "blur(8px)", x: "-50%" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)", x: "-50%" }}
                exit={{ opacity: 0, y: 10, scale: 0.95, filter: "blur(4px)", x: "-50%" }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                style={{ transformOrigin: "bottom center" }}
                className="absolute bottom-full mb-8 left-1/2 min-w-[220px] w-max whitespace-nowrap rounded-[1.5rem] border border-black/5 bg-white/95 backdrop-blur-3xl shadow-2xl overflow-hidden p-3 text-sm text-black z-50 transform -translate-x-1/2"
              >
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[120px] h-10 bg-transparent"></div>
                {subItems.map((item, idx) => (
                  <a 
                    key={idx} 
                    href={item.href}
                    className="group flex items-center gap-3 px-4 py-3.5 mb-1 last:mb-0 rounded-xl font-body font-bold hover:bg-[#10b981]/10 text-black hover:text-[#10b981] transition-all duration-300 relative z-20"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-black/20 group-hover:bg-[#10b981] group-hover:scale-150 transition-all duration-300 flex-shrink-0" />
                    <span>{item.name}</span>
                  </a>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8, filter: "blur(4px)", x: "-50%" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)", x: "-50%" }}
                exit={{ opacity: 0, y: 5, scale: 0.8, filter: "blur(4px)", x: "-50%" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ transformOrigin: "bottom center" }}
                className="absolute -top-10 left-1/2 rounded-full border border-black/5 bg-black backdrop-blur-md px-4 py-1.5 font-body font-bold text-xs whitespace-nowrap text-white shadow-xl pointer-events-none transform -translate-x-1/2 z-[60]"
              >
                {title}
              </motion.div>
            )
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center pointer-events-none z-0 [&>svg]:text-black group-hover/icon:[&>svg]:text-[#10b981] [&>svg]:transition-colors [&>svg]:duration-300"
        >
          {icon}
        </motion.div>
      </motion.div>
    </div>
  );
}
