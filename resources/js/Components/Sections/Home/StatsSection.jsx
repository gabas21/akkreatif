import { useIntersection } from '@/hooks/useIntersection';
import { cn } from '@/lib/utils';

const stats = [
    { id: 'proyek', value: '40', label: 'Proyek Selesai', suffix: '+' },
    { id: 'klien', value: '30', label: 'Klien Puas', suffix: '+' },
    { id: 'unit', value: '6', label: 'Unit Bisnis', suffix: '' },
    { id: 'tahun', value: '5', label: 'Tahun Pengalaman', suffix: '+' },
];

export default function StatsSection() {
    const [ref, isVisible] = useIntersection();

    return (
        <section className="py-24 bg-surface-dark border-y border-border-dark relative overflow-hidden">
            {/* Background Texture/Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-[80px]"></div>

            <div className="container-custom relative z-10">
                <div 
                    ref={ref}
                    className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center"
                >
                    {stats.map((stat, idx) => (
                        <div
                            key={stat.id}
                            className={cn(
                                "transition-all duration-700",
                                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                            )}
                            style={{ transitionDelay: `${idx * 150}ms` }}
                        >
                            <span className="font-display text-5xl md:text-6xl font-bold text-white mb-4 block">
                                {stat.value}<span className="text-secondary">{stat.suffix}</span>
                            </span>
                            <div className="w-8 h-px bg-border-dark mx-auto my-4 group-hover:bg-secondary transition-colors"></div>
                            <span className="font-body text-xs md:text-sm uppercase tracking-[0.2em] text-gray-400">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
