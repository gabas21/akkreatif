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
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
            </svg>
        ),
        title: 'Product Photography',
        desc: 'Foto produk profesional yang menonjolkan keunggulan visual produk Anda untuk kebutuhan digital maupun cetak.',
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125h-1.5m1.5-1.5v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-16.5A1.125 1.125 0 0 1 2.25 18.375v-1.5A1.125 1.125 0 0 1 3.375 15.75h16.5a1.125 1.125 0 0 1 1.125 1.125v1.5a1.125 1.125 0 0 1-1.125 1.125Z" />
            </svg>
        ),
        title: 'Corporate Video',
        desc: 'Video profil perusahaan yang impresif, company profile, video testimonial, dan materi audio-visual marketing.',
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
            </svg>
        ),
        title: 'Event Documentation',
        desc: 'Dokumentasi lengkap acara perusahaan, seminar, launching, dan gathering — foto & video berkualitas sinematik.',
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
            </svg>
        ),
        title: 'Drone Footage',
        desc: 'Pengambilan gambar udara menggunakan drone untuk tampilan aerial yang menakjubkan dan perspektif unik.',
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
            </svg>
        ),
        title: 'Post-Production & Editing',
        desc: 'Color grading, sound design, motion graphic, dan editing profesional untuk menghasilkan konten final yang memukau.',
    },
    {
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z" />
            </svg>
        ),
        title: 'Event Management',
        desc: 'Perencanaan dan eksekusi event end-to-end — dari konsep, dekorasi, rundown, hingga koordinasi teknis hari-H.',
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

import { CameraMockup } from '@/Components/ui/camera-mockup';
import ServiceHero from '@/Components/Sections/ServiceHero';

