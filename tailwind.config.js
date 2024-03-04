import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: ['class'],
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: ['dark'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(240 3.7 15.9 / <alpha-value>)',
				input: 'hsl(240 3.7 15.9 / <alpha-value>)',
				ring: 'hsl(240 3.7 15.9 / <alpha-value>)',
				background: 'hsl(240 10 3.9 / <alpha-value>)',
				foreground: 'hsl(0 0 98 / <alpha-value>)',
				primary: {
					DEFAULT: 'hsl(0 0 98 / <alpha-value>)',
					foreground: 'hsl(240 5.9 10 / <alpha-value>)'
				},
				secondary: {
					DEFAULT: 'hsl(60 100 82 / <alpha-value>)',
					foreground: 'hsl(0 0 100 / <alpha-value>)'
				},
				destructive: {
					DEFAULT: 'hsl(0 72 51 / <alpha-value>)',
					foreground: 'hsl(0 0 100 / <alpha-value>)'
				},
				muted: {
					DEFAULT: 'hsl(240 3.7 15.9 / <alpha-value>)',
					foreground: 'hsl(240 5 64.9 / <alpha-value>)'
				},
				accent: {
					DEFAULT: 'hsl(240 3.7 15.9 / <alpha-value>)',
					foreground: 'hsl(0 0 98 / <alpha-value>)'
				},
				popover: {
					DEFAULT: 'hsl(240 10 3.9 / <alpha-value>)',
					foreground: 'hsl(0 0 98 / <alpha-value>)'
				},
				card: {
					DEFAULT: 'hsl(240 10 3.9 / <alpha-value>)',
					foreground: 'hsl(0 0 98 / <alpha-value>)'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: [...fontFamily.sans]
			}
		}
	}
};

export default config;
