import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            colors: {
                primary:        '#0A0A0A',
                secondary:      '#16A34A',
                accent:         '#15803D',
                'accent-light': '#22C55E',
                background:     '#F9FAF9',
                surface:        '#FFFFFF',
                'surface-dark': '#0D1F12',
                border:         '#E5E7EB',
                'border-dark':  '#1A2E1D',
                'text-primary': '#0A0A0A',
                'text-muted':   '#6B7280',
                'text-light':   '#F0FDF4',
                'text-green':   '#16A34A',
                brand: {
                    green: '#10b981',
                    black: '#121212',
                    white: '#f9fafb',
                },
            },
            fontFamily: {
                display: ['Outfit', ...defaultTheme.fontFamily.sans],
                body:    ['Inter', ...defaultTheme.fontFamily.sans],
                sans:    ['Inter', ...defaultTheme.fontFamily.sans],
            },
            animation: {
                'fade-up':  'fadeUp 0.6s ease-out forwards',
                'fade-in':  'fadeIn 0.5s ease-out forwards',
                'slide-in': 'slideIn 0.5s ease-out forwards',
            },
            keyframes: {
                fadeUp:  {
                    from: { opacity: '0', transform: 'translateY(24px)' },
                    to:   { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn:  {
                    from: { opacity: '0' },
                    to:   { opacity: '1' },
                },
                slideIn: {
                    from: { opacity: '0', transform: 'translateX(-24px)' },
                    to:   { opacity: '1', transform: 'translateX(0)' },
                },
            },
        },
    },

    plugins: [forms],
};
