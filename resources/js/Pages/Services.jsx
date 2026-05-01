import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function Services() {
    const services = [
        { title: 'Website & Application', desc: 'Sistem komprehensif, cepat & scalable. Dari landing page hingga aplikasi enterprise dengan teknologi modern React & Laravel.', href: '/services/web-application' },
        { title: 'Desain Grafis', desc: 'Membangun identitas visual yang ikonik: logo, aset brand, dan materi pemasaran yang memukau.', href: '/services/desain-grafis' },
        { title: 'Social Media Management', desc: 'Strategi konten, pengelolaan akun, dan pertumbuhan organik yang konsisten di semua platform digital.', href: '/services/social-media' },
        { title: 'Foto, Video & Event', desc: 'Mengabadikan momen berharga dalam foto & video sinematik berkualitas tinggi, serta manajemen event end-to-end.', href: '/services/foto-video-event' },
        { title: 'Usaha Makanan', desc: 'Manajemen komprehensif, branding, desain kemasan, dan pemasaran kreatif khusus untuk memajukan bisnis kuliner F&B Anda.', href: '/services/usaha-makanan' }
    ];

    return (
        <MainLayout>
            <Head title="Services" />
            <div className="section-padding container-custom pt-32">
                <div className="text-center mb-16">
                    <span className="font-['Space_Grotesk'] text-xs font-bold uppercase tracking-[0.2em] text-[#10b981]">Layanan Kami</span>
                    <div className="w-8 h-px bg-[#10b981] mx-auto my-3"></div>
                    <h2 className="font-['Space_Grotesk'] text-3xl md:text-5xl font-bold text-black mt-4">Solusi Tepat, Inovasi Cepat.</h2>
                    <p className="font-['Plus_Jakarta_Sans'] text-black/70 mt-4 max-w-2xl mx-auto">Setiap layanan kami dirancang khusus untuk mematahkan hambatan spesifik di instansi/bisnis Anda.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, i) => (
                        <Link href={service.href} key={i} className="group bg-white border border-black/10 hover:border-[#10b981] p-8 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                            <div>
                                <h3 className="font-['Space_Grotesk'] text-2xl font-bold mb-4 text-black group-hover:text-[#10b981] transition-colors">{service.title}</h3>
                                <p className="font-['Plus_Jakarta_Sans'] text-black/70 text-base leading-relaxed mb-6">{service.desc}</p>
                            </div>
                            <div className="flex items-center text-[#10b981] font-bold text-sm uppercase tracking-wider gap-2 group-hover:gap-4 transition-all">
                                Selengkapnya
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}
