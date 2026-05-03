import React from 'react';
import SEOHead from '@/Components/SEOHead';
import MainLayout from '@/Layouts/MainLayout';
import { BlurFade } from '@/Components/ui/blur-fade';
import { BorderBeam } from '@/Components/ui/border-beam';
import { SparklesCore } from '@/Components/ui/sparkles';

const TEAM = [
    { initials: 'MGA', name: 'M Ghazi Arkam',       role: 'Direktur',             color: '#10b981' },
    { initials: 'AK',  name: 'Andrey Kurniawan',     role: 'Advisor',              color: '#3b82f6' },
    { initials: 'FED', name: 'Fitri Eka Dinanti',    role: 'Advisor',              color: '#f43f5e' },
    { initials: 'R',   name: 'Rusdi',                role: 'Advisor',              color: '#8b5cf6' },
    { initials: 'JP',  name: 'Jerry Pahlevi',        role: 'Advisor',              color: '#14b8a6' },
    { initials: 'FY',  name: 'Febry Yonada',         role: 'Sekretaris & Bendahara', color: '#8b5cf6' },
    { initials: 'MGB', name: 'M Guntur Borneo',      role: 'PIC Programmer',       color: '#10b981' },
    { initials: 'ARS', name: 'Arrauf Rizki Saputra', role: 'PIC Designer',         color: '#f59e0b' },
    { initials: 'AS',  name: 'Adya Shiva',           role: 'PIC Social Media',     color: '#ec4899' },
    { initials: 'QF',  name: 'Qiyam Firjan',         role: 'PIC Foto & Videografi',color: '#60a5fa' },
    { initials: 'S',   name: 'Selviyanti',           role: 'Public Relation',      color: '#d946ef' },
    { initials: 'MR',  name: 'M Reza Padillah',      role: 'Programmer',           color: '#10b981' },
];

