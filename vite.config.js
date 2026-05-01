import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    build: {
        // Warn if a chunk exceeds 500KB
        chunkSizeWarningLimit: 500,
        rollupOptions: {
            // Exclude test files from production bundle
            external: (id) => id.includes('.test.') || id.includes('.spec.'),
            output: {
                // Manual code splitting for better caching
                manualChunks: {
                    // Core React runtime — rarely changes
                    'vendor-react': ['react', 'react-dom'],
                    // Animation libraries — separate chunk
                    'vendor-motion': ['framer-motion'],
                    // GSAP — separate chunk (used in ScrollPinSections)
                    'vendor-gsap': ['gsap'],
                    // Icon libraries — large, separate chunk
                    'vendor-icons': ['@tabler/icons-react', 'lucide-react'],
                },
            },
        },
        // Minify with esbuild (faster than terser, built into Vite)
        minify: 'esbuild',
    },
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './tests/setup.js',
    },
});
