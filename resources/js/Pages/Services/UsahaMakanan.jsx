import { useState, useRef } from 'react';
import { Link } from '@inertiajs/react';
import SEOHead from '@/Components/SEOHead';
import MainLayout from '@/Layouts/MainLayout';
import { useIntersection } from '@/hooks/useIntersection';
import { cn } from '@/lib/utils';
import ServiceHero from '@/Components/Sections/ServiceHero';
import { Iphone15Pro } from '@/Components/ui/iphone-15-pro';

// ─── CAFE DATA ───────────────────────────────────────────────────────────────
const cafes = [
    {
        id: 'ks-tubun',
        number: '01',
        name: 'AK Coffee — KS Tubun',
        short: 'KS Tubun',
        tagline: 'Where Every Cup Tells a Story',
        story: 'Berlokasi di jantung Samarinda Ulu, AK Coffee KS Tubun adalah ruang ketiga yang sempurna — antara rumah dan kantor. Didesain untuk para pemikir, kreator, dan pencinta kopi sejati.',
        address: 'Jl. KS Tubun Dalam No.38b, Dadi Mulya, Kec. Samarinda Ulu, Kota Samarinda, Kalimantan Timur 75243',
        hours: 'Setiap Hari · 07.00 – 22.00 WITA',
        specialties: [
            { name: 'Single Origin Pour Over', note: 'Arabika Kalimantan' },
            { name: 'Cold Brew 18-Hour', note: 'Dark & Smooth' },
            { name: 'Signature Latte', note: 'House Recipe' },
            { name: 'Espresso Tonic', note: 'Refreshing' },
        ],
        mapSrc: 'https://maps.google.com/maps?q=Jl.+KS+Tubun+Dalam+No.38b,+Dadi+Mulya,+Samarinda+Ulu,+Samarinda&output=embed',
        heroImg: '/images/unsplash/1495474472287-4d71bcdd2085.jpg',
        ambientImg: '/images/unsplash/1442512595331-e89e73853f31.jpg',
        color: '#C8A97E',
        colorDark: '#8B6914',
    },
    {
        id: 'widyaciptra',
        number: '02',
        name: 'AK Coffee — Widyaciptra',
        short: 'Widyaciptra',
        tagline: 'Fuel for the Creative Mind',
        story: 'Tepat di sebelah Honda Dealer, berseberangan dengan STMIK Widyaciptra Darma — AK Coffee hadir sebagai energi harian bagi mahasiswa, akademisi, dan profesional muda Samarinda.',
        address: 'Di sebelah Honda Dealer, dekat STMIK Widyaciptra Darma, Samarinda, Kalimantan Timur',
        hours: 'Setiap Hari · 07.00 – 22.00 WITA',
        specialties: [
            { name: 'Kopi Susu Aren', note: 'Favorit Lokal' },
            { name: 'Vietnamese Drip', note: 'Creamy & Bold' },
            { name: 'Matcha Latte', note: 'Non-Coffee Option' },
            { name: 'Affogato', note: 'Coffee & Ice Cream' },
        ],
        mapSrc: 'https://maps.google.com/maps?q=STMIK+Widyaciptra+Darma+Samarinda+Kalimantan+Timur&output=embed',
        heroImg: '/images/unsplash/1501339847302-ac426a4a7cbb.jpg',
        ambientImg: '/images/unsplash/1509042239860-f550ce710b93.jpg',
        color: '#E8C49A',
        colorDark: '#7C4E1E',
    },
];

