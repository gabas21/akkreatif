import { Link } from '@inertiajs/react';
import { useIntersection } from '@/hooks/useIntersection';
import { cn } from '@/lib/utils';
import { BackgroundBeams } from '@/Components/ui/background-beams';

import { LayoutTextFlip } from '@/Components/ui/layout-text-flip';

export default function CtaSection() {
    const [ref, isVisible] = useIntersection();

    return (
        <section className="py-20 sm:py-32 bg-primary relative overflow-hidden">
            {/* Aceternity Background Beams */}
            <BackgroundBeams />

            {/* Radial glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="container-custom relative z-10 text-center">
                <div
                    ref={ref}
                    className={cn(
                        "transition-all duration-1000 max-w-5xl mx-auto",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                    )}
                >
                    <span className="inline-block font-body text-xs font-medium uppercase tracking-[0.3em] text-secondary mb-6">
                        Mari Berkolaborasi
                    </span>
                    
                    <div className="mb-10">
                        <LayoutTextFlip 
                            text="Kami Siap Membantu"
                            words={["Web & Application", "Desain Grafis", "Social Media Management", "Foto, Video & Event"]}
                            className="font-display font-bold leading-tight"
                        />
                    </div>

                    <p className="font-body text-base sm:text-xl text-gray-300 mb-10 sm:mb-12 leading-relaxed">
                        Hubungi tim ahli kami hari ini dan mari kita diskusikan bagaimana kami bisa mentransformasi bisnis Anda di dunia digital.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            href="/contact"
                            className="bg-secondary text-white px-10 py-5 text-sm font-body font-medium uppercase tracking-widest hover:bg-accent hover:shadow-[0_0_40px_rgba(22,163,74,0.5)] transition-all duration-300 rounded-full"
                        >
                            Mulai Berkolaborasi
                        </Link>
                        <Link
                            href="/portfolio"
                            className="border border-white/20 text-white px-10 py-5 text-sm font-body font-medium uppercase tracking-widest hover:border-secondary hover:text-secondary transition-all duration-300 rounded-full"
                        >
                            Lihat Portfolio
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
