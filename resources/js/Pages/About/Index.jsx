import React, { useRef } from 'react';
import { Link } from '@inertiajs/react';
import SEOHead from '@/Components/SEOHead';
import MainLayout from '@/Layouts/MainLayout';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BlurFade } from '@/Components/ui/blur-fade';
import { NumberTicker } from '@/Components/ui/number-ticker';
import { Meteors } from '@/Components/ui/meteors';
import { SparklesCore } from '@/Components/ui/sparkles';
import { Target, Users, ShieldCheck, ArrowRight } from 'lucide-react';

const NavCard = ({ href, icon, title, description, delay }) => {
    return (
        <BlurFade delay={delay} inView>
            <Link href={href} className="group relative block h-full outline-none">
                {/* Glow behind card */}
                <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-[#10b981]/0 via-[#10b981]/0 to-[#10b981]/0 group-hover:from-[#10b981]/20 group-hover:via-emerald-400/20 group-hover:to-teal-300/20 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm" />
                
                <div className="relative h-full flex flex-col justify-between p-8 rounded-3xl bg-zinc-900/80 backdrop-blur-xl border border-white/10 group-hover:border-[#10b981]/50 transition-colors duration-500 overflow-hidden">
                    {/* Background noise/gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#10b981]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10">
                        <div className="w-14 h-14 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-zinc-400 group-hover:text-[#10b981] group-hover:border-[#10b981]/30 transition-all duration-500 mb-8">
                            {icon}
                        </div>
                        <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-[#10b981] transition-colors duration-300">{title}</h3>
                        <p className="font-body text-zinc-400 text-sm leading-relaxed">{description}</p>
                    </div>

                    <div className="relative z-10 mt-10 flex items-center justify-between">
                        <span className="font-mono text-xs uppercase tracking-widest text-[#10b981] opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -translate-x-4 group-hover:translate-x-0">Jelajahi</span>
                        <div className="w-10 h-10 rounded-full bg-black border border-white/10 flex items-center justify-center text-white group-hover:bg-[#10b981] group-hover:border-[#10b981] group-hover:text-black transition-all duration-500">
                            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                    </div>
                </div>
            </Link>
        </BlurFade>
    );
};
// ─── DATA ──────────────────────────────────────────────────────────────────
const STATS = [
    { value: 5,  suffix: '+', label: 'Tahun Berdiri' },
    { value: 40, suffix: '+', label: 'Proyek Selesai' },
    { value: 12, suffix: '',  label: 'Anggota Tim' },
    { value: 6,  suffix: '',  label: 'Unit Bisnis' },
];

export default function AboutIndex() {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
    const heroY       = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const scrollBar   = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    return (
        <MainLayout>
            <SEOHead
                title="Tentang Kami"
                description="Pelajari lebih lanjut tentang AK Kreatif, digital agency terkemuka di Kalimantan Timur yang berfokus pada inovasi, teknologi, dan kreativitas."
                canonical="/about"
                jsonLd={{
                    '@context': 'https://schema.org',
                    '@type': 'AboutPage',
                    name: 'Tentang AK Kreatif',
                    description: 'Tentang AK Kreatif, sejarah, nilai, dan filosofi perusahaan.',
                    url: 'https://akkreatif.my.id/about',
                }}
            />

            {/* ── SCROLL PROGRESS ── */}
            <motion.div
                className="fixed top-0 left-0 h-[3px] z-[100] origin-left bg-gradient-to-r from-[#10b981] to-emerald-300"
                style={{ width: scrollBar }}
            />

            {/* ══════════════════════════════════════════════════
                HERO — Meteors + Sparkles + BlurFade
            ══════════════════════════════════════════════════ */}
            <section ref={heroRef} className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
                {/* Sparkles background */}
                <SparklesCore
                    id="about-sparkles"
                    particleDensity={60}
                    particleColor="#10b981"
                    minSize={0.3}
                    maxSize={0.9}
                    className="absolute inset-0 w-full h-full"
                />

                {/* Meteors */}
                <div className="absolute inset-0 overflow-hidden">
                    <Meteors number={18} minDuration={4} maxDuration={12} />
                </div>

                {/* Radial vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_20%,#000_100%)] pointer-events-none" />

                <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                    <BlurFade delay={0.1} inView>
                        <div className="inline-flex items-center gap-3 mb-8">
                            <span className="w-8 h-px bg-[#10b981]" />
                            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.35em] text-[#10b981]">AK Kreatif — Company Profile</span>
                            <span className="w-8 h-px bg-[#10b981]" />
                        </div>
                    </BlurFade>

                    <BlurFade delay={0.2} inView>
                        <h1 className="font-display font-black text-white leading-[0.9] tracking-tight"
                            style={{ fontSize: 'clamp(3.5rem, 10vw, 8rem)' }}>
                            Kami Bukan<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] via-emerald-300 to-teal-400">
                                Sekedar Agensi.
                            </span>
                        </h1>
                    </BlurFade>

                    <BlurFade delay={0.35} inView>
                        <p className="font-body text-white/50 text-lg md:text-xl max-w-2xl mx-auto mt-10 leading-relaxed">
                            Menyelaraskan penerapan Teknologi Informasi dengan aspek Kreativitas dan Inovasi — membangun masa depan digital institusi lokal dengan standar profesional.
                        </p>
                    </BlurFade>

                    <BlurFade delay={0.5} inView>
                        <div className="mt-16 flex flex-col items-center gap-2">
                            <span className="font-mono text-[10px] text-white/20 uppercase tracking-widest">Scroll</span>
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                                className="w-px h-12 bg-gradient-to-b from-[#10b981] to-transparent"
                            />
                        </div>
                    </BlurFade>
                </motion.div>
            </section>

            {/* ══════════════════════════════════════════════════
                STATS — NumberTicker
            ══════════════════════════════════════════════════ */}
            <section className="bg-zinc-950 border-y border-white/5 py-20">
                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                        {STATS.map((s, i) => (
                            <BlurFade key={i} delay={i * 0.1} inView className="text-center">
                                <p className="font-display text-6xl md:text-7xl font-black text-white">
                                    <NumberTicker value={s.value} delay={i * 0.15} />
                                    <span className="text-[#10b981]">{s.suffix}</span>
                                </p>
                                <p className="font-body text-sm text-white/40 uppercase tracking-[0.2em] mt-3">{s.label}</p>
                            </BlurFade>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════════════
                NAVIGATION BENTO GRID
            ══════════════════════════════════════════════════ */}
            <section className="bg-black py-32 relative overflow-hidden">
                {/* Subtle background glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#10b981]/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="container-custom relative z-10">
                    <BlurFade delay={0.1} inView>
                        <div className="mb-16 md:flex md:items-end md:justify-between">
                            <div className="max-w-2xl">
                                <span className="font-mono text-xs text-[#10b981] uppercase tracking-[0.3em]">/ Eksplorasi</span>
                                <h2 className="font-display text-4xl md:text-5xl font-black text-white mt-4 leading-tight">
                                    Lebih Dekat <br className="hidden md:block" />
                                    <span className="text-zinc-500">Dengan Kami.</span>
                                </h2>
                            </div>
                            <p className="mt-6 md:mt-0 font-body text-zinc-400 text-sm max-w-xs leading-relaxed">
                                Temukan nilai, visi, dan para ahli yang menjadi motor penggerak di balik setiap inovasi AK Kreatif.
                            </p>
                        </div>
                    </BlurFade>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <NavCard 
                            href={route('about.visi-misi')}
                            icon={<Target className="w-7 h-7" />}
                            title="Visi & Misi"
                            description="Manifesto inovasi dan arah tujuan perusahaan dalam memberikan solusi teknologi dan kreatif."
                            delay={0.2}
                        />
                        <NavCard 
                            href={route('about.struktur-tim')}
                            icon={<Users className="w-7 h-7" />}
                            title="Struktur & Tim"
                            description="Mengenal lebih dekat para profesional berpengalaman di balik karya-karya terbaik AK Kreatif."
                            delay={0.3}
                        />
                        <NavCard 
                            href={route('about.legalitas')}
                            icon={<ShieldCheck className="w-7 h-7" />}
                            title="Legalitas"
                            description="Kredibilitas dan izin resmi perusahaan sebagai jaminan keamanan dan profesionalisme bermitra."
                            delay={0.4}
                        />
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
