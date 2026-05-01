import { useIntersection } from '@/hooks/useIntersection';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

const projects = [
    {
        title: 'Inspektorat Kabupaten Mahakam Ulu',
        category: 'Web Development',
        img: '/images/unsplash/1486312338219-ce68d2c6f44d.jpg'
    },
    {
        title: 'Festival Mahakam 2024',
        category: 'Event Organizer & Dokumentasi',
        img: '/images/unsplash/1492691527719-9d1e07e534b4.jpg'
    },
    {
        title: 'Branding & Identity — Instansi Kaltim',
        category: 'Desain Grafis',
        img: '/images/unsplash/1626785774573-4b799315345d.jpg'
    },
    {
        title: 'Konten & Pertumbuhan Media Sosial',
        category: 'Social Media Management',
        img: '/images/unsplash/social-media-icons.jpg'
    }
];

export default function PortfolioPreview() {
    const [headingRef, headingVisible] = useIntersection();

    return (
        <section className="section-padding bg-zinc-900 border-b border-white/5">
            <div className="container-custom">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div 
                        ref={headingRef}
                        className={cn(
                            "transition-all duration-700",
                            headingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        )}
                    >
                        <span className="font-body text-xs font-medium uppercase tracking-[0.2em] text-secondary">Karya Berkelas</span>
                        <h2 className="font-display text-3xl md:text-5xl font-semibold text-white mt-4">
                            Kompilasi Proyek <br className="hidden md:block"/> <span className="text-secondary">Pilihan Spesial.</span>
                        </h2>
                    </div>
                    
                    <Link href="/portfolio" className="inline-block border-b border-white/40 pb-1 font-body text-sm font-medium uppercase tracking-widest text-white/70 hover:text-secondary hover:border-secondary transition-colors">
                        Jelajahi Semua Karya
                    </Link>
                </div>

                {/* Grid Portfolio */}
                <div className="grid md:grid-cols-2 gap-6">
                    {projects.map((project, idx) => {
                        const [cardRef, cardVisible] = useIntersection({ threshold: 0.1 });
                        
                        return (
                            <div 
                                key={idx}
                                ref={cardRef}
                                className={cn(
                                    "group relative aspect-[4/3] overflow-hidden bg-background border border-border cursor-pointer rounded-3xl transition-all duration-700 hover:shadow-2xl hover:-translate-y-1",
                                    cardVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                                )}
                                style={{ transitionDelay: `${Math.min(idx * 150, 450)}ms` }}
                            >
                                <img 
                                    src={project.img} 
                                    alt={project.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                                {/* Overlay Gelap */}
                                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                
                                {/* Konten muncul saat hover */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                    <span className="font-body text-xs font-medium uppercase tracking-widest text-secondary mb-2">
                                        {project.category}
                                    </span>
                                    <h3 className="font-display text-2xl font-semibold text-white">
                                        {project.title}
                                    </h3>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
