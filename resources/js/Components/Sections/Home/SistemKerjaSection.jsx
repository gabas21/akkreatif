import { Link } from '@inertiajs/react';
import { useIntersection } from '@/hooks/useIntersection';
import { cn } from '@/lib/utils';

const STEPS = [
    {
        id: 'konsultasi',
        number: '01',
        title: 'KONSULTASI',
        desc: 'Konsultasi seputar masalah dan kebutuhan sistem yang anda inginkan.',
        detail: ['Diskusi kebutuhan & tujuan', 'Analisis kompetitor', 'Penentuan scope pekerjaan'],
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
            </svg>
        ),
        color: 'from-emerald-400/20 to-green-600/10',
        accent: 'text-emerald-400',
    },
    {
        id: 'desain',
        number: '02',
        title: 'DESAIN',
        desc: 'Kami akan melakukan perancangan desain sistem yang efektif untuk anda.',
        detail: ['Strategi & roadmap kreatif', 'Perancangan UI/UX', 'Penawaran harga transparan'],
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Z" />
            </svg>
        ),
        color: 'from-blue-400/20 to-blue-600/10',
        accent: 'text-blue-400',
    },
    {
        id: 'development',
        number: '03',
        title: 'DEVELOPMENT',
        desc: 'Kami akan membangun sistem aplikasi dengan menggunakan teknologi terkini dalam kerangka waktu yang telah disepakati.',
        detail: ['Pembuatan sistem & desain', 'Update progres berkala', 'Revisi sesuai feedback'],
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437 1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008Z" />
            </svg>
        ),
        color: 'from-purple-400/20 to-purple-600/10',
        accent: 'text-purple-400',
    },
    {
        id: 'implementasi',
        number: '04',
        title: 'IMPLEMENTASI',
        desc: 'Kami akan mempresentasikan hasil sistem yang dibangun dan siap untuk diimplementasikan.',
        detail: ['Presentasi hasil kerja', 'Sesi revisi terstruktur', 'Quality assurance akhir'],
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
        ),
        color: 'from-orange-400/20 to-orange-600/10',
        accent: 'text-orange-400',
    },
    {
        id: 'maintenance',
        number: '05',
        title: 'MAINTENANCE',
        desc: 'Kami akan melakukan monitoring sistem dalam masa garansi setelah implementasi sistem.',
        detail: ['Peluncuran sesuai jadwal', 'Dukungan teknis', 'Monitoring performa'],
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
            </svg>
        ),
        color: 'from-emerald-400/20 to-green-600/10',
        accent: 'text-emerald-400',
    },
];

export default function SistemKerjaSection() {
    const [headingRef, headingVisible] = useIntersection();

    return (
        <section className="section-padding bg-surface relative overflow-hidden">
            {/* Subtle grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.025] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(#16a34a 1px, transparent 1px), linear-gradient(to right, #16a34a 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}
            />

            <div className="container-custom relative z-10">
                {/* Heading */}
                <div
                    ref={headingRef}
                    className={cn(
                        "text-center mb-16 transition-all duration-700",
                        headingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}
                >
                    <span className="font-body text-xs font-medium uppercase tracking-[0.2em] text-secondary">
                        Proses Kami
                    </span>
                    <div className="w-8 h-px bg-secondary mx-auto my-4" />
                    <h2 className="font-display text-3xl md:text-5xl font-semibold text-primary leading-tight">
                        Sistem Kerja <span className="text-secondary">Kami</span>
                    </h2>
                    <p className="font-body text-text-muted mt-4 max-w-xl mx-auto leading-relaxed text-base">
                        Proses yang terstruktur, transparan, dan berorientasi hasil — dari konsultasi pertama hingga proyek selesai.
                    </p>
                </div>

                {/* Steps — vertikal zigzag di mobile, horizontal di desktop */}
                <div className="relative mt-4">
                    {/* Garis connector horizontal (desktop) yang LEBIH JELAS */}
                    <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] border-t-[3px] border-dashed border-secondary/60" />

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4">
                        {STEPS.map((step, i) => (
                                <div
                                    key={step.id}
                                    className={cn(
                                        "flex flex-col items-start lg:items-center transition-all duration-700",
                                        headingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                    )}
                                    style={{ transitionDelay: `${i * 120 + 300}ms` }}
                                >
                                    {/* Number + Icon bubble */}
                                    <div className="relative mb-6 lg:mb-8">
                                        <div className={cn(
                                            "relative z-10 w-16 h-16 rounded-2xl bg-surface bg-gradient-to-br flex items-center justify-center border border-border shadow-lg",
                                            step.color
                                        )}>
                                            <span className={cn("", step.accent)}>
                                                {step.icon}
                                            </span>
                                        </div>
                                        {/* Step number badge */}
                                        <span className="absolute z-20 -top-2 -right-2 w-6 h-6 rounded-full bg-secondary text-white text-[10px] font-bold font-display flex items-center justify-center shadow-md">
                                            {i + 1}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="lg:text-center">
                                        <h3 className="font-display text-base font-semibold text-primary mb-2">
                                            {step.title}
                                        </h3>
                                        <p className="font-body text-sm text-text-muted leading-relaxed mb-4">
                                            {step.desc}
                                        </p>
                                        <ul className="space-y-1">
                                            {step.detail.map((d) => (
                                                <li key={d} className="flex items-center lg:justify-center gap-2 text-xs font-body text-text-muted">
                                                    <span className="w-1 h-1 rounded-full bg-secondary flex-shrink-0 inline-block" />
                                                    {d}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>

                {/* CTA Bawah */}
                <div className="mt-16 text-center">
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-3 bg-secondary text-white px-8 py-4 rounded-full font-body font-semibold text-sm hover:bg-green-700 transition-all duration-300 shadow-lg shadow-secondary/25 hover:shadow-secondary/40 hover:-translate-y-0.5 group"
                    >
                        Mulai Konsultasi Gratis
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
