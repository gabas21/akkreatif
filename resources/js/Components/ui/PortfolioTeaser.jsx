/**
 * PortfolioTeaser — Reusable section untuk semua halaman layanan
 * 
 * Menampilkan:
 * - Teks ajakan "Lihat Contoh Karya Kami"
 * - 3 mini preview card dengan gambar + judul
 * - 1 atau 2 tombol CTA menuju /portfolio (dengan filter kategori)
 * 
 * Props:
 * @param {string}   heading      - Judul section
 * @param {string}   subheading   - Teks kecil di atas heading
 * @param {string}   desc         - Deskripsi singkat
 * @param {Array}    previews     - Array of { image, label, title } — 3 item ideal
 * @param {Array}    buttons      - Array of { label, href, primary }
 * @param {string}   accentColor  - warna accent hex (default '#10b981')
 * @param {string}   bg           - bg class tailwind (default 'bg-[#fafafa]')
 */

import { Link } from '@inertiajs/react';
import { useIntersection } from '@/hooks/useIntersection';
import { cn } from '@/lib/utils';

export default function PortfolioTeaser({
    heading = 'Lihat Karya Nyata Kami',
    subheading = 'Portofolio',
    desc = 'Setiap proyek yang kami kerjakan adalah bukti komitmen kami terhadap kualitas. Lihat selengkapnya di halaman portofolio.',
    previews = [],
    buttons = [],
    accentColor = '#10b981',
    bg = 'bg-[#fafafa]',
}) {
    const [headingRef, headingVisible] = useIntersection();

    return (
        <section className={cn('section-padding relative overflow-hidden border-t border-black/5', bg)}>
            {/* Subtle background glow */}
            <div
                className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] opacity-10 pointer-events-none"
                style={{ background: accentColor }}
            />

            <div className="container-custom relative z-10">

                {/* Heading */}
                <div
                    ref={headingRef}
                    className={cn(
                        'text-center mb-12 transition-all duration-700',
                        headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    )}
                >
                    <span
                        className="inline-block font-body text-xs font-bold uppercase tracking-[0.25em] mb-3 px-4 py-1.5 rounded-full border"
                        style={{ color: accentColor, borderColor: `${accentColor}30`, background: `${accentColor}10` }}
                    >
                        {subheading}
                    </span>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-black mt-3 mb-4">
                        {heading}
                    </h2>
                    <p className="font-body text-black/50 max-w-xl mx-auto text-base leading-relaxed">
                        {desc}
                    </p>
                </div>

                {/* Preview Cards */}
                {previews.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                        {previews.map((item, i) => (
                            <div
                                key={i}
                                className={cn(
                                    'group relative overflow-hidden rounded-2xl bg-zinc-100 aspect-[4/3] transition-all duration-700',
                                    'hover:-translate-y-2 hover:shadow-2xl cursor-pointer',
                                    headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                )}
                                style={{ transitionDelay: `${i * 100 + 200}ms` }}
                            >
                                {/* Image */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${item.image})` }}
                                />

                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

                                {/* Content */}
                                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                                    <span
                                        className="font-mono text-[10px] font-bold uppercase tracking-widest mb-1.5 transition-all duration-300"
                                        style={{ color: accentColor }}
                                    >
                                        {item.label}
                                    </span>
                                    <h3 className="font-display text-white text-base font-bold leading-snug line-clamp-2">
                                        {item.title}
                                    </h3>
                                </div>

                                {/* Hover badge */}
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                                    <span className="text-white text-[10px] font-bold font-body bg-white/15 backdrop-blur border border-white/20 px-3 py-1 rounded-full">
                                        Preview
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* CTA Buttons */}
                <div className={cn(
                    'flex flex-wrap items-center justify-center gap-4 transition-all duration-700',
                    headingVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                )}
                    style={{ transitionDelay: '400ms' }}
                >
                    {buttons.map((btn, i) => (
                        <Link
                            key={i}
                            href={btn.href}
                            className={cn(
                                'inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-body font-bold text-sm transition-all duration-300 group',
                                btn.primary
                                    ? 'text-white shadow-lg'
                                    : 'border-2 bg-transparent hover:bg-black hover:text-white hover:border-black'
                            )}
                            style={btn.primary ? {
                                background: accentColor,
                                boxShadow: `0 8px 24px ${accentColor}40`,
                            } : {
                                borderColor: `${accentColor}50`,
                                color: accentColor,
                            }}
                        >
                            {btn.icon && <span className="text-base">{btn.icon}</span>}
                            {btn.label}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </Link>
                    ))}
                </div>

                {/* Count badge */}
                <p className={cn(
                    'text-center mt-6 font-body text-xs text-black/30 transition-all duration-700',
                    headingVisible ? 'opacity-100' : 'opacity-0'
                )}
                    style={{ transitionDelay: '550ms' }}
                >
                    Lebih dari <strong className="text-black/50">50+ karya</strong> telah kami selesaikan — dan terus bertambah.
                </p>

            </div>
        </section>
    );
}
