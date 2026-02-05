/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // Enable class-based dark mode
    theme: {
        extend: {
            colors: {
                bg: 'var(--bg)',
                surface: 'var(--surface)',
                text: 'var(--text)',
                'text-muted': 'var(--text-muted)',
                border: 'var(--border)',
                'pill-bg': 'var(--pill-bg)',
                'btn-border': 'var(--btn-border)',
                highlight: 'var(--highlight)',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            screens: {
                'xs': '480px',
            },
            keyframes: {
                marquee: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            },
            animation: {
                marquee: 'marquee 25s linear infinite',
                fadeInUp: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }
        },
    },
    plugins: [],
}
