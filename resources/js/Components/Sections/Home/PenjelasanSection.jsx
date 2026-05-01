import { useIntersection } from '@/hooks/useIntersection';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

export default function PenjelasanSection() {
    const [ref, isVisible] = useIntersection();

    return (
        <section className="section-padding bg-surface border-b border-border">
            <div className="container-custom">
                <div
                    ref={ref}
                    className={cn(
                        "grid md:grid-cols-2 gap-16 items-center transition-all duration-1000",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                    )}
                >
                    {/* Kolom Kiri — Visual Logo */}
                    <div className="relative order-2 md:order-1 flex justify-center items-center">
                        <div className="relative w-full max-w-md flex justify-center">
                            {/* Glow accent di belakang logo */}
                            <div className="absolute inset-0 bg-secondary/10 rounded-full blur-[80px] scale-90 pointer-events-none" />
                            <img
                                src="/images/brand/bagas-dribel.svg"
                                alt="AK Kreatif — Anak Kalimantan Kreatif"
                                loading="lazy"
                                className="relative w-full object-contain transition-transform duration-700 hover:scale-105 drop-shadow-2xl"
                            />
                        </div>
                    </div>

                    {/* Kolom Kanan — Teks Penjelasan */}
                    <div className="order-1 md:order-2">
                        <span className="font-body text-xs font-medium uppercase tracking-[0.2em] text-secondary">
                            Tentang Kami
                        </span>
                        <div className="w-12 h-px bg-secondary my-4" />

                        <h2 className="font-display text-3xl md:text-5xl font-semibold text-primary mb-6 leading-tight">
                            Kami adalah <span className="text-secondary">Startup Teknologi Informasi</span> Berbasis di Kalimantan.
                        </h2>

                        <div className="font-body text-text-muted space-y-4 mb-8 leading-relaxed">
                            <p>
                                AK Kreatif merupakan akronim dari <strong className="text-primary font-semibold">Anak Kalimantan Kreatif</strong>, yang didirikan oleh sekumpulan Anak Muda Kalimantan Timur dengan potensi dan kompetensi di dunia Teknologi Informasi dan Industri Kreatif.
                            </p>
                            <p>
                                Kami bukan sekadar vendor — kami adalah mitra strategis yang membantu Anda dari pengembangan web & aplikasi, desain grafis, manajemen sosial media, dokumentasi foto & video, hingga event organizer. Satu agensi, semua solusi.
                            </p>
                        </div>



                    </div>
                </div>
            </div>
        </section>
    );
}
