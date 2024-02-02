import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'yellow-primary': '#FDB813',
                PRIMARY: {
                    50: '#FEF9E7',
                    100: '#FEF3C4',
                    200: '#FDEA99',
                    300: '#FDD66B',
                    400: '#FDC03C',
                    500: '#FDB813',
                    600: '#F9AE0C',
                    700: '#E3890B',
                    800: '#B36609',
                    900: '#804F07',
                },
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [],
}
export default config
