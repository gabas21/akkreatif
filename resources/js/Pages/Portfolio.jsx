import { Link } from '@inertiajs/react';
import SEOHead from '@/Components/SEOHead';
import { useState, useEffect, useCallback } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { cn } from '@/lib/utils';

// ─── Icons ────────────────────────────────────────────────────────────────────
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
const PlusIcon = ({ className }) => (
    <svg className={cn("w-6 h-6 flex-none", className)} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" fill="none" r="11.3" stroke="currentColor" />
        <g fill="currentColor" stroke="none" transform="translate(7 7)">
            <path d="m9 4h-3v-3c0-0.553-0.447-1-1-1s-1 0.447-1 1v3h-3c-0.553 0-1 0.447-1 1s0.447 1 1 1h3v3c0 0.553 0.447 1 1 1s1-0.447 1-1v-3h3c0.553 0 1-0.447 1-1s-0.447-1-1-1" />
        </g>
    </svg>
);
const ChevronUpIcon = () => (
    <svg className="w-8 h-8 fill-current" viewBox="0 0 36 36">
        <path d="m11 20c0-.3838.1465-.7676.4395-1.0605l5.5-5.5c.5854-.5859 1.5356-.5859 2.1211 0l5.5 5.5c.5859.5859.5859 1.5352 0 2.1211-.5854.5859-1.5356.5859-2.1211 0l-4.4395-4.4395-4.4395 4.4395c-.5854.5859-1.5356.5859-2.1211 0-.293-.293-.4395-.6768-.4395-1.0605z" />
    </svg>
);
const ChevronDownIcon = () => (
    <svg className="w-8 h-8 fill-current" viewBox="0 0 36 36">
        <path d="m19.0625 22.5597 5.5-5.5076c.5854-.5854.5825-1.5323-.0039-2.1157-.5869-.5835-1.5366-.5815-2.1211.0039l-4.4375 4.4438-4.4375-4.4438c-.5845-.5854-1.5342-.5874-2.1211-.0039-.2944.2922-.4414.676-.4414 1.0598 0 .3818.1455.7637.4375 1.0559l5.5 5.5076c.2813.2815.6636.4403 1.0625.4403s.7812-.1588 1.0625-.4403z" />
    </svg>
);

