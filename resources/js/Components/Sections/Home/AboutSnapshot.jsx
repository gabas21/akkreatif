import { useIntersection } from '@/hooks/useIntersection';
import { cn } from '@/lib/utils';

export default function AboutSnapshot() {
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
                    {/* Visual Kolom Kiri */}
                    <div className="relative order-2 md:order-1 flex justify-center items-center">
                        <div className="relative w-full max-w-md flex justify-center">
                            <img 
                                src="/images/brand/akpulau-fixed.svg" 
                                alt="AK Kreatif Illustration" 
                                loading="lazy"
                                className="w-full object-contain transition-transform duration-700 hover:scale-105 drop-shadow-2xl"
                            />
                        </div>
                    </div>

                    {/* Teks Kolom Kanan */}
                    <div className="order-1 md:order-2">
                        <span className="font-body text-xs font-medium uppercase tracking-[0.2em] text-secondary">Siapa Kami</span>
                        <div className="w-12 h-px bg-secondary my-4"></div>
                        
                        <h2 className="font-display text-3xl md:text-5xl font-semibold text-primary mb-6 leading-tight">
                            Bukan Sekadar Agensi, Kami adalah <span className="text-secondary">Mitra Kreatif</span> Anda.
                        </h2>
                        
                        <div className="font-body text-text-muted space-y-4 mb-8 leading-relaxed">
                            <p>
                                AK Kreatif berdiri pada pemahaman bahwa setiap brand memiliki cerita yang pantas didengar. 
                                Memadukan strategi digital dan estetika desain, kami memastikan suara bisnis Anda menggema di pasar.
                            </p>
                            <p>
                                Dari layar digital melalui pengembangan web, hingga dunia nyata lewat manajemen acara. Kesuksesan klien adalah obsesi kami.
                            </p>
                        </div>
                        
                        <div className="flex items-center gap-6">
                            {/* Avatar CEO/Founder Placeholder */}
                            <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden border-2 border-secondary">
                                <img src="https://i.pravatar.cc/150?img=11" alt="Direktur" loading="lazy" className="w-full h-full object-cover grayscale" />
                            </div>
                            <div>
                                <h4 className="font-display font-semibold text-primary">Andi Kurniawan</h4>
                                <p className="font-body text-xs text-text-muted uppercase tracking-widest mt-1">Founder & CEO</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
