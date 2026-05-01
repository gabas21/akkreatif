import React from 'react';
import SEOHead from '@/Components/SEOHead';
import MainLayout from '@/Layouts/MainLayout';
import { BlurFade } from '@/Components/ui/blur-fade';
import { Target, Rocket, Zap, Lightbulb, Blocks, CheckCircle2 } from 'lucide-react';
import { Meteors } from '@/Components/ui/meteors';

const MISI = [
    'Memberi solusi bagi para pengguna jasa berdasarkan nilai perkembangan Teknologi, Kreatifitas dan Inovatif yang berkembang dan dinamis.',
    'Menyebarluaskan nilai-nilai kreatifitas dan Inovatif kepada komunitas muda (milenial) Kalimantan Timur.',
];

const VALUES = [
    { title: 'Teknologi Terkini', desc: 'Mengikuti perkembangan teknologi untuk memberikan solusi yang up-to-date.', icon: Zap },
    { title: 'Inovasi & Kreativitas', desc: 'Menciptakan solusi inovatif sesuai kebutuhan dan visi unik client.', icon: Lightbulb },
    { title: 'Layanan Komprehensif', desc: 'Layanan terintegrasi, dari pengembangan perangkat lunak hingga desain grafis.', icon: Blocks },
];

export default function VisiMisi() {
    return (
        <MainLayout>
            <SEOHead
                title="Visi & Misi"
                description="Visi dan misi AK Kreatif dalam memajukan industri digital dan kreatif di Kalimantan Timur melalui solusi inovatif dan profesional."
                canonical="/about/visi-misi"
            />
            
            <section className="bg-black pt-40 pb-32 min-h-screen relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <Meteors number={15} minDuration={4} maxDuration={10} />
                </div>
                {/* Background Glow */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#10b981]/10 rounded-full blur-[100px] pointer-events-none" />

                <div className="container-custom relative z-10">
                    <BlurFade delay={0.1} inView className="mb-16 text-center">
                        <span className="font-mono text-xs text-[#10b981] uppercase tracking-[0.3em] bg-[#10b981]/10 px-4 py-2 rounded-full border border-[#10b981]/20">Arah & Tujuan</span>
                        <h1 className="font-display text-5xl md:text-7xl font-black text-white mt-8 leading-tight">
                            Manifesto <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-teal-400">Inovasi.</span>
                        </h1>
                        <p className="font-body text-zinc-400 text-lg mt-6 max-w-2xl mx-auto">
                            Fondasi yang menggerakkan setiap baris kode, setiap desain, dan setiap solusi yang kami bangun.
                        </p>
                    </BlurFade>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Visi */}
                        <BlurFade delay={0.2} inView className="md:col-span-1 h-full">
                            <div className="group relative h-full rounded-3xl bg-zinc-900/60 backdrop-blur-xl border border-white/10 p-8 overflow-hidden hover:border-[#10b981]/50 transition-colors duration-500">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#10b981]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                
                                <div className="relative z-10">
                                    <div className="w-14 h-14 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-[#10b981] mb-8 group-hover:scale-110 transition-transform duration-500">
                                        <Target className="w-7 h-7" />
                                    </div>
                                    <h3 className="font-display text-3xl font-black text-white mb-4">Visi Kami</h3>
                                    <p className="font-body text-zinc-400 leading-relaxed text-lg">
                                        Menjadi perusahaan Profesional dalam bidang Teknologi Informasi dan Industri Kreatif khususnya di Kalimantan Timur, dan Nasional pada umumnya.
                                    </p>
                                </div>
                            </div>
                        </BlurFade>

                        {/* Misi */}
                        <BlurFade delay={0.3} inView className="md:col-span-2 h-full">
                            <div className="group relative h-full rounded-3xl bg-zinc-900/60 backdrop-blur-xl border border-white/10 p-8 overflow-hidden hover:border-[#10b981]/50 transition-colors duration-500">
                                <div className="absolute inset-0 bg-gradient-to-bl from-[#10b981]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-14 h-14 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-[#10b981] group-hover:scale-110 transition-transform duration-500">
                                            <Rocket className="w-7 h-7" />
                                        </div>
                                        <h3 className="font-display text-3xl font-black text-white">Misi Kami</h3>
                                    </div>
                                    
                                    <div className="space-y-6 flex-grow flex flex-col justify-center">
                                        {MISI.map((m, i) => (
                                            <div key={i} className="flex gap-4">
                                                <div className="mt-1 shrink-0">
                                                    <CheckCircle2 className="w-6 h-6 text-[#10b981]" />
                                                </div>
                                                <p className="font-body text-zinc-300 leading-relaxed text-lg">{m}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </BlurFade>

                        {/* Nilai-nilai */}
                        {VALUES.map((val, i) => {
                            const Icon = val.icon;
                            return (
                                <BlurFade key={i} delay={0.4 + (i * 0.1)} inView className="md:col-span-1">
                                    <div className="group relative h-full rounded-3xl bg-zinc-950/80 border border-white/5 p-8 hover:bg-zinc-900 hover:border-white/10 transition-colors duration-500">
                                        <div className="flex flex-col items-center text-center">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#10b981]/20 to-transparent flex items-center justify-center text-[#10b981] mb-5">
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <h4 className="font-display text-xl font-bold text-white mb-3">{val.title}</h4>
                                            <p className="font-body text-sm text-zinc-500 leading-relaxed">{val.desc}</p>
                                        </div>
                                    </div>
                                </BlurFade>
                            );
                        })}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
