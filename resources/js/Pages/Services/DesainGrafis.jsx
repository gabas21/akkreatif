import { Link } from '@inertiajs/react';
import SEOHead from '@/Components/SEOHead';
import MainLayout from '@/Layouts/MainLayout';
import { useIntersection } from '@/hooks/useIntersection';
import { cn } from '@/lib/utils';
import PortfolioTeaser from '@/Components/ui/PortfolioTeaser';
import WorkflowTimeline from '@/Components/ui/WorkflowTimeline';
import ServiceDeliverables from '@/Components/ui/ServiceDeliverables';

const features = [
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
            </svg>
        ),
        title: 'Logo & Brand Identity',
        desc: 'Identitas visual yang kuat dan memorable. Kami menciptakan logo yang merepresentasikan nilai dan karakter brand Anda.',
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
            </svg>
        ),
        title: 'Marketing Collateral',
        desc: 'Brosur, banner, flyer, dan semua materi pemasaran yang konsisten dengan identitas brand Anda.',
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Z" />
            </svg>
        ),
        title: 'Social Media Assets',
        desc: 'Template feed, story, cover, dan konten visual yang eye-catching untuk semua platform sosial media.',
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
        ),
        title: 'Packaging Design',
        desc: 'Desain kemasan produk yang menarik dan informatif, mampu menonjol di rak toko maupun marketplace.',
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5H3m6.75-14.25L14.25 12 9.75 18.75m0-18.75H21M9.75 3l4.5 4.5M21 12H9.75m11.25 0-4.5 4.5" />
            </svg>
        ),
        title: 'UI/UX Design',
        desc: 'Antarmuka aplikasi dan website yang intuitif dan estetis — menciptakan pengalaman pengguna yang tak terlupakan.',
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
            </svg>
        ),
        title: 'Brand Strategy',
        desc: 'Konsultasi dan pengembangan strategi brand yang komprehensif untuk membangun posisi Anda di pasar.',
    },
];

const palette = ['#0a0a0a', '#16a34a', '#22c55e', '#4ade80', '#f0fdf4', '#ffffff'];


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

import { IpadPro } from '@/Components/ui/ipad-pro';
import { MacbookPro } from '@/Components/ui/macbook-pro';
import ServiceHero from '@/Components/Sections/ServiceHero';

