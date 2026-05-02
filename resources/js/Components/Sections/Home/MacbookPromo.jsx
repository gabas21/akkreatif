import React, { useRef, useEffect, useState } from "react";
import { MacbookScroll } from "@/Components/ui/macbook-scroll";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const projects = [
  { title: 'E-Commerce Reimagined', category: 'Web Development', img: '/images/unsplash/1460925895917-afdab827c52f.webp', tag: 'Featured' },
  { title: 'Corporate Identity', category: 'Graphic Design', img: '/images/unsplash/1600109727447-da7ba2dc2b32.webp', tag: 'Branding' },
  { title: 'Tech Startup Landing', category: 'Web Design', img: '/images/unsplash/1547658719-da2b51169166.webp', tag: 'UI/UX' },
  { title: 'Annual Festival 2025', category: 'Event Organizer', img: '/images/unsplash/1540575467063-178a50c2df87.webp', tag: 'Event' },
];

export default function MacbookPromo() {
  const containerRef = useRef(null);
  // ── KEY FIX: React state controls whether MacBook is in DOM at all ──
  const [showMacbook, setShowMacbook] = useState(true);
  const [showGrid, setShowGrid]       = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Watch scroll and toggle DOM presence — this completely eliminates the 3D bleed issue
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    // Lock scroll during transition
    if (v > 0.45 && v < 0.97) {
      document.documentElement.style.overscrollBehavior = "none";
    } else {
      document.documentElement.style.overscrollBehavior = "";
    }

    // Remove MacBook from DOM once it's gone — opacity: 0 alone isn't enough for 3D elements
    setShowMacbook(v < 0.52);

    // Show clone grid just after macbook exits
    setShowGrid(v > 0.50);
  });

  useEffect(() => {
    return () => { document.documentElement.style.overscrollBehavior = ""; };
  }, []);

  // MacBook animation values (only matter while it's in DOM)
  const macbookOpacity = useTransform(scrollYProgress, [0.38, 0.52], [1, 0]);
  const macbookY       = useTransform(scrollYProgress, [0.38, 0.52], [0, -70]);
  const macbookScale   = useTransform(scrollYProgress, [0.38, 0.52], [1, 0.93]);

  // Clone grid grows into view
  const cloneOpacity  = useTransform(scrollYProgress, [0.50, 0.62], [0, 1]);
  const cloneW        = useTransform(scrollYProgress, [0.52, 0.95], ["42%",  "100%"]);
  const cloneH        = useTransform(scrollYProgress, [0.52, 0.95], ["48vh", "100vh"]);
  const cloneRadius   = useTransform(scrollYProgress, [0.52, 0.92], ["18px",  "0px"]);

  return (
    <section ref={containerRef} className="w-full relative z-10 h-[380vh] -mt-10">

      {/* ── STICKY STAGE — solid background, nothing bleeds through ── */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-white">

        {/* ── SOLID WHITE FLOOR — always present, covers everything ── */}
        <div className="absolute inset-0 bg-white z-0" />

        {/* ── MACBOOK — removed from DOM (not just hidden) once faded ── */}
        {showMacbook && (
          <motion.div
            style={{ opacity: macbookOpacity, y: macbookY, scale: macbookScale }}
            className="w-full flex justify-center relative z-10"
          >
            <MacbookScroll
              showGradient={false}
              forceOpen={true}
              title={<span />}
            >
              <div className="w-full h-full bg-zinc-900 grid grid-cols-2 gap-1 p-1.5 overflow-hidden">
                {projects.map((p, i) => (
                  <div key={i} className="relative overflow-hidden rounded-md bg-zinc-800">
                    <img src={p.img} alt={p.title} width="300" height="200" loading="lazy" decoding="async" className="w-full h-full object-cover" draggable={false} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2">
                      <span className="text-emerald-400 text-[7px] uppercase tracking-widest font-medium">{p.category}</span>
                      <span className="text-white text-[10px] font-bold leading-tight">{p.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </MacbookScroll>
          </motion.div>
        )}

        {/* ── CLONE GRID — grows from MacBook screen center ── */}
        {showGrid && (
          <motion.div
            style={{ opacity: cloneOpacity, width: cloneW, height: cloneH, borderRadius: cloneRadius }}
            className="absolute z-20 overflow-hidden shadow-2xl"
          >
            <div className="w-full h-full flex flex-col overflow-hidden bg-white">

              {/* Header */}
              <div className="flex flex-row justify-between items-center px-8 pt-7 pb-5 border-b border-gray-100 shrink-0 bg-white">
                <div>
                  <span className="font-body text-xs font-medium uppercase tracking-[0.2em] text-secondary">Karya Berkelas</span>
                  <h2 className="font-display text-3xl md:text-4xl font-semibold text-primary mt-2">
                    Kompilasi Proyek <span className="text-secondary">Pilihan Spesial.</span>
                  </h2>
                </div>
                <a
                  href="/portfolio"
                  className="hidden md:inline-block border-b border-primary pb-1 font-body text-sm font-medium uppercase tracking-widest text-primary hover:text-secondary hover:border-secondary transition-colors"
                >
                  Jelajahi Semua Karya →
                </a>
              </div>

              {/* Grid — fills remaining height, no scroll */}
              <div className="grid grid-cols-2 gap-4 p-6 flex-1 min-h-0 bg-white">
                {projects.map((project, idx) => (
                  <div
                    key={idx}
                    className="group relative overflow-hidden rounded-2xl border border-gray-200 cursor-pointer h-full bg-gray-900"
                  >
                    <img
                      src={project.img}
                      alt={project.title}
                      width="600"
                      height="400"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      draggable={false}
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-secondary text-white text-xs font-medium uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                        {project.tag}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <span className="font-body text-xs font-medium uppercase tracking-widest text-secondary mb-2">{project.category}</span>
                      <h3 className="font-display text-xl font-semibold text-white">{project.title}</h3>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
