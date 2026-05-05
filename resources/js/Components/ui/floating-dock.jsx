"use client";
/**
 * Floating Dock — AK Kreatif
 * Mobile  : FAB → menu terbuka ke ATAS (vertical), submenu ke KIRI
 * Desktop : Magnifying dock bar di bottom center
 **/

import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";

export const FloatingDock = ({ items, desktopClassName, mobileClassName }) => (
  <>
    <FloatingDockDesktop items={items} className={desktopClassName} />
    <FloatingDockMobile  items={items} className={mobileClassName} />
  </>
);

// ─── MOBILE ──────────────────────────────────────────────────────────────────
// Menu membuka ke ATAS. Setiap item adalah pill (ikon + nama dalam 1 elemen).
// Submenu muncul ke KIRI dari pill item → tidak overflow ke kanan, tidak ke bawah.
const FloatingDockMobile = ({ items, className }) => {
  const [open, setOpen]             = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  return (
    <div className={cn("relative block md:hidden", className)}>

      {/* ── Menu items: flex-col ke atas ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute right-0 bottom-full mb-3 flex flex-col-reverse gap-2 items-end"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12, scale: 0.88, filter: "blur(4px)" }}
                animate={{
                  opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
                  transition: { delay: idx * 0.06, type: "spring", stiffness: 260, damping: 22 },
                }}
                exit={{
                  opacity: 0, y: 8, scale: 0.9, filter: "blur(4px)",
                  transition: { delay: (items.length - 1 - idx) * 0.04 },
                }}
                className="relative flex items-center"
              >
                {/* ── Submenu (ke KIRI dari pill) ──────────────────────────
                    right: 100% + mr-2 → muncul di sebelah kiri pill.
                    top-1/2 -translate-y-1/2 → sejajar vertikal dengan pill. */}
                <AnimatePresence>
                  {activeMenu === item.title && item.subItems && (
                    <motion.div
                      initial={{ opacity: 0, x: 12, scale: 0.93 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 12, scale: 0.93 }}
                      transition={{ type: "spring", stiffness: 300, damping: 24 }}
                      className="absolute right-full mr-2 bottom-0 min-w-[210px] bg-white backdrop-blur-2xl rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.18)] border border-black/10 overflow-hidden z-50"
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between px-4 py-2.5 border-b border-black/[0.06]">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                          {item.title}
                        </span>
                        <a
                          href={item.href}
                          className="text-[11px] font-bold text-secondary font-body"
                        >
                          Lihat Semua →
                        </a>
                      </div>
                      {/* Sub-links */}
                      <div className="p-1.5 flex flex-col gap-0.5">
                        {item.subItems.map(sub => (
                          <a
                            key={sub.name}
                            href={sub.href}
                            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-body font-semibold text-neutral-600 hover:text-secondary hover:bg-secondary/5 transition-colors"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-secondary/40 flex-shrink-0" />
                            {sub.name}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ── Pill Button (ikon + nama dalam 1 elemen) ── */}
                {item.subItems ? (
                  <button
                    onClick={() => setActiveMenu(activeMenu === item.title ? null : item.title)}
                    className={cn(
                      "flex items-center gap-2 h-11 pl-3 pr-3.5 rounded-full border backdrop-blur-xl shadow-lg transition-all duration-200 whitespace-nowrap",
                      activeMenu === item.title
                        ? "bg-secondary text-white border-secondary/50 shadow-secondary/20"
                        : "bg-white/95 text-neutral-700 border-black/8 hover:border-secondary/30"
                    )}
                  >
                    <div className={cn("h-4 w-4 flex-shrink-0 transition-colors",
                      activeMenu === item.title ? "text-white" : "text-neutral-500")}>
                      {item.icon}
                    </div>
                    <span className="text-[11px] font-bold font-body tracking-wide">
                      {item.title}
                    </span>
                    {/* Chevron — indikator punya submenu */}
                    <div className={cn(
                      "w-3.5 h-3.5 flex-shrink-0 transition-all duration-300",
                      activeMenu === item.title ? "rotate-180 text-white" : "text-secondary"
                    )}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" strokeWidth={3} className="w-full h-full">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                      </svg>
                    </div>
                  </button>
                ) : (
                  <a
                    href={item.href}
                    className="flex items-center gap-2 h-11 pl-3 pr-4 rounded-full bg-white/95 text-neutral-700 border border-black/8 backdrop-blur-xl shadow-lg hover:border-secondary/30 transition-all duration-200 whitespace-nowrap"
                  >
                    <div className="h-4 w-4 flex-shrink-0 text-neutral-500">{item.icon}</div>
                    <span className="text-[11px] font-bold font-body tracking-wide">{item.title}</span>
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FAB Trigger ── */}
      <button
        onClick={() => { setOpen(v => !v); if (open) setActiveMenu(null); }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-white shadow-xl hover:scale-105 active:scale-95 transition-transform relative z-50"
        aria-label="Toggle navigation menu"
      >
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <IconLayoutNavbarCollapse className="h-6 w-6" />
        </motion.div>
      </button>
    </div>
  );
};

// ─── DESKTOP ─────────────────────────────────────────────────────────────────
const FloatingDockDesktop = ({ items, className }) => {
  const mouseX = useMotionValue(Infinity);
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

// ─── DESKTOP ICON CONTAINER ───────────────────────────────────────────────────
function IconContainer({ mouseX, title, icon, href, subItems }) {
  const ref = useRef(null);
  const distance = useTransform(mouseX, (val) => {
    const b = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - b.x - b.width / 2;
  });
  const spring = { mass: 0.1, stiffness: 200, damping: 14 };
  const width      = useSpring(useTransform(distance, [-200, 0, 200], [44, 100, 44]), spring);
  const height     = useSpring(useTransform(distance, [-200, 0, 200], [44, 100, 44]), spring);
  const widthIcon  = useSpring(useTransform(distance, [-200, 0, 200], [22, 50, 22]), spring);
  const heightIcon = useSpring(useTransform(distance, [-200, 0, 200], [22, 50, 22]), spring);
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
        {subItems ? (
          <button type="button" className="absolute inset-0 z-10 rounded-full cursor-default" aria-label={title} />
        ) : (
          <a href={href} className="absolute inset-0 z-10 rounded-full" aria-label={title} />
        )}
        <AnimatePresence>
          {hovered && (
            subItems ? (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95, x: "-50%" }}
                animate={{ opacity: 1, y: 0,  scale: 1,    x: "-50%" }}
                exit={{ opacity: 0,   y: 10, scale: 0.95, x: "-50%" }}
                transition={{ type: "spring", stiffness: 250, damping: 20 }}
                style={{ transformOrigin: "bottom center" }}
                className="absolute bottom-full mb-8 left-1/2 min-w-[220px] w-max rounded-[1.5rem] border border-black/5 bg-white/95 backdrop-blur-3xl shadow-2xl overflow-hidden p-3 z-50 -translate-x-1/2"
              >
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[120px] h-10" />
                {subItems.map((item, i) => (
                  <a key={i} href={item.href}
                    className="group/sub flex items-center gap-3 px-4 py-3.5 mb-1 last:mb-0 rounded-xl font-body font-bold hover:bg-[#10b981]/10 text-black hover:text-[#10b981] transition-all duration-200"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-black/20 group-hover/sub:bg-[#10b981] group-hover/sub:scale-150 transition-all duration-200 flex-shrink-0" />
                    <span>{item.name}</span>
                  </a>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
                animate={{ opacity: 1, y: 0,  scale: 1,   x: "-50%" }}
                exit={{ opacity: 0,   y: 5,  scale: 0.8, x: "-50%" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ transformOrigin: "bottom center" }}
                className="absolute -top-10 left-1/2 rounded-full border border-black/5 bg-black px-4 py-1.5 font-body font-bold text-xs whitespace-nowrap text-white shadow-xl pointer-events-none -translate-x-1/2 z-[60]"
              >
                {title}
              </motion.div>
            )
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center pointer-events-none [&>svg]:text-black group-hover/icon:[&>svg]:text-[#10b981] [&>svg]:transition-colors [&>svg]:duration-300"
        >
          {icon}
        </motion.div>
        {subItems && (
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-black/20 group-hover/icon:bg-[#10b981] transition-colors pointer-events-none" />
        )}
      </motion.div>
    </div>
  );
}
