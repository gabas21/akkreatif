import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';
import { FloatingIcons } from '@/Components/ui/floating-icons';
import LogoMorph from '@/Components/Sections/Home/LogoMorph';

// Video ID untuk background hero — letakkan di luar komponen agar tidak re-deklarasi setiap render
const YOUTUBE_BG_ID = "OvVf9Fpzfu4";

export default function HeroSection() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Memicu animasi setelah komponen dimount dengan sedikit delay
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    return (
        <section
            className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden bg-brand-white"
            style={{
                borderBottomLeftRadius: '50% 5vw',
                borderBottomRightRadius: '50% 5vw'
            }}
        >
            {/* YouTube Background Video — hidden on mobile to save bandwidth */}
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none opacity-40 hidden md:block">
                <iframe
                    className="absolute top-1/2 left-1/2 w-[150vw] h-[150vh] -translate-x-1/2 -translate-y-1/2"
                    src={`https://www.youtube.com/embed/${YOUTUBE_BG_ID}?autoplay=1&mute=1&controls=0&loop=1&playlist=${YOUTUBE_BG_ID}&modestbranding=1&showinfo=0`}
                    title="Video profil AK Kreatif — latar belakang animasi"
                    frameBorder="0"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
            </div>

            {/* Light overlay for white background with high contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-white/95 via-brand-white/80 to-brand-white/30" />

            {/* Service Icons background */}
            <FloatingIcons
                id="hero-icons"
                background="transparent"
                particleDensity={40}
                particleColor="#10b981" /* brand-green */
                className="z-10"
            />

            {/* Green glow */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-green/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="container-custom relative z-20 w-full max-w-7xl mx-auto">
                <div
                    className={cn(
                        "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-1000",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                    )}
                >
                    {/* LEFTSIDE: Main Content */}
                    <div className="text-left max-w-2xl">
                        <div className="inline-block text-brand-black mb-6 gap-2">
                            <span className="font-display text-4xl sm:text-5xl md:text-6xl font-light tracking-wide uppercase">
                                Mitra Kreasi
                            </span>
                            <br />
                            <span className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-wide uppercase text-brand-green">
                                Dan Inovasi <span className="text-brand-black">Anda</span>
                            </span>
                        </div>

                        <p className="font-body text-lg md:text-xl text-brand-black/80 font-medium mb-10 leading-relaxed max-w-xl">
                            AK Kreatif adalah Startup yang bergerak di bidang Teknologi Informasi, menyelaraskan penerapan teknologi dengan aspek kreativitas dan inovasi.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link href="/contact" className="bg-brand-green text-brand-white px-8 py-3 text-sm font-body font-bold hover:bg-brand-black transition-all duration-300 rounded-full shadow-lg shadow-brand-green/30">
                                Mulai Proyek
                            </Link>

                            <button
                                onClick={() => setIsVideoOpen(true)}
                                className="group flex items-center gap-3 bg-brand-white/50 backdrop-blur-sm px-4 py-3 text-sm font-body font-bold transition-all duration-300 text-brand-black hover:text-brand-green rounded-full border border-brand-black/10 hover:border-brand-green/30 hover:bg-brand-white"
                            >
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-black text-brand-white group-hover:bg-brand-green group-hover:text-brand-white transition-colors duration-300 shadow-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 ml-0.5">
                                        <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                Putar Video
                            </button>
                        </div>
                    </div>
                    
                    {/* RIGHTSIDE: AnimeJS LogoMorph Widget */}
                    <div className="flex justify-center lg:justify-end mt-8 lg:mt-0 w-full overflow-hidden">
                        <div className="w-full max-w-[340px] sm:max-w-[420px]">
                            <LogoMorph />
                        </div>
                    </div>

                </div>
            </div>

            {/* Modal Video */}
            {isVideoOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-black/95 backdrop-blur-md p-4 animate-fade-in">
                    <div className="relative w-full max-w-5xl aspect-video bg-black shadow-2xl rounded-3xl overflow-hidden">
                        <button
                            onClick={() => setIsVideoOpen(false)}
                            className="absolute top-3 right-3 sm:-top-12 sm:right-0 text-white hover:text-brand-green transition-colors z-10 bg-black/60 sm:bg-transparent rounded-full p-2 sm:p-0"
                        >
                            <span className="font-body text-sm tracking-widest uppercase flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                                Tutup
                            </span>
                        </button>
                        <iframe
                            className="w-full h-full"
                            src={`https://www.youtube.com/embed/${YOUTUBE_BG_ID}?autoplay=1`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}
        </section>
    );
}

