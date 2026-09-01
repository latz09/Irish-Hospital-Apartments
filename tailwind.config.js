const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		// ── Client palette (style guide → starter slots) ──────────────────
		// NOTE: hexes read off screenshots — double-check these against the
		// original guide file before shipping.
		colors: {
			primary: '#132E41', // Classic Navy — primary brand color (also darkest neutral)
			secondary: '#EABC66', // Gold
			accent: '#A94F47', // Burnt Umber
			tertiary: '#D8DADA', // Cloud Gray
			dark: '#132E41', // Classic Navy (same as primary — brand's primary IS the dark neutral)
			light: '#F6F3ED', // White (cream/off-white background)
			transparent: 'transparent',
			current: 'currentColor',
			white: '#ffffff',
			black: '#000000',
		},

		// ── Fonts ─────────────────────────────────────────────────────────
		// Both vars set in layout.js via next/font.
		// heading = Jost (geometric SANS display face), default = Libre
		// Franklin (sans body). Both classify as sans, so both fall back to
		// fontFamily.sans.
		fontFamily: {
			default: ['var(--font-body)', ...fontFamily.sans], // Libre Franklin
			heading: ['var(--font-heading)', ...fontFamily.sans], // Jost
		},

		// Emptied out — this project's type sizes come from the clamp()-based
		// h1-h6 tags and .text-* classes in globals.css, not Tailwind's
		// default scale. Without this, text-lg/text-2xl/etc. would still be
		// usable and show up in autocomplete alongside the real classes.
		fontSize: {},

		spacing: {
			0: '0',
			0.25: '0.25rem',
			0.5: '0.5rem',
			0.75: '0.75rem',
			1: '1rem',
			1.25: '1.25rem',
			1.5: '1.5rem',
			1.75: '1.75rem',
			2: '2rem',
			2.25: '2.25rem',
			2.5: '2.5rem',
			2.75: '2.75rem',
			3: '3rem',
			3.25: '3.25rem',
			3.5: '3.5rem',
			3.75: '3.75rem',
			4: '4rem',
			4.25: '4.25rem',
			4.5: '4.5rem',
			4.75: '4.75rem',
			5: '5rem',
			5.25: '5.25rem',
			5.5: '5.5rem',
			5.75: '5.75rem',
			6: '6rem',
			6.25: '6.25rem',
			6.5: '6.5rem',
			6.75: '6.75rem',
			7: '7rem',
			7.25: '7.25rem',
			7.5: '7.5rem',
			7.75: '7.75rem',
			8: '8rem',
			8.25: '8.25rem',
			8.5: '8.5rem',
			8.75: '8.75rem',
			9: '9rem',
			9.25: '9.25rem',
			9.5: '9.5rem',
			9.75: '9.75rem',
			10: '10rem',
			10.25: '10.25rem',
			10.5: '10.5rem',
			10.75: '10.75rem',
			11: '11rem',
			11.25: '11.25rem',
			11.5: '11.5rem',
			11.75: '11.75rem',
			12: '12rem',
		},

		zIndex: {
			0: '0',
			10: '10',
			20: '20',
			30: '30',
			40: '40',
			50: '50',
			overlay: '9998',
			modal: '9999',
			auto: 'auto',
		},

		// ── Border radius ─────────────────────────────────────────────────
		// Guide had no corner-radius spec (no button image); using 0.25rem
		// per Jordan's call. Extra steps (sm/lg/2xl) dropped per house rule.
		borderRadius: {
			none: '0',
			DEFAULT: '0.25rem', // the standard roundness — `rounded`
			full: '9999px',
		},

		boxShadow: {
			none: 'none',
			soft: '0 1px 8px rgba(0, 0, 0, 0.08)',
			card: '0 4px 16px rgba(0, 0, 0, 0.1)',
			lifted: '0 8px 24px rgba(0, 0, 0, 0.12)',
		},

		extend: {
			screens: {
				'3xl': '1920px',
			},
			maxWidth: {
				'8xl': '1920px',
				container: '1440px',
			},
			transitionDuration: {
				DEFAULT: '300ms',
			},
		},
	},
	plugins: [],
};