export default function FotoVideoEvent() {

    return (
        <MainLayout>
            <SEOHead
                title="Jasa Dokumentasi Foto & Video Event"
                description="Layanan dokumentasi foto dan video event profesional dari AK Kreatif. Kami mengabadikan momen penting acara Anda dengan kualitas sinematik terbaik di Kalimantan Timur."
                canonical="/services/foto-video-event"
                jsonLd={{
                    '@context': 'https://schema.org',
                    '@type': 'Service',
                    name: 'Jasa Dokumentasi Foto & Video Event',
                    provider: { '@type': 'LocalBusiness', name: 'AK Kreatif', url: 'https://akkreatif.my.id', telephone: '+6285224302550' },
                    areaServed: 'Kalimantan Timur',
                    description: 'Dokumentasi foto dan video acara perusahaan, pernikahan, festival, dan event lainnya.',
                    serviceType: 'Photography & Videography',
                    url: 'https://akkreatif.my.id/services/foto-video-event',
                }}
            />

            <ServiceHero
                badge="Visual Engine"
                title="Foto, Video"
                titleAccent="& Event."
                accentColor="#f59e0b"
                description="Mengabadikan momen berharga dalam standar sinematik resolusi tinggi — dari produksi komersial hingga eksekusi panggung event end-to-end."
            >
                <div className="relative w-full flex justify-center perspective-1000">
                    <div className="relative w-[800px] h-[600px] flex items-center justify-center scale-[0.42] sm:scale-[0.52] md:scale-[0.62] lg:scale-[0.7] xl:scale-[0.8] origin-center">
                        <div className="group absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-700 hover:scale-[1.02] pointer-events-auto cursor-pointer">
                            <CameraMockup className="shadow-[0_40px_80px_rgba(0,0,0,0.9)] group-hover:shadow-[0_40px_100px_rgba(245,158,11,0.4)] transition-all duration-700">
                                {/* The Photo/Video Content inside Camera Screen */}
                                <img 
                                    src="/images/unsplash/1492691527719-9d1e07e534b4.jpg" 
                                    alt="Dokumentasi Event Festival Mahakam" 
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                            </CameraMockup>
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
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-black mt-4">Visual Memukau untuk<br />Setiap Momen Penting</h2>
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
                subheading="Alur Produksi"
                heading={<>Proses Produksi <span className="text-[#f59e0b]">Foto, Video & Event</span></>}
                description="Setiap frame dan momen direncanakan dengan matang — dari pra-produksi hingga editing akhir yang memukau."
                accentColor="#f59e0b"
                steps={[
                    { number: '01', title: 'Pre-Production', desc: 'Briefing mendalam tentang konsep, lokasi, talent, dan mood visual. Kami menyiapkan shot list dan storyboard.', details: ['Briefing konsep & tujuan', 'Location scouting', 'Shot list & storyboard'] },
                    { number: '02', title: 'Persiapan Tim & Peralatan', desc: 'Tim crew dan peralatan profesional disiapkan sesuai kebutuhan proyek — kamera, lighting, drone, dan stabilizer.', details: ['Koordinasi tim (photographer, videographer, crew)', 'Setup peralatan profesional', 'Persiapan props & wardrobe'] },
                    { number: '03', title: 'Hari Produksi', desc: 'Sesi foto/video dieksekusi sesuai rencana. Tim kami bekerja efisien sambil tetap fleksibel terhadap momen spontan.', details: ['Sesi foto & video on-location', 'Drone aerial footage', 'Dokumentasi event real-time'] },
                    { number: '04', title: 'Post-Production', desc: 'Proses editing profesional: color grading, retouching, sound design, dan motion graphics untuk hasil cinematic.', details: ['Photo retouching & color grading', 'Video editing & color correction', 'Sound design & music licensing'] },
                    { number: '05', title: 'Delivery & Arsip', desc: 'File final dikirim dalam resolusi tinggi dan format sesuai kebutuhan. Semua raw files diarsipkan selama 6 bulan.', details: ['Delivery format HD/4K', 'Revisi pasca-editing', 'Arsip raw files 6 bulan'] },
                ]}
            />

            {/* ── Durasi & Output ── */}
            <ServiceDeliverables 
                accentColor="#f59e0b"
                packages={[
                    {
                        name: "Jasa Dokumentasi (Foto & Video)",
                        durations: [
                            { label: "Editing Foto", value: "2 hari" },
                            { label: "Editing Video", value: "3 hari" },
                            { label: "Editing Revisi", value: "2 hari" },
                        ],
                        outputs: [
                            "Album Foto",
                            "Google Drive 1 bulan",
                            "DVD + Box Eksklusif"
                        ]
                    },
                    {
                        name: "Event Organizer",
                        durations: [
                            { label: "Konsep", value: "7 hari" },
                            { label: "Perizinan", value: "10 hari" },
                            { label: "Koordinasi Vendor", value: "7 hari" },
                            { label: "Koordinasi Pihak Sponsor", value: "20 hari" },
                            { label: "Koordinasi Tempat Acara", value: "14 hari" },
                        ],
                        outputs: [
                            "Laporan Pelaksanaan",
                            "Dokumentasi Foto & Video"
                        ]
                    }
                ]}
            />

            {/* ── Portfolio Preview CTA ── */}
            <PortfolioTeaser
                subheading="Lihat Karya Foto & Video Kami"
                heading="Setiap Frame Bercerita — Lihat Koleksi Kami"
                desc="Dari foto produk komersial, video sinematik perusahaan, hingga dokumentasi event berskala besar — semua terdokumentasi rapi di portofolio kami."
                accentColor="#f59e0b"
                bg="bg-[#fafafa]"
                previews={[
                    {
                        image: '/images/unsplash/1492691527719-9d1e07e534b4.jpg',
                        label: 'Event Aftermovie',
                        title: 'Festival Mahakam 2023',
                    },
                    {
                        image: '/images/unsplash/1505236858219-8359eb29e329.jpg',
                        label: 'Product Photography',
                        title: 'Produk Nusantara — UMKM Lokal',
                    },
                    {
                        image: '/images/unsplash/1554048612-b6a482bc67e5.jpg',
                        label: 'Drone Footage',
                        title: 'Aerial View Kalimantan',
                    },
                ]}
                buttons={[
                    { label: 'Lihat Galeri Foto & Video', href: '/portfolio?category=media', primary: true, icon: '🎥' },
                    { label: 'Booking Sesi Foto/Video', href: '/contact', primary: false },
                ]}
            />

            {/* CTA */}
            <section className="relative section-padding overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('/images/unsplash/1492691527719-9d1e07e534b4.jpg')` }}
                />
                <div className="absolute inset-0 bg-black/80" />
                <div className="container-custom text-center relative z-10">
                    <h2 className="font-display text-3xl md:text-5xl font-black text-white mb-4">
                        Abadikan Momen <span className="text-[#10b981]">Terbaik Anda</span>
                    </h2>
                    <p className="font-body text-white/60 mb-8 max-w-xl mx-auto">Ceritakan kebutuhan sesi foto/video atau event Anda. Tim kreatif kami siap mewujudkannya.</p>
                    <Link href="/contact" className="inline-flex items-center gap-2 bg-[#10b981] text-white font-body font-bold px-8 py-4 rounded-full hover:gap-4 transition-all duration-300">
                        Booking Sekarang
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                    </Link>
                </div>
            </section>
        </MainLayout>
    );
}
