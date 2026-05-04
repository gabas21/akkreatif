import React, { useState } from 'react';
import SEOHead from '@/Components/SEOHead';
import MainLayout from '@/Layouts/MainLayout';
import { BlurFade } from '@/Components/ui/blur-fade';
import { BorderBeam } from '@/Components/ui/border-beam';
import { SparklesCore } from '@/Components/ui/sparkles';

const TEAM = [
    { initials: 'MGA', name: 'M Ghazi Arkam',       role: 'Direktur',             color: '#10b981', img: 'https://api.dicebear.com/9.x/micah/svg?seed=Ghazi&backgroundColor=transparent' },
    { initials: 'AK',  name: 'Andrey Kurniawan',     role: 'Advisor',              color: '#3b82f6', img: 'https://api.dicebear.com/9.x/micah/svg?seed=Andrey&backgroundColor=transparent' },
    { initials: 'FED', name: 'Fitri Eka Dinanti',    role: 'Advisor',              color: '#f43f5e', img: 'https://api.dicebear.com/9.x/micah/svg?seed=Fitri&backgroundColor=transparent' },
    { initials: 'R',   name: 'Rusdi',                role: 'Advisor',              color: '#8b5cf6', img: 'https://api.dicebear.com/9.x/micah/svg?seed=Rusdi&backgroundColor=transparent' },
    { initials: 'JP',  name: 'Jerry Pahlevi',        role: 'Advisor',              color: '#14b8a6', img: 'https://api.dicebear.com/9.x/micah/svg?seed=Jerry&backgroundColor=transparent' },
    { initials: 'FY',  name: 'Febry Yonada',         role: 'Sekretaris & Bendahara', color: '#8b5cf6', img: 'https://api.dicebear.com/9.x/micah/svg?seed=Febry&backgroundColor=transparent' },
    { initials: 'MGB', name: 'M Guntur Borneo',      role: 'PIC Programmer',       color: '#10b981', img: 'https://api.dicebear.com/9.x/micah/svg?seed=Guntur&backgroundColor=transparent' },
    { initials: 'ARS', name: 'Arrauf Rizki Saputra', role: 'PIC Designer',         color: '#f59e0b', img: 'https://api.dicebear.com/9.x/micah/svg?seed=Arrauf&backgroundColor=transparent' },
    { initials: 'AS',  name: 'Adya Shiva',           role: 'PIC Social Media',     color: '#ec4899', img: 'https://api.dicebear.com/9.x/micah/svg?seed=Adya&backgroundColor=transparent' },
    { initials: 'QF',  name: 'Qiyam Firjan',         role: 'PIC Foto & Videografi',color: '#60a5fa', img: 'https://api.dicebear.com/9.x/micah/svg?seed=Qiyam&backgroundColor=transparent' },
    { initials: 'S',   name: 'Selviyanti',           role: 'Public Relation',      color: '#d946ef', img: 'https://api.dicebear.com/9.x/micah/svg?seed=Selviyanti&backgroundColor=transparent' },
    { initials: 'MR',  name: 'M Reza Padillah',      role: 'Programmer',           color: '#10b981', img: 'https://api.dicebear.com/9.x/micah/svg?seed=Reza&backgroundColor=transparent' },
];

const ORGANISASI_PICS = [
    { initials: 'MGB', name: 'M Guntur Borneo',      role: 'PIC Programmer', color: '#10b981', img: 'https://api.dicebear.com/9.x/micah/svg?seed=Guntur&backgroundColor=transparent', sub: { initials: 'MR', name: 'M Reza Padillah', role: 'Programmer', img: 'https://api.dicebear.com/9.x/micah/svg?seed=Reza&backgroundColor=transparent' } },
    { initials: 'ARS', name: 'Arrauf Rizki Saputra', role: 'PIC Designer',   color: '#f59e0b', img: 'https://api.dicebear.com/9.x/micah/svg?seed=Arrauf&backgroundColor=transparent' },
    { initials: 'AS',  name: 'Adya Shiva',           role: 'PIC SMM',        color: '#ec4899', img: 'https://api.dicebear.com/9.x/micah/svg?seed=Adya&backgroundColor=transparent' },
    { initials: 'QF',  name: 'Qiyam Firjan',         role: 'PIC Foto & Video', color: '#60a5fa', img: 'https://api.dicebear.com/9.x/micah/svg?seed=Qiyam&backgroundColor=transparent' },
];

