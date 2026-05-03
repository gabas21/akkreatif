import { Link } from '@inertiajs/react';
import SEOHead from '@/Components/SEOHead';
import { useState, useEffect, useCallback } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { useIntersection } from '@/hooks/useIntersection';
import { cn } from '@/lib/utils';
import { Iphone15Pro } from '@/Components/ui/iphone-15-pro';
import { IpadPro } from '@/Components/ui/ipad-pro';
import { MacbookPro } from '@/Components/ui/macbook-pro';
import PortfolioTeaser from '@/Components/ui/PortfolioTeaser';
import WorkflowTimeline from '@/Components/ui/WorkflowTimeline';
import ServiceDeliverables from '@/Components/ui/ServiceDeliverables';
import ServiceHero from '@/Components/Sections/ServiceHero';
// ─── Icons ──────────────────────────────────────────────────────────────────
const IconArrowRight = () => <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>;
const IconClose = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
);
const IconExternal = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
);
const IconArrow = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
    </svg>
);
const IconCheck = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 flex-shrink-0">
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
);
const IconChevronLeft = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
);
const IconChevronRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
    </svg>
);
const IconGlobe = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253M3 12c0 .778.099 1.533.284 2.253" />
    </svg>
);

// ─── Badge styles ────────────────────────────────────────────────────────────
const LEVEL_STYLE = {
    provinsi:  { badge: 'bg-blue-100 text-blue-700 border-blue-200',               accent: '#2563eb' },
    kabupaten: { badge: 'bg-emerald-100 text-emerald-700 border-emerald-200',       accent: '#059669' },
    kecamatan: { badge: 'bg-violet-100 text-violet-700 border-violet-200',          accent: '#7c3aed' },
    desa:      { badge: 'bg-orange-100 text-orange-700 border-orange-200',          accent: '#ea580c' },
};
const LEVEL_LABEL = { provinsi: 'Provinsi', kabupaten: 'Kab/Kota', kecamatan: 'Kecamatan', desa: 'Desa' };

// ─── ✏️  DATA PROYEK — edit di sini ──────────────────────────────────────────
// screenshots : array path gambar [ '/images/projects/a.png', '/images/projects/b.png', ... ]
//              Simpan file di  public/images/projects/
// url         : URL website live ( '' = belum ada )
// features    : daftar fitur / halaman yang ada di website
// highlight   : 3–4 angka / fakta keren dari proyek (opsional)