export default function DesainGrafis() {

    return (
        <MainLayout>
            <SEOHead
                title="Jasa Desain Grafis & Branding Profesional"
                description="Layanan desain grafis profesional di Kalimantan Timur. AK Kreatif menangani logo, identitas merek, bahan promosi, dan desain kreatif untuk bisnis Anda."
                canonical="/services/desain-grafis"
                jsonLd={{
                    '@context': 'https://schema.org',
                    '@type': 'Service',
                    name: 'Jasa Desain Grafis & Branding',
                    provider: { '@type': 'LocalBusiness', name: 'AK Kreatif', url: 'https://akkreatif.my.id', telephone: '+6285224302550' },
                    areaServed: 'Kalimantan Timur',
                    description: 'Desain logo, identitas merek, materi promosi, dan konten visual kreatif.',
                    serviceType: 'Graphic Design',
                    url: 'https://akkreatif.my.id/services/desain-grafis',
                }}
            />

            <ServiceHero
                badge="Creative Identity"
                title="Desain"
                titleAccent="Grafis."
                description="Identitas visual yang ikonik dan materi pemasaran yang memukau. Kami menyuntikkan nyawa pada setiap lekuk vektor dan tipografi untuk meninggalkan kesan mendalam."
                extra={
                    <div className="flex items-center gap-4 bg-white/5 border border-white/10 w-max px-5 py-3 rounded-2xl backdrop-blur-sm">
                        <span className="font-body text-xs text-white/60 font-bold uppercase tracking-widest mr-2">Brand Palette</span>
                        <div className="flex gap-2">
                            {palette.map((c, i) => (
                                <div key={i} className="w-6 h-6 rounded-md shadow-lg hover:scale-125 transition-transform cursor-pointer" style={{ background: c }} />
                            ))}
                        </div>
                    </div>
                }
            >
                {/* Device Mockup */}
                <div className="relative w-full flex justify-center perspective-1000">
                    <div className="relative w-[1000px] h-[600px] flex items-center justify-center scale-[0.38] sm:scale-[0.45] md:scale-[0.55] lg:scale-[0.5] xl:scale-[0.6] origin-center">
                        <div className="group absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-700 hover:z-50 hover:-translate-y-[55%] pointer-events-auto">
                            <MacbookPro className="scale-[1.1] shadow-[0_30px_60px_rgba(0,0,0,0.9)] group-hover:shadow-[0_40px_100px_rgba(16,185,129,0.3)] group-hover:scale-[1.15] cursor-pointer transition-all duration-700 ease-out origin-center">
                                <div className="w-full h-full bg-zinc-900 flex relative overflow-hidden">
                                   <div className="absolute inset-0 bg-black z-20 transition-opacity duration-700 pointer-events-none opacity-80 group-hover:opacity-0" />
                                   <div className="w-12 bg-zinc-950 border-r border-white/10 flex flex-col items-center py-4 gap-4 px-2 z-10 relative transition-transform duration-700 -translate-x-full group-hover:translate-x-0 delay-100">
                                        {[1,2,3,4,5,6].map(i => (<div key={i} className="w-6 h-6 rounded bg-white/10 flex items-center justify-center"><div className="w-3 h-3 rounded-sm border border-white/40" /></div>))}
                                   </div>
                                   <div className="flex-1 flex items-center justify-center relative">
                                        <div className="w-64 h-64 bg-white shadow-2xl relative translate-y-8 group-hover:translate-y-0 transition-transform duration-700 delay-300">
                                            <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-500" /><div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500" />
                                            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-500" /><div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-500" />
                                            <div className="w-full h-full flex items-center justify-center border-2 border-blue-500/50">
                                                <img src="/images/logo-color.webp" alt="AK Kreatif Logo" className="w-40 h-40 object-contain" />
                                            </div>
                                        </div>
                                   </div>
                                   <div className="w-48 bg-zinc-950 border-l border-white/10 flex flex-col p-4 gap-4 z-10 relative transition-transform duration-700 translate-x-full group-hover:translate-x-0 delay-200">
                                        <div className="h-4 w-16 bg-white/20 rounded" /><div className="h-2 w-full bg-white/10 rounded" /><div className="h-2 w-full bg-white/10 rounded" />
                                        <div className="grid grid-cols-2 gap-2 mt-4"><div className="h-8 bg-zinc-800 rounded border border-white/20" /><div className="h-8 bg-zinc-800 rounded border border-white/20" /></div>
                                        <div className="mt-4"><div className="h-4 w-24 bg-white/20 rounded mb-2" /><div className="flex flex-wrap gap-1">{palette.map((c,i)=><div key={i} className="w-6 h-6 rounded-full" style={{background:c}}/>)}</div></div>
                                   </div>
                                </div>
                            </MacbookPro>
                        </div>
                        <div className="group absolute top-[55%] left-[24%] -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-700 hover:z-50 hover:-translate-y-[60%] pointer-events-auto">
                            <IpadPro className="scale-[0.7] -rotate-[10deg] group-hover:-rotate-[4deg] group-hover:scale-[0.75] cursor-pointer shadow-[0_40px_80px_rgba(0,0,0,0.9)] group-hover:shadow-[0_40px_100px_rgba(59,130,246,0.3)] transition-all duration-700 ease-out origin-center">
                                <div className="w-full h-full bg-[#1c1c1e] flex flex-col relative overflow-hidden">
                                    <div className="absolute inset-0 bg-black z-20 transition-opacity duration-700 pointer-events-none opacity-80 group-hover:opacity-0" />
                                    <div className="absolute top-4 left-4 flex gap-4 z-10"><div className="w-10 h-10 bg-white/10 backdrop-blur rounded-full border border-white/20" /><div className="w-10 h-10 bg-white/10 backdrop-blur rounded-full border border-white/20" /></div>
                                    <div className="absolute top-4 right-4 flex gap-2 z-10"><div className="w-8 h-8 rounded-full border border-white/30" style={{background:'#10b981'}} /><div className="w-8 h-8 rounded-full border border-white/30" style={{background:'#3b82f6'}} /><div className="w-8 h-8 rounded-full border border-white/30" style={{background:'#f59e0b'}} /></div>
                                    <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-700 delay-100 w-full h-full flex items-center justify-center">
                                        <svg width="300" height="300" viewBox="0 0 100 100" className="text-[#10b981] drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]"><path d="M50 10 C30 10 10 30 10 50 C10 70 30 90 50 90 C70 90 90 70 90 50 C90 30 70 10 50 10 Z" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M30 50 L45 65 L70 35" fill="none" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" /></svg>
                                    </div>
                                </div>
                                <div className="absolute -right-8 top-1/2 w-4 h-48 bg-gray-200 rounded-full shadow-2xl rotate-[15deg] group-hover:rotate-[5deg] group-hover:-translate-x-12 transition-all duration-700 z-50 flex flex-col items-center"><div className="w-full h-8 bg-gray-300 rounded-t-full" /><div className="flex-1 w-full bg-white border-x border-gray-300" /><div className="w-3 h-8 bg-zinc-800 rounded-b-full" /></div>
                            </IpadPro>
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
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-black mt-4">Desain yang Berbicara<br />untuk Brand Anda</h2>
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
                subheading="Alur Desain"
                heading={<>Proses Kreatif <span className="text-[#10b981]">Desain Grafis</span></>}
                description="Dari brief hingga final artwork — setiap langkah terstruktur untuk menghasilkan desain yang memuaskan dan on-brand."
                accentColor="#10b981"
                steps={[
                    { number: '01', title: 'Creative Brief', desc: 'Kami menggali visi, misi, target audiens, dan preferensi visual Anda. Semakin detail brief, semakin tajam hasilnya.', details: ['Diskusi brand values & personality', 'Referensi visual & moodboard', 'Penentuan scope & deliverables'] },
                    { number: '02', title: 'Riset & Moodboard', desc: 'Tim desainer menganalisis kompetitor dan tren industri, lalu menyusun moodboard sebagai panduan arah visual.', details: ['Analisis kompetitor visual', 'Tren desain terkini', 'Moodboard & color exploration'] },
                    { number: '03', title: 'Sketsa & Konsep', desc: 'Kami mengembangkan beberapa alternatif konsep. Anda memilih arah yang paling sesuai untuk dilanjutkan.', details: ['3-5 alternatif konsep', 'Presentasi konsep & rasional', 'Pemilihan konsep terpilih'] },
                    { number: '04', title: 'Eksekusi & Refinement', desc: 'Konsep terpilih dieksekusi secara detail. Kami memperbaiki tipografi, warna, dan komposisi hingga pixel-perfect.', details: ['Eksekusi high-resolution', 'Revisi unlimited (sesuai paket)', 'Detail finishing & quality check'] },
                    { number: '05', title: 'Handover & Guidelines', desc: 'File final dikirim dalam berbagai format. Untuk branding, kami menyertakan brand guideline lengkap.', details: ['File AI, EPS, PNG, PDF', 'Brand guideline (jika branding)', 'Support pasca-delivery'] },
                ]}
            />

            {/* ── Durasi & Output ── */}
            <ServiceDeliverables 
                accentColor="#10b981"
                packages={[
                    {
                        name: "Desain Grafis & Branding",
                        durations: [
                            { label: "Eksplorasi Konsep", value: "3 hari" },
                            { label: "Revisi Minor", value: "1 hari" },
                            { label: "Finalisasi File", value: "1 hari" }
                        ],
                        outputs: [
                            "File Master (.AI / .PSD)",
                            "High-Res Export (.PNG / .JPG / .PDF)",
                            "Dokumen Guideline Branding",
                            "Mockup 3D"
                        ]
                    }
                ]}
            />

            {/* ── Portfolio Preview CTA ── */}
            <PortfolioTeaser
                subheading="Lihat Karya Desain Kami"
                heading="Lebih dari Kata-kata — Lihat Langsung Hasilnya"
                desc="Dari logo brand hingga desain kemasan produk, semua karya desain grafis kami bisa Anda lihat langsung di halaman portofolio. Temukan inspirasi untuk brand Anda."
                accentColor="#10b981"
                bg="bg-white"
                previews={[
                    {
                        image: '/images/unsplash/1629424606674-67dce8a49af8.webp',
                        label: 'Brand Identity',
                        title: 'Rebranding Kopi Kenangan',
                    },
                    {
                        image: '/images/unsplash/1561070791-2526d30994b5.webp',
                        label: 'Packaging Design',
                        title: 'Kemasan Produk Lokal Kalimantan',
                    },
                    {
                        image: '/images/unsplash/1586717791821-3f44a563fa4c.webp',
                        label: 'UI/UX Design',
                        title: 'Dashboard Analytics UMKM',
                    },
                ]}
                buttons={[
                    { label: 'Lihat Semua Karya Desain', href: '/portfolio?category=design', primary: true },
                    { label: 'Konsultasi Desain Gratis', href: '/contact', primary: false },
                ]}
            />

            {/* CTA */}
            <section className="section-padding bg-black">
                <div className="container-custom text-center">
                    <h2 className="font-display text-3xl md:text-5xl font-black text-white mb-4">
                        Wujudkan <span className="text-[#10b981]">Visual Brand</span> Impian Anda
                    </h2>
                    <p className="font-body text-white/60 mb-8 max-w-xl mx-auto">Konsultasikan kebutuhan desain Anda dan kami akan membuat proposal kreatif secara gratis.</p>
                    <Link href="/contact" className="inline-flex items-center gap-2 bg-[#10b981] text-white font-body font-bold px-8 py-4 rounded-full hover:gap-4 transition-all duration-300">
                        Mulai Desain Sekarang
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                    </Link>
                </div>
            </section>
        </MainLayout>
    );
}
