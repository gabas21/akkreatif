import { Link } from '@inertiajs/react';
import SEOHead from '@/Components/SEOHead';
import MainLayout from '@/Layouts/MainLayout';
import { useIntersection } from '@/hooks/useIntersection';
import { cn } from '@/lib/utils';
import PortfolioTeaser from '@/Components/ui/PortfolioTeaser';
import WorkflowTimeline from '@/Components/ui/WorkflowTimeline';
import ServiceDeliverables from '@/Components/ui/ServiceDeliverables';
import { IconBrandInstagram, IconBrandTiktok, IconBrandYoutube, IconBrandFacebook, IconBrandLinkedin } from '@tabler/icons-react';

const platforms = [
    { icon: <IconBrandInstagram stroke={1.5} />, color: 'from-purple-500 to-pink-500' },
    { icon: <IconBrandTiktok stroke={1.5} />, color: 'from-gray-800 to-black' },
    { icon: <IconBrandYoutube stroke={1.5} />, color: 'from-red-500 to-red-700' },
    { icon: <IconBrandFacebook stroke={1.5} />, color: 'from-blue-500 to-blue-700' },
    { icon: <IconBrandLinkedin stroke={1.5} />, color: 'from-blue-600 to-blue-800' },
];

const features = [
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
            </svg>
        ),
        title: 'Content Strategy & Planning',
        desc: 'Kalender konten terstruktur yang diselaraskan dengan tujuan bisnis dan momen relevan di industri Anda.',
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
            </svg>
        ),
        title: 'Community Management',
        desc: 'Respons cepat, interaksi bermakna, dan membangun komunitas loyal di sekitar brand Anda.',
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 7.756a4.5 4.5 0 1 0 0 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        ),
        title: 'Ads Campaign (Meta & Google)',
        desc: 'Iklan berbayar yang ditargetkan dengan presisi untuk menjangkau audiens yang tepat dan memaksimalkan ROI.',
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
            </svg>
        ),
        title: 'Analytics & Reporting',
        desc: 'Laporan performa rutin yang mudah dipahami — reach, engagement, conversion, dan insight berbasis data.',
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.88a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
            </svg>
        ),
        title: 'Influencer Collaboration',
        desc: 'Identifikasi dan koordinasi kolaborasi dengan KOL/influencer yang relevan untuk memperluas jangkauan brand.',
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
        ),
        title: 'Konten Kreatif',
        desc: 'Produksi konten visual berkualitas: grafis, caption copywriting, reels, dan video pendek yang engaging.',
    },
];


function FeatureCard({ icon, title, desc, delay = 0 }) {
    const [ref, visible] = useIntersection();
    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            className={cn(
                'group bg-white border border-black/8 rounded-2xl p-6 hover:border-[#10b981]/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-400',
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            )}
        >
            <div className="w-12 h-12 rounded-xl bg-[#10b981]/10 flex items-center justify-center text-[#10b981] mb-4 group-hover:bg-[#10b981] group-hover:text-white transition-all duration-300">
                {icon}
            </div>
            <h3 className="font-display text-lg font-bold text-black mb-2">{title}</h3>
            <p className="font-body text-sm text-black/60 leading-relaxed">{desc}</p>
        </div>
    );
}

import { Iphone15Pro } from '@/Components/ui/iphone-15-pro';
import ServiceHero from '@/Components/Sections/ServiceHero';

