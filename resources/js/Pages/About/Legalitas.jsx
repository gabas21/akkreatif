import React from 'react';
import { Link } from '@inertiajs/react';
import SEOHead from '@/Components/SEOHead';
import MainLayout from '@/Layouts/MainLayout';
import { BlurFade } from '@/Components/ui/blur-fade';
import { BorderBeam } from '@/Components/ui/border-beam';
import { Meteors } from '@/Components/ui/meteors';
import { ArrowRight, FileText, CheckCircle, Shield } from 'lucide-react';

const LEGAL = [
    { icon: FileText, label: 'Nomor Induk Berusaha', tag: 'NIB: 2108230015976' },
    { icon: CheckCircle, label: 'Status Perpajakan', tag: 'NPWP: 50.030.168.4-741.000' },
    { icon: Shield, label: 'Akta & Kemenkumham RI', tag: 'CV. Anak Kalimantan Kreatif' },
];

export default function Legalitas() {
    return (
        <MainLayout>
            <SEOHead
                title="Legalitas & Sertifikasi"
                description="Informasi resmi mengenai legalitas, perizinan, dan sertifikasi AK Kreatif sebagai badan usaha yang sah dan terpercaya di Indonesia."
                canonical="/about/legalitas"
            />
            
            <section className="relative bg-zinc-950 pt-40 pb-32 min-h-screen overflow-hidden flex flex-col justify-center">
                <div className="absolute inset-0 pointer-events-none">
                    <Meteors number={20} minDuration={4} maxDuration={10} />
                </div>
                
                {/* Subtle radial glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#10b981]/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="container-custom relative z-10">
                    <BlurFade delay={0.1} inView className="mb-16 text-center">
                        <span className="inline-block font-mono text-xs text-[#10b981] uppercase tracking-[0.3em] bg-[#10b981]/10 px-4 py-2 rounded-full border border-[#10b981]/20">Legalitas</span>
                        <h1 className="font-display text-5xl md:text-7xl font-black text-white mt-8 leading-tight">
                            Transparan &<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-teal-400">Terverifikasi.</span>
                        </h1>
                        <p className="font-body text-zinc-400 text-lg mt-6 max-w-2xl mx-auto">
                            Profil korporat yang kokoh, terdaftar resmi sebagai badan usaha, siap untuk kemitraan, LPSE, E-Procurement, dan tender berskala nasional.
                        </p>
                    </BlurFade>

                    <div className="grid md:grid-cols-3 gap-6 mb-20">
                        {LEGAL.map((l, i) => {
                            const Icon = l.icon;
                            return (
                                <BlurFade key={i} delay={0.2 + i * 0.1} inView>
                                    <div className="relative group rounded-3xl border border-white/5 bg-zinc-900/60 backdrop-blur-md p-8 overflow-hidden hover:border-[#10b981]/40 transition-colors duration-500 h-full flex flex-col items-center text-center">
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <BorderBeam size={120} duration={8} delay={i} colorFrom="#10b981" colorTo="#34d399" borderWidth={1.5} />
                                        </div>
                                        
                                        <div className="absolute inset-0 bg-gradient-to-b from-[#10b981]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        
                                        <div className="relative z-10 w-16 h-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-zinc-500 group-hover:text-[#10b981] group-hover:border-[#10b981]/30 transition-all duration-500 mb-6">
                                            <Icon className="w-8 h-8" />
                                        </div>
                                        
                                        <h4 className="relative z-10 font-display font-bold text-white text-xl mb-4">{l.label}</h4>
                                        
                                        <div className="relative z-10 mt-auto">
                                            <span className="font-mono text-xs font-bold tracking-widest text-[#10b981] bg-[#10b981]/10 border border-[#10b981]/20 px-4 py-2 rounded-full inline-block">
                                                {l.tag}
                                            </span>
                                        </div>
                                    </div>
                                </BlurFade>
                            );
                        })}
                    </div>

                    {/* CTA */}
                    <BlurFade delay={0.5} inView>
                        <div className="relative rounded-[2.5rem] border border-[#10b981]/20 bg-gradient-to-br from-[#10b981]/10 to-zinc-950 p-10 md:p-16 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10 shadow-[0_0_50px_rgba(16,185,129,0.05)]">
                            <BorderBeam size={300} duration={12} colorFrom="#10b981" colorTo="#06b6d4" borderWidth={2} />
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
                            
                            <div className="relative z-10 text-center md:text-left max-w-xl">
                                <h3 className="font-display text-3xl md:text-4xl font-black text-white mb-4">Butuh Dokumen Lengkap?</h3>
                                <p className="font-body text-zinc-400 text-lg leading-relaxed">
                                    Company profile PDF lengkap, portofolio terbaru, NPWP, NIB, dan Akta Pendirian tersedia atas permintaan untuk keperluan administratif Anda.
                                </p>
                            </div>
                            
                            <Link href="/contact"
                                className="relative z-10 shrink-0 group inline-flex items-center gap-3 bg-white text-black hover:bg-[#10b981] hover:text-white font-display font-bold px-8 py-5 rounded-2xl transition-all duration-500 shadow-xl">
                                <span>Hubungi Kami</span>
                                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </BlurFade>
                </div>
            </section>
        </MainLayout>
    );
}