// Helper Component for Avatar
function AvatarGlow({ member, size = 'md' }) {
    const [imgErr, setImgErr] = useState(false);
    const sizeClasses = {
        sm: 'w-12 h-12',
        md: 'w-20 h-20',
        lg: 'w-28 h-28',
        xl: 'w-32 h-32'
    };

    return (
        <div className={`relative ${sizeClasses[size]} mx-auto mb-5 z-10 group-hover:scale-105 transition-transform duration-500`}>
            {/* Glow Behind */}
            <div className="absolute inset-0 rounded-full blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500" style={{ backgroundColor: member.color }} />
            
            {/* Avatar Container */}
            <div className="relative w-full h-full rounded-2xl bg-zinc-900 border-2 overflow-hidden shadow-2xl flex items-center justify-center transform rotate-3 group-hover:rotate-0 transition-all duration-500"
                style={{ borderColor: member.color + '60' }}>
                {!imgErr && member.img ? (
                    <img 
                        src={member.img} 
                        alt={member.name} 
                        className="w-full h-full object-cover bg-zinc-800/50"
                        onError={() => setImgErr(true)}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center font-display font-black text-2xl"
                        style={{ background: `linear-gradient(135deg, ${member.color}20, transparent)`, color: member.color }}>
                        {member.initials}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function StrukturTim() {
    return (
        <MainLayout>
            <SEOHead
                title="Struktur & Tim"
                description="Kenali tim ahli di balik AK Kreatif. Kami terdiri dari profesional di bidang web development, desain grafis, dan multimedia."
                canonical="/about/struktur-tim"
            />
            
            {/* STRUKTUR ORGANISASI (Kini di atas) */}
            <section className="bg-zinc-950 pt-28 md:pt-40 pb-16 md:pb-24 relative overflow-hidden">
                {/* Background effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <SparklesCore id="org-sparkles" particleDensity={15} particleColor="#10b981" className="w-full h-full opacity-20" />
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-[#10b981]/50 to-transparent opacity-50" />
                
                <div className="container-custom relative z-10">
                    <BlurFade delay={0.1} inView className="text-center mb-20">
                        <span className="inline-block font-mono text-xs text-[#10b981] uppercase tracking-[0.3em] bg-[#10b981]/10 px-4 py-2 rounded-full border border-[#10b981]/20">Struktur Organisasi</span>
                        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-white mt-5 sm:mt-6 leading-tight">
                            Satu Unit,<br />Satu Tujuan.
                        </h1>
                        <p className="font-body text-zinc-400 text-lg mt-4 max-w-lg mx-auto">
                            Struktur komando yang efisien untuk menghasilkan karya agung secara konsisten.
                        </p>
                    </BlurFade>

                    <BlurFade delay={0.2} inView>
                        <div className="max-w-5xl mx-auto flex flex-col items-center">
                            
                            {/* Direktur */}
                            <div className="group relative w-72 p-8 rounded-[2rem] text-center border border-[#10b981]/30 bg-gradient-to-b from-[#10b981]/10 to-transparent shadow-[0_0_40px_rgba(16,185,129,0.15)] backdrop-blur-md">
                                <BorderBeam size={150} duration={8} colorFrom="#10b981" colorTo="#34d399" borderWidth={1.5} />
                                <AvatarGlow member={TEAM.find(m => m.initials === 'MGA')} size="xl" />
                                <div className="font-mono text-xs uppercase tracking-widest text-[#10b981] mb-2 font-semibold">Direktur</div>
                                <h3 className="font-display font-black text-white text-2xl">M Ghazi Arkam</h3>
                            </div>

                            <div className="w-px h-12 bg-gradient-to-b from-[#10b981]/60 to-white/20" />

                            {/* Sekretaris */}
                            <div className="group relative w-64 p-6 rounded-3xl text-center border border-purple-500/30 bg-gradient-to-b from-purple-500/10 to-transparent backdrop-blur-md">
                                <AvatarGlow member={TEAM.find(m => m.initials === 'FY')} size="lg" />
                                <div className="font-mono text-[10px] uppercase tracking-widest text-purple-400 mb-1.5 font-semibold">Sekretaris & Bendahara</div>
                                <h4 className="font-display font-bold text-white text-xl">Febry Yonada</h4>
                            </div>

                            <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent relative" />

                            {/* 4 PIC */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-2">
                                {ORGANISASI_PICS.map((p, i) => (
                                    <div key={i} className="group relative p-6 rounded-3xl border bg-zinc-900/60 backdrop-blur-xl text-center hover:-translate-y-2 transition-all duration-500 shadow-2xl"
                                        style={{ borderColor: p.color + '30' }}>
                                        {/* Highlight Hover Background */}
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" 
                                             style={{ background: `radial-gradient(circle at top, ${p.color}15, transparent 70%)` }} />
                                        
                                        <AvatarGlow member={p} size="md" />
                                        
                                        <div className="font-mono text-[10px] uppercase tracking-widest mb-2 relative z-10 font-semibold" style={{ color: p.color }}>{p.role}</div>
                                        <p className="font-display font-bold text-white text-lg leading-tight relative z-10">{p.name}</p>
                                        
                                        {p.sub && (
                                            <div className="mt-6 pt-5 border-t relative z-10" style={{ borderColor: p.color + '20' }}>
                                                <div className="flex flex-col items-center">
                                                    <AvatarGlow member={p.sub} size="sm" />
                                                    <div className="font-mono text-[9px] uppercase tracking-widest mb-1 font-semibold" style={{ color: p.color + 'aa' }}>{p.sub.role}</div>
                                                    <p className="font-display font-bold text-zinc-200 text-sm">{p.sub.name}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </BlurFade>
                </div>
            </section>

            {/* TIM KAMI (Kini di bawah) */}
            <section className="bg-black py-16 md:py-24 border-t border-white/10 relative overflow-hidden">
                <div className="container-custom relative z-10">
                    <BlurFade delay={0.1} inView className="mb-16 text-center">
                        <span className="inline-block font-mono text-xs text-[#10b981] uppercase tracking-[0.3em] bg-[#10b981]/10 px-4 py-2 rounded-full border border-[#10b981]/20">Tim Lengkap</span>
                        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white mt-5 sm:mt-6">
                            Orang-Orang di Balik Layar.
                        </h2>
                        <p className="font-body text-zinc-400 text-lg mt-4 max-w-2xl mx-auto">
                            Para spesialis dan penasihat yang memastikan setiap project mencapai standar tertinggi.
                        </p>
                    </BlurFade>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {TEAM.map((m, i) => (
                            <BlurFade key={i} delay={0.05 + i * 0.05} inView>
                                <div className="group relative rounded-[2rem] border border-white/5 bg-zinc-900/40 backdrop-blur-sm p-6 overflow-hidden hover:border-white/10 hover:bg-zinc-800/80 transition-all duration-500 text-center flex flex-col items-center justify-center">
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <BorderBeam size={120} duration={6} colorFrom={m.color} colorTo={m.color + '00'} borderWidth={1.5} />
                                    </div>

                                    {/* Ambient Corner Glow */}
                                    <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-[50px] pointer-events-none" style={{ background: m.color }} />

                                    <AvatarGlow member={m} size="lg" />

                                    <h3 className="font-display font-bold text-white text-xl tracking-tight mb-1.5">{m.name}</h3>
                                    <div className="font-mono text-[10px] uppercase tracking-widest font-semibold px-3 py-1 rounded-full bg-black/50 border" 
                                         style={{ color: m.color, borderColor: m.color + '30' }}>
                                        {m.role}
                                    </div>
                                </div>
                            </BlurFade>
                        ))}
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}

