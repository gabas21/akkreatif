import { useIntersection } from '@/hooks/useIntersection';
import { cn } from '@/lib/utils';

const REASONS = [
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
            </svg>
        ),
        title: 'Teknologi Terkini',
        desc: 'Mengikuti perkembangan teknologi terkini untuk memberikan solusi yang up-to-date dan relevan dengan kebutuhan industri.',
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
            </svg>
        ),
        title: 'Inovasi dan Kreativitas',
        desc: 'Menciptakan solusi inovatif dan kreatif yang sesuai dengan kebutuhan dan visi unik client kami.',
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
            </svg>
        ),
        title: 'Desain yang Menarik',
        desc: 'Desain yang menarik dan estetis untuk memberikan kesan yang positif bagi merek dan bisnis client kami.',
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
            </svg>
        ),
        title: 'Layanan Komprehensif',
        desc: 'Layanan yang komprehensif, mulai dari pengembangan perangkat lunak hingga desain grafis, sehingga klien dapat mengandalkan satu perusahaan untuk semua kebutuhan IT dan Kreatif mereka.',
    },
];

export default function MengapaSection() {
    const [headingRef, headingVisible] = useIntersection();

    return (
        <section className="section-padding bg-primary relative overflow-hidden">
            {/* Background decorative */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

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
                        Alasan Memilih Kami
                    </span>
                    <div className="w-8 h-px bg-secondary mx-auto my-4" />
                    <h2 className="font-display text-3xl md:text-5xl font-semibold text-white leading-tight">
                        Mengapa <span className="text-secondary">AK Kreatif</span>?
                    </h2>
                    <p className="font-body text-gray-400 mt-4 max-w-xl mx-auto leading-relaxed text-base">
                        Ada banyak pilihan di luar sana. Ini yang membuat ribuan bisnis memilih untuk tumbuh bersama kami.
                    </p>
                </div>

                {/* Grid Alasan */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {REASONS.map((reason, i) => (
                        <div
                            key={i}
                            className={cn(
                                "group relative bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-700 hover:bg-white/10 hover:border-secondary/40 hover:-translate-y-1",
                                headingVisible
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-8"
                            )}
                            style={{ transitionDelay: `${i * 80 + 200}ms` }}
                        >
                                {/* Icon */}
                                <div className="w-12 h-12 rounded-xl bg-secondary/15 border border-secondary/20 flex items-center justify-center text-secondary mb-4 group-hover:bg-secondary/25 transition-colors duration-300">
                                    {reason.icon}
                                </div>

                                <h3 className="font-display text-base font-semibold text-white mb-2">
                                    {reason.title}
                                </h3>
                                <p className="font-body text-sm text-gray-400 leading-relaxed">
                                    {reason.desc}
                                </p>

                                {/* Hover accent line */}
                                <div className="absolute bottom-0 left-6 right-6 h-px bg-secondary/0 group-hover:bg-secondary/40 transition-colors duration-500 rounded-full" />
                            </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