// ─── CAFE DEEP SECTION ───────────────────────────────────────────────────────
function CafeSection({ cafe, flipped }) {
    const [ref, visible] = useIntersection();
    const [mapLoaded, setMapLoaded] = useState(false);

    return (
        <section id={cafe.id} className="bg-[#0D0A08] py-24 md:py-36 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">

                {/* ── Top Label Row ── */}
                <div
                    ref={ref}
                    className={cn(
                        'flex items-center justify-between mb-16 transition-all duration-700',
                        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    )}
                >
                    <div className="flex items-center gap-6">
                        <span className="font-display text-8xl font-black opacity-10 text-white leading-none select-none">
                            {cafe.number}
                        </span>
                        <div>
                            <p className="text-xs uppercase tracking-[0.3em] mb-1" style={{ color: cafe.color }}>
                                Lokasi Cafe
                            </p>
                            <h2 className="font-display text-3xl md:text-4xl font-black text-white leading-tight">
                                {cafe.name}
                            </h2>
                        </div>
                    </div>
                    <div
                        className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono font-bold"
                        style={{ color: cafe.color, borderColor: `${cafe.color}30`, background: `${cafe.color}10` }}
                    >
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: cafe.color }} />
                        Buka Hari Ini
                    </div>
                </div>

                {/* ── Main Content Grid ── */}
                <div className={cn(
                    'grid lg:grid-cols-12 gap-6',
                    visible ? 'opacity-100' : 'opacity-0',
                    'transition-opacity duration-1000 delay-200'
                )}>

                    {/* IMAGE BLOCK */}
                    <div className={cn(
                        'lg:col-span-5 flex flex-col gap-6',
                        flipped && 'lg:order-2'
                    )}>
                        {/* Big hero image */}
                        <div className="relative rounded-3xl overflow-hidden h-72 md:h-96 group">
                            <img
                                src={cafe.heroImg}
                                alt={cafe.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute bottom-5 left-5 right-5">
                                <p className="font-display text-white text-xl font-bold italic leading-tight">
                                    "{cafe.tagline}"
                                </p>
                            </div>
                        </div>

                        {/* Ambient small image + specialties side by side */}
                        <div className="grid grid-cols-5 gap-6">
                            <div className="col-span-2 rounded-2xl overflow-hidden">
                                <img
                                    src={cafe.ambientImg}
                                    alt="Suasana cafe"
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                    style={{ minHeight: '160px' }}
                                />
                            </div>
                            {/* Specialties mini */}
                            <div className="col-span-3 flex flex-col justify-center gap-2">
                                {cafe.specialties.map((item) => (
                                    <div
                                        key={item.name}
                                        className="flex items-center justify-between px-3 py-2 rounded-xl border border-white/8 bg-white/3 hover:border-white/20 transition-colors"
                                    >
                                        <span className="text-white/80 text-xs font-body font-semibold">{item.name}</span>
                                        <span className="text-xs font-mono opacity-50" style={{ color: cafe.color }}>{item.note}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* INFO + MAP BLOCK */}
                    <div className={cn(
                        'lg:col-span-7 flex flex-col gap-6',
                        flipped && 'lg:order-1'
                    )}>
                        {/* Story + Info Card */}
                        <div className="rounded-3xl border border-white/8 bg-white/[0.03] p-8 md:p-10">
                            <p className="font-body text-white/60 text-lg leading-relaxed mb-8">
                                {cafe.story}
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {/* Address */}
                                <div className="flex gap-4 p-4 rounded-2xl bg-black/30 border border-white/8">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${cafe.color}15` }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={cafe.color} className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-white/30 text-[10px] uppercase tracking-widest mb-1">Alamat</p>
                                        <p className="text-white/80 text-sm font-body leading-relaxed">{cafe.address}</p>
                                    </div>
                                </div>
                                {/* Hours */}
                                <div className="flex gap-4 p-4 rounded-2xl bg-black/30 border border-white/8">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${cafe.color}15` }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={cafe.color} className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-white/30 text-[10px] uppercase tracking-widest mb-1">Jam Operasional</p>
                                        <p className="text-white/80 text-sm font-body leading-relaxed">{cafe.hours}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map */}
                        <div className="relative rounded-3xl overflow-hidden border border-white/10 flex-1" style={{ minHeight: '300px' }}>
                            {/* Skeleton loader */}
                            {!mapLoaded && (
                                <div className="absolute inset-0 flex items-center justify-center bg-[#1a1410]">
                                    <div className="flex flex-col items-center gap-3 text-white/30">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10 animate-pulse">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                        </svg>
                                        <p className="text-xs font-mono">Memuat peta...</p>
                                    </div>
                                </div>
                            )}
                            <iframe
                                src={cafe.mapSrc}
                                width="100%"
                                height="100%"
                                style={{
                                    border: 0,
                                    minHeight: '300px',
                                    filter: 'invert(92%) hue-rotate(180deg) saturate(0.8) brightness(0.9)',
                                    opacity: mapLoaded ? 1 : 0,
                                    transition: 'opacity 0.5s ease',
                                }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title={`Peta lokasi ${cafe.name}`}
                                onLoad={() => setMapLoaded(true)}
                            />
                            {/* Map label pin */}
                            <div className="absolute top-4 left-4 pointer-events-none z-10">
                                <div
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-xl shadow-xl text-xs font-bold border"
                                    style={{
                                        background: '#0D0A08dd',
                                        borderColor: `${cafe.color}40`,
                                        color: cafe.color
                                    }}
                                >
                                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: cafe.color }} />
                                    {cafe.short}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────