export default function StrukturTim() {
    return (
        <MainLayout>
            <SEOHead
                title="Struktur & Tim"
                description="Kenali tim ahli di balik AK Kreatif. Kami terdiri dari profesional di bidang web development, desain grafis, dan multimedia."
                canonical="/about/struktur-tim"
            />
            
            {/* TIM KAMI */}
            <section className="bg-zinc-950 pt-28 md:pt-40 pb-16 md:pb-20 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <SparklesCore id="team-sparkles" particleDensity={20} particleColor="#ffffff" className="w-full h-full opacity-30" />
                </div>
                
                <div className="container-custom relative z-10">
                    <BlurFade delay={0.1} inView className="mb-16">
                        <span className="inline-block font-mono text-xs text-[#10b981] uppercase tracking-[0.3em] bg-[#10b981]/10 px-4 py-2 rounded-full border border-[#10b981]/20">Tim Kami</span>
                        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white mt-5 sm:mt-6 leading-tight">
                            Orang-Orang<br />di Balik Layar.
                        </h1>
                        <p className="font-body text-zinc-400 text-lg mt-4 max-w-lg">
                            Jenius-jenius muda yang ketagihan pada kesempurnaan pixel dan optimasi kode.
                        </p>
                    </BlurFade>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {TEAM.map((m, i) => (
                            <BlurFade key={i} delay={0.05 + i * 0.05} inView>
                                <div className="group relative rounded-3xl border border-white/5 bg-zinc-900/40 backdrop-blur-sm p-6 overflow-hidden hover:border-white/10 hover:bg-zinc-900/80 transition-all duration-500">
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <BorderBeam size={100} duration={6} colorFrom={m.color} colorTo={m.color + '00'} borderWidth={1.5} />
                                    </div>

                                    {/* Ambient Glow */}
                                    <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-[40px] pointer-events-none" style={{ background: m.color }} />

                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-display font-black text-xl mb-6 shadow-xl transition-transform duration-500 group-hover:scale-105"
                                        style={{ background: `linear-gradient(135deg, ${m.color}20, transparent)`, border: `1px solid ${m.color}30`, color: m.color }}>
                                        {m.initials}
                                    </div>

                                    <h3 className="font-display font-bold text-white text-lg tracking-tight mb-1">{m.name}</h3>
                                    <div className="font-mono text-[10px] uppercase tracking-widest font-semibold" style={{ color: m.color }}>
                                        {m.role}
                                    </div>
                                </div>
                            </BlurFade>
                        ))}
                    </div>
                </div>
            </section>

            {/* STRUKTUR ORGANISASI */}
            <section className="bg-black py-16 md:py-24 border-t border-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-[#10b981]/50 to-transparent opacity-50" />
                
                <div className="container-custom">
                    <BlurFade delay={0.1} inView className="text-center mb-20">
                        <span className="inline-block font-mono text-xs text-[#10b981] uppercase tracking-[0.3em] bg-[#10b981]/10 px-4 py-2 rounded-full border border-[#10b981]/20">Struktur Organisasi</span>
                        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white mt-5 sm:mt-6">Satu Unit, Satu Tujuan.</h2>
                    </BlurFade>

                    <BlurFade delay={0.2} inView>
                        <div className="max-w-4xl mx-auto flex flex-col items-center">
                            {/* Direktur */}
                            <div className="relative w-64 p-8 rounded-3xl text-center border border-[#10b981]/30 bg-gradient-to-b from-[#10b981]/10 to-transparent shadow-[0_0_40px_rgba(16,185,129,0.1)]">
                                <BorderBeam size={120} duration={8} colorFrom="#10b981" colorTo="#34d399" borderWidth={1} />
                                <div className="w-16 h-16 mx-auto rounded-2xl bg-[#10b981]/20 border border-[#10b981]/40 flex items-center justify-center mb-4 shadow-inner">
                                    <span className="font-display font-black text-[#10b981] text-xl">MGA</span>
                                </div>
                                <div className="font-mono text-[10px] uppercase tracking-widest text-[#10b981]/80 mb-2">Direktur</div>
                                <h3 className="font-display font-black text-white text-xl">M Ghazi Arkam</h3>
                            </div>

                            <div className="w-px h-10 bg-gradient-to-b from-[#10b981]/50 to-white/10" />

                            {/* Sekretaris */}
                            <div className="relative w-64 p-6 rounded-3xl text-center border border-purple-500/20 bg-gradient-to-b from-purple-500/10 to-transparent">
                                <div className="w-14 h-14 mx-auto rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center mb-3">
                                    <span className="font-display font-black text-purple-400 text-lg">FY</span>
                                </div>
                                <div className="font-mono text-[9px] uppercase tracking-widest text-purple-400/80 mb-1.5">Sekretaris & Bendahara</div>
                                <h4 className="font-display font-bold text-white text-lg">Febry Yonada</h4>
                            </div>

                            <div className="w-px h-10 bg-gradient-to-b from-white/10 to-transparent relative" />

                            {/* 4 PIC */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mt-4">
                                {[
                                    { initials: 'MGB', name: 'M Guntur Borneo',      role: 'PIC Programmer', color: '#10b981', sub: { initials: 'MR', name: 'M Reza Padillah', role: 'Programmer' } },
                                    { initials: 'ARS', name: 'Arrauf Rizki Saputra', role: 'PIC Designer',   color: '#f59e0b' },
                                    { initials: 'AS',  name: 'Adya Shiva',           role: 'PIC SMM',        color: '#ec4899' },
                                    { initials: 'QF',  name: 'Qiyam Firjan',         role: 'PIC Foto & Video', color: '#60a5fa' },
                                ].map((p, i) => (
                                    <div key={i} className="group relative p-5 rounded-3xl border bg-zinc-900/50 backdrop-blur-sm text-center hover:-translate-y-2 transition-transform duration-500"
                                        style={{ borderColor: p.color + '25' }}>
                                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" style={{ backgroundImage: `linear-gradient(to bottom, ${p.color}10, transparent)` }} />
                                        <div className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3 text-sm font-black font-display relative z-10 shadow-lg"
                                            style={{ background: `linear-gradient(135deg, ${p.color}20, transparent)`, border: `1px solid ${p.color}40`, color: p.color }}>
                                            {p.initials}
                                        </div>
                                        <div className="font-mono text-[9px] uppercase tracking-widest mb-1.5 relative z-10" style={{ color: p.color }}>{p.role}</div>
                                        <p className="font-display font-bold text-white text-sm leading-tight relative z-10">{p.name}</p>
                                        
                                        {p.sub && (
                                            <div className="mt-4 pt-4 border-t relative z-10" style={{ borderColor: p.color + '20' }}>
                                                <div className="font-mono text-[8px] uppercase tracking-widest mb-1.5" style={{ color: p.color + 'aa' }}>{p.sub.role}</div>
                                                <p className="font-display font-semibold text-zinc-300 text-[11px]">{p.sub.name}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </BlurFade>
                </div>
            </section>
        </MainLayout>
    );
}