// ─── Badge config ─────────────────────────────────────────────────────────────
const LEVEL_STYLE = {
    provinsi: { badge: 'bg-blue-100 text-blue-700 border-blue-200' },
    kabupaten: { badge: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
    kecamatan: { badge: 'bg-violet-100 text-violet-700 border-violet-200' },
    desa: { badge: 'bg-orange-100 text-orange-700 border-orange-200' },
};
const LEVEL_LABEL = { provinsi: 'Provinsi', kabupaten: 'Kab/Kota', kecamatan: 'Kecamatan', desa: 'Desa' };

// ─── GOV PROJECT DATA ─────────────────────────────────────────────────────────
const GOV_PROJECTS = [
    {
        id: 'g1', level: 'kabupaten',
        name: 'Portal BAPPELITBANGDA Mahakam Ulu',
        client: 'Bappelitbangda Kab. Mahakam Ulu',
        description: 'Portal pemerintah daerah yang merajut perencanaan pembangunan inovatif dan berkelanjutan. Menyediakan akses dokumen (RENSTRA, RENJA, DPA), Regulasi, PPID, serta Layanan Pengaduan & Survey terpadu.',
        screenshots: [
            '/images/portfolio/screenshots/bappelitbangda-mahulu/home.webp',
            '/images/portfolio/screenshots/bappelitbangda-mahulu/berita.webp',
            '/images/portfolio/screenshots/bappelitbangda-mahulu/layanan-pengaduan.webp',
            '/images/portfolio/screenshots/bappelitbangda-mahulu/dokumen-renstra.webp',
            '/images/portfolio/screenshots/bappelitbangda-mahulu/profil-visi-misi.webp',
            '/images/portfolio/screenshots/bappelitbangda-mahulu/ppid-permohonan.webp',
        ],
        url: 'https://bappelitbangdamahulu.akkreatif.my.id/',
        tags: ['Laravel', 'MySQL', 'Tailwind CSS'],
        year: '2024', duration: '3 bulan',
        features: ['Publikasi Dokumen Perencanaan (RENSTRA, dll)', 'Sistem PPID (Keterbukaan Informasi)', 'Layanan Pengaduan & Survey IKM', 'Manajemen Berita & Agenda', 'Arsip Regulasi & SK Bupati'],
        highlight: [{ num: '15+', label: 'Menu Layanan' }, { num: '100%', label: 'Transparan' }, { num: 'A+', label: 'Kinerja' }],
    },
    {
        id: 'g2', level: 'kabupaten',
        name: 'Company Profile PT. MGRM (BUMD)',
        client: 'PT. Mahakam Gerbang Raja Migas',
        description: 'Website resmi BUMD Kutai Kartanegara pengelola Participating Interest (PI) 10% Blok Mahakam. Menampilkan profil perusahaan, layanan energi berkelanjutan, integrasi OKE GAS, dan transparansi PPID.',
        screenshots: [
            '/images/portfolio/screenshots/mgrm-kukar/home.webp',
            '/images/portfolio/screenshots/mgrm-kukar/tentang-visi-misi.webp',
            '/images/portfolio/screenshots/mgrm-kukar/tentang-sejarah.webp',
            '/images/portfolio/screenshots/mgrm-kukar/tentang-struktur-organisasi.webp',
            '/images/portfolio/screenshots/mgrm-kukar/layanan.webp',
            '/images/portfolio/screenshots/mgrm-kukar/okegas.webp',
        ],
        url: 'https://mgrmkukar.akkreatif.my.id/',
        tags: ['React', 'Laravel', 'Tailwind CSS'],
        year: '2024', duration: '2 bulan',
        features: ['Profil Perusahaan (Sejarah, Visi Misi, Struktur)', 'Katalog Layanan & OKE GAS', 'Manajemen Publikasi Berita (CMS)', 'Integrasi Eksternal PPID Kukar', 'Mobile & SEO Optimized'],
        highlight: [{ num: '10+', label: 'Halaman Utama' }, { num: 'PI 10%', label: 'Fokus BUMD' }, { num: '100%', label: 'Responsif' }],
    },
    {
        id: 'g3', level: 'kabupaten',
        name: 'Portal Inspektorat Mahakam Ulu',
        client: 'Inspektorat Kab. Mahakam Ulu',
        description: 'Portal pengawasan internal daerah untuk mewujudkan tata kelola yang bersih dan akuntabel. Dilengkapi dengan layanan WBS (Whistleblowing System), pelaporan LHKPN, serta transparansi SAKIP/SPIP.',
        screenshots: [
            '/images/portfolio/screenshots/inspektorat-mahulu/home.webp',
            '/images/portfolio/screenshots/inspektorat-mahulu/profil-visi-misi.webp',
            '/images/portfolio/screenshots/inspektorat-mahulu/berita.webp',
            '/images/portfolio/screenshots/inspektorat-mahulu/layanan-pengaduan.webp',
            '/images/portfolio/screenshots/inspektorat-mahulu/dokumen-sakip.webp',
            '/images/portfolio/screenshots/inspektorat-mahulu/ppid-tentang.webp',
        ],
        url: 'https://inspektoratmahulu.akkreatif.my.id/',
        tags: ['Laravel', 'MySQL', 'Tailwind CSS'],
        year: '2024', duration: '3 bulan',
        features: ['Sistem WBS & Lapor Pengaduan', 'Cek Status Laporan (Tracker)', 'Arsip Dokumen (SAKIP, SPIP, LHKPN)', 'Keterbukaan Informasi (PPID)', 'Publikasi Berita & Agenda'],
        highlight: [{ num: 'WBS', label: 'Keamanan' }, { num: '100%', label: 'Transparan' }, { num: 'A+', label: 'Audit' }],
    },
    {
        id: 'g4', level: 'kabupaten',
        name: 'Inspektorat Kabupaten Mahakam Ulu',
        client: 'Inspektorat Kab. Mahakam Ulu',
        description: 'Website profile Versi Pro untuk mengoptimalkan pengelolaan informasi dan dokumentasi guna mendukung Keterbukaan Informasi Publik (KIP).',
        screenshots: ['/images/portfolio/pemda-kaltim/inspektorat-mahulu/1.webp'],
        url: '', tags: ['Web Profile', 'KIP', 'PPID'], year: '2023', duration: '30 hari kerja',
        features: ['Halaman Beranda & Profil', 'Slider Informasi & Berita', 'Halaman Agenda & PPID', 'Fitur Penunjang Data'],
        highlight: [{ num: 'A+', label: 'Informatif' }, { num: '100%', label: 'Transparan' }],
    },
    {
        id: 'g5', level: 'provinsi',
        name: 'Biro PBJ Provinsi Kalimantan Timur',
        client: 'Biro PBJ Provinsi Kaltim',
        description: 'Website profile Instansi Pemerintah yang informatif, responsif, dan terintegrasi dengan kebutuhan keterbukaan publik.',
        screenshots: ['/images/portfolio/pemda-kaltim/biro-pbj-kaltim/1.webp'],
        url: '', tags: ['Web Profile', 'Pemerintah Provinsi'], year: '2023', duration: '30 hari kerja',
        features: ['Manajemen Berita & Agenda', 'Publikasi Dokumen', 'PWA (Progressive Web App)', 'Admin Dashboard'],
        highlight: [{ num: '100%', label: 'Responsif' }, { num: 'PWA', label: 'Support' }],
    },
    {
        id: 'g6', level: 'kabupaten',
        name: 'Dinas Perdagangan dan Perindustrian Kab. Kutim',
        client: 'DISPERINDAG Kabupaten Kutai Timur',
        description: 'Pembangunan website profile Instansi/Institusi untuk meningkatkan peran Pejabat Pengelola Informasi dan Dokumentasi (PPID).',
        screenshots: ['/images/portfolio/pemda-kaltim/webprofile-disperindag-kutim/1.webp', '/images/portfolio/pemda-kaltim/ekegiatan-disperindag-kutim/1.webp', '/images/portfolio/pemda-kaltim/eskm-disperindag-kutim/1.webp', '/images/portfolio/pemda-kaltim/eperjadin-disperindag-kutim/1.webp', '/images/portfolio/pemda-kaltim/siperindustrian-kutim/1.webp'],
        url: '', tags: ['Web Profile', 'PPID', 'Layanan Publik'], year: '2023', duration: '30 hari kerja',
        features: ['Layanan Informasi Publik', 'Integrasi PPID', 'Kustomisasi Logo & Warna', 'Manajemen Dokumen'],
        highlight: [{ num: 'PPID', label: 'Terintegrasi' }, { num: 'A+', label: 'Aksesibilitas' }],
    },
    {
        id: 'g7', level: 'provinsi',
        name: 'Sekretariat Daerah Provinsi Kalimantan Timur',
        client: 'Setda Provinsi Kaltim',
        description: 'Website resmi pemerintahan tingkat daerah yang mengedepankan asas kemudahan bagi para penggunanya (user friendly) dan memiliki desain tampilan menarik.',
        screenshots: ['/images/portfolio/pemda-kaltim/bag-organisasi-mahulu/1.webp', '/images/portfolio/pemda-kaltim/bag-organisasi-mahulu/2.webp'],
        url: '', tags: ['Web Profile', 'Pemerintah Provinsi'], year: '2024', duration: '30 hari kerja',
        features: ['User Friendly Design', 'Kategori Fitur Utama', 'Halaman Penunjang', 'Sistem Keterbukaan Informasi'],
        highlight: [{ num: '1', label: 'Portal Utama' }, { num: '100%', label: 'User Friendly' }],
    },
    {
        id: 'g8', level: 'provinsi',
        name: 'Aplikasi e-SKM (Survei Kepuasan Masyarakat)',
        client: 'Instansi Pemerintah',
        description: 'Sistem aplikasi untuk memfasilitasi pelaksanaan Survei Kepuasan Masyarakat secara elektronik dan real-time.',
        screenshots: ['/images/portfolio/pemda-kaltim/eskm/1.webp', '/images/portfolio/pemda-kaltim/eskm/2.webp'],
        url: '', tags: ['Web Application', 'Pelayanan Publik', 'Survei'], year: '2023', duration: 'Custom',
        features: ['Formulir Survei Elektronik', 'Rekapitulasi Otomatis', 'Dashboard Analitik', 'Export Laporan'],
        highlight: [{ num: 'Real-time', label: 'Data' }, { num: '100%', label: 'Akurat' }],
    },
    {
        id: 'g9', level: 'kabupaten',
        name: 'Aplikasi e-Kegiatan',
        client: 'Instansi Daerah',
        description: 'Aplikasi manajemen kegiatan untuk mengontrol, merencanakan, dan mendokumentasikan kegiatan instansi secara terpusat.',
        screenshots: ['/images/portfolio/pemda-kaltim/ekegiatan-disperindag-kutim/1.webp'], url: '', tags: ['Web Application', 'Manajemen'], year: '2024', duration: 'Custom',
        features: ['Jadwal & Agenda', 'Dokumentasi', 'Tracking Kegiatan', 'Laporan Kinerja'],
        highlight: [{ num: 'Cepat', label: 'Tracking' }, { num: 'Aman', label: 'Sistem' }],
    },
    {
        id: 'g10', level: 'provinsi',
        name: 'Aplikasi e-Perjadin',
        client: 'Pemerintah Daerah',
        description: 'Sistem informasi pengelolaan perjalanan dinas elektronik guna meningkatkan efisiensi dan transparansi anggaran.',
        screenshots: ['/images/portfolio/pemda-kaltim/eperjadin-disperindag-kutim/1.webp'], url: '', tags: ['Web Application', 'Administrasi'], year: '2023', duration: 'Custom',
        features: ['Pengajuan Perjadin', 'Persetujuan Berjenjang', 'Integrasi Anggaran', 'Cetak SPPD otomatis'],
        highlight: [{ num: 'Paperless', label: 'Efisiensi' }, { num: 'Transparan', label: 'Anggaran' }],
    },
    {
        id: 'g11', level: 'provinsi',
        name: 'Siperindustrian',
        client: 'Dinas Perindustrian',
        description: 'Sistem Informasi Perindustrian untuk pendataan, monitoring, dan evaluasi sektor industri di daerah.',
        screenshots: ['/images/portfolio/pemda-kaltim/siperindustrian-kutim/1.webp'], url: '', tags: ['Web Application', 'Sistem Informasi'], year: '2023', duration: 'Custom',
        features: ['Database Industri', 'Peta Persebaran Industri', 'Monitoring & Evaluasi', 'Dashboard Statistik'],
        highlight: [{ num: 'Big Data', label: 'Industri' }, { num: 'GIS', label: 'Mapping' }],
    },
    {
        id: 'g12', level: 'kabupaten',
        name: 'SIMEVLAP (Sistem Informasi Monitoring Evaluasi Laporan)',
        client: 'Bappelitbangda Kab. Mahakam Ulu',
        description: 'Sistem monitoring dan evaluasi laporan kinerja pembangunan daerah secara real-time dan terintegrasi.',
        screenshots: ['/images/portfolio/pemda-kaltim/simevlap-mahulu/1.webp'],
        url: '', tags: ['Web Application', 'Monitoring', 'Evaluasi'], year: '2023', duration: 'Custom',
        features: ['Monitoring Laporan Real-time', 'Evaluasi Kinerja', 'Dashboard Analitik', 'Export Laporan'],
        highlight: [{ num: 'Real-time', label: 'Monitoring' }, { num: '100%', label: 'Terintegrasi' }],
    },
    {
        id: 'g13', level: 'kabupaten',
        name: 'SIEDESA (Sistem Informasi Elektronik Desa)',
        client: 'DPMD Kabupaten Kutai Kartanegara',
        description: 'Sistem informasi elektronik desa untuk pengelolaan data dan administrasi pemerintahan desa secara digital.',
        screenshots: ['/images/portfolio/pemda-kaltim/siedesa-mahulu/1.webp'],
        url: '', tags: ['Web Application', 'Desa Digital', 'Laravel'], year: '2023', duration: 'Custom',
        features: ['Administrasi Desa Digital', 'Pengelolaan Data Penduduk', 'Layanan Surat Menyurat', 'Dashboard Desa'],
        highlight: [{ num: 'Digital', label: 'Desa' }, { num: '100%', label: 'Paperless' }],
    },
    {
        id: 'g14', level: 'kabupaten',
        name: 'DPMD Kabupaten Kutai Kartanegara',
        client: 'DPMD Kab. Kutai Kartanegara',
        description: 'Portal resmi Dinas Pemberdayaan Masyarakat dan Desa untuk transparansi dan layanan publik.',
        screenshots: ['/images/portfolio/pemda-kaltim/dpmd-kukar/1.webp'],
        url: '', tags: ['Web Profile', 'Pemerintah Kabupaten'], year: '2023', duration: '30 hari kerja',
        features: ['Portal Informasi Publik', 'Layanan Desa', 'Publikasi Berita', 'PPID'],
        highlight: [{ num: 'PPID', label: 'Terbuka' }, { num: '100%', label: 'Responsif' }],
    },
    {
        id: 'g15', level: 'provinsi',
        name: 'UPTD PPRD Samarinda',
        client: 'UPTD PPRD Kota Samarinda',
        description: 'Website resmi Unit Pelaksana Teknis Daerah Pengelolaan Pendapatan Retribusi Daerah Kota Samarinda.',
        screenshots: ['/images/portfolio/pemda-kaltim/uptd-pprd-samarinda/1.webp', '/images/portfolio/pemda-kaltim/siap-uptd-pprd/1.webp', '/images/portfolio/pemda-kaltim/siap-uptd-pprd/mobile-1.webp'],
        url: '', tags: ['Web Profile', 'Pelayanan Publik'], year: '2023', duration: '30 hari kerja',
        features: ['SIAP (Sistem Informasi Antrian)', 'Pelayanan Retribusi', 'Informasi Publik', 'Dashboard Admin'],
        highlight: [{ num: 'SIAP', label: 'Antrian' }, { num: '100%', label: 'Digital' }],
    },
    {
        id: 'g16', level: 'kabupaten',
        name: 'SIMPELSIBANG Bappelitbangda',
        client: 'Bappelitbangda Kab. Mahakam Ulu',
        description: 'Sistem Informasi Manajemen Penelitian, Inovasi dan Kerjasama Pembangunan Daerah.',
        screenshots: ['/images/portfolio/pemda-kaltim/simpelsibang-bappelitbangda/1.webp'],
        url: '', tags: ['Web Application', 'Riset', 'Inovasi'], year: '2023', duration: 'Custom',
        features: ['Manajemen Penelitian', 'Database Inovasi', 'Kerjasama Pembangunan', 'Pelaporan'],
        highlight: [{ num: 'Riset', label: 'Digital' }, { num: '100%', label: 'Terintegrasi' }],
    },
    {
        id: 'g17', level: 'kabupaten',
        name: 'TP PKK Kutai Kartanegara',
        client: 'TP PKK Kab. Kutai Kartanegara',
        description: 'Website resmi Tim Penggerak PKK Kabupaten Kutai Kartanegara untuk pemberdayaan masyarakat.',
        screenshots: ['/images/portfolio/pemda-kaltim/tp-pkk-kukar/1.webp'],
        url: '', tags: ['Web Profile', 'Pemberdayaan'], year: '2023', duration: '30 hari kerja',
        features: ['Profil Organisasi', 'Program PKK', 'Berita & Agenda', 'Galeri Kegiatan'],
        highlight: [{ num: 'PKK', label: 'Digital' }, { num: '100%', label: 'Responsif' }],
    },
    {
        id: 'g18', level: 'kabupaten',
        name: 'E-CSR (Electronic Corporate Social Responsibility)',
        client: 'DPMD Kab. Kutai Kartanegara',
        description: 'Sistem pengelolaan Corporate Social Responsibility secara elektronik untuk transparansi dan akuntabilitas.',
        screenshots: ['/images/portfolio/pemda-kaltim/ecsr-dpmd-kukar/1.webp'],
        url: '', tags: ['Web Application', 'CSR', 'Transparansi'], year: '2023', duration: 'Custom',
        features: ['Pengajuan CSR Online', 'Monitoring Realisasi', 'Dashboard Pelaporan', 'Transparansi Publik'],
        highlight: [{ num: 'E-CSR', label: 'Transparan' }, { num: '100%', label: 'Akuntabel' }],
    },
    {
        id: 'g19', level: 'provinsi',
        name: 'DP3A Provinsi Kalimantan Timur',
        client: 'DP3A Provinsi Kaltim',
        description: 'Website Dinas Pemberdayaan Perempuan dan Perlindungan Anak Provinsi Kalimantan Timur.',
        screenshots: ['/images/portfolio/pemda-kaltim/dp3a-kaltim/1.webp', '/images/portfolio/pemda-kaltim/dp3a-kaltim/2.webp'],
        url: '', tags: ['Web Profile', 'Pemerintah Provinsi'], year: '2023', duration: '30 hari kerja',
        features: ['Layanan Pengaduan', 'Program Pemberdayaan', 'Berita & Informasi', 'PPID'],
        highlight: [{ num: 'DP3A', label: 'Kaltim' }, { num: '100%', label: 'Responsif' }],
    },
    {
        id: 'g20', level: 'provinsi',
        name: 'WalkingStory.id',
        client: 'WalkingStory',
        description: 'Portal Elektronik Survey dan layanan informasi digital berbasis web.',
        screenshots: ['/images/portfolio/pemda-kaltim/walkingstory/1.webp'],
        url: '', tags: ['Web Application', 'Survey', 'Portal'], year: '2023', duration: 'Custom',
        features: ['Survey Elektronik', 'Portal Informasi', 'Dashboard Analitik', 'User Management'],
        highlight: [{ num: 'Survey', label: 'Digital' }, { num: '100%', label: 'Online' }],
    },
    {
        id: 'g21', level: 'provinsi',
        name: 'UKPBJ Kalimantan Utara',
        client: 'UKPBJ Provinsi Kaltara',
        description: 'Website resmi Unit Kerja Pengadaan Barang/Jasa Pemerintah Provinsi Kalimantan Utara.',
        screenshots: ['/images/portfolio/pemda-kaltim/ukpbj-kaltara/1.webp'],
        url: '', tags: ['Web Profile', 'Pengadaan', 'Pemerintah'], year: '2023', duration: '30 hari kerja',
        features: ['Informasi Pengadaan', 'Transparansi Lelang', 'Berita & Agenda', 'PPID'],
        highlight: [{ num: 'PBJ', label: 'Transparan' }, { num: '100%', label: 'Akuntabel' }],
    },
    {
        id: 'g22', level: 'kabupaten',
        name: 'Dispora Kutai Timur',
        client: 'Dinas Pemuda & Olahraga Kutim',
        description: 'Website profile Dinas Kepemudaan dan Olahraga Kabupaten Kutai Timur.',
        screenshots: ['/images/portfolio/pemda-kaltim/webprofile-dispora-kutim/1.webp'],
        url: '', tags: ['Web Profile', 'Pemerintah Kabupaten'], year: '2023', duration: '30 hari kerja',
        features: ['Profil Dinas', 'Program Pemuda', 'Event Olahraga', 'Galeri Kegiatan'],
        highlight: [{ num: 'Pemuda', label: 'Digital' }, { num: '100%', label: 'Responsif' }],
    },
    {
        id: 'g23', level: 'provinsi',
        name: 'SIPROPENDA Bapenda Kaltim',
        client: 'Bapenda Provinsi Kaltim',
        description: 'Sistem Informasi Properti Pendapatan Daerah untuk pengelolaan data pajak dan retribusi.',
        screenshots: ['/images/portfolio/pemda-kaltim/sipropenda-bapenda-kaltim/1.webp', '/images/portfolio/pemda-kaltim/sipropenda-bapenda-kaltim/2.webp', '/images/portfolio/pemda-kaltim/sipropenda-bapenda/mobile-1.webp'],
        url: '', tags: ['Web Application', 'Pajak', 'Pendapatan'], year: '2023', duration: 'Custom',
        features: ['Data Pajak & Retribusi', 'Dashboard Pendapatan', 'Laporan Real-time', 'Mobile Friendly'],
        highlight: [{ num: 'PAD', label: 'Optimasi' }, { num: 'Real-time', label: 'Data' }],
    },
    {
        id: 'g24', level: 'kabupaten',
        name: 'SOLUSI Kota Bogor',
        client: 'Pemkot Kota Bogor',
        description: 'Sistem Operasional Layanan Usaha Mikro dan Sarana Promosi untuk pemberdayaan UMKM Kota Bogor.',
        screenshots: ['/images/portfolio/kota-bogor/solusi-kota-bogor-mobile-1.png', '/images/portfolio/kota-bogor/solusi-kota-bogor-mobile-2.png', '/images/portfolio/kota-bogor/solusi-kota-bogor-mobile-3.png'],
        url: '', tags: ['Mobile App', 'UMKM', 'Promosi'], year: '2023', duration: 'Custom',
        features: ['Katalog UMKM', 'Promosi Digital', 'Layanan Usaha Mikro', 'Mobile App'],
        highlight: [{ num: 'UMKM', label: 'Digital' }, { num: 'Mobile', label: 'First' }],
    },
    {
        id: 'g25', level: 'kabupaten',
        name: 'Warung Sadulur Pemkot Bogor',
        client: 'Pemkot Kota Bogor',
        description: 'Aplikasi mobile Warung Sadulur untuk layanan distribusi kebutuhan pokok masyarakat.',
        screenshots: ['/images/portfolio/kota-bogor/warung-sadulur-bogor-mobile-1.png', '/images/portfolio/kota-bogor/warung-sadulur-bogor-mobile-2.png', '/images/portfolio/kota-bogor/warung-sadulur-bogor-mobile-3.png', '/images/portfolio/kota-bogor/warung-sadulur-bogor-mobile-4.png', '/images/portfolio/kota-bogor/warung-sadulur-bogor-mobile-5.png'],
        url: '', tags: ['Mobile App', 'Distribusi', 'Publik'], year: '2023', duration: 'Custom',
        features: ['Katalog Produk', 'Order Management', 'Distribusi Tracking', 'Laporan Penjualan'],
        highlight: [{ num: 'Mobile', label: 'App' }, { num: '100%', label: 'Digital' }],
    },
    {
        id: 'g26', level: 'provinsi',
        name: 'SIBELAS Kemendikbud',
        client: 'Kemendikbud RI',
        description: 'Sistem informasi Kemendikbud untuk pengelolaan data beasiswa dan layanan pendidikan.',
        screenshots: ['/images/portfolio/kemendikbud/sibelas-kemendikbud-1.png'],
        url: 'https://sibelas.kemdikbud.go.id', tags: ['Web Application', 'Pendidikan', 'Nasional'], year: '2023', duration: 'Custom',
        features: ['Manajemen Beasiswa', 'Dashboard Analitik', 'Pelaporan Terintegrasi', 'User Management'],
        highlight: [{ num: 'Nasional', label: 'Scale' }, { num: '100%', label: 'Reliable' }],
    },
    {
        id: 'g27', level: 'provinsi',
        name: 'SIPOLEN Kemendikbud',
        client: 'Kemendikbud RI',
        description: 'Sistem informasi vokasi Kemendikbud untuk pengelolaan politeknik dan pendidikan vokasi nasional.',
        screenshots: ['/images/portfolio/kemendikbud/sipolen-kemendikbud-1.png'],
        url: 'https://app.vokasi.kemdikbud.go.id/sipolen', tags: ['Web Application', 'Vokasi', 'Nasional'], year: '2023', duration: 'Custom',
        features: ['Data Politeknik Nasional', 'Monitoring Vokasi', 'Pelaporan', 'Dashboard'],
        highlight: [{ num: 'Vokasi', label: 'Nasional' }, { num: '100%', label: 'Digital' }],
    },
    {
        id: 'g28', level: 'provinsi',
        name: 'SIM SILN Kemendikbud',
        client: 'Kemendikbud RI',
        description: 'Sistem Informasi Manajemen Sekolah Indonesia Luar Negeri untuk koordinasi pendidikan internasional.',
        screenshots: ['/images/portfolio/kemendikbud/sim-siln-kemendikbud-1.png'],
        url: 'https://simsiln.kemdikbud.go.id', tags: ['Web Application', 'Pendidikan', 'Internasional'], year: '2023', duration: 'Custom',
        features: ['Data SILN Global', 'Koordinasi Internasional', 'Pelaporan Terpusat', 'Multi-user'],
        highlight: [{ num: 'Global', label: 'Scale' }, { num: 'SILN', label: 'Terpusat' }],
    },
    {
        id: 'g29', level: 'provinsi',
        name: 'SILATDIK Kemendikbud',
        client: 'Kemendikbud RI',
        description: 'Sistem informasi pelatihan pendidikan untuk pengelolaan program pelatihan guru dan tenaga pendidik.',
        screenshots: ['/images/portfolio/kemendikbud/silatdik-kemendikbud-1.png'],
        url: 'https://silatdik.kemdikbud.go.id', tags: ['Web Application', 'Pelatihan', 'Nasional'], year: '2023', duration: 'Custom',
        features: ['Manajemen Pelatihan', 'Pendaftaran Online', 'Sertifikasi Digital', 'Dashboard Admin'],
        highlight: [{ num: 'Pelatihan', label: 'Nasional' }, { num: '100%', label: 'Online' }],
    },
    {
        id: 'g30', level: 'provinsi',
        name: 'Layanan SPK PAUD Dikdasmen',
        client: 'Kemendikbud RI',
        description: 'Layanan Sistem Penjaminan Kualitas untuk PAUD dan Pendidikan Dasar Menengah.',
        screenshots: ['/images/portfolio/kemendikbud/layanan-spk-paud-kemendikbud-1.png'],
        url: 'https://layananspk.pauddikdasmen.kemdikbud.go.id', tags: ['Web Application', 'PAUD', 'Penjaminan Mutu'], year: '2023', duration: 'Custom',
        features: ['Penjaminan Mutu PAUD', 'Evaluasi Pendidikan', 'Dashboard Statistik', 'Pelaporan'],
        highlight: [{ num: 'SPK', label: 'PAUD' }, { num: 'Nasional', label: 'Scale' }],
    },
    {
        id: 'g31', level: 'provinsi',
        name: 'SILANDRI Kemendikbud',
        client: 'Kemendikbud RI',
        description: 'Sistem informasi pengelolaan data pendidikan luar negeri Kemendikbud.',
        screenshots: ['/images/portfolio/kemendikbud/silandri-kemendikbud-1.png'],
        url: '', tags: ['Web Application', 'Pendidikan', 'Nasional'], year: '2023', duration: 'Custom',
        features: ['Pengelolaan Data PDLN', 'Koordinasi Internasional', 'Dashboard Analitik', 'Pelaporan'],
        highlight: [{ num: 'PDLN', label: 'Terpusat' }, { num: '100%', label: 'Digital' }],
    },
    {
        id: 'g32', level: 'provinsi',
        name: 'Akreditasi KAN - Badan Informasi Geospasial',
        client: 'Badan Informasi Geospasial',
        description: 'Sistem akreditasi Komite Akreditasi Nasional di Badan Informasi Geospasial.',
        screenshots: ['/images/portfolio/nasional/akreditasi-kan-big-1.png'],
        url: '', tags: ['Web Application', 'Akreditasi', 'Geospasial'], year: '2023', duration: 'Custom',
        features: ['Proses Akreditasi Online', 'Manajemen Dokumen', 'Tracking Status', 'Dashboard'],
        highlight: [{ num: 'KAN', label: 'Akreditasi' }, { num: 'BIG', label: 'Nasional' }],
    },
    {
        id: 'g33', level: 'provinsi',
        name: 'PTIA - BPKP',
        client: 'BPKP RI',
        description: 'Sistem Pusat Transformasi dan Inovasi Akuntabilitas di Badan Pengawasan Keuangan dan Pembangunan.',
        screenshots: ['/images/portfolio/nasional/ptia-bpkp-1.png', '/images/portfolio/nasional/ptia-bpkp-2.png'],
        url: '', tags: ['Web Application', 'Akuntabilitas', 'BPKP'], year: '2023', duration: 'Custom',
        features: ['Transformasi Digital', 'Inovasi Akuntabilitas', 'Dashboard Pengawasan', 'Pelaporan'],
        highlight: [{ num: 'BPKP', label: 'Nasional' }, { num: '100%', label: 'Akuntabel' }],
    },
    {
        id: 'g34', level: 'provinsi',
        name: 'DPD RI & eOffice DPD RI',
        client: 'DPD Republik Indonesia',
        description: 'Website resmi dan sistem eOffice untuk Dewan Perwakilan Daerah Republik Indonesia.',
        screenshots: ['/images/portfolio/nasional/dpd-ri-1.png', '/images/portfolio/nasional/eoffice-dpd-ri-1.png'],
        url: '', tags: ['Web Application', 'Legislatif', 'eOffice'], year: '2023', duration: 'Custom',
        features: ['Portal DPD RI', 'eOffice Terintegrasi', 'Manajemen Dokumen', 'Agenda Sidang'],
        highlight: [{ num: 'DPD RI', label: 'Legislatif' }, { num: 'eOffice', label: 'Digital' }],
    },
    {
        id: 'g35', level: 'provinsi',
        name: 'Polbangtan Bogor',
        client: 'Politeknik Pembangunan Pertanian Bogor',
        description: 'Website resmi kampus Politeknik Pembangunan Pertanian Bogor.',
        screenshots: ['/images/portfolio/kampus-pesantren/polbangtan-bogor-1.png', '/images/portfolio/kampus-pesantren/polbangtan-bogor-2.png'],
        url: 'https://polbangtan-bogor.ac.id', tags: ['Web Profile', 'Kampus', 'Pendidikan'], year: '2023', duration: '30 hari kerja',
        features: ['Portal Akademik', 'Informasi Kampus', 'Pendaftaran Online', 'Berita & Agenda'],
        highlight: [{ num: 'Kampus', label: 'Digital' }, { num: '100%', label: 'Responsif' }],
    },
    {
        id: 'g36', level: 'kabupaten',
        name: 'SIMANDIK Ponpes Nuur Ar Radhiyyah',
        client: 'Ponpes Nuur Ar Radhiyyah',
        description: 'Sistem Informasi Manajemen Pendidikan untuk Pondok Pesantren Nuur Ar Radhiyyah.',
        screenshots: ['/images/portfolio/kampus-pesantren/simandik-ponpes-1.png', '/images/portfolio/kampus-pesantren/simandik-ponpes-2.png'],
        url: 'https://www.nuurarradhiyyah.ponpes.id', tags: ['Web Application', 'Pendidikan', 'Pesantren'], year: '2023', duration: 'Custom',
        features: ['Manajemen Santri', 'Absensi Digital', 'Laporan Akademik', 'Portal Wali'],
        highlight: [{ num: 'Pesantren', label: 'Digital' }, { num: '100%', label: 'Terintegrasi' }],
    },
    {
        id: 'g37', level: 'provinsi',
        name: 'IFRC Indonesia',
        client: 'International Federation of Red Cross',
        description: 'Aplikasi Office Manajemen untuk IFRC (Federasi Internasional Palang Merah dan Bulan Sabit Merah) Indonesia.',
        screenshots: ['/images/portfolio/nasional/ifrc-indonesia-1.png'],
        url: 'http://indonesiaccst.org/', tags: ['Web Application', 'Manajemen', 'Internasional'], year: '2023', duration: 'Custom',
        features: ['Office Management', 'Data Kegiatan', 'Pelaporan', 'Multi-user'],
        highlight: [{ num: 'IFRC', label: 'Global' }, { num: '100%', label: 'Professional' }],
    },
    {
        id: 'g38', level: 'provinsi',
        name: 'Pakar Videotron',
        client: 'Pakar Videotron',
        description: 'Website perusahaan videotron untuk showcase produk dan layanan display digital.',
        screenshots: ['/images/portfolio/swasta/pakarvideotron-1.png'],
        url: 'http://pakarvideotron.com/', tags: ['Web Profile', 'Videotron', 'Digital Display'], year: '2023', duration: '30 hari kerja',
        features: ['Katalog Produk', 'Showcase Videotron', 'Formulir Penawaran', 'Galeri Proyek'],
        highlight: [{ num: 'Videotron', label: 'Specialist' }, { num: '100%', label: 'Responsif' }],
    },
    {
        id: 'g39', level: 'kabupaten',
        name: 'Emonev Kabupaten Malinau',
        client: 'Pemkab Malinau',
        description: 'Sistem Elektronik Monitoring dan Evaluasi pembangunan Kabupaten Malinau.',
        screenshots: ['/images/portfolio/pemda-kaltim/emonev-malinau/1.webp'],
        url: '', tags: ['Web Application', 'Monitoring', 'Evaluasi'], year: '2023', duration: 'Custom',
        features: ['Monitoring Pembangunan', 'Evaluasi Kinerja', 'Dashboard Real-time', 'Pelaporan'],
        highlight: [{ num: 'Emonev', label: 'Digital' }, { num: 'Real-time', label: 'Data' }],
    },
    {
        id: 'g40', level: 'provinsi',
        name: 'BPOM - Sistem Analisis Data',
        client: 'Badan Pengawas Obat dan Makanan',
        description: 'Sistem analisis data untuk Badan Pengawas Obat dan Makanan dalam monitoring keamanan pangan dan obat.',
        screenshots: ['/images/portfolio/nasional/bpom-1.png', '/images/portfolio/nasional/analisis-data-bpom-1.png'],
        url: '', tags: ['Web Application', 'Analisis Data', 'Kesehatan'], year: '2023', duration: 'Custom',
        features: ['Analisis Data Pangan', 'Monitoring Obat', 'Dashboard Statistik', 'Pelaporan Nasional'],
        highlight: [{ num: 'BPOM', label: 'Nasional' }, { num: 'Big Data', label: 'Analisis' }],
    },
    {
        id: 'g41', level: 'provinsi',
        name: 'Database Air Tanah DKI Jakarta',
        client: 'KI Jakarta / PAMJAYA',
        description: 'Sistem database air tanah untuk pengelolaan sumber daya air di DKI Jakarta.',
        screenshots: ['/images/portfolio/dki-jakarta/ki-jakarta-1.png', '/images/portfolio/dki-jakarta/pamjaya-dki-1.png', '/images/portfolio/dki-jakarta/database-air-tanah-dki-1.png', '/images/portfolio/dki-jakarta/database-air-tanah-dki-2.png'],
        url: '', tags: ['Web Application', 'Database', 'Sumber Daya Air'], year: '2023', duration: 'Custom',
        features: ['Database Air Tanah', 'Peta Persebaran', 'Monitoring Kualitas', 'Pelaporan'],
        highlight: [{ num: 'DKI', label: 'Jakarta' }, { num: 'GIS', label: 'Mapping' }],
    },
];

const NON_GOV_PROJECTS = [
    {
        id: 'n1', type: 'Company Profile',
        name: 'Multi Mandiri Prima',
        client: 'Multi Mandiri Prima',
        description: 'Website profile perusahaan (corporate) yang dirancang secara profesional untuk meningkatkan kredibilitas bisnis dan menjangkau lebih banyak klien.',
        screenshots: [], url: '',
        tags: ['Web Profile', 'Corporate', 'Business'],
        year: '2023', duration: '30 hari kerja',
        features: ['Desain Profesional', 'Katalog Layanan', 'Formulir Kontak', 'SEO Optimized'],
        highlight: [{ num: 'B2B', label: 'Fokus' }, { num: '100%', label: 'Responsif' }],
    },
    {
        id: 'n2', type: 'Web Application',
        name: 'EventPlan.id',
        client: 'EventPlan',
        description: 'Platform manajemen event dan perencanaan acara secara digital untuk berbagai skala kegiatan.',
        screenshots: ['/images/portfolio/swasta/eventplan-id-1.png', '/images/portfolio/swasta/eventplan-id-mobile-1.png'],
        url: 'https://eventplan.id',
        tags: ['Web Application', 'Event Management', 'SaaS'],
        year: '2023', duration: 'Custom',
        features: ['Perencanaan Event', 'Manajemen Peserta', 'Ticketing Digital', 'Dashboard Analytics'],
        highlight: [{ num: 'SaaS', label: 'Platform' }, { num: '100%', label: 'Digital' }],
    },
];

const DESIGN_LOGO_ITEMS = [
    { title: 'AK Kreatif', label: 'Brand Identity', image: '/images/portfolio/desain/1.png', aspect: '1/1', contain: true, bg: 'white' },
    { title: 'AK Coffee', label: 'F&B Branding', image: '/images/portfolio/desain/2.png', aspect: '1/1', contain: true, bg: 'white' },
    { title: 'Progress Kaltim', label: 'Media Layout', image: '/images/portfolio/desain/3.jpg', aspect: '1/1', contain: true, bg: 'white' },
    { title: 'KALTIMGO', label: 'Logo Design', image: '/images/portfolio/desain/4.png', aspect: '1/1', contain: true, bg: 'white' },
    { title: 'Urban Folk News', label: 'News Portal UI', image: '/images/portfolio/desain/5.jpg', aspect: '1/1', contain: true, bg: 'white' },
    { title: 'Istana Popok', label: 'Packaging & Print', image: '/images/portfolio/desain/6.jpg', aspect: '1/1', contain: true, bg: 'white' },
    { title: 'Clean Area', label: 'Corporate Identity', image: '/images/portfolio/desain/7.png', aspect: '1/1', contain: true, bg: 'white' },
    { title: 'Kedai Mas Yus', label: 'Restaurant Kit', image: '/images/portfolio/desain/8.png', aspect: '1/1', contain: true, bg: 'white' },
    { title: 'Villetta', label: 'Brand Identity', image: '/images/portfolio/desain/9.png', aspect: '1/1', contain: true, bg: 'white' },
    { title: 'WJ Photography', label: 'Logo Design', image: '/images/portfolio/desain/10.png', aspect: '1/1', contain: true, bg: 'white' },
    { title: 'Kawal Rusmadi', label: 'Campaign Design', image: '/images/portfolio/desain/11.png', aspect: '1/1', contain: true, bg: 'white' },
];

const DESIGN_GRAFIS_ITEMS = [
    { title: 'Tenggarong Ceria', label: 'Event Poster', image: '/images/portfolio/desain/13.png', aspect: '1/1', contain: true },
    { title: 'BUMD Kaltim', label: 'Company Profile', image: '/images/portfolio/desain/14.png', aspect: '1/1', contain: true },
    { title: 'Diskominfo Kaltim', label: 'Infographics', image: '/images/portfolio/desain/15.png', aspect: '1/1', contain: true },
    { title: 'Gubernur Kaltim', label: 'Digital Campaign', image: '/images/portfolio/desain/16.png', aspect: '1/1', contain: true },
    { title: 'Pemkab Mahulu', label: 'Social Media Feed', image: '/images/portfolio/desain/17.webp', aspect: '1/1', contain: true },
    { title: 'Dinas Pariwisata', label: 'Flyer Design', image: '/images/portfolio/desain/18.webp', aspect: '1/1', contain: true },
    { title: 'Bappeda Kaltim', label: 'Report Design', image: '/images/portfolio/desain/19.webp', aspect: '1/1', contain: true },
    { title: 'Inspire Borneo', label: 'Merchandise', image: '/images/portfolio/desain/20.webp', aspect: '1/1', contain: true },
    { title: 'Creative Studio', label: 'Presentation', image: '/images/portfolio/desain/21.webp', aspect: '1/1', contain: true },
    { title: 'AK Creative', label: 'Graphic Design', image: '/images/portfolio/desain/22.webp', aspect: '1/1', contain: true },
];

const MEDIA_ITEMS = [
    {
        title: 'PREWED',
        label: 'Pre-Wedding Photography',
        image: '/images/unsplash/1511285560929-80b456fea0bc.webp',
        description: 'Sesi foto pra-nikah yang romantis & sinematik, mengabadikan momen terindah sebelum hari pernikahan.',
        photos: [
            { src: '/images/unsplash/1511285560929-80b456fea0bc.webp', caption: 'Golden Hour — Lokasi Outdoor' },
            { src: '/images/unsplash/1501339847302-ac426a4a7cbb.webp', caption: 'Intimate Moment — Studio Session' },
            { src: '/images/unsplash/1495474472287-4d71bcdd2085.webp', caption: 'Cinematic Frame — Natural Light' },
            { src: '/images/unsplash/1509042239860-f550ce710b93.webp', caption: 'Bokeh Portrait — Evening Light' },
            { src: '/images/unsplash/1547658719-da2b51169166.webp', caption: 'Candid Moment — Outdoor' },
            { src: '/images/unsplash/1555396273-367ea4eb4db5.webp', caption: 'Fine Art — Dramatic Light' },
        ],
    },
    {
        title: 'WEDDING',
        label: 'Wedding Photography & Video',
        image: '/images/unsplash/1585386959984-a4155224a1ad.webp',
        description: 'Dokumentasi pernikahan profesional — dari akad hingga resepsi, setiap momen berharga terabadikan.',
        photos: [
            { src: '/images/unsplash/1585386959984-a4155224a1ad.webp', caption: 'Bridal Elegance — Akad Nikah' },
            { src: '/images/unsplash/1511285560929-80b456fea0bc.webp', caption: 'Reception — Grand Ballroom' },
            { src: '/images/unsplash/1562577309-4932fdd64cd1.webp', caption: 'First Dance — Momen Bahagia' },
            { src: '/images/unsplash/1516035069371-29a1b244cc32.webp', caption: 'Detail Shot — Dekorasi' },
            { src: '/images/unsplash/1501339847302-ac426a4a7cbb.webp', caption: 'Couple Portrait — Sunset' },
        ],
    },
    {
        title: 'BOOTCAMP',
        label: 'Event Documentation',
        image: '/images/unsplash/1492691527719-9d1e07e534b4.webp',
        description: 'Dokumentasi event bootcamp & pelatihan intensif, mengabadikan energi dan semangat peserta.',
        photos: [
            { src: '/images/unsplash/1492691527719-9d1e07e534b4.webp', caption: 'Opening Session — Keynote Speaker' },
            { src: '/images/unsplash/1540575467063-178a50c2df87.webp', caption: 'Workshop Activity — Group Session' },
            { src: '/images/unsplash/1563986768609-322da13575f3.webp', caption: 'Networking — Sesi Diskusi' },
            { src: '/images/unsplash/1542744173-8e7e53415bb0.webp', caption: 'Presentation — Stage Moment' },
        ],
    },
    {
        title: 'PELATIHAN',
        label: 'Training Event Coverage',
        image: '/images/unsplash/1540575467063-178a50c2df87.webp',
        description: 'Coverage pelatihan & seminar resmi instansi pemerintah dan swasta secara profesional.',
        photos: [
            { src: '/images/unsplash/1540575467063-178a50c2df87.webp', caption: 'Pelatihan Nasional — Sesi Pleno' },
            { src: '/images/unsplash/1492691527719-9d1e07e534b4.webp', caption: 'Praktik Lapangan — Kelompok' },
            { src: '/images/unsplash/1563986768609-322da13575f3.webp', caption: 'Sertifikasi — Penyerahan Plakat' },
            { src: '/images/unsplash/1442512595331-e89e73853f31.webp', caption: 'Dokumentasi Resmi — Indoor' },
        ],
    },
    {
        title: 'Video Profil',
        label: 'Video Production',
        image: '/images/unsplash/1554048612-b6a482bc67e5.webp',
        description: 'Produksi video profil instansi & perusahaan dengan konsep sinematik dan narasi yang kuat.',
        photos: [
            { src: '/images/unsplash/1554048612-b6a482bc67e5.webp', caption: 'Behind The Scene — Produksi' },
            { src: '/images/unsplash/1505236858219-8359eb29e329.webp', caption: 'Corporate Footage — Aerial View' },
            { src: '/images/unsplash/1586717791821-3f44a563fa4c.webp', caption: 'Interview Setup — Studio' },
            { src: '/images/unsplash/1558618666-fcd25c85cd64.webp', caption: 'Color Grading — Post Production' },
        ],
    },
    {
        title: 'Video AKPER',
        label: 'Corporate Video',
        image: '/images/unsplash/1505236858219-8359eb29e329.webp',
        description: 'Video dokumentasi akademi keperawatan — menampilkan kegiatan kampus, wisuda, dan praktik klinik.',
        photos: [
            { src: '/images/unsplash/1505236858219-8359eb29e329.webp', caption: 'Campus Life — Kegiatan Belajar' },
            { src: '/images/unsplash/1554048612-b6a482bc67e5.webp', caption: 'Praktik Klinik — Laboratorium' },
            { src: '/images/unsplash/1558618666-fcd25c85cd64.webp', caption: 'Wisuda — Momen Terbaik' },
        ],
    },
    {
        title: 'EVENT',
        label: 'Event Aftermovie',
        image: '/images/unsplash/1558618666-fcd25c85cd64.webp',
        description: 'Aftermovie & highlight reel event berskala besar — konser, festival, dan pameran budaya.',
        photos: [
            { src: '/images/unsplash/1558618666-fcd25c85cd64.webp', caption: 'Festival Stage — Night Show' },
            { src: '/images/unsplash/1492691527719-9d1e07e534b4.webp', caption: 'Crowd Energy — Live Event' },
            { src: '/images/unsplash/1460925895917-afdab827c52f.webp', caption: 'Performance — Drone Shot' },
            { src: '/images/unsplash/1561070791-2526d30994b5.webp', caption: 'After Party — Highlight' },
            { src: '/images/unsplash/1586717791821-3f44a563fa4c.webp', caption: 'Exhibition — Gallery Walk' },
        ],
    },
];

const SOCIAL_IG_ITEMS = [
    { title: 'AK KREATIF', image: '/images/instagram/ak-kreatif.webp', aspect: '9/16', url: 'https://instagram.com/ak_kreatif' },
    { title: 'AK COFFEE', image: '/images/instagram/ak-coffee.webp', aspect: '9/16', url: 'https://instagram.com/akcoffee.id' },
    { title: 'PROGRESS KALTIM', image: '/images/instagram/progress-kaltim.webp', aspect: '9/16', url: 'https://instagram.com/progresskaltim' },
    { title: 'URBAN FOLK NEWS', image: '/images/instagram/urban-folk-news.webp', aspect: '9/16', url: 'https://instagram.com/urbanfolknews' },
    { title: 'PPID DISPERINDAG KAB. KUTIM', image: '/images/instagram/disperindag.webp', aspect: '9/16', url: 'https://instagram.com/disperindagkutim' },
    { title: 'PPID BIRO PBJ PROV. KALTIM', image: '/images/instagram/biro-pbj-prov-kaltim.webp', aspect: '9/16', url: 'https://instagram.com/biropbjkaltim' },
    { title: 'PPID INSPEKTORAT KAB. MAHULU', image: '/images/instagram/inspektorat-kab-mahulu.webp', aspect: '9/16', url: 'https://instagram.com/inspektoratmahulu' },
    { title: 'PPID BAPPEDA PROV. KALTIM', image: '/images/instagram/bappeda-prov-kaltim.webp', aspect: '9/16', url: 'https://instagram.com/bappedakaltim' },
    { title: 'KALTIMGO', image: '/images/instagram/kaltimgo.webp', aspect: '9/16', url: 'https://instagram.com/kaltimgo' },
    { title: 'URBAN KALTIM', image: '/images/instagram/urban-kaltim.webp', aspect: '9/16', url: 'https://instagram.com/urbankaltim' },
    { title: 'SOUVENIR LESTARI', image: '/images/instagram/souvenir-lestari.webp', aspect: '9/16', url: 'https://instagram.com/souvenirlestari' },
    { title: 'CLEAN AREA', image: '/images/instagram/clean-area.webp', aspect: '9/16', url: 'https://instagram.com/cleanarea' },
    { title: 'ISTANA POPOK', image: '/images/instagram/istana-popok.webp', aspect: '9/16', url: 'https://instagram.com/istanapopok' },
    { title: 'BORNEO INDIE CHANNEL', image: '/images/instagram/borneo-indie-channel.webp', aspect: '9/16', url: 'https://instagram.com/borneoindiechannel' },
    { title: 'INDIENESIARAYA', image: '/images/instagram/indienesiaraya.webp', aspect: '9/16', url: 'https://instagram.com/indienesiaraya' },
    { title: 'YUGO MART', image: '/images/instagram/yugo-mart.webp', aspect: '9/16', url: 'https://instagram.com/yugomart' },
];

const SOCIAL_YT_ITEMS = [
    { title: 'AK KREATIF', image: '/images/youtube/ak-kreatif (1).webp', aspect: '16/9', url: 'https://youtube.com/@akkreatif' },
    { title: 'URBAN FOLK NEWS', image: '/images/youtube/urban-folk-news.webp', aspect: '16/9', url: 'https://youtube.com/@urbanfolknews' },
    { title: 'KALTIMGO', image: '/images/youtube/kaltimgo.webp', aspect: '16/9', url: 'https://youtube.com/@kaltimgo' },
    { title: 'URBAN KALTIM', image: '/images/youtube/urban-kaltim.webp', aspect: '16/9', url: 'https://youtube.com/@urbankaltim' },
    { title: 'PPID BIRO PBJ PROV. KALTIM', image: '/images/youtube/biro-pbj-prov-kaltim.webp', aspect: '16/9', url: 'https://youtube.com/@biropbjkaltim' },
    { title: 'PPID INSPEKTORAT KAB. MAHULU', image: '/images/youtube/inspektorat-kab-mahulu.webp', aspect: '16/9', url: 'https://youtube.com/@inspektoratmahulu' },
    { title: 'PPID DISPERINDAG KAB. KUTIM', image: '/images/youtube/disperindag.webp', aspect: '16/9', url: 'https://youtube.com/@disperindagkutim' },
    { title: 'PPID UPTD PPRD KAB. PASER', image: '/images/youtube/uptd-pprd-kab-paser.webp', aspect: '16/9', url: 'https://youtube.com/@uptdpprdpaser' },
    { title: 'RUSMADI WONGSO', image: '/images/youtube/rusmadi-wongso.webp', aspect: '16/9', url: 'https://youtube.com/@rusmadiwongso' },
    { title: 'BORNEO INDIE CHANNEL', image: '/images/youtube/borneo-indie-channel.webp', aspect: '16/9', url: 'https://youtube.com/@borneoindiechannel' },
    { title: 'RIO SATRIO', image: '/images/youtube/rio-satrio.webp', aspect: '16/9', url: 'https://youtube.com/@riosatrio' },
];

// ─── Showcase Items Config ────────────────────────────────────────────────────
const SHOWCASE_ITEMS = [
    {
        id: 'web', label: 'Web & Application',
        description: 'Portal pemerintah daerah, e-commerce, company profile — dibangun dengan React, Laravel, dan standar teknis tertinggi.',
        count: GOV_PROJECTS.length + NON_GOV_PROJECTS.length,
        accent: '#10b981',
    },
    {
        id: 'design', label: 'Desain Grafis',
        description: 'Logo, brand identity, kemasan produk, dan UI/UX design yang membuat brand Anda menonjol.',
        count: DESIGN_LOGO_ITEMS.length + DESIGN_GRAFIS_ITEMS.length,
        accent: '#8b5cf6',
    },
    {
        id: 'media', label: 'Foto & Video',
        description: 'Foto produk komersial, video sinematik, drone footage, dan dokumentasi event berskala besar.',
        count: MEDIA_ITEMS.length,
        accent: '#f59e0b',
    },
    {
        id: 'social', label: 'Social Media',
        description: 'Konten kreatif, campaign viral, dan pertumbuhan follower organik yang menghasilkan.',
        count: SOCIAL_IG_ITEMS.length + SOCIAL_YT_ITEMS.length,
        accent: '#ec4899',
    },
];

// ─── Browser Frame ────────────────────────────────────────────────────────────
function BrowserFrame({ screenshots = [], screenshot, urlDisplay = 'akkreatif.com', alt = '' }) {
    const images = screenshots?.length > 0 ? screenshots : (screenshot ? [screenshot] : []);
    const [activeImg, setActiveImg] = useState(0);
    const [err, setErr] = useState(false);

    useEffect(() => {
        if (images.length <= 1) return;
        const interval = setInterval(() => setActiveImg(i => (i + 1) % images.length), 3000);
        return () => clearInterval(interval);
    }, [images.length]);

    const hasImg = images[activeImg] && !err;

    return (
        <div className="overflow-hidden bg-[#1a1a1a] w-full rounded-t-xl">
            <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-white/5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500/70" />
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/70" />
                <span className="w-1.5 h-1.5 rounded-full bg-green-500/70" />
                <div className="flex-1 mx-2 bg-white/8 rounded px-2 py-0.5 flex items-center gap-1">
                    <IconGlobe />
                    <span className="font-mono text-[8px] text-white/30 truncate">{urlDisplay}</span>
                </div>
            </div>
            <div className="relative w-full overflow-hidden" style={{ paddingBottom: '55%' }}>
                {hasImg ? (
                    images.map((img, i) => (
                        <img key={i} src={img} alt={`${alt} ${i + 1}`}
                            onError={() => setErr(true)} loading="lazy"
                            className={cn("absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-1000", i === activeImg ? "opacity-100" : "opacity-0")}
                        />
                    ))
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-gradient-to-br from-[#111] to-[#1a1a1a]">
                        <div className="w-6 h-6 rounded border border-white/10 flex items-center justify-center"><IconGlobe /></div>
                        <span className="font-body text-[9px] text-white/20">Screenshot belum tersedia</span>
                    </div>
                )}
            </div>
        </div>
    );
}

// ─── Project Modal ────────────────────────────────────────────────────────────
function ProjectModal({ project, isGov, onClose }) {
    const [activeImg, setActiveImg] = useState(0);
    const shots = project.screenshots ?? [];
    const prev = useCallback(() => setActiveImg(i => (i - 1 + shots.length) % shots.length), [shots.length]);
    const next = useCallback(() => setActiveImg(i => (i + 1) % shots.length), [shots.length]);

    useEffect(() => {
        const handler = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        };
        window.addEventListener('keydown', handler);
        document.body.style.overflow = 'hidden';
        return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
    }, [onClose, prev, next]);

    const urlDisplay = project.url ? project.url.replace(/^https?:\/\//, '') : 'preview tidak tersedia';
    const badgeClass = isGov ? (LEVEL_STYLE[project.level]?.badge ?? '') : 'bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20';
    const badgeLabel = isGov ? LEVEL_LABEL[project.level] : project.type;

    return (
        <div className="fixed inset-0 z-[300] flex items-end md:items-center justify-center md:p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <div onClick={e => e.stopPropagation()}
                className="relative z-10 w-full md:max-w-4xl bg-white rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
                <div className="flex items-center justify-between px-6 py-4 border-b border-black/6 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <span className={cn('px-2.5 py-1 text-[10px] font-bold font-body uppercase tracking-wider rounded-full border', badgeClass)}>{badgeLabel}</span>
                        <span className="font-mono text-xs text-black/30">{project.year}</span>
                        {project.duration && <span className="font-body text-xs text-black/40">· {project.duration}</span>}
                    </div>
                    <button onClick={onClose} aria-label="Tutup detail proyek" className="w-8 h-8 bg-black/8 hover:bg-black/15 rounded-full flex items-center justify-center transition-colors"><IconClose aria-hidden="true" /></button>
                </div>
                <div className="overflow-y-auto flex-1">
                    <div className="bg-[#111] relative">
                        {shots.length > 0 ? (
                            <>
                                <div className="px-4 pt-4 pb-2">
                                    <div className="rounded-xl overflow-hidden bg-[#1a1a1a]">
                                        <div className="flex items-center gap-1.5 px-3 py-2.5 border-b border-white/5">
                                            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                                            <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                                            <div className="flex-1 mx-2 bg-white/8 rounded px-3 py-1 flex items-center gap-1.5">
                                                <IconGlobe />
                                                <span className="font-mono text-xs text-white/40 truncate">{urlDisplay}</span>
                                            </div>
                                        </div>
                                        <div className="relative" style={{ paddingBottom: '55%' }}>
                                            <img key={activeImg} src={shots[activeImg]} alt={`${project.name} — screenshot ${activeImg + 1}`}
                                                loading="lazy" className="absolute inset-0 w-full h-full object-cover object-top" />
                                        </div>
                                    </div>
                                </div>
                                {shots.length > 1 && (
                                    <div className="flex items-center gap-3 px-4 pb-4">
                                        <button onClick={prev} aria-label="Screenshot sebelumnya" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors flex-shrink-0"><IconChevronLeft aria-hidden="true" /></button>
                                        <div className="flex gap-2 flex-1 overflow-x-auto">
                                            {shots.map((s, i) => (
                                                <button key={`thumb-${i}`} onClick={() => setActiveImg(i)}
                                                    aria-label={`Lihat screenshot ${i + 1}`}
                                                    className={cn('relative flex-shrink-0 w-20 rounded-lg overflow-hidden border-2 transition-all', i === activeImg ? 'border-[#10b981]' : 'border-white/10 opacity-50 hover:opacity-80')}
                                                    style={{ height: '48px' }}>
                                                    <img src={s} alt={`Thumbnail screenshot ${i + 1}`} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                                                </button>
                                            ))}
                                        </div>
                                        <button onClick={next} aria-label="Screenshot berikutnya" className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors flex-shrink-0"><IconChevronRight aria-hidden="true" /></button>
                                        <span className="font-mono text-xs text-white/30 flex-shrink-0">{activeImg + 1} / {shots.length}</span>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-14 gap-3">
                                <div className="w-14 h-14 rounded-2xl border border-white/10 flex items-center justify-center"><IconGlobe /></div>
                                <p className="font-body text-sm text-white/30">Screenshot belum tersedia</p>
                            </div>
                        )}
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-6">
                            <div>
                                <h2 className="font-display text-xl font-black text-black mb-1 leading-snug">{project.name}</h2>
                                <p className="font-body text-xs text-black/40 mb-3">{project.client}</p>
                                <p className="font-body text-sm text-black/65 leading-relaxed">{project.description}</p>
                            </div>
                            {project.highlight?.length > 0 && (
                                <div className="flex flex-wrap gap-4">
                                    {project.highlight.map((h, i) => (
                                        <div key={i} className="flex-1 min-w-[80px] bg-[#fafafa] border border-black/6 rounded-xl p-3 text-center">
                                            <div className="font-display text-xl font-black text-[#10b981]">{h.num}</div>
                                            <div className="font-body text-[10px] text-black/40 mt-0.5">{h.label}</div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {project.features?.length > 0 && (
                                <div>
                                    <h4 className="font-display text-xs font-bold uppercase tracking-widest text-black/40 mb-3">Fitur & Halaman</h4>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {project.features.map((f, i) => (
                                            <li key={i} className="flex items-start gap-2.5 text-sm font-body text-black/70">
                                                <span className="mt-0.5 w-5 h-5 rounded-full bg-[#10b981]/12 text-[#10b981] flex items-center justify-center flex-shrink-0"><IconCheck /></span>
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className="space-y-5">
                            <div>
                                <h4 className="font-display text-xs font-bold uppercase tracking-widest text-black/40 mb-3">Tech Stack</h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {project.tags.map((t, i) => (
                                        <span key={i} className="px-2.5 py-1 bg-black/5 text-black/60 rounded-lg text-xs font-mono">{t}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-[#fafafa] border border-black/6 rounded-2xl p-4 space-y-3">
                                {[{ label: 'Klien', value: project.client }, { label: 'Tahun', value: project.year }, { label: 'Durasi', value: project.duration ?? '–' }, { label: 'Kategori', value: badgeLabel }].map((m, i) => (
                                    <div key={i} className="flex justify-between gap-2">
                                        <span className="font-body text-xs text-black/35">{m.label}</span>
                                        <span className="font-body text-xs font-semibold text-black/70 text-right">{m.value}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col gap-2.5">
                                {project.url ? (
                                    <a href={project.url} target="_blank" rel="noopener noreferrer"
                                        className="w-full inline-flex items-center justify-center gap-2 bg-black text-white font-body font-bold px-5 py-3 rounded-xl text-sm hover:gap-3 transition-all">
                                        <IconExternal /> Buka Website
                                    </a>
                                ) : (
                                    <div className="w-full inline-flex items-center justify-center gap-2 bg-black/6 text-black/30 font-body font-bold px-5 py-3 rounded-xl text-sm cursor-not-allowed">URL belum tersedia</div>
                                )}
                                <Link href="/contact" className="w-full inline-flex items-center justify-center gap-2 border border-[#10b981] text-[#10b981] font-body font-bold px-5 py-3 rounded-xl text-sm hover:bg-[#10b981] hover:text-white transition-all">
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

// ─── Compact Project Card for right panel ─────────────────────────────────────
function ProjectCard({ project, isGov, onOpen }) {
    const thumb = project.screenshots?.[0] ?? '';
    const urlDisplay = project.url ? project.url.replace(/^https?:\/\//, '') : 'akkreatif.com';

    return (
        <button onClick={() => onOpen(project)}
            className="group flex flex-col text-left w-full bg-white border border-black/8 rounded-2xl overflow-hidden hover:border-[#10b981]/40 hover:shadow-xl transition-all duration-300">
            <div className="relative w-full overflow-hidden flex-shrink-0">
                <BrowserFrame screenshot={thumb} urlDisplay={urlDisplay} alt={project.name} />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <span className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 bg-[#10b981] text-white font-body font-bold text-sm px-4 py-2 rounded-full shadow-xl">
                        Lihat Detail
                    </span>
                </div>
            </div>
            <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-2 gap-2">
                    <span className={cn('px-2.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full border flex-shrink-0',
                        isGov ? (LEVEL_STYLE[project.level]?.badge ?? '') : 'bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20')}>
                        {isGov ? LEVEL_LABEL[project.level] : project.type}
                    </span>
                    <span className="font-mono text-sm text-black/40">{project.year}</span>
                </div>
                <h3 className="font-display text-base font-bold text-black leading-snug line-clamp-2">{project.name}</h3>
            </div>
        </button>
    );
}

// ─── Image Card for non-web categories ────────────────────────────────────────
function ImageCard({ item, accent = '#10b981', onOpen }) {
    const isPortrait = item.aspect === '9/16';
    const isContain = item.contain || false;
    const isMedia = !!item.photos;

    let bgClass = "bg-cover bg-top";
    if (isContain) bgClass = "bg-contain bg-no-repeat bg-center";
    else if (isPortrait) bgClass = "bg-cover bg-top";

    let containerBg = item.bg === 'white' ? 'bg-white' : 'bg-black';

    const handleClick = (e) => {
        if (isMedia && onOpen) {
            e.preventDefault();
            onOpen(item);
        }
    };

    // For contain (design/logo) items: no dark overlay, just a subtle hover effect
    const overlayClass = isContain
        ? "absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"
        : "absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500";

    const labelColor = isContain ? "text-black/50" : "text-white/60";
    const titleColor = isContain ? "text-black font-semibold" : "text-white font-bold";
    const btnBg = isContain ? "bg-black/10 text-black" : "bg-white/20 text-white";

    return (
        <a
            href={isMedia ? '#' : (item.url || '#')}
            target={isMedia ? undefined : "_blank"}
            rel={isMedia ? undefined : "noreferrer"}
            onClick={handleClick}
            className={cn("group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 hover:scale-[1.02] shadow-sm hover:shadow-xl block", containerBg)}
            style={{ aspectRatio: item.aspect || '4/3' }}
        >
            {/* Background Image */}
            <div
                className={cn("absolute inset-0 transition-transform duration-700 group-hover:scale-105", bgClass)}
                style={{ backgroundImage: `url('${item.image}')` }}
            />

            {/* Overlay — dark for media/social, subtle for design */}
            <div className={overlayClass} />

            {/* Content */}
            <div className="absolute inset-0 p-4 flex flex-col justify-end">
                <div className="flex items-end justify-between gap-3">
                    <div>
                        <p className={cn("font-body text-xs mb-0.5 uppercase tracking-widest", labelColor)}>{item.label}</p>
                        <h3 className={cn("font-display text-sm sm:text-base leading-snug", titleColor)}>{item.title}</h3>
                    </div>
                    {/* View Button */}
                    {isMedia ? (
                        <div className={cn("shrink-0 flex items-center gap-1.5 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300", btnBg)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                            {item.photos?.length} Foto
                        </div>
                    ) : (
                        <div className={cn("shrink-0 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300", btnBg)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
                        </div>
                    )}
                </div>
            </div>
        </a>
    );
}

// ─── Media Gallery Modal ───────────────────────────────────────────────────────
function MediaGalleryModal({ item, onClose }) {
    const photos = item.photos ?? [];
    const [active, setActive] = useState(0);
    const [zoomed, setZoomed] = useState(false);

    const prev = useCallback(() => setActive(i => (i - 1 + photos.length) % photos.length), [photos.length]);
    const next = useCallback(() => setActive(i => (i + 1) % photos.length), [photos.length]);

    useEffect(() => {
        const handler = (e) => {
            if (e.key === 'Escape') { if (zoomed) setZoomed(false); else onClose(); }
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        };
        window.addEventListener('keydown', handler);
        document.body.style.overflow = 'hidden';
        return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
    }, [onClose, prev, next, zoomed]);

    return (
        <div className="fixed inset-0 z-[400] flex items-center justify-center" onClick={onClose}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" />

            {/* Modal */}
            <div
                onClick={e => e.stopPropagation()}
                className="relative z-10 w-full max-w-5xl mx-4 flex flex-col max-h-[95vh]"
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-4 px-1">
                    <div>
                        <span className="font-body text-white/40 text-xs uppercase tracking-[0.2em]">{item.label}</span>
                        <h2 className="font-display text-2xl font-bold text-white mt-0.5">{item.title}</h2>
                        {item.description && (
                            <p className="font-body text-white/50 text-sm mt-1 max-w-lg">{item.description}</p>
                        )}
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="font-mono text-white/30 text-sm">{active + 1} / {photos.length}</span>
                        <button
                            onClick={onClose}
                            aria-label="Tutup galeri"
                            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                        >
                            <IconClose />
                        </button>
                    </div>
                </div>

                {/* Main Image */}
                <div className="relative rounded-2xl overflow-hidden bg-black/40 flex-1 min-h-0" style={{ maxHeight: '60vh' }}>
                    <img
                        key={active}
                        src={photos[active]?.src}
                        alt={photos[active]?.caption}
                        className="w-full h-full object-contain"
                        style={{ animation: 'fadeIn 0.3s ease' }}
                        onClick={() => setZoomed(true)}
                    />

                    {/* Caption bar */}
                    <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="font-body text-white/80 text-sm">{photos[active]?.caption}</p>
                    </div>

                    {/* Nav arrows */}
                    {photos.length > 1 && (
                        <>
                            <button
                                onClick={prev}
                                aria-label="Foto sebelumnya"
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-sm flex items-center justify-center text-white transition-all hover:scale-110"
                            >
                                <IconChevronLeft />
                            </button>
                            <button
                                onClick={next}
                                aria-label="Foto berikutnya"
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-sm flex items-center justify-center text-white transition-all hover:scale-110"
                            >
                                <IconChevronRight />
                            </button>
                        </>
                    )}
                </div>

                {/* Thumbnail Strip */}
                {photos.length > 1 && (
                    <div className="flex gap-2.5 mt-4 overflow-x-auto pb-1 px-1">
                        {photos.map((p, i) => (
                            <button
                                key={i}
                                onClick={() => setActive(i)}
                                aria-label={`Foto ${i + 1}`}
                                className={cn(
                                    'relative flex-shrink-0 rounded-xl overflow-hidden transition-all duration-200 border-2',
                                    i === active
                                        ? 'border-[#f59e0b] scale-105 shadow-lg shadow-[#f59e0b]/30'
                                        : 'border-white/10 opacity-50 hover:opacity-80 hover:border-white/30'
                                )}
                                style={{ width: 72, height: 50 }}
                            >
                                <img src={p.src} alt={`thumb ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Zoom overlay */}
            {zoomed && (
                <div
                    className="absolute inset-0 z-20 flex items-center justify-center bg-black/98 cursor-zoom-out"
                    onClick={() => setZoomed(false)}
                >
                    <img
                        src={photos[active]?.src}
                        alt={photos[active]?.caption}
                        className="max-w-full max-h-full object-contain"
                        style={{ animation: 'fadeIn 0.2s ease' }}
                    />
                </div>
            )}

            <style>{`@keyframes fadeIn { from { opacity:0; transform:scale(0.98); } to { opacity:1; transform:scale(1); } }`}</style>
        </div>
    );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function Portfolio() {
    const [expandedId, setExpandedId] = useState('web');
    const [modal, setModal] = useState(null);
    const [mediaModal, setMediaModal] = useState(null);
    const [webSubTab, setWebSubTab] = useState('gov');
    const [socialSubTab, setSocialSubTab] = useState('ig');
    const [designSubTab, setDesignSubTab] = useState('logo');
    const [govFilter, setGovFilter] = useState('all');

    const itemIds = SHOWCASE_ITEMS.map(i => i.id);
    const currentIdx = itemIds.indexOf(expandedId);
    const isPrevDisabled = currentIdx <= 0;
    const isNextDisabled = currentIdx >= itemIds.length - 1;
    const onPrevious = () => { if (!isPrevDisabled) setExpandedId(itemIds[currentIdx - 1]); };
    const onNext = () => { if (!isNextDisabled) setExpandedId(itemIds[currentIdx + 1]); };

    const currentItem = SHOWCASE_ITEMS.find(i => i.id === expandedId);

    const GOV_FILTERS = [
        { id: 'all', label: 'Semua' },
        { id: 'provinsi', label: 'Provinsi', dot: 'bg-blue-500' },
        { id: 'kabupaten', label: 'Kab/Kota', dot: 'bg-emerald-500' },
        { id: 'kecamatan', label: 'Kecamatan', dot: 'bg-violet-500' },
        { id: 'desa', label: 'Desa', dot: 'bg-orange-500' },
    ];
    const filteredGov = govFilter === 'all' ? GOV_PROJECTS : GOV_PROJECTS.filter(p => p.level === govFilter);

    // Get current items for right panel
    const getContentItems = () => {
        if (expandedId === 'web') {
            return webSubTab === 'gov' ? filteredGov : NON_GOV_PROJECTS;
        }
        if (expandedId === 'design') {
            return designSubTab === 'logo' ? DESIGN_LOGO_ITEMS : DESIGN_GRAFIS_ITEMS;
        }
        if (expandedId === 'media') return MEDIA_ITEMS;
        if (expandedId === 'social') {
            return socialSubTab === 'ig' ? SOCIAL_IG_ITEMS : SOCIAL_YT_ITEMS;
        }
        return [];
    };

    return (
        <MainLayout>
            <SEOHead
                title="Portofolio Proyek"
                description="Lihat hasil karya terbaik dari AK Kreatif. Kami telah membantu berbagai klien dari pemerintahan, UMKM, hingga korporasi dalam pengembangan website, desain, dan dokumentasi."
                canonical="/portfolio"
                jsonLd={{
                    '@context': 'https://schema.org',
                    '@type': 'CollectionPage',
                    name: 'Portofolio AK Kreatif',
                    description: 'Koleksi hasil karya pembuatan website, desain grafis, dan dokumentasi event dari AK Kreatif.',
                    url: 'https://akkreatif.my.id/portfolio',
                }}
            />

            {modal && <ProjectModal project={modal.project} isGov={modal.isGov} onClose={() => setModal(null)} />}
            {mediaModal && <MediaGalleryModal item={mediaModal} onClose={() => setMediaModal(null)} />}

            {/* ── FULL PAGE WRAPPER ── */}
            <div className="relative min-h-screen bg-[#fafafa]">
                {/* Background effects */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_80%_at_50%_50%,#000_40%,transparent_110%)]" />
                    <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] -translate-y-1/2 rounded-full blur-[150px] opacity-[0.07] transition-colors duration-1000"
                        style={{ background: currentItem?.accent }} />
                    <div className="absolute -top-20 left-1/4 w-[300px] h-[300px] rounded-full blur-[120px] opacity-[0.05] bg-[#10b981]" />
                </div>

                {/* ── HERO SECTION ── */}
                <div className="relative z-10 pt-28 pb-8 px-8 border-b border-black/5">

                    {/* Orbit rings with AK logo at center */}
                    <div className="absolute top-16 right-16 w-40 h-40 pointer-events-none">
                        <div className="absolute inset-0 border border-[#10b981]/20 rounded-full animate-[spin_20s_linear_infinite]" />
                        <div className="absolute inset-3 border border-[#10b981]/15 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                        <div className="absolute inset-6 border border-black/5 rounded-full animate-[spin_25s_linear_infinite]" />
                        {/* AK Logo — the star */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full bg-[#10b981]/15 blur-xl animate-pulse" />
                            <img src="/images/logo-color.webp" alt="AK" className="relative w-16 h-16 object-contain drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]" />
                        </div>
                        {/* Orbiting small dots */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1 h-1 rounded-full bg-emerald-400/60" />
                    </div>

                    {/* Small floating dots */}
                    <div className="absolute top-24 right-[45%] w-1.5 h-1.5 rounded-full bg-[#10b981]/40 animate-[pulse_3s_ease-in-out_infinite]" />
                    <div className="absolute top-32 right-[35%] w-1 h-1 rounded-full bg-violet-500/30 animate-[pulse_4s_ease-in-out_infinite_0.5s]" />
                    <div className="absolute bottom-10 right-[55%] w-1 h-1 rounded-full bg-amber-500/30 animate-[pulse_3.5s_ease-in-out_infinite_1s]" />

                    <div className="container-custom flex items-end justify-between gap-8">
                        <div className="max-w-2xl">
                            {/* Badge with live dot */}
                            <div className="flex items-center gap-3 mb-4">
                                <span className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-[0.25em] text-[#10b981] border border-[#10b981]/25 bg-[#10b981]/8 px-4 py-2 rounded-full">
                                    <img src="/images/logo-color.webp" alt="AK" className="w-5 h-5 object-contain" />
                                    Portfolio
                                </span>
                                {/* Dynamic active category indicator */}
                                <span className="flex items-center gap-1.5 font-body text-sm text-black/35">
                                    <span className="w-1.5 h-1.5 rounded-full transition-colors duration-500" style={{ background: currentItem?.accent }} />
                                    Menampilkan: <span className="text-black/60 font-medium">{currentItem?.label}</span>
                                </span>
                            </div>

                            {/* Title with shimmer */}
                            <h1 className="font-display text-4xl md:text-5xl font-black text-black leading-[1.15] tracking-tight">
                                Kompilasi Karya &{' '}
                                <span className="relative inline-block">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] via-emerald-400 to-[#10b981] bg-[length:200%_auto] animate-[shimmer_3s_ease-in-out_infinite]">
                                        Inovasi Digital.
                                    </span>
                                </span>
                            </h1>

                            <p className="font-body text-black/50 text-base mt-4 max-w-lg leading-relaxed">
                                Pilih kategori di samping untuk menjelajahi karya terbaik kami —
                                dari <span className="text-black/70 font-medium">website pemerintah</span> hingga <span className="text-black/70 font-medium">konten viral</span>.
                            </p>
                        </div>

                        {/* Stats — glassmorphic cards */}
                        <div className="hidden lg:flex items-stretch gap-3 flex-shrink-0">
                            {[
                                { num: `${GOV_PROJECTS.length + NON_GOV_PROJECTS.length + DESIGN_LOGO_ITEMS.length + DESIGN_GRAFIS_ITEMS.length + MEDIA_ITEMS.length + SOCIAL_IG_ITEMS.length + SOCIAL_YT_ITEMS.length}+`, label: 'Total Karya', color: '#10b981' },
                                { num: '4', label: 'Layanan', color: '#8b5cf6' },
                                { num: '100%', label: 'Custom Built', color: '#f59e0b' },
                            ].map((s, i) => (
                                <div key={i}
                                    className="group relative bg-white border border-black/8 rounded-2xl px-6 py-5 text-center hover:shadow-lg hover:border-black/15 transition-all duration-300 cursor-default min-w-[100px]">
                                    {/* Hover glow */}
                                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        style={{ background: `radial-gradient(circle at 50% 100%, ${s.color}10, transparent 70%)` }} />
                                    <div className="relative z-10">
                                        <div className="font-display text-3xl font-black transition-colors duration-300" style={{ color: s.color }}>{s.num}</div>
                                        <div className="font-body text-xs text-black/40 uppercase tracking-widest mt-1">{s.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Shimmer keyframe via inline style */}
                <style dangerouslySetInnerHTML={{
                    __html: `
                    @keyframes shimmer {
                        0%, 100% { background-position: 0% center; }
                        50% { background-position: 200% center; }
                    }
                `}} />

                {/* ── DISCLOSURE + CONTENT ── */}
                <div className="relative z-10 flex gap-8 min-h-[calc(100vh-240px)] pb-12 w-full">

                    {/* ══════════ LEFT PANEL: Nav + Disclosure ══════════ */}
                    <div className="w-[400px] xl:w-[440px] flex-shrink-0 relative z-10 pl-6 sm:pl-8 lg:pl-12">
                        <div className="sticky top-32 flex items-start gap-5 w-full pt-4">

                            {/* Nav arrows */}
                            <div className="hidden sm:flex flex-col gap-3 pt-2 flex-shrink-0">
                                <button onClick={onPrevious} disabled={isPrevDisabled}
                                    className={cn("w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300",
                                        isPrevDisabled ? "bg-black/5 text-black/15 cursor-not-allowed" : "bg-black/8 text-black/60 hover:bg-black/15"
                                    )}>
                                    <ChevronUpIcon />
                                </button>
                                <button onClick={onNext} disabled={isNextDisabled}
                                    className={cn("w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300",
                                        isNextDisabled ? "bg-black/5 text-black/15 cursor-not-allowed" : "bg-black/8 text-black/60 hover:bg-black/15"
                                    )}>
                                    <ChevronDownIcon />
                                </button>
                            </div>

                            {/* Disclosure buttons */}
                            <div className="flex-1 flex flex-col gap-y-3 min-w-0">
                                {SHOWCASE_ITEMS.map((item) => {
                                    const isExpanded = expandedId === item.id;
                                    return (
                                        <div key={item.id}>
                                            <button
                                                onClick={() => setExpandedId(item.id)}
                                                className={cn(
                                                    "w-full h-14 rounded-full flex items-center gap-3 px-5 text-left transition-all duration-400",
                                                    isExpanded ? "bg-white shadow-md border border-black/8" : "bg-white/60 border border-black/5 hover:bg-white hover:shadow-sm"
                                                )}
                                            >
                                                {isExpanded ? (
                                                    <span className="w-6 h-6 rounded-lg flex-shrink-0 shadow-sm"
                                                        style={{ backgroundColor: item.accent }} />
                                                ) : (
                                                    <PlusIcon className="text-black/30" />
                                                )}
                                                <span className="font-body text-lg text-black font-medium">{item.label}</span>
                                                <span className="ml-auto font-mono text-sm text-black/30 bg-black/5 px-2.5 py-0.5 rounded-full">{item.count}</span>
                                            </button>

                                            {/* Expanded description */}
                                            <div className={cn(
                                                "overflow-hidden transition-all duration-[420ms]",
                                                isExpanded ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
                                            )} style={{ transitionTimingFunction: isExpanded ? 'cubic-bezier(0.16, 1, 0.3, 1)' : 'cubic-bezier(0.87, 0, 0.13, 1)' }}>
                                                <div className="mt-3 rounded-2xl bg-white p-6 shadow-md border border-black/5">
                                                    <p className={cn(
                                                        "text-base font-light text-black/60 leading-relaxed transition-all",
                                                        isExpanded ? "translate-y-0 opacity-100" : "translate-y-[20px] opacity-0"
                                                    )} style={{
                                                        transition: isExpanded ? 'opacity 1200ms ease-out, transform 800ms cubic-bezier(0.18,0.89,0.32,1.27)' : 'none',
                                                    }}>
                                                        <strong className="font-semibold text-black">{item.label}</strong>.&nbsp;{item.description}
                                                    </p>

                                                    {/* Web sub-tabs inside disclosure */}
                                                    {item.id === 'web' && (
                                                        <div className="flex flex-wrap gap-2 mt-4 pb-2">
                                                            {[
                                                                { id: 'gov', label: '🏛️ Pemerintah', count: GOV_PROJECTS.length },
                                                                { id: 'private', label: '🏢 Bisnis', count: NON_GOV_PROJECTS.length },
                                                            ].map(st => (
                                                                <button key={st.id} onClick={(e) => { e.stopPropagation(); setWebSubTab(st.id); }}
                                                                    className={cn(
                                                                        'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold font-body transition-all whitespace-nowrap',
                                                                        webSubTab === st.id ? 'bg-black text-white' : 'bg-black/8 text-black/50 hover:bg-black/15'
                                                                    )}>
                                                                    {st.label}
                                                                    <span className={cn('text-xs px-2 py-0.5 rounded-full font-mono',
                                                                        webSubTab === st.id ? 'bg-white/20' : 'bg-black/10')}>{st.count}</span>
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}

                                                    {/* Design sub-tabs inside disclosure */}
                                                    {item.id === 'design' && (
                                                        <div className="flex flex-wrap gap-2 mt-4 pb-2">
                                                            {[
                                                                { id: 'logo', label: '🎨 Logo', count: DESIGN_LOGO_ITEMS.length },
                                                                { id: 'grafis', label: '✏️ Grafis Lainnya', count: DESIGN_GRAFIS_ITEMS.length },
                                                            ].map(st => (
                                                                <button key={st.id} onClick={(e) => { e.stopPropagation(); setDesignSubTab(st.id); }}
                                                                    className={cn(
                                                                        'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold font-body transition-all whitespace-nowrap',
                                                                        designSubTab === st.id ? 'bg-black text-white' : 'bg-black/8 text-black/50 hover:bg-black/15'
                                                                    )}>
                                                                    {st.label}
                                                                    <span className={cn('text-xs px-2 py-0.5 rounded-full font-mono',
                                                                        designSubTab === st.id ? 'bg-white/20' : 'bg-black/10')}>{st.count}</span>
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}

                                                    {/* Social sub-tabs inside disclosure */}
                                                    {item.id === 'social' && (
                                                        <div className="flex flex-wrap gap-2 mt-4 pb-2">
                                                            {[
                                                                { id: 'ig', label: '📸 Instagram', count: SOCIAL_IG_ITEMS.length },
                                                                { id: 'yt', label: '▶️ Youtube', count: SOCIAL_YT_ITEMS.length },
                                                            ].map(st => (
                                                                <button key={st.id} onClick={(e) => { e.stopPropagation(); setSocialSubTab(st.id); }}
                                                                    className={cn(
                                                                        'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold font-body transition-all whitespace-nowrap',
                                                                        socialSubTab === st.id ? 'bg-black text-white' : 'bg-black/8 text-black/50 hover:bg-black/15'
                                                                    )}>
                                                                    {st.label}
                                                                    <span className={cn('text-xs px-2 py-0.5 rounded-full font-mono',
                                                                        socialSubTab === st.id ? 'bg-white/20' : 'bg-black/10')}>{st.count}</span>
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* No divider needed - gap-8 handles spacing beautifully */}

                    {/* ══════════ RIGHT PANEL: Content Grid ══════════ */}
                    <div className="flex-1 flex flex-col min-w-0 overflow-hidden pr-6 sm:pr-8 lg:pr-12">

                        {/* Header */}
                        <div className="flex flex-col gap-3 mb-8 flex-shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-7 rounded-full transition-colors duration-500" style={{ background: currentItem?.accent }} />
                                <h2 className="font-display text-2xl font-bold text-black">{currentItem?.label}</h2>
                                <span className="font-mono text-sm text-black/30 bg-black/5 px-3 py-1 rounded-full">{currentItem?.count} karya</span>
                            </div>
                            {/* Gov level filters — only show for web + gov */}
                            {expandedId === 'web' && webSubTab === 'gov' && (
                                <div className="flex gap-2 flex-wrap">
                                    {GOV_FILTERS.map(f => (
                                        <button key={f.id} onClick={() => setGovFilter(f.id)}
                                            className={cn(
                                                'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold font-body border transition-all',
                                                govFilter === f.id ? 'bg-black/10 text-black border-black/15' : 'border-black/8 text-black/40 hover:text-black/60 hover:border-black/15'
                                            )}>
                                            {f.dot && <span className={cn('w-2 h-2 rounded-full', f.dot)} />}
                                            {f.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Grid */}
                        <div className="flex-1 pb-20 overflow-x-hidden">
                            {expandedId === 'web' ? (
                                <div className="grid grid-cols-2 xl:grid-cols-3 gap-6">
                                    {(webSubTab === 'gov' ? filteredGov : NON_GOV_PROJECTS).map((p) => (
                                        <ProjectCard key={p.id} project={p}
                                            isGov={webSubTab === 'gov'}
                                            onOpen={proj => setModal({ project: proj, isGov: webSubTab === 'gov' })}
                                        />
                                    ))}
                                    {webSubTab === 'gov' && filteredGov.length === 0 && (
                                        <div className="col-span-full py-16 text-center text-black/30 font-body text-base">
                                            Belum ada proyek di kategori ini.
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className={cn("grid gap-4 sm:gap-6",
                                    expandedId === 'social' && socialSubTab === 'ig'
                                        ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5" // Portrait grid
                                        : expandedId === 'design' && designSubTab === 'logo'
                                            ? "grid-cols-2 md:grid-cols-4 xl:grid-cols-5" // Logo grid (more columns)
                                            : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" // Landscape grid
                                )}>
                                    {(expandedId === 'design' ? (designSubTab === 'logo' ? DESIGN_LOGO_ITEMS : DESIGN_GRAFIS_ITEMS) :
                                        expandedId === 'media' ? MEDIA_ITEMS :
                                            (socialSubTab === 'ig' ? SOCIAL_IG_ITEMS : SOCIAL_YT_ITEMS)
                                    ).map((item, i) => (
                                        <ImageCard
                                            key={item.id ?? item.title ?? i}
                                            item={item}
                                            accent={currentItem?.accent}
                                            onOpen={expandedId === 'media' ? setMediaModal : undefined}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            {/* ── CTA ── */}
            <section className="section-padding bg-white border-t border-black/5">
                <div className="container-custom text-center">
                    <h2 className="font-display text-4xl md:text-5xl font-black text-black mb-6">
                        Karya Berikutnya{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-emerald-400">
                            Milik Anda?
                        </span>
                    </h2>
                    <p className="font-body text-black/50 mb-8 max-w-md mx-auto text-lg">
                        Punya proyek impian? Mari wujudkan bersama tim kreatif kami.
                    </p>
                    <Link href="/contact"
                        className="inline-flex items-center gap-2 bg-[#10b981] text-white font-body font-bold px-8 py-4 rounded-full hover:gap-4 transition-all duration-300 shadow-lg shadow-[#10b981]/25 text-lg">
                        Mulai Diskusi Proyek
                        <IconArrow />
                    </Link>
                </div>
            </section>
        </MainLayout>
    );
}
