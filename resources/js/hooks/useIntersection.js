import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for Intersection Observer — scroll reveal animations.
 * Usage: const [ref, isVisible] = useIntersection();
 */
export function useIntersection(options = {}) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15, ...options }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return [ref, isVisible];
}