export default function UsahaMakanan() {

    return (
        <MainLayout>
            <SEOHead
                title="Konsultasi Bisnis & Usaha Makanan (F&B)"
                description="Layanan konsultasi branding, manajemen, dan pengembangan usaha makanan atau F&B di Kalimantan Timur. Bantu bisnis kuliner Anda naik kelas bersama AK Kreatif."
                canonical="/services/usaha-makanan"
                jsonLd={{
                    '@context': 'https://schema.org',
                    '@type': 'Service',
                    name: 'Konsultasi Usaha Makanan (F&B)',
                    provider: { '@type': 'LocalBusiness', name: 'AK Kreatif', url: 'https://akkreatif.my.id', telephone: '+6285224302550' },
                    areaServed: 'Kalimantan Timur',
                    description: 'Konsultasi branding, manajemen operasi, dan pengembangan bisnis F&B.',
                    serviceType: 'Consulting',
                    url: 'https://akkreatif.my.id/services/usaha-makanan',
                }}
            />

            <ServiceHero
                badge="Layanan 05"
                title="Usaha"
                titleAccent="Makanan."
                accentColor="#C8A97E"
                description="Dua cafe kopi pilihan kami di Samarinda — tempat rasa bertemu ide, dan setiap tegukan membawa inspirasi baru. Fokus pada kopi berkualitas."
                extra={
                    <div className="flex gap-3 mt-4">
                        {cafes.map((cafe) => (
                            <a
                                key={cafe.id}
                                href={`#${cafe.id}`}
                                className="group flex items-center gap-3 px-5 py-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-[#C8A97E]/50 hover:bg-[#C8A97E]/10 transition-all duration-300 cursor-pointer"
                            >
                                <span className="font-display text-sm font-black text-white/40 group-hover:text-[#C8A97E] transition-colors">{cafe.number}</span>
                                <span className="font-body text-sm font-semibold text-white/80 whitespace-nowrap">{cafe.short}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 text-white/30 group-hover:text-[#C8A97E] group-hover:translate-y-0.5 transition-all">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                                </svg>
                            </a>
                        ))}
                    </div>
                }
            >
                {/* Device Cluster: Coffee Showcase */}
                <div className="w-full flex justify-center items-center relative perspective-1000">
                    <div className="relative w-[500px] h-[600px] flex items-center justify-center scale-[0.6] sm:scale-[0.75] md:scale-[0.9] lg:scale-[0.8] xl:scale-[0.9] origin-center -ml-10 lg:-ml-4 transition-transform duration-500">
                        
                        {/* LEFT IPHONE: KS Tubun */}
                        <div className="group absolute top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-500 hover:z-50 hover:-translate-y-[55%] pointer-events-auto">
                            <Iphone15Pro className="scale-[0.8] -rotate-[8deg] group-hover:-rotate-3 group-hover:scale-[0.85] cursor-pointer shadow-[0_40px_80px_rgba(0,0,0,0.9)] group-hover:shadow-[0_40px_100px_rgba(200,169,126,0.3)] transition-all duration-500 ease-out origin-center">
                                <div className="w-full h-full bg-[#1c1c1e] relative overflow-hidden flex flex-col">
                                    <img src={cafes[0].heroImg} alt="KS Tubun Coffee" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                                    <div className="absolute bottom-10 left-6 right-6">
                                        <p className="font-display text-[#C8A97E] text-xs font-bold uppercase tracking-widest mb-1">{cafes[0].short}</p>
                                        <h3 className="font-display text-white text-2xl font-black leading-none mb-3">Signature<br/>Pour Over</h3>
                                        <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                                            <div className="h-full bg-[#C8A97E] w-2/3" />
                                        </div>
                                    </div>
                                </div>
                            </Iphone15Pro>
                        </div>

                        {/* RIGHT IPHONE: Widyaciptra */}
                        <div className="group absolute top-[55%] left-[70%] -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-500 hover:z-50 hover:-translate-y-[60%] pointer-events-auto">
                            <Iphone15Pro className="scale-[0.85] rotate-[6deg] group-hover:rotate-2 group-hover:scale-[0.9] cursor-pointer shadow-[0_50px_100px_rgba(0,0,0,0.95)] group-hover:shadow-[0_40px_100px_rgba(200,169,126,0.3)] transition-all duration-500 ease-out origin-center">
                                <div className="w-full h-full bg-[#0a0a0a] relative overflow-hidden flex flex-col">
                                    <img src={cafes[1].ambientImg} alt="Widyaciptra Cafe" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                                    <div className="absolute bottom-10 left-6 right-6">
                                        <p className="font-display text-[#C8A97E] text-xs font-bold uppercase tracking-widest mb-1">{cafes[1].short}</p>
                                        <h3 className="font-display text-white text-2xl font-black leading-none mb-3">Kopi Susu<br/>Aren</h3>
                                        <div className="flex gap-2">
                                            <div className="w-8 h-8 rounded-full bg-[#C8A97E] flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-black">
                                                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                                </svg>
                                            </div>
                                            <div className="h-8 flex-1 bg-white/10 rounded-full backdrop-blur-md border border-white/10 flex items-center px-4">
                                                <span className="text-white text-xs font-bold">Best Seller</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Iphone15Pro>
                        </div>
                    </div>
                </div>
            </ServiceHero>

            {/* ════════════════ COFFEE MANIFESTO STRIP ════════════════ */}
            <div className="bg-[#C8A97E] py-5 overflow-hidden">
                <div className="flex gap-12 animate-marquee-left whitespace-nowrap w-max">
                    {Array(8).fill(null).map((_, i) => (
                        <span key={i} className="flex items-center gap-8 text-[#0D0A08] font-display text-sm font-black uppercase tracking-[0.3em]">
                            <span>☕ Specialty Coffee</span>
                            <span className="opacity-30">✦</span>
                            <span>Single Origin</span>
                            <span className="opacity-30">✦</span>
                            <span>Samarinda · Kaltim</span>
                            <span className="opacity-30">✦</span>
                            <span>Buka Setiap Hari</span>
                            <span className="opacity-30">✦</span>
                        </span>
                    ))}
                </div>
            </div>

            {/* ════════════════ CAFE SECTIONS ════════════════ */}
            {cafes.map((cafe, i) => (
                <CafeSection key={cafe.id} cafe={cafe} flipped={i % 2 !== 0} />
            ))}

            {/* ════════════════ CTA ════════════════ */}
            <section className="bg-[#0D0A08] py-28 border-t border-white/5">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <p className="text-[#C8A97E] text-xs font-mono uppercase tracking-[0.4em] mb-6">Kunjungi Kami Hari Ini</p>
                    <h2 className="font-display text-4xl md:text-6xl font-black text-white leading-tight mb-6">
                        Segelas Kopi,<br />
                        <span style={{ color: '#C8A97E' }}>Sejuta Cerita.</span>
                    </h2>
                    <p className="font-body text-white/40 text-lg mb-12 max-w-md mx-auto">
                        Dua lokasi strategis di Samarinda siap menyambut Anda dengan kopi terbaik dan suasana yang menginspirasi.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {cafes.map((cafe) => (
                            <a
                                key={cafe.id}
                                href={`#${cafe.id}`}
                                className="px-8 py-4 rounded-2xl font-body font-bold text-sm transition-all duration-300 hover:-translate-y-1 cursor-pointer border"
                                style={{ color: cafe.color, borderColor: `${cafe.color}40`, background: `${cafe.color}10` }}
                                onMouseEnter={(e) => { e.currentTarget.style.background = `${cafe.color}20`; }}
                                onMouseLeave={(e) => { e.currentTarget.style.background = `${cafe.color}10`; }}
                            >
                                {cafe.number}. {cafe.short}
                            </a>
                        ))}
                        <Link
                            href="/contact"
                            className="px-8 py-4 rounded-2xl bg-[#C8A97E] font-body font-bold text-sm text-[#0D0A08] hover:-translate-y-1 transition-all duration-300"
                        >
                            Hubungi Kami
                        </Link>
                    </div>
                </div>
            </section>

            <style>{`
                @keyframes marquee-left {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee-left {
                    animation: marquee-left 30s linear infinite;
                }
            `}</style>
        </MainLayout>
    );
}