const GOV_PROJECTS = [
    {
        id: 'g1',
        level: 'kabupaten',
        name: 'Website Bappelitbangda Mahakam Ulu',
        client: 'Bappelitbangda Kab. Mahakam Ulu',
        description: 'Portal perencanaan daerah resmi yang memuat data statistik wilayah, dokumen perencanaan pembangunan, sistem keterbukaan informasi publik (PPID), dan profil kepemimpinan OPD.',
        screenshots: [
            // Screenshot diambil otomatis dari website asli via microlink.io
            'https://api.microlink.io/?url=https%3A%2F%2Fbappelitbangda.mahakamulukab.go.id&screenshot=true&meta=false&embed=screenshot.url&colorScheme=light&viewport.width=1280&viewport.height=800',
            'https://api.microlink.io/?url=https%3A%2F%2Fbappelitbangda.mahakamulukab.go.id%2Fabout&screenshot=true&meta=false&embed=screenshot.url&colorScheme=light&viewport.width=1280&viewport.height=800',
            'https://api.microlink.io/?url=https%3A%2F%2Fbappelitbangda.mahakamulukab.go.id%2Fppid&screenshot=true&meta=false&embed=screenshot.url&colorScheme=light&viewport.width=1280&viewport.height=800',
        ],
        url: 'https://bappelitbangda.mahakamulukab.go.id',
        tags: ['Laravel', 'Inertia.js', 'Vue.js', 'Alpine.js', 'MySQL', 'Tailwind CSS'],
        year: '2024',
        duration: '3 bulan',
        features: [
            'Halaman Profil OPD & Kepemimpinan',
            'Sistem PPID (Keterbukaan Informasi)',
            'Download dokumen perencanaan',
            'Manajemen berita & pengumuman',
            'Galeri foto & video kegiatan',
            'Halaman Visi & Misi, Tupoksi',
            'Form layanan pengaduan masyarakat',
            'Pelacak statistik dokumen (view & download)',
        ],
        highlight: [
            { num: '8+',    label: 'Halaman Utama' },
            { num: '100%',  label: 'Mobile Responsive' },
            { num: '3 bln', label: 'Durasi Pengerjaan' },
        ],
    },
    {
        id: 'g2',
        level: 'kabupaten',
        name: 'Website Dinas Kominfo',
        client: 'Dinas Kominfo Kab. Kutai Barat',
        description: 'Portal informasi dinas komunikasi dan informatika dengan manajemen berita terpusat, direktori layanan publik, dan sistem aduan online terintegrasi.',
        screenshots: [],
        url: '',
        tags: ['Laravel', 'Bootstrap', 'MySQL', 'jQuery'],
        year: '2024',
        duration: '2 bulan',
        features: [
            'Beranda dinamis dengan berita terkini',
            'Manajemen & publikasi berita (CMS)',
            'Direktori layanan & kontak dinas',
            'Form pengaduan dan tracking status',
            'Galeri dokumentasi kegiatan',
            'Panel admin terpadu',
        ],
        highlight: [
            { num: '6+',    label: 'Modul Fitur' },
            { num: '2 bln', label: 'Durasi Pengerjaan' },
            { num: '100%',  label: 'Responsive' },
        ],
    },
    {
        id: 'g3',
        level: 'provinsi',
        name: 'Portal Pemerintah Provinsi',
        client: 'Pemerintah Provinsi Kalimantan Timur',
        description: 'Website resmi pemerintah provinsi dengan sistem layanan publik terpadu, dashboard kinerja OPD, dan portal PPID yang lengkap sesuai UU Keterbukaan Informasi Publik.',
        screenshots: [],
        url: '',
        tags: ['React', 'Laravel', 'MySQL', 'Redis', 'Tailwind CSS'],
        year: '2024',
        duration: '5 bulan',
        features: [
            'Portal layanan publik terpadu',
            'Dashboard kinerja pemerintahan',
            'Sistem PPID provinsi',
            'Integrasi data lintas OPD',
            'Berita & pengumuman multi-kategori',
            'Direktori pejabat & unit kerja',
            'Aksesibilitas disabilitas (WCAG 2.1)',
        ],
        highlight: [
            { num: '15+',   label: 'Modul Sistem' },
            { num: '5 bln', label: 'Durasi Pengerjaan' },
            { num: 'A+',    label: 'PageSpeed Score' },
        ],
    },
    {
        id: 'g4',
        level: 'desa',
        name: 'Website Desa Datah Bilang',
        client: 'Pemerintah Desa Datah Bilang',
        description: 'Website desa transparan yang menampilkan informasi APBDes, data kependudukan, potensi dan produk lokal desa, serta berita dan kegiatan warga secara rutin.',
        screenshots: [],
        url: '',
        tags: ['Laravel', 'Vue.js', 'MySQL', 'Tailwind CSS'],
        year: '2024',
        duration: '6 minggu',
        features: [
            'Profil & sejarah desa',
            'Transparansi APBDes (anggaran desa)',
            'Data kependudukan & demografi',
            'Potensi & produk unggulan desa',
            'Galeri kegiatan desa',
            'Berita & pengumuman warga',
            'Peta wilayah desa interaktif',
        ],
        highlight: [
            { num: '7+',    label: 'Modul Halaman' },
            { num: '6 mgg', label: 'Durasi Pengerjaan' },
            { num: '100%',  label: 'Transparan' },
        ],
    },
    {
        id: 'g5',
        level: 'kecamatan',
        name: 'Website Kecamatan Long Pahangai',
        client: 'Kantor Kecamatan Long Pahangai',
        description: 'Profil kecamatan digital dengan layanan administrasi online, form permohonan surat, dan pengumuman yang bisa diakses masyarakat 24 jam.',
        screenshots: [],
        url: '',
        tags: ['Laravel', 'Bootstrap', 'MySQL'],
        year: '2023',
        duration: '4 minggu',
        features: [
            'Profil kecamatan & peta wilayah',
            'Layanan administrasi online',
            'Form permohonan surat digital',
            'Pengumuman & informasi lokal',
            'Daftar desa & kelurahan',
            'Kontak & jam layanan',
        ],
        highlight: [
            { num: '6+',    label: 'Fitur Utama' },
            { num: '4 mgg', label: 'Durasi Pengerjaan' },
        ],
    },
    {
        id: 'g6',
        level: 'desa',
        name: 'Website Desa Wisata Long Bagun',
        client: 'Pemerintah Desa Long Bagun',
        description: 'Website promosi desa wisata yang menampilkan keindahan alam, potensi lokal, produk BUMDES, dan informasi untuk wisatawan yang ingin berkunjung.',
        screenshots: [],
        url: '',
        tags: ['React', 'Laravel', 'Tailwind CSS'],
        year: '2024',
        duration: '5 minggu',
        features: [
            'Halaman wisata & atraksi',
            'Galeri foto & video drone',
            'Profil BUMDES & produk lokal',
            'Panduan wisata & akomodasi',
            'Form booking / reservasi',
            'Peta lokasi desa',
        ],
        highlight: [
            { num: '6+',    label: 'Modul Fitur' },
            { num: '5 mgg', label: 'Durasi Pengerjaan' },
        ],
    },
];

