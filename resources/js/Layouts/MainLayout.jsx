import Navbar from '@/Components/Layout/Navbar';
import Footer from '@/Components/Layout/Footer';
import { usePage } from '@inertiajs/react';
import FloatingDockDemo from '@/Components/FloatingDockDemo';

export default function MainLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-background font-body text-text-primary selection:bg-secondary selection:text-white">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            <FloatingDockDemo />
            <Footer />
        </div>
    );
}