export default function SocialMediaManagement() {

    return (
        <MainLayout>
            <SEOHead
                title="Jasa Social Media Management Profesional"
                description="Kelola dan kembangkan akun media sosial bisnis Anda bersama AK Kreatif. Kami menyediakan strategi konten, desain feed, dan optimasi engagement di Instagram, TikTok, dll."
                canonical="/services/social-media"
                jsonLd={{
                    '@context': 'https://schema.org',
                    '@type': 'Service',
                    name: 'Social Media Management',
                    provider: { '@type': 'LocalBusiness', name: 'AK Kreatif', url: 'https://akkreatif.my.id', telephone: '+6285224302550' },
                    areaServed: 'Kalimantan Timur',
                    description: 'Manajemen media sosial profesional, strategi konten, desain grafis, dan optimasi profil bisnis.',
                    serviceType: 'Social Media Marketing',
                    url: 'https://akkreatif.my.id/services/social-media',
                }}
            />

            <ServiceHero
                badge="Digital Presence"
                title="Social Media"
                titleAccent="Management."
                accentColor="#ec4899"
                description="Membangun audiens yang loyal dengan strategi konten agresif berbasis analitik. Kami menyulap lini masa Anda menjadi mesin konversi."
                extra={
                    <div className="flex flex-wrap gap-4 items-center">
                        <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Platforms:</span>
                        {platforms.map((p, i) => (
                            <div key={i} className={`w-10 h-10 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-white text-xs font-black shadow-lg hover:scale-110 hover:-translate-y-1 transition-transform cursor-pointer`}>
                                {p.icon}
                            </div>
                        ))}
                    </div>
                }
            >
                <div className="relative w-full flex justify-center perspective-1000">
                    <div className="relative w-[800px] h-[700px] flex items-center justify-center scale-[0.42] sm:scale-[0.52] md:scale-[0.62] lg:scale-[0.56] xl:scale-[0.7] origin-center">
                        {/* LEFT PHONE */}
                        <div className="group absolute top-1/2 left-[20%] -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-700 hover:z-50 hover:-translate-y-[55%] pointer-events-auto">
                            <Iphone15Pro className="scale-[0.8] -rotate-[15deg] group-hover:-rotate-[5deg] group-hover:scale-[0.9] cursor-pointer shadow-[0_40px_80px_rgba(0,0,0,0.9)] group-hover:shadow-[0_40px_100px_rgba(168,85,247,0.4)] transition-all duration-700 ease-out origin-center">
                                <div className="w-full h-full bg-[#0a0a0a] flex flex-col pt-16 px-4 pb-6 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-black z-20 opacity-80 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none" />
                                    <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-black pointer-events-none" />
                                    <div className="relative z-10 translate-y-8 group-hover:translate-y-0 transition-transform duration-700 delay-100 h-full flex flex-col gap-4">
                                        <div className="flex justify-between items-center px-2">
                                            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center"><div className="w-4 h-4 bg-purple-500 rounded-full" /></div>
                                            <div className="w-20 h-6 bg-white/10 rounded-full" />
                                        </div>
                                        <div className="mt-4 p-4 rounded-3xl bg-white/5 border border-white/10">
                                            <div className="h-4 w-24 bg-white/20 rounded mb-4" />
                                            <div className="flex items-end gap-2 h-24 mb-2">
                                                {[40, 70, 45, 90, 65, 80].map((h, i) => (<div key={i} className="flex-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-sm" style={{ height: `${h}%` }} />))}
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="flex-1 h-20 rounded-2xl bg-white/5 border border-white/10" />
                                            <div className="flex-1 h-20 rounded-2xl bg-white/5 border border-white/10" />
                                        </div>
                                    </div>
                                </div>
                            </Iphone15Pro>
                        </div>
                        {/* RIGHT PHONE */}
                        <div className="group absolute top-[52%] left-[80%] -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-700 hover:z-50 hover:-translate-y-[55%] pointer-events-auto">
                            <Iphone15Pro className="scale-[0.85] rotate-[12deg] group-hover:rotate-[5deg] group-hover:scale-[0.95] cursor-pointer shadow-[0_40px_80px_rgba(0,0,0,0.9)] group-hover:shadow-[0_40px_100px_rgba(236,72,153,0.3)] transition-all duration-700 ease-out origin-center">
                                <div className="w-full h-full bg-[#0a0a0a] flex flex-col pt-16 px-4 pb-6 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-black z-20 opacity-80 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none" />
                                    <div className="absolute inset-0 bg-gradient-to-b from-pink-900/20 to-black pointer-events-none" />
                                    <div className="relative z-10 translate-y-8 group-hover:translate-y-0 transition-transform duration-700 delay-100 flex flex-col gap-4">
                                        <div className="h-8 w-32 bg-white/10 rounded-full mx-auto mb-4" />
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className={`flex items-end gap-3 ${i % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                                                <div className="w-8 h-8 rounded-full bg-zinc-800 shrink-0" />
                                                <div className={`p-3 rounded-2xl max-w-[70%] ${i % 2 === 0 ? 'bg-pink-600 rounded-br-sm' : 'bg-zinc-800 rounded-bl-sm'}`}>
                                                    <div className="h-2 w-full bg-white/30 rounded mb-2" />
                                                    <div className="h-2 w-2/3 bg-white/20 rounded" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Iphone15Pro>
                        </div>
                        {/* CENTER PHONE */}
                        <div className="group absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-700 hover:z-50 hover:-translate-y-[52%] pointer-events-auto">
                            <Iphone15Pro className="scale-[1.0] cursor-pointer shadow-[0_50px_100px_rgba(0,0,0,0.95)] group-hover:shadow-[0_40px_120px_rgba(236,72,153,0.5)] group-hover:scale-[1.05] transition-all duration-700 ease-out origin-center">
                                <div className="w-full h-full bg-zinc-950 flex flex-col relative overflow-hidden">
                                    <div className="absolute inset-0 bg-black z-20 opacity-60 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none" />
                                    <div className="h-16 border-b border-white/10 flex flex-col justify-end pb-3 px-4 shrink-0">
                                        <div className="flex justify-between items-center">
                                            <div className="font-display font-bold text-white">AK Kreatif</div>
                                            <div className="flex gap-4"><div className="w-5 h-5 border-2 border-white rounded" /><div className="w-5 h-5 border-2 border-white rounded" /></div>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 px-4 py-4 border-b border-white/10 overflow-hidden shrink-0">
                                        {[1,2,3,4].map(i => (<div key={i} className="w-14 h-14 rounded-full border-2 border-pink-500 p-0.5 shrink-0"><div className="w-full h-full bg-zinc-800 rounded-full" /></div>))}
                                    </div>
                                    <div className="flex-1 relative translate-y-8 group-hover:translate-y-0 transition-transform duration-700 delay-100 px-4 pt-4">
                                        <div className="flex items-center gap-3 mb-3"><div className="w-8 h-8 bg-zinc-800 rounded-full" /><div className="h-3 w-24 bg-white/20 rounded" /></div>
                                        <div className="w-full h-48 bg-gradient-to-tr from-pink-500 to-purple-500 rounded-xl mb-3" />
                                        <div className="flex gap-3 mb-2"><div className="w-5 h-5 bg-white/20 rounded-full" /><div className="w-5 h-5 bg-white/20 rounded-full" /><div className="w-5 h-5 bg-white/20 rounded-full" /></div>
                                        <div className="h-2 w-32 bg-white/20 rounded mb-1" />
                                        <div className="h-2 w-full bg-white/10 rounded" />
                                    </div>
                                </div>
                            </Iphone15Pro>
                        </div>
                    </div>
                </div>
            </ServiceHero>



            {/* Features Grid */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <span className="font-body text-xs font-bold uppercase tracking-[0.2em] text-[#10b981]">Yang Kami Tawarkan</span>
                        <div className="w-8 h-px bg-[#10b981] mx-auto my-3" />
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-black mt-4">Kelola Semua Platform<br />dalam Satu Tangan</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {features.map((f, i) => (
                            <FeatureCard key={i} {...f} delay={i * 80} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Sistem Kerja ── */}
            <WorkflowTimeline
                subheading="Alur Kerja"
                heading={<>Proses Kelola <span className="text-[#ec4899]">Social Media</span></>}
                description="Strategi berbasis data yang terukur — mulai dari audit akun hingga konten yang viral dan menghasilkan konversi."
                accentColor="#ec4899"
                steps={[
                    { number: '01', title: 'Audit & Onboarding', desc: 'Kami mengaudit performa akun Anda saat ini, memahami audiens, dan mempelajari tone of voice brand.', details: ['Audit akun & kompetitor', 'Identifikasi target audiens', 'Penentuan KPI & goals'] },
                    { number: '02', title: 'Strategi & Kalender Konten', desc: 'Menyusun strategi konten 1-3 bulan ke depan, termasuk tema, format, dan jadwal posting optimal.', details: ['Content pillar & themes', 'Kalender posting terstruktur', 'Hashtag & SEO strategy'] },
                    { number: '03', title: 'Produksi Konten', desc: 'Tim kreatif memproduksi konten visual, copywriting, dan video pendek yang engaging sesuai platform.', details: ['Desain grafis & carousel', 'Copywriting & caption', 'Reels, TikTok & video pendek'] },
                    { number: '04', title: 'Publishing & Engagement', desc: 'Konten dipublish sesuai jadwal. Tim community management merespons komentar dan DM secara aktif.', details: ['Scheduling & auto-publish', 'Community management aktif', 'Interaksi & engagement boost'] },
                    { number: '05', title: 'Report & Optimasi', desc: 'Laporan performa bulanan dengan insight berbasis data. Strategi terus dioptimasi berdasarkan hasil nyata.', details: ['Monthly performance report', 'Insight & rekomendasi', 'A/B testing & optimasi'] },
                ]}
            />

            {/* ── Durasi & Output ── */}
            <ServiceDeliverables 
                accentColor="#ec4899"
                packages={[
                    {
                        name: "Manajemen Media Sosial",
                        durations: [
                            { label: "Design Template", value: "3 hari" },
                            { label: "Kalender Posting", value: "4 hari" }
                        ],
                        outputs: [
                            "Postingan Foto",
                            "Postingan Video / Reels",
                            "Laporan Engagement"
                        ]
                    }
                ]}
            />

            {/* ── Portfolio Preview CTA ── */}
            <PortfolioTeaser
                subheading="Lihat Karya Social Media Kami"
                heading="Konten yang Menghasilkan — Bukan Sekadar Posting"
                desc="Ratusan konten kreatif, campaign viral, dan pertumbuhan follower organik yang sudah kami capai bersama klien. Lihat hasilnya di portofolio kami."
                accentColor="#ec4899"
                bg="bg-[#fafafa]"
                previews={[
                    {
                        image: '/images/unsplash/social-media-icons.webp',
                        label: 'Instagram Campaign',
                        title: 'Campaign #LokalBeraksi',
                    },
                    {
                        image: '/images/unsplash/1563986768609-322da13575f3.webp',
                        label: 'Content Creation',
                        title: 'Feed Branding UMKM Lokal',
                    },
                    {
                        image: '/images/unsplash/1562577309-4932fdd64cd1.webp',
                        label: 'Ads Campaign',
                        title: 'Meta Ads — ROAS 4.2x',
                    },
                ]}
                buttons={[
                    { label: 'Lihat Karya Social Media', href: '/portfolio?category=social', primary: true, icon: '📱' },
                    { label: 'Konsultasi Strategi Gratis', href: '/contact', primary: false },
                ]}
            />

            {/* CTA */}
            <section className="section-padding bg-gradient-to-br from-purple-900 via-pink-900/50 to-black">
                <div className="container-custom text-center">
                    <h2 className="font-display text-3xl md:text-5xl font-black text-white mb-4">
                        Tingkatkan <span className="text-[#10b981]">Presence Digital</span> Anda
                    </h2>
                    <p className="font-body text-white/60 mb-8 max-w-xl mx-auto">Diskusikan strategi sosial media terbaik untuk brand Anda bersama tim specialist kami.</p>
                    <Link href="/contact" className="inline-flex items-center gap-2 bg-[#10b981] text-white font-body font-bold px-8 py-4 rounded-full hover:gap-4 transition-all duration-300">
                        Konsultasi Gratis
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                    </Link>
                </div>
            </section>
        </MainLayout>
    );
}