const NON_GOV_PROJECTS = [
    {
        id: 'n1',
        type: 'Company Profile',
        name: 'AK Kreatif — Digital Agency',
        client: 'AK Kreatif (Internal)',
        description: 'Website agensi kreatif dengan desain premium, animasi Framer Motion, bento grid portfolio, floating dock navigation, dan section layanan yang interaktif.',
        screenshots: [],
        url: '',
        tags: ['React', 'Laravel', 'Inertia.js', 'Framer Motion', 'Tailwind CSS', 'GSAP'],
        year: '2024',
        duration: '6 minggu',
        features: [
            'Animasi hero section premium',
            'Floating macOS-style navigation dock',
            'Bento grid layanan interaktif (GSAP Flip)',
            'Testimonial infinite scroll carousel',
            'Portfolio dengan filter kategori',
            'Contact form terintegrasi',
            'SEO-optimized & mobile-first',
        ],
        highlight: [
            { num: '7+',    label: 'Section Halaman' },
            { num: '<1s',   label: 'Page Load' },
            { num: '100%',  label: 'Custom Design' },
        ],
    },
    {
        id: 'n2',
        type: 'E-Commerce',
        name: 'Toko Online Produk Lokal',
        client: 'UMKM Kalimantan',
        description: 'Platform e-commerce produk lokal Kalimantan dengan manajemen produk, sistem keranjang belanja, checkout, dan integrasi pembayaran Midtrans (VA, e-wallet, kartu kredit).',
        screenshots: [],
        url: '',
        tags: ['Laravel', 'Bootstrap', 'Midtrans', 'MySQL', 'jQuery'],
        year: '2023',
        duration: '2,5 bulan',
        features: [
            'Katalog produk dengan filter & pencarian',
            'Keranjang belanja & wishlist',
            'Checkout multi-step',
            'Integrasi Midtrans (VA / e-wallet)',
            'Manajemen pesanan & tracking',
            'Dashboard admin toko',
            'Manajemen stok & varian produk',
        ],
        highlight: [
            { num: '7+',      label: 'Modul Utama' },
            { num: 'Midtrans', label: 'Payment Gateway' },
            { num: '2,5 bln', label: 'Durasi' },
        ],
    },
    {
        id: 'n3',
        type: 'Web Application',
        name: 'Sistem Manajemen Internal',
        client: 'Perusahaan Swasta (Confidential)',
        description: 'Dashboard internal perusahaan untuk manajemen inventori, pelaporan keuangan harian, dan manajemen karyawan dengan hak akses berbasis role.',
        screenshots: [],
        url: '',
        tags: ['Vue.js', 'Laravel', 'Chart.js', 'MySQL', 'Tailwind CSS'],
        year: '2024',
        duration: '3 bulan',
        features: [
            'Manajemen inventori & stok real-time',
            'Laporan keuangan & grafik interaktif',
            'Manajemen karyawan & absensi',
            'Role-based access control (RBAC)',
            'Export laporan ke PDF & Excel',
            'Notifikasi & alert otomatis',
        ],
        highlight: [
            { num: '6+',    label: 'Modul Sistem' },
            { num: 'RBAC',  label: 'Hak Akses' },
            { num: '3 bln', label: 'Durasi' },
        ],
    },
    {
        id: 'n4',
        type: 'Landing Page',
        name: 'Pemasaran Properti Premium',
        client: 'Developer Properti Lokal',
        description: 'Website landing page pemasaran properti residensial dengan galeri unit, simulasi cicilan interaktif, form inquiry, dan integrasi WhatsApp langsung ke agen.',
        screenshots: [],
        url: '',
        tags: ['React', 'Tailwind CSS', 'Framer Motion'],
        year: '2024',
        duration: '3 minggu',
        features: [
            'Galeri foto & video unit properti',
            'Kalkulator simulasi cicilan KPR',
            'Form inquiry & jadwal kunjungan',
            'Peta lokasi & akses properti',
            'Integrasi WhatsApp floating button',
            'Landing page SEO-optimized',
        ],
        highlight: [
            { num: '6+',    label: 'Fitur' },
            { num: '3 mgg', label: 'Durasi' },
            { num: '<2s',   label: 'Load Time' },
        ],
    },
];

// ─── Browser Frame (thumbnail) ───────────────────────────────────────────────
function BrowserFrame({ screenshots = [], screenshot, urlDisplay = 'akkreatif.com', alt = '' }) {
    const images = screenshots?.length > 0 ? screenshots : (screenshot ? [screenshot] : []);
    const [activeImg, setActiveImg] = useState(0);
    const [err, setErr] = useState(false);

    useEffect(() => {
        if (images.length <= 1) return;
        const interval = setInterval(() => {
            setActiveImg(i => (i + 1) % images.length);
        }, 3000); // 3 seconds per slide
        return () => clearInterval(interval);
    }, [images.length]);

    const currentImg = images[activeImg];
    const hasImg = currentImg && !err;

    return (
        <div className="overflow-hidden bg-[#1a1a1a] w-full">
            <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/5">
                <span className="w-2 h-2 rounded-full bg-red-500/70" />
                <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
                <span className="w-2 h-2 rounded-full bg-green-500/70" />
                <div className="flex-1 mx-2 bg-white/8 rounded px-2 py-0.5 flex items-center gap-1">
                    <IconGlobe />
                    <span className="font-mono text-[9px] text-white/30 truncate">{urlDisplay}</span>
                </div>
            </div>
            <div className="relative w-full overflow-hidden" style={{ paddingBottom: '58%' }}>
                {hasImg ? (
                    images.map((img, i) => (
                        <img 
                            key={i}
                            src={img} 
                            alt={`${alt} screen ${i + 1}`} 
                            onError={() => setErr(true)} 
                            loading="lazy"
                            className={cn(
                                "absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-1000",
                                i === activeImg ? "opacity-100" : "opacity-0"
                            )} 
                        />
                    ))
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#111] to-[#1a1a1a]">
                        <div className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center">
                            <IconGlobe />
                        </div>
                        <span className="font-body text-[10px] text-white/20">Screenshot belum tersedia</span>
                    </div>
                )}
            </div>
        </div>
    );
}

