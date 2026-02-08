/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            screens: {
                'tablet': '641px',
                'desktop': '1025px',
            },
            colors: {
                primary: {
                    DEFAULT: '#8BC34A', // Fresh Green
                    600: '#6FBF4A',     // Apple Green
                },
                secondary: {
                    DEFAULT: '#F9A825', // Juice Orange
                    red: '#D84315',     // Citrus Red
                },
                neutral: {
                    900: '#1F2933',     // Dark Text
                    500: '#6B7280',     // Gray Text
                    50: '#F9FAFB',      // Light Gray Background
                }
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'], // Assuming Inter or system defaults for now
            }
        },
    },
    plugins: [],
}
