import { useIntersection } from '@/hooks/useIntersection';
import { cn } from '@/lib/utils';
import { useEffect, useState, useRef } from 'react';

/**
 * WorkflowTimeline — Premium dark-mode sticky timeline for service workflow sections.
 * Designed with UI/UX Pro Max Glassmorphism & Motion-Driven guidelines.
 */
export default function WorkflowTimeline({
    subheading = 'Proses Kami',
    heading = 'Sistem Kerja',
    description = '',
    accentColor = '#10b981',
    steps = [],
}) {
    const [scrollProgress, setScrollProgress] = useState(0);
    const containerRef = useRef(null);

    // Track scroll for the vertical progress line
    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate progress: starts when top of container hits middle of viewport
            const totalHeight = rect.height;
            const scrolled = (windowHeight / 2) - rect.top;
            
            let progress = Math.max(0, Math.min(100, (scrolled / totalHeight) * 100));
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // init
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="py-24 md:py-32 bg-zinc-950 relative" ref={containerRef}>
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none overflow-hidden" />
            <div 
                className="absolute left-0 right-0 top-0 -z-10 m-auto h-[400px] w-[400px] rounded-full opacity-[0.1] blur-[120px] pointer-events-none" 
                style={{ backgroundColor: accentColor }}
            />

            <div className="container-custom relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 lg:items-start">
                    
                    {/* ── LEFT COLUMN: Sticky Header ── */}
                    <div className="lg:w-5/12 lg:self-stretch">
                        <div className="lg:sticky lg:top-32">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-xl">
                                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: accentColor, boxShadow: `0 0 10px ${accentColor}` }} />
                                <span className="font-mono text-xs font-bold text-white/80 uppercase tracking-widest">{subheading}</span>
                            </div>
                            
                            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-6">
                                {heading}
                            </h2>
                            
                            {description && (
                                <p className="font-body text-zinc-400 text-lg leading-relaxed max-w-md">
                                    {description}
                                </p>
                            )}

                            {/* Desktop Progress Indicators */}
                            <div className="hidden lg:flex flex-col gap-4 mt-12">
                                {steps.map((s, i) => {
                                    // Calculate approx active state based on scroll
                                    const threshold = (i / steps.length) * 80;
                                    const isPassed = scrollProgress >= threshold;
                                    return (
                                        <div key={i} className={cn(
                                            "flex items-center gap-4 transition-all duration-500",
                                            isPassed ? "opacity-100 translate-x-2" : "opacity-30 translate-x-0"
                                        )}>
                                            <div className="w-10 h-[1px] transition-colors duration-500" style={{ backgroundColor: isPassed ? accentColor : '#3f3f46' }} />
                                            <span className={cn(
                                                "font-display text-sm font-bold tracking-wide",
                                                isPassed ? "text-white" : "text-zinc-500"
                                            )}>{s.title}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* ── RIGHT COLUMN: Scrolling Steps ── */}
                    <div className="lg:w-7/12 relative">
                        {/* Static track line */}
                        <div className="absolute left-6 md:left-8 top-8 bottom-8 w-px bg-white/10 rounded-full" />
                        
                        {/* Animated fill line */}
                        <div 
                            className="absolute left-6 md:left-8 top-8 w-px rounded-full transition-all duration-300 ease-out"
                            style={{ 
                                height: `calc(${scrollProgress}% - 64px)`, 
                                minHeight: '0%', 
                                maxHeight: 'calc(100% - 64px)',
                                background: `linear-gradient(to bottom, ${accentColor}, transparent)`,
                                boxShadow: `0 0 15px ${accentColor}`
                            }} 
                        />

                        <div className="space-y-12 md:space-y-20 relative">
                            {steps.map((step, i) => {
                                const threshold = (i / steps.length) * 75;
                                const isActive = scrollProgress > threshold;
                                return (
                                    <StepCard 
                                        key={i} 
                                        step={step} 
                                        index={i} 
                                        accentColor={accentColor} 
                                        isActive={isActive} 
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function StepCard({ step, index, accentColor, isActive }) {
    const [ref, visible] = useIntersection();

    return (
        <div 
            ref={ref}
            className={cn(
                "relative pl-16 md:pl-24 transition-all duration-700",
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
            )}
        >
            {/* Number/Icon Bubble */}
            <div 
                className={cn(
                    "absolute left-0 md:left-1 top-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center font-display font-black text-xl z-10 transition-all duration-500",
                    isActive || visible ? "scale-100 shadow-2xl" : "scale-75 opacity-50"
                )}
                style={{ 
                    backgroundColor: isActive ? accentColor : '#18181b', // zinc-900
                    color: isActive ? '#fff' : '#71717a', // zinc-500
                    border: isActive ? `1px solid ${accentColor}` : '1px solid rgba(255,255,255,0.1)',
                    boxShadow: isActive ? `0 0 30px -5px ${accentColor}80` : 'none'
                }}
            >
                {step.icon ? step.icon : (step.number || `0${index + 1}`)}
            </div>

            {/* Card Content */}
            <div className={cn(
                "group relative bg-zinc-900/40 backdrop-blur-xl border rounded-[2rem] p-6 md:p-8 transition-all duration-500 hover:bg-zinc-900/80 hover:-translate-y-1",
                isActive ? "border-white/10 shadow-xl" : "border-white/5 shadow-none"
            )}>
                {/* Glow effect on hover inside card */}
                <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 rounded-[2rem] transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(circle at 100% 0%, ${accentColor}, transparent 50%)` }}
                />

                <span 
                    className="font-mono text-xs font-bold uppercase tracking-widest mb-3 block"
                    style={{ color: accentColor }}
                >
                    Fase {step.number || `0${index + 1}`}
                </span>
                
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4 leading-snug group-hover:text-white/90 transition-colors">
                    {step.title}
                </h3>
                
                <p className="font-body text-zinc-400 text-base md:text-lg leading-relaxed mb-8">
                    {step.desc}
                </p>

                {step.details?.length > 0 && (
                    <div className="bg-black/40 rounded-2xl p-5 border border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: accentColor, opacity: 0.5 }} />
                        <h4 className="font-mono text-[10px] font-bold text-white/40 uppercase tracking-widest mb-4 ml-1">Key Deliverables</h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 ml-1">
                            {step.details.map((d, j) => (
                                <li key={j} className="flex items-start gap-2.5 text-sm font-body text-zinc-300">
                                    <svg className="w-4 h-4 mt-[3px] flex-shrink-0" style={{ color: accentColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                    </svg>
                                    {d}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