function ProjectModal({ project, isGov, onClose }) {
    const [activeImg, setActiveImg] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const shots = project.screenshots ?? [];

    // navigate gallery
    const prev = useCallback(() => setActiveImg(i => (i - 1 + shots.length) % shots.length), [shots.length]);
    const next = useCallback(() => setActiveImg(i => (i + 1) % shots.length), [shots.length]);

    // auto-slide
    useEffect(() => {
        if (shots.length <= 1 || isHovered) return;
        const interval = setInterval(next, 3000); // 3 seconds per slide
        return () => clearInterval(interval);
    }, [shots.length, isHovered, next]);

    useEffect(() => {
        const handler = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        };
        window.addEventListener('keydown', handler);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handler);
            document.body.style.overflow = '';
        };
    }, [onClose, prev, next]);

    const urlDisplay = project.url ? project.url.replace(/^https?:\/\//, '') : 'preview tidak tersedia';
    const badgeClass = isGov
        ? (LEVEL_STYLE[project.level]?.badge ?? '')
        : 'bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20';
    const badgeLabel = isGov ? LEVEL_LABEL[project.level] : project.type;

    return (
        <div className="fixed inset-0 z-[300] flex items-end md:items-center justify-center md:p-4" onClick={onClose}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/75 backdrop-blur-md" />

            {/* Panel */}
            <div
                onClick={e => e.stopPropagation()}
                className="relative z-10 w-full md:max-w-4xl bg-white rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
            >
                {/* ── Top bar ── */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-black/6 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <span className={cn(
                            'px-2.5 py-1 text-[10px] font-bold font-body uppercase tracking-wider rounded-full border',
                            badgeClass
                        )}>
                            {badgeLabel}
                        </span>
                        <span className="font-mono text-xs text-black/30">{project.year}</span>
                        {project.duration && (
                            <span className="font-body text-xs text-black/40">· {project.duration}</span>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 bg-black/8 hover:bg-black/15 rounded-full flex items-center justify-center transition-colors"
                    >
                        <IconClose />
                    </button>
                </div>

                {/* ── Scrollable body ── */}
                <div className="overflow-y-auto flex-1 scrollbar-hide">

                    {/* ── Screenshot gallery ── */}
                    <div 
                        className="bg-[#111] relative"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {shots.length > 0 ? (
                            <>
                                {/* Main image in browser frame */}
                                <div className="px-4 pt-4 pb-2">
                                    <div className="rounded-xl overflow-hidden bg-[#1a1a1a]">
                                        {/* chrome */}
                                        <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-white/5">
                                            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                                            <div className="flex-1 mx-2 bg-white/8 rounded px-3 py-1 flex items-center gap-1.5">
                                                <IconGlobe />
                                                <span className="font-mono text-xs text-white/40 truncate">{urlDisplay}</span>
                                            </div>
                                        </div>
                                        {/* active screenshot */}
                                        <div className="relative" style={{ paddingBottom: '55%' }}>
                                            <img
                                                key={activeImg}
                                                src={shots[activeImg]}
                                                alt={`${project.name} — screenshot ${activeImg + 1}`}
                                                className="absolute inset-0 w-full h-full object-cover object-top"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Thumbnails + nav */}
                                {shots.length > 1 && (
                                    <div className="flex items-center gap-3 px-4 pb-4">
                                        <button onClick={prev}
                                            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors flex-shrink-0">
                                            <IconChevronLeft />
                                        </button>

                                        <div className="flex gap-2 flex-1 overflow-x-auto">
                                            {shots.map((s, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setActiveImg(i)}
                                                    className={cn(
                                                        'relative flex-shrink-0 w-20 rounded-lg overflow-hidden border-2 transition-all',
                                                        i === activeImg ? 'border-[#10b981]' : 'border-white/10 opacity-50 hover:opacity-80'
                                                    )}
                                                    style={{ paddingBottom: '14%' + '0px', height: '48px' }}
                                                >
                                                    <img src={s} alt="" className="absolute inset-0 w-full h-full object-cover" />
                                                </button>
                                            ))}
                                        </div>

                                        <button onClick={next}
                                            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors flex-shrink-0">
                                            <IconChevronRight />
                                        </button>

                                        <span className="font-mono text-xs text-white/30 flex-shrink-0">
                                            {activeImg + 1} / {shots.length}
                                        </span>
                                    </div>
                                )}
                            </>
                        ) : (
                            /* No screenshot yet */
                            <div className="flex flex-col items-center justify-center py-14 gap-3">
                                <div className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center">
                                    <IconGlobe />
                                </div>
                                <p className="font-body text-sm text-white/30">Screenshot belum tersedia</p>
                                <p className="font-mono text-xs text-white/15">{urlDisplay}</p>
                            </div>
                        )}
                    </div>

                    {/* ── Content ── */}
                    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Left col — main info */}
                        <div className="md:col-span-2 space-y-6">

                            {/* Title & description */}
                            <div>
                                <h2 className="font-display text-xl font-black text-black mb-1 leading-snug">{project.name}</h2>
                                <p className="font-body text-xs text-black/40 mb-3">{project.client}</p>
                                <p className="font-body text-sm text-black/65 leading-relaxed">{project.description}</p>
                            </div>

                            {/* Highlights */}
                            {project.highlight?.length > 0 && (
                                <div className="flex flex-wrap gap-4">
                                    {project.highlight.map((h, i) => (
                                        <div key={i} className="flex-1 min-w-[80px] bg-[#fafafa] border border-black/6 rounded-xl p-3 text-center">
                                            <div className="font-display text-xl font-black text-[#10b981]">{h.num}</div>
                                            <div className="font-body text-[10px] text-black/40 mt-0.5 leading-tight">{h.label}</div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Features */}
                            {project.features?.length > 0 && (
                                <div>
                                    <h4 className="font-display text-xs font-bold uppercase tracking-widest text-black/40 mb-3">
                                        Fitur & Halaman
                                    </h4>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {project.features.map((f, i) => (
                                            <li key={i} className="flex items-start gap-2.5 text-sm font-body text-black/70">
                                                <span className="mt-0.5 w-5 h-5 rounded-full bg-[#10b981]/12 text-[#10b981] flex items-center justify-center flex-shrink-0">
                                                    <IconCheck />
                                                </span>
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Right col — meta & CTA */}
                        <div className="space-y-5">

                            {/* Tech Stack */}
                            <div>
                                <h4 className="font-display text-xs font-bold uppercase tracking-widest text-black/40 mb-3">
                                    Tech Stack
                                </h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {project.tags.map((t, i) => (
                                        <span key={i} className="px-2.5 py-1 bg-black/5 text-black/60 rounded-lg text-xs font-mono">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Meta info */}
                            <div className="bg-[#fafafa] border border-black/6 rounded-2xl p-4 space-y-3">
                                {[
                                    { label: 'Klien',    value: project.client },
                                    { label: 'Tahun',    value: project.year },
                                    { label: 'Durasi',   value: project.duration ?? '–' },
                                    { label: 'Kategori', value: badgeLabel },
                                ].map((m, i) => (
                                    <div key={i} className="flex justify-between gap-2">
                                        <span className="font-body text-xs text-black/35">{m.label}</span>
                                        <span className="font-body text-xs font-semibold text-black/70 text-right">{m.value}</span>
                                    </div>
                                ))}
                            </div>

                            {/* CTA buttons */}
                            <div className="flex flex-col gap-2.5">
                                {project.url ? (
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full inline-flex items-center justify-center gap-2 bg-black text-white font-body font-bold px-5 py-3 rounded-xl text-sm hover:gap-3 transition-all"
                                    >
                                        <IconExternal /> Buka Website
                                    </a>
                                ) : (
                                    <div className="w-full inline-flex items-center justify-center gap-2 bg-black/6 text-black/30 font-body font-bold px-5 py-3 rounded-xl text-sm cursor-not-allowed">
                                        URL belum tersedia
                                    </div>
                                )}
                                <Link
                                    href="/contact"
                                    className="w-full inline-flex items-center justify-center gap-2 border border-[#10b981] text-[#10b981] font-body font-bold px-5 py-3 rounded-xl text-sm hover:bg-[#10b981] hover:text-white transition-all"
                                >
                                    Minta Proyek Serupa <IconArrow />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Project Card (thumbnail) ─────────────────────────────────────────────────
function ProjectCard({ project, isGov, onOpen, delay = 0 }) {
    const [ref, visible] = useIntersection();
    const thumb = project.screenshots?.[0] ?? '';
    const urlDisplay = project.url ? project.url.replace(/^https?:\/\//, '') : 'akkreatif.com';

    return (
        <button
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            onClick={() => onOpen(project)}
            className={cn(
                'group flex flex-col text-left w-full h-full bg-white border border-black/8 rounded-[1.25rem] overflow-hidden hover:shadow-2xl hover:-translate-y-1.5 hover:border-black/20 transition-all duration-300',
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
        >
            {/* Thumbnail */}
            <div className="relative w-full overflow-hidden border-b border-black/10 flex-shrink-0">
                <BrowserFrame screenshot={thumb} urlDisplay={urlDisplay} alt={project.name} />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300 flex items-center justify-center pointer-events-none z-10" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <span className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-white text-black font-body font-bold text-xs px-4 py-2 rounded-full shadow-xl flex items-center gap-1.5">
                        Lihat Detail
                    </span>
                </div>
            </div>

            {/* Info */}
            <div className="p-4 md:p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-3 gap-2">
                    <span className={cn(
                        'px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded-md border flex-shrink-0',
                        isGov
                            ? (LEVEL_STYLE[project.level]?.badge ?? '')
                            : 'bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20'
                    )}>
                        {isGov ? LEVEL_LABEL[project.level] : project.type}
                    </span>
                    <span className="font-mono text-[10px] text-black/30 font-medium">{project.year}</span>
                </div>
                <h3 className="font-display text-[15px] font-bold text-black leading-snug line-clamp-2">{project.name}</h3>
                
                <div className="mt-auto pt-3">
                    {project.screenshots?.length > 1 ? (
                        <p className="font-body text-[10px] font-medium text-black/40 bg-black/5 inline-flex px-2 py-1 rounded-md">{project.screenshots.length} screenshot</p>
                    ) : (project.screenshots?.length === 1 ? (
                        <p className="font-body text-[10px] font-medium text-black/40 bg-black/5 inline-flex px-2 py-1 rounded-md">1 screenshot</p>
                    ) : (
                        <p className="font-body text-[10px] font-medium text-orange-500/80 bg-orange-500/10 inline-flex px-2 py-1 rounded-md">Screenshot menyusul</p>
                    ))}
                </div>
            </div>
        </button>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function WebApplication() {
    const [modal, setModal]         = useState(null);
    const [govFilter, setGovFilter] = useState('all');

    const [govRef,  govVisible]  = useIntersection();
    const [nonRef,  nonVisible]  = useIntersection();

    const GOV_FILTERS = [
        { id: 'all',       label: 'Semua' },
        { id: 'provinsi',  label: 'Provinsi',  dot: 'bg-blue-500' },
        { id: 'kabupaten', label: 'Kab/Kota',  dot: 'bg-emerald-500' },
        { id: 'kecamatan', label: 'Kecamatan', dot: 'bg-violet-500' },
        { id: 'desa',      label: 'Desa',       dot: 'bg-orange-500' },
    ];

    const filteredGov = govFilter === 'all'
        ? GOV_PROJECTS
        : GOV_PROJECTS.filter(p => p.level === govFilter);

    return (
        <MainLayout>
            <SEOHead
                title="Jasa Pembuatan Website & Aplikasi Profesional"
                description="AK Kreatif menyediakan jasa pembuatan website profesional, landing page, company profile, e-commerce, dan aplikasi web di Kalimantan Timur. Teknologi modern, desain premium."
                canonical="/services/web-application"
                jsonLd={{
                    '@context': 'https://schema.org',
                    '@type': 'Service',
                    name: 'Jasa Pembuatan Website & Aplikasi',
                    provider: { '@type': 'LocalBusiness', name: 'AK Kreatif', url: 'https://akkreatif.my.id', telephone: '+6285224302550' },
                    areaServed: 'Kalimantan Timur',
                    description: 'Pembuatan website profesional, landing page, company profile, e-commerce, dan aplikasi web custom.',
                    serviceType: 'Web Development',
                    url: 'https://akkreatif.my.id/services/web-application',
                }}
            />

            {/* Modal */}
            {modal && (
                <ProjectModal
                    project={modal.project}
                    isGov={modal.isGov}
                    onClose={() => setModal(null)}
                />
            )}

            <ServiceHero
                badge="Layanan 01"
                title="Web App &"
                titleAccent="Engineering."
                description="Menyulap kompleksitas data menjadi antarmuka digital berbasis browser yang sangat responsif, solid, dan memanjakan mata. Siap untuk Instansi Publik hingga Korporat."
                extra={
                    <div className="flex gap-8">
                        {[
                            { num: `${GOV_PROJECTS.length}+`,     label: 'Website Pemerintah' },
                            { num: `${NON_GOV_PROJECTS.length}+`, label: 'Aplikasi Swasta' },
                        ].map((s, i) => (
                            <div key={i} className="text-left">
                                <div className="font-display text-4xl font-black text-[#10b981]">{s.num}</div>
                                <div className="font-body text-xs text-white/40 mt-1 uppercase tracking-widest">{s.label}</div>
                            </div>
                        ))}
                    </div>
                }
            >
                {/* Device Cluster */}
                <div className="w-full flex justify-center items-center relative perspective-1000 h-[280px] sm:h-[360px] md:h-[420px] lg:h-[500px] overflow-hidden">
                    <div className="relative w-[1000px] h-[600px] flex items-center justify-center scale-[0.28] sm:scale-[0.38] md:scale-[0.48] lg:scale-[0.52] xl:scale-[0.62] origin-center">
                        {/* CENTER BACK: MacBook */}
                        <div className="group absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-500 hover:z-50 hover:-translate-y-[55%] pointer-events-auto">
                            <MacbookPro className="scale-[1.15] shadow-[0_30px_60px_rgba(0,0,0,0.9)] group-hover:shadow-[0_40px_100px_rgba(16,185,129,0.3)] group-hover:scale-[1.2] cursor-pointer transition-all duration-500 ease-out origin-center">
                                <div className="w-full h-full bg-zinc-950 flex flex-col justify-center items-center px-8 relative overflow-hidden">
                                   <div className="absolute inset-0 bg-black z-20 transition-opacity duration-700 pointer-events-none opacity-80 group-hover:opacity-0" />
                                   <div className="absolute top-0 right-0 w-64 h-64 bg-[#10b981]/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100" />
                                   <div className="relative z-10 translate-y-8 group-hover:translate-y-0 transition-transform duration-700 delay-100 flex flex-col items-center">
                                       <h3 className="font-display text-[#10b981] text-xl font-bold mb-1 uppercase tracking-widest">AK Kreatif</h3>
                                       <h3 className="font-display text-white text-5xl font-black mb-4">Enterprise UI</h3>
                                       <p className="text-zinc-400 font-body text-base max-w-md text-center leading-relaxed">Seamless data management and dashboard processing tools for your corporate needs.</p>
                                   </div>
                                </div>
                            </MacbookPro>
                        </div>
                        {/* LEFT: iPad */}
                        <div className="group absolute top-[52%] left-[26%] -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-500 hover:z-50 hover:-translate-y-[55%] pointer-events-auto">
                            <IpadPro className="scale-[0.65] -rotate-[4deg] group-hover:-rotate-1 group-hover:scale-[0.7] cursor-pointer shadow-[0_40px_80px_rgba(0,0,0,0.9)] group-hover:shadow-[0_40px_100px_rgba(16,185,129,0.2)] transition-all duration-500 ease-out origin-center">
                                <div className="w-full h-full bg-[#1c1c1e] flex flex-col pt-12 px-6 pb-6 gap-4 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-black z-20 transition-opacity duration-700 pointer-events-none opacity-80 group-hover:opacity-0" />
                                    <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-700 delay-100 w-full h-full flex gap-4">
                                        <div className="w-[30%] bg-zinc-800/80 rounded-2xl h-full border border-white/5 flex flex-col gap-3 p-4">
                                           <div className="h-8 bg-zinc-700/50 rounded-lg w-full" />
                                           <div className="h-4 bg-zinc-700/50 rounded-lg w-3/4" />
                                           <div className="h-4 bg-zinc-700/50 rounded-lg w-5/6" />
                                           <div className="h-4 bg-zinc-700/50 rounded-lg w-2/3" />
                                        </div>
                                        <div className="flex-1 flex flex-col gap-4">
                                            <div className="h-32 bg-[#10b981]/10 group-hover:bg-[#10b981]/20 border border-[#10b981]/20 group-hover:border-[#10b981]/40 transition-colors duration-500 rounded-2xl flex-1 flex flex-col p-4 justify-between">
                                               <div className="w-8 h-8 rounded-full bg-[#10b981]/50 group-hover:bg-[#10b981] transition-colors" />
                                               <div className="w-24 h-3 rounded-full bg-[#10b981]/30 group-hover:bg-[#10b981]/60 transition-colors" />
                                            </div>
                                            <div className="flex gap-4 flex-1">
                                                <div className="bg-zinc-800/80 rounded-2xl flex-1 border border-white/5" />
                                                <div className="bg-zinc-800/80 rounded-2xl flex-1 border border-white/5" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </IpadPro>
                        </div>
                        {/* RIGHT: iPhone */}
                        <div className="group absolute top-[56%] left-[78%] -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-500 hover:z-50 hover:-translate-y-[62%] pointer-events-auto">
                            <Iphone15Pro className="scale-[0.55] rotate-[6deg] group-hover:rotate-3 group-hover:scale-[0.6] cursor-pointer shadow-[0_50px_100px_rgba(0,0,0,0.95)] group-hover:shadow-[0_40px_100px_rgba(16,185,129,0.2)] transition-all duration-500 ease-out origin-center">
                                <div className="w-full h-full bg-[#0a0a0a] flex flex-col text-center px-4 py-16 justify-center items-center relative overflow-hidden">
                                    <div className="absolute inset-0 bg-black z-20 transition-opacity duration-700 pointer-events-none opacity-80 group-hover:opacity-0" />
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#10b981]/10 to-black/90 pointer-events-none group-hover:from-[#10b981]/30 transition-colors duration-700" />
                                    <div className="relative z-10 w-full flex flex-col gap-4 translate-y-8 group-hover:translate-y-0 transition-transform duration-700 delay-100">
                                       <div className="w-full p-4 bg-white/5 group-hover:bg-white/10 transition-colors rounded-2xl backdrop-blur-xl border border-white/10 text-left">
                                          <div className="w-8 h-8 rounded-full bg-emerald-500 mb-2" />
                                          <h3 className="font-display text-white text-base font-bold">Fast & Native</h3>
                                          <div className="w-16 h-1.5 bg-zinc-600 rounded-full mt-2" />
                                       </div>
                                       <div className="w-full p-4 bg-white/5 group-hover:bg-white/10 transition-colors rounded-2xl backdrop-blur-xl border border-white/10 text-left">
                                          <div className="w-8 h-8 rounded-full bg-blue-500 mb-2" />
                                          <h3 className="font-display text-[#10b981] text-base font-bold">UI Extract</h3>
                                          <div className="w-12 h-1.5 bg-zinc-600 rounded-full mt-2" />
                                       </div>
                                    </div>
                                </div>
                            </Iphone15Pro>
                        </div>
                    </div>
                </div>
            </ServiceHero>

            {/* ── TECH STACK & ENGINEERING ──────────────────────────── */}
            <section className="py-24 bg-zinc-950 border-t border-white/5 relative overflow-hidden">
                {/* Subtle Background Orbs (Toned Down) */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#10b981]/3 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/3 rounded-full blur-[100px] pointer-events-none" />

                <div className="container-custom relative z-10">
                    {/* Header */}
                    <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
                        <span className="font-body text-xs font-bold uppercase tracking-[0.25em] text-zinc-500 mb-4 block">Arsitektur Kelas Dunia</span>
                        <h2 className="font-display text-3xl md:text-4xl font-black text-white leading-tight mb-5">
                            Dibangun untuk <span className="text-white">Skalabilitas</span> & <span className="text-white">Kecepatan.</span>
                        </h2>
                        <p className="font-body text-zinc-400 text-base md:text-lg leading-relaxed">
                            Kami tidak sekadar membuat website. Kami merancang arsitektur perangkat lunak yang tangguh, aman, dan siap menangani jutaan permintaan tanpa hambatan.
                        </p>
                    </div>

                    {/* Bento Glass Cards (Subdued Glassmorphism) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Card 1: Performance */}
                        <div className="group relative rounded-3xl p-[1px] overflow-hidden cursor-default transition-transform duration-500 hover:-translate-y-1">
                            <div className="absolute inset-0 bg-white/5 group-hover:bg-[#10b981]/20 transition-colors duration-500" />
                            <div className="relative h-full bg-zinc-950 backdrop-blur-md rounded-[calc(1.5rem-1px)] p-8 flex flex-col z-10 transition-colors duration-500 group-hover:bg-zinc-900/90">
                                
                                <div className="relative z-10 w-12 h-12 rounded-xl bg-zinc-900/80 border border-white/5 flex items-center justify-center mb-6 transition-transform duration-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#10b981" className="w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                                    </svg>
                                </div>
                                
                                <h3 className="font-display text-xl font-bold text-white/90 mb-3 group-hover:text-white transition-colors duration-300">Lightning Fast</h3>
                                <p className="font-body text-zinc-400 text-sm leading-relaxed">
                                    Optimasi Load-time dan TTFB dengan arsitektur modern (React/Inertia) menjadikan website sangat responsif dan disukai algoritma SEO Google.
                                </p>
                            </div>
                        </div>

                        {/* Card 2: Security */}
                        <div className="group relative rounded-3xl p-[1px] overflow-hidden cursor-default transition-transform duration-500 hover:-translate-y-1">
                            <div className="absolute inset-0 bg-white/5 group-hover:bg-blue-500/20 transition-colors duration-500" />
                            <div className="relative h-full bg-zinc-950 backdrop-blur-md rounded-[calc(1.5rem-1px)] p-8 flex flex-col z-10 transition-colors duration-500 group-hover:bg-zinc-900/90">
                                
                                <div className="relative z-10 w-12 h-12 rounded-xl bg-zinc-900/80 border border-white/5 flex items-center justify-center mb-6 transition-transform duration-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#3b82f6" className="w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                    </svg>
                                </div>
                                
                                <h3 className="font-display text-xl font-bold text-white/90 mb-3 group-hover:text-white transition-colors duration-300">Bank-grade Security</h3>
                                <p className="font-body text-zinc-400 text-sm leading-relaxed">
                                    Dikelilingi lapisan keamanan mutakhir: perlindungan CSRF, XSS, eksekusi SQL Injection prevention, hingga rate-limiting pada level API.
                                </p>
                            </div>
                        </div>

                        {/* Card 3: Cloud Ready */}
                        <div className="group relative rounded-3xl p-[1px] overflow-hidden cursor-default transition-transform duration-500 hover:-translate-y-1">
                            <div className="absolute inset-0 bg-white/5 group-hover:bg-amber-500/20 transition-colors duration-500" />
                            <div className="relative h-full bg-zinc-950 backdrop-blur-md rounded-[calc(1.5rem-1px)] p-8 flex flex-col z-10 transition-colors duration-500 group-hover:bg-zinc-900/90">
                                
                                <div className="relative z-10 w-12 h-12 rounded-xl bg-zinc-900/80 border border-white/5 flex items-center justify-center mb-6 transition-transform duration-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#f59e0b" className="w-6 h-6 opacity-80 group-hover:opacity-100 transition-opacity">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
                                    </svg>
                                </div>
                                
                                <h3 className="font-display text-xl font-bold text-white/90 mb-3 group-hover:text-white transition-colors duration-300">Cloud Native</h3>
                                <p className="font-body text-zinc-400 text-sm leading-relaxed">
                                    Infrastruktur scalable yang siap menampung lonjakan traffic tanpa *downtime*, baik menggunakan AWS, Google Cloud, atau DigitalOcean.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Sistem Kerja ── */}
            <WorkflowTimeline
                subheading="Alur Pengerjaan"
                heading={<>Proses Pembangunan <span className="text-[#10b981]">Website & Aplikasi</span></>}
                description="Setiap proyek kami lalui dengan proses yang terstruktur — mulai dari analisis kebutuhan hingga website Anda live dan termonitor."
                accentColor="#10b981"
                steps={[
                    { number: '01', title: 'Discovery & Analisis', desc: 'Kami memahami bisnis, audiens, dan tujuan Anda. Hasilnya berupa dokumen spesifikasi dan sitemap yang menjadi pondasi proyek.', details: ['Riset kompetitor & benchmark', 'Penentuan fitur & user flow', 'Sitemap & wireframe awal'] },
                    { number: '02', title: 'UI/UX & Prototype', desc: 'Desainer kami membuat mockup interaktif agar Anda bisa merasakan tampilan website sebelum development dimulai.', details: ['High-fidelity mockup (Figma)', 'Prototype interaktif', 'Feedback & revisi desain'] },
                    { number: '03', title: 'Development & Coding', desc: 'Tim engineer membangun frontend dan backend dengan arsitektur modern — React, Laravel, dan infrastruktur cloud-ready.', details: ['Frontend & backend development', 'Integrasi API & database', 'Version control (Git)'] },
                    { number: '04', title: 'Testing & QA', desc: 'Setiap fitur diuji secara menyeluruh: functional test, responsiveness, performa, hingga keamanan sebelum rilis.', details: ['Unit & integration testing', 'Cross-browser & mobile testing', 'Security audit & penetration test'] },
                    { number: '05', title: 'Deployment & Support', desc: 'Website diluncurkan ke server produksi. Kami tetap mendampingi dengan monitoring performa dan dukungan teknis.', details: ['Deployment ke server produksi', 'SSL & domain setup', 'Monitoring & support 30 hari'] },
                ]}
            />

            {/* ── Durasi & Output ── */}
            <ServiceDeliverables 
                accentColor="#3b82f6"
                packages={[
                    {
                        name: "Pembuatan Web & Aplikasi",
                        durations: [
                            { label: "Waktu Menyesuaikan Skala Project", value: "30 s.d 90 hari" }
                        ],
                        outputs: [
                            "Buku Panduan",
                            "Kerangka Acuan Kerja (KAK)",
                            "Laporan Awal",
                            "Laporan Akhir",
                            "DVD + Box",
                            "Dokumentasi"
                        ]
                    }
                ]}
            />

            {/* ── Portfolio Preview CTA ── */}
            <PortfolioTeaser
                subheading="Lihat Portofolio Website Kami"
                heading="Website yang Sudah Kami Bangun — Nyata & Siap Dikunjungi"
                desc="Dari portal pemerintah daerah hingga aplikasi bisnis skala enterprise, setiap proyek kami dirancang dengan standar teknis tertinggi. Lihat sendiri di halaman portofolio."
                accentColor="#10b981"
                bg="bg-white"
                previews={[
                    {
                        image: 'https://api.microlink.io/?url=https%3A%2F%2Fbappelitbangda.mahakamulukab.go.id&screenshot=true&meta=false&embed=screenshot.url&colorScheme=light&viewport.width=1280&viewport.height=800',
                        label: 'Website Pemerintah',
                        title: 'Bappelitbangda Mahakam Ulu',
                    },
                    {
                        image: '/images/unsplash/1551288049-bebda4e38f71.webp',
                        label: 'Web Application',
                        title: 'Dashboard Analitik UMKM',
                    },
                    {
                        image: '/images/unsplash/1460925895917-afdab827c52f.webp',
                        label: 'Company Profile',
                        title: 'Website Profil Perusahaan',
                    },
                ]}
                buttons={[
                    { label: 'Lihat Website Pemerintah', href: '/portfolio?category=web&type=gov', primary: true, icon: '🏛️' },
                    { label: 'Lihat Website Bisnis & UMKM', href: '/portfolio?category=web&type=private', primary: false, icon: '🏢' },
                ]}
            />



            {/* ── CTA ─────────────────────────────────────────────────── */}
            <section className="section-padding bg-black">
                <div className="container-custom text-center">
                    <span className="font-body text-xs font-bold uppercase tracking-[0.2em] text-[#10b981]">Mulai Proyek Baru</span>
                    <div className="w-8 h-px bg-[#10b981] mx-auto my-3" />
                    <h2 className="font-display text-3xl md:text-4xl font-black text-white mb-4">Website Anda Berikutnya?</h2>
                    <p className="font-body text-white/50 mb-8 max-w-md mx-auto text-sm">
                        Pemerintah atau swasta — konsultasikan kebutuhan dan kami siapkan solusi terbaik.
                    </p>
                    <Link href="/contact"
                        className="inline-flex items-center gap-2 bg-[#10b981] text-white font-body font-bold px-8 py-4 rounded-full hover:gap-4 transition-all duration-300">
                        Konsultasi Gratis <IconArrow />
                    </Link>
                </div>
            </section>
        </MainLayout>
    );
}
