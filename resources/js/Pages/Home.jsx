import MainLayout from '@/Layouts/MainLayout';
import ScrollPinSections from '@/Components/ui/ScrollPinSections';
import SEOHead from '@/Components/SEOHead';

// Sections
import HeroSection from '@/Components/Sections/Home/HeroSection';
import PenjelasanSection from '@/Components/Sections/Home/PenjelasanSection';
import MengapaSection from '@/Components/Sections/Home/MengapaSection';
import LayananSection from '@/Components/Sections/LayananSection';
import SistemKerjaSection from '@/Components/Sections/Home/SistemKerjaSection';

import PortfolioPreview from '@/Components/Sections/Home/PortfolioPreview';
import ClientsSection from '@/Components/Sections/Home/ClientsSection';
import TestimonialSection from '@/Components/Sections/Home/TestimonialSection';
import SocialMediaSection from '@/Components/Sections/Home/SocialMediaSection';
import CtaSection from '@/Components/Sections/Home/CtaSection';

export default function Home() {
    return (
        <MainLayout>
            <SEOHead
                title="Beranda"
                description="AK Kreatif adalah agensi digital dan kreatif di Kalimantan Timur. Kami melayani pembuatan website profesional, desain grafis, manajemen media sosial, foto & video event, dan branding usaha makanan."
                canonical="/"
                jsonLd={{
                    '@context': 'https://schema.org',
                    '@graph': [
                        {
                            '@type': 'WebSite',
                            '@id': 'https://akkreatif.my.id/#website',
                            url: 'https://akkreatif.my.id',
                            name: 'AK Kreatif',
                            description: 'Agensi Digital & Kreatif Kalimantan Timur',
                            inLanguage: 'id-ID',
                            potentialAction: {
                                '@type': 'SearchAction',
                                target: { '@type': 'EntryPoint', urlTemplate: 'https://akkreatif.my.id/?s={search_term_string}' },
                                'query-input': 'required name=search_term_string',
                            },
                        },
                        {
                            '@type': 'LocalBusiness',
                            '@id': 'https://akkreatif.my.id/#organization',
                            name: 'AK Kreatif',
                            description: 'Agensi digital dan kreatif yang melayani pembuatan website, desain grafis, manajemen media sosial, foto & video event di Kalimantan Timur.',
                            url: 'https://akkreatif.my.id',
                            telephone: '+6285224302550',
                            email: 'hello@akkreatif.com',
                            areaServed: ['Kalimantan Timur', 'Samarinda', 'Mahakam Ulu'],
                            address: { '@type': 'PostalAddress', addressRegion: 'Kalimantan Timur', addressCountry: 'ID' },
                            geo: { '@type': 'GeoCoordinates', latitude: -0.5022, longitude: 117.1536 },
                            sameAs: ['https://www.instagram.com/ak_kreatif'],
                        },
                    ],
                }}
            />


            {/* 1. Hero */}
            <ScrollPinSections>
                <div className="bg-surface">
                    <HeroSection />
                </div>
                {/* 2. Penjelasan — siapa kami */}
                <PenjelasanSection />
            </ScrollPinSections>

            {/* 3. Mengapa — alasan memilih AK Kreatif */}
            <div className="relative z-10">
                <MengapaSection />
            </div>

            {/* 4. Layanan — bento grid 5 layanan */}
            <div className="relative z-10">
                <LayananSection />
            </div>

            {/* 5. Sistem Kerja — step-by-step workflow */}
            <div className="relative z-10">
                <SistemKerjaSection />
            </div>

            {/* 6. Portfolio Preview — standalone (tidak perlu scroll-pin) */}
            <div className="relative z-10">
                <PortfolioPreview />
            </div>

            {/* 7–8. Klien & Testimonial — scroll pin group */}
            <ScrollPinSections>
                <ClientsSection />
                <TestimonialSection />
            </ScrollPinSections>

            {/* 9–10. Social & CTA */}
            <div className="relative z-10">
                <SocialMediaSection />
                <CtaSection />
            </div>

        </MainLayout>
    );
}

