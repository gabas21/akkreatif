import React from 'react';
import { cn } from '@/lib/utils';
import { useIntersection } from '@/hooks/useIntersection';
import { BlurFade } from '@/Components/ui/blur-fade';
import { IconClock, IconBox, IconCheck } from '@tabler/icons-react';

export default function ServiceDeliverables({ packages, accentColor = "#10b981", className }) {
    const [ref, visible] = useIntersection();

    return (
        <section className={cn("py-16 sm:py-24 relative overflow-hidden bg-black", className)} ref={ref}>
            {/* Background elements */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
            <div 
                className="absolute top-0 right-0 w-[500px] h-[500px] opacity-20 blur-[100px] pointer-events-none mix-blend-screen"
                style={{ backgroundColor: accentColor }}
            />

            <div className="container-custom relative z-10">
                <div className="text-center mb-16">
                    <BlurFade delay={0.1} inView={visible}>
                        <span 
                            className="font-mono text-xs font-bold uppercase tracking-[0.2em] mb-4 inline-block px-4 py-1.5 rounded-full border bg-white/5"
                            style={{ color: accentColor, borderColor: `${accentColor}30` }}
                        >
                            Estimasi & Hasil
                        </span>
                    </BlurFade>
                    <BlurFade delay={0.2} inView={visible}>
                        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6">
                            Durasi &amp; <span style={{ color: accentColor }}>Output Pekerjaan</span>
                        </h2>
                    </BlurFade>
                    <BlurFade delay={0.3} inView={visible}>
                        <p className="font-body text-gray-400 text-lg max-w-2xl mx-auto">
                            Transparansi waktu pengerjaan dan detail *deliverables* yang akan Anda terima pada akhir proyek.
                        </p>
                    </BlurFade>
                </div>

                {/* Fix: avoid dynamic Tailwind classes which JIT won't purge */}
                <div className={packages.length > 1 ? 'grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-[1000px] mx-auto' : 'grid grid-cols-1 gap-8 max-w-[600px] mx-auto'}>
                    {packages.map((pkg, idx) => (
                        <BlurFade key={idx} delay={0.4 + (idx * 0.1)} inView={visible} className="h-full">
                            <div className="group relative h-full rounded-2xl sm:rounded-3xl bg-zinc-900/50 border border-white/10 p-5 sm:p-8 hover:border-white/20 transition-all duration-500 overflow-hidden backdrop-blur-md">
                                {/* Hover Glow */}
                                <div 
                                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                                    style={{ background: `radial-gradient(circle at center, ${accentColor}, transparent 70%)` }}
                                />

                                {pkg.name && (
                                    <div className="mb-8 pb-4 border-b border-white/10">
                                        <h3 className="font-display text-xl font-bold text-white tracking-wide uppercase">
                                            {pkg.name}
                                        </h3>
                                    </div>
                                )}

                                <div className="space-y-10 relative z-10">
                                    {/* DURASI */}
                                    <div>
                                        <div className="flex items-center gap-3 mb-5">
                                            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5" style={{ color: accentColor }}>
                                                <IconClock size={20} stroke={2} />
                                            </div>
                                            <h4 className="font-body text-lg font-bold text-white">Timeline Pengerjaan</h4>
                                        </div>
                                        <div className="space-y-3">
                                            {pkg.durations.map((item, i) => (
                                                <div key={i} className="flex justify-between items-center group/item">
                                                    <span className="font-body text-gray-400 group-hover/item:text-gray-200 transition-colors">
                                                        {item.label}
                                                    </span>
                                                    <div className="flex-1 border-b border-dashed border-white/10 mx-4 opacity-50" />
                                                    <span className="font-mono text-sm font-bold text-white bg-white/10 px-3 py-1 rounded-md">
                                                        {item.value}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* OUTPUT */}
                                    <div>
                                        <div className="flex items-center gap-3 mb-5">
                                            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5" style={{ color: accentColor }}>
                                                <IconBox size={20} stroke={2} />
                                            </div>
                                            <h4 className="font-body text-lg font-bold text-white">Output / Deliverables</h4>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {pkg.outputs.map((item, i) => (
                                                <div key={i} className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                                                    <div className="mt-0.5 rounded-full bg-white/10 p-1" style={{ color: accentColor }}>
                                                        <IconCheck size={12} stroke={3} />
                                                    </div>
                                                    <span className="font-body text-sm font-medium text-gray-300 leading-tight">
                                                        {item}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </BlurFade>
                    ))}
                </div>
            </div>
        </section>
    );
}
