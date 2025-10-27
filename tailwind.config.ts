import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			base: {
  				'100': 'oklch(98% 0.002 247.839)',
  				'200': 'oklch(96% 0.003 264.542)',
  				'300': 'oklch(92% 0.006 264.531)',
  				content: 'oklch(21% 0.034 264.665)'
  			},
  			primary: {
  				DEFAULT: 'oklch(74% 0.16 232.661)',
  				content: 'oklch(29% 0.066 243.157)',
  				foreground: 'oklch(29% 0.066 243.157)'
  			},
  			secondary: {
  				DEFAULT: 'oklch(70% 0.04 256.788)',
  				content: 'oklch(12% 0.042 264.695)',
  				foreground: 'oklch(12% 0.042 264.695)'
  			},
  			accent: {
  				DEFAULT: 'oklch(0% 0 0)',
  				content: 'oklch(100% 0 0)',
  				foreground: 'oklch(100% 0 0)'
  			},
  			neutral: {
  				DEFAULT: 'oklch(37% 0.034 259.733)',
  				content: 'oklch(98% 0.002 247.839)'
  			},
  			info: {
  				DEFAULT: 'oklch(71% 0.143 215.221)',
  				content: 'oklch(98% 0.019 200.873)'
  			},
  			success: {
  				DEFAULT: 'oklch(69% 0.17 162.48)',
  				content: 'oklch(97% 0.021 166.113)'
  			},
  			warning: {
  				DEFAULT: 'oklch(76% 0.188 70.08)',
  				content: 'oklch(98% 0.022 95.277)'
  			},
  			error: {
  				DEFAULT: 'oklch(65% 0.241 354.308)',
  				content: 'oklch(97% 0.014 343.198)'
  			},
  			background: 'oklch(98% 0.002 247.839)',
  			foreground: 'oklch(21% 0.034 264.665)',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: '0rem',
  			md: '0rem',
  			sm: '0rem'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
