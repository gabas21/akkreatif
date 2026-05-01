import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollPinSections
 *
 * Each section pins when its bottom reaches the bottom of the viewport,
 * so tall sections scroll fully first before pinning. The next section
 * then slides up over the pinned one.
 */
export default function ScrollPinSections({ children }) {
    const wrapperRef = useRef(null);

    useEffect(() => {
        let scrollTriggers = [];

        const setupTriggers = () => {
            // Kill semua trigger lama sebelum setup ulang
            scrollTriggers.forEach(st => st?.kill());
            scrollTriggers = [];

            const wrapper = wrapperRef.current;
            if (!wrapper) return;

            const panels = Array.from(wrapper.querySelectorAll(':scope > .pin-section'));

            panels.forEach((panel, i) => {
                if (i === panels.length - 1) return; // skip panel terakhir

                const panelHeight = panel.offsetHeight;
                const vh = window.innerHeight;
                const isTall = panelHeight > vh;

                const st = ScrollTrigger.create({
                    trigger: panel,
                    start: isTall ? 'bottom bottom' : 'top top',
                    pin: true,
                    pinSpacing: false,
                    endTrigger: panels[i + 1],
                    end: 'top top',
                });

                scrollTriggers.push(st);
            });

            ScrollTrigger.refresh();
        };

        // Delay 400ms: beri waktu layout (font, iframe YouTube) stabil dulu
        const initTimer = setTimeout(setupTriggers, 400);

        let refreshTimer = null;

        // Refresh setelah semua aset window selesai dimuat
        const onWindowLoad = () => {
            clearTimeout(refreshTimer);
            refreshTimer = setTimeout(() => {
                ScrollTrigger.refresh();
            }, 300);
        };
        window.addEventListener('load', onWindowLoad);

        // Refresh saat resize agar posisi pin tetap akurat
        const onResize = () => {
            clearTimeout(refreshTimer);
            refreshTimer = setTimeout(() => {
                ScrollTrigger.refresh();
            }, 300);
        };
        window.addEventListener('resize', onResize);

        return () => {
            clearTimeout(initTimer);
            clearTimeout(refreshTimer);
            window.removeEventListener('load', onWindowLoad);
            window.removeEventListener('resize', onResize);
            scrollTriggers.forEach(st => st?.kill());
        };
    }, []);

    return (
        <div ref={wrapperRef} className="scroll-pin-wrapper">
            {React.Children.map(children, (child, index) => (
                <div
                    key={index}
                    className="pin-section relative w-full overflow-hidden"
                >
                    {child}
                </div>
            ))}
        </div>
    );
}
