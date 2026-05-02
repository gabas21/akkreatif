import { Head } from '@inertiajs/react';

const SITE_URL = 'https://akkreatif.my.id';
const SITE_NAME = 'AK Kreatif';
const SITE_LOGO = `${SITE_URL}/images/brand/logo-ak.png`;
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/unsplash/1542744173-8e7e53415bb0.webp`;

/**
 * SEOHead — Centralized SEO component for every page.
 * Handles: title, meta description, canonical, Open Graph,
 * Twitter Cards, and JSON-LD structured data (GEO-ready).
 */
export default function SEOHead({
    title,
    description,
    canonical,
    ogImage = DEFAULT_OG_IMAGE,
    ogType = 'website',
    jsonLd = null,
}) {
    const fullTitle = title
        ? `${title} | AK Kreatif — Agensi Digital Kalimantan`
        : 'AK Kreatif — Agensi Digital & Kreatif Kalimantan Timur';

    const fullCanonical = canonical ? `${SITE_URL}${canonical}` : SITE_URL;

    // Default JSON-LD: LocalBusiness (base for all pages)
    const defaultJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        '@id': `${SITE_URL}/#organization`,
        name: SITE_NAME,
        alternateName: 'AK Kreatif Digital Agency',
        description: 'Agensi digital dan kreatif yang melayani pembuatan website, desain grafis, manajemen media sosial, foto & video event, dan konsultasi usaha makanan di Kalimantan Timur.',
        url: SITE_URL,
        logo: SITE_LOGO,
        image: DEFAULT_OG_IMAGE,
        telephone: '+6285224302550',
        email: 'hello@akkreatif.com',
        foundingDate: '2020',
        areaServed: [
            { '@type': 'State', name: 'Kalimantan Timur' },
            { '@type': 'City', name: 'Samarinda' },
            { '@type': 'AdministrativeArea', name: 'Mahakam Ulu' },
        ],
        address: {
            '@type': 'PostalAddress',
            addressRegion: 'Kalimantan Timur',
            addressCountry: 'ID',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: -0.5022,
            longitude: 117.1536,
        },
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+6285224302550',
            contactType: 'customer service',
            availableLanguage: ['Indonesian'],
        },
        sameAs: [
            'https://www.instagram.com/ak_kreatif',
        ],
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Layanan AK Kreatif',
            itemListElement: [
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pembuatan Website & Aplikasi' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Desain Grafis & Branding' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Manajemen Media Sosial' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Foto & Video Event' } },
                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Konsultasi Usaha Makanan & F&B' } },
            ],
        },
    };

    const structuredData = jsonLd ?? defaultJsonLd;

    return (
        <Head>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content="agensi digital kalimantan, jasa website samarinda, desain grafis kalimantan timur, social media management, foto video event, AK Kreatif, digital agency kaltim" />
            <meta name="author" content="AK Kreatif" />
            <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
            <link rel="canonical" href={fullCanonical} />

            {/* === OPEN GRAPH (Facebook, WhatsApp, LinkedIn) === */}
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={fullCanonical} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:locale" content="id_ID" />

            {/* === TWITTER CARD === */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            {/* === GEO TAGS (Geo Search Engines) === */}
            <meta name="geo.region" content="ID-KI" />
            <meta name="geo.placename" content="Kalimantan Timur, Indonesia" />
            <meta name="geo.position" content="-0.5022;117.1536" />
            <meta name="ICBM" content="-0.5022, 117.1536" />

            {/* === JSON-LD STRUCTURED DATA === */}
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>
        </Head>
    );
}
