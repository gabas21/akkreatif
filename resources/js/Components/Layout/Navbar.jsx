import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import {
    AnimatePresence,
    motion,
    useScroll,
    useMotionValueEvent,
} from 'motion/react';

export default function Navbar() {
    const { scrollYProgress } = useScroll();
    const [visible, setVisible] = useState(true);

    useMotionValueEvent(scrollYProgress, "change", (current) => {
        // Check if current is not undefined and is a number
        if (typeof current === "number") {
            let direction = current - scrollYProgress.getPrevious();

            if (scrollYProgress.get() < 0.05) {
                setVisible(true);
            } else {
                if (direction < 0) {
                    setVisible(true);
                } else {
                    setVisible(false);
                }
            }
        }
    });

    return (
        <AnimatePresence mode="wait">
            <motion.nav
                initial={{
                    opacity: 1,
                    y: -100,
                }}
                animate={{
                    y: visible ? 0 : -100,
                    opacity: visible ? 1 : 0,
                }}
                transition={{
                    duration: 0.2,
                }}
                className={cn(
                    "flex flex-row fixed top-4 md:top-8 inset-x-0 mx-auto z-[5000]",
                    "max-w-fit items-center justify-between gap-4 md:gap-8 px-6 md:px-8 py-3",
                    "rounded-full border border-black/5 bg-white/90 backdrop-blur-2xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]"
                )}
            >
                {/* Brand Logo */}
                <Link href="/" className="group flex flex-shrink-0 items-end gap-1.5 focus:outline-none">
                    <img src="/images/brand/logo-ak.webp" alt="AK" width="120" height="40" fetchPriority="high" className="h-10 w-auto object-contain drop-shadow-[0_2px_8px_rgba(16,185,129,0.3)] transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-0.5 group-hover:drop-shadow-[0_4px_12px_rgba(16,185,129,0.5)]" />
                    <span className="font-display font-black text-[21px] leading-none tracking-tight text-brand-green transition-colors group-hover:text-black mb-0">
                        Kreatif
                    </span>
                </Link>

                <div className="w-[1px] h-6 bg-neutral-200"></div>


                {/* Premium Slogan Badge */}
                <div className="flex flex-shrink-0 items-center justify-center gap-2">
                    <div className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green"></span>
                    </div>
                    <span className="font-body text-xs md:text-sm font-bold uppercase tracking-[0.1em] md:tracking-[0.15em] text-neutral-700">
                        Mitra Kreasi Inovasi
                    </span>
                </div>
            </motion.nav>
        </AnimatePresence>
    );
}
