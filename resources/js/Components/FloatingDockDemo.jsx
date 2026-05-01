import React from "react";
import { FloatingDock } from "@/Components/ui/floating-dock";
import {
  IconHome,
  IconInfoCircle,
  IconBriefcase,
  IconPhoto,
  IconPhoneCall,
} from "@tabler/icons-react";

export default function FloatingDockDemo() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },
    {
      title: "About",
      icon: (
        <IconInfoCircle className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/about",
      subItems: [
        { name: 'Visi & Misi', href: '/about/visi-misi' },
        { name: 'Struktur & Tim Kami', href: '/about/struktur-tim' },
        { name: 'Legalitas & Sertifikasi', href: '/about/legalitas' }
      ]
    },
    {
      title: "Services",
      icon: (
        <IconBriefcase className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/services",
      subItems: [
        { name: 'Web & Application', href: '/services/web-application' },
        { name: 'Desain Grafis', href: '/services/desain-grafis' },
        { name: 'Social Media Management', href: '/services/social-media' },
        { name: 'Foto, Video & Event', href: '/services/foto-video-event' },
        { name: 'Usaha Makanan', href: '/services/usaha-makanan' }
      ]
    },
    {
      title: "Portfolio",
      icon: (
        <IconPhoto className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/portfolio",
    },
    {
      title: "Contact",
      icon: (
        <IconPhoneCall className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/contact",
    },
  ];

  return (
    <div className="fixed bottom-4 right-4 md:right-auto md:bottom-8 md:left-1/2 md:-translate-x-1/2 z-50">
      <FloatingDock items={links} />
    </div>
  );
}
