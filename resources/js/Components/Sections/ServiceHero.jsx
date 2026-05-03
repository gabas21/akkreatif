import { Link } from '@inertiajs/react';
import { useIntersection } from '@/hooks/useIntersection';
import { cn } from '@/lib/utils';

/**
 * ServiceHero — Dark editorial hero shell for all service pages.
 * Matches the Contact page aesthetic: dark bg, grid lines, radial glow,
 * bottom-aligned editorial text + device mockup slot on the right.
 *
 * Props:
 *   badge        - string: pill label (e.g. "Creative Identity")
 *   title        - string: first line of heading (plain white)
 *   titleAccent  - string: second line (outline/accent style)
 *   description  - string: paragraph below heading
 *   accentColor  - string: CSS color, default "#10b981"
 *   backHref     - string: back link, default "/services"
 *   extra        - ReactNode: optional content between desc and bottom edge
 *   children     - ReactNode: device mockup column (right side)
 */
export default function ServiceHero({
    badge,
    title,
    titleAccent,
    description,
    accentColor = '#10b981',
    backHref = '/services',
    extra = null,
    children,
}) {
    const [ref, visible] = useIntersection();

    return (
        <section className="relative min-h-screen flex flex-col justify-end overflow-hidden bg-[#060809] pt-24 md:pt-28 pb-0">
            {/* ── Ambient radial glow ── */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `radial-gradient(ellipse 60% 50% at 70% 40%, ${accentColor}18, transparent 70%),
                                 radial-gradient(ellipse 40% 40% at 10% 80%, ${accentColor}0a, transparent 60%)`,
                }}
            />

            {/* ── Dot grid ── */}
            <div
                className="absolute inset-0 opacity-[0.035] pointer-events-none"
                style={{
                    backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                }}
            />

            {/* ── Line grid ── */}
            <div
                className="absolute inset-0 opacity-[0.025] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px),
                                      linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)`,
                    backgroundSize: '80px 80px',
                }}
            />

            {/* ── Bottom fade to black for smooth transition ── */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#060809] to-transparent pointer-events-none z-10" />

            {/* ── Back link ── */}
            <div className="absolute top-20 md:top-28 left-4 sm:left-6 z-20">
                <Link
                    href={backHref}
                    className="inline-flex items-center gap-2 text-white/30 hover:text-white text-[10px] font-mono uppercase tracking-[0.3em] transition-colors duration-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    Kembali ke Layanan
                </Link>
            </div>

            {/* ── Main content grid ── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-20">
                <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 xl:gap-20 items-end pb-16 sm:pb-20 md:pb-28">

                    {/* LEFT: Editorial text — bottom aligned */}
                    <div
                        ref={ref}
                        className={cn(
                            'transition-all duration-1000',
                            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        )}
                    >
                        {/* Badge */}
                        {badge && (
                            <span
                                className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.4em] mb-6"
                                style={{ color: accentColor }}
                            >
                                <span className="w-8 h-px" style={{ background: accentColor }} />
                                {badge}
                            </span>
                        )}

                        {/* Heading */}
                        <h1 className="font-display font-black text-white leading-none tracking-tight mb-5" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}>
                            {title}
                            {titleAccent && (
                                <>
                                    <br />
                                    <span style={{ WebkitTextStroke: `2px ${accentColor}`, color: 'transparent' }}>
                                        {titleAccent}
                                    </span>
                                </>
                            )}
                        </h1>

                        {/* Description */}
                        <p className="font-body text-white/45 text-base sm:text-lg leading-relaxed max-w-lg mb-5 sm:mb-6">
                            {description}
                        </p>

                        {/* Extra slot (palette, stats, pills, etc.) */}
                        {extra}
                    </div>

                    {/* RIGHT: Device mockup slot — overflow contained on mobile */}
                    <div
                        className={cn(
                            'flex justify-center lg:justify-end relative transition-all duration-1000 delay-200 overflow-hidden',
                            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        )}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </section>
    );
}
