'use client';

import Link from 'next/link';
import clsx from 'clsx';
import { track } from '@vercel/analytics';
import { useEffect, useRef } from 'react';

function ArrowGrow() {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='1.3em'
			height='1em'
			viewBox='-8 0 24 12'
			fill='none'
			style={{ overflow: 'visible' }}
		>
			<line
				x1='15'
				y1='5.85449'
				x2='0'
				y2='5.85449'
				stroke='currentColor'
				strokeWidth='2'
				className='transition-transform duration-300 group-hover:[transform:scaleX(1.6)]'
				style={{ transformOrigin: '15px 5.85px' }}
			/>
			<path
				d='M9.46881 0.354492L15 5.85449M15 5.85449L9.46881 11.3545'
				stroke='currentColor'
				strokeWidth='2'
			/>
		</svg>
	);
}

const VARIANTS = {
	// PRIMARY
	'primary-on-light': 'bg-primary text-light border border-dark hover:bg-light hover:text-dark',
	'primary-on-dark': 'bg-secondary text-primary border border-secondary hover:bg-primary hover:text-secondary',
	// SECONDARY
	'secondary-on-light': 'bg-light text-primary border border-dark t hover:text-accent hover:border-accent',
	'secondary-on-dark': 'bg-primary/0 text-secondary border border-secondary hover:border-light hover:text-light',
	// TERTIARY (group + gap added so the arrow can react to hover and sit off the label)
	'tertiary-on-light': 'group gap-0.5 text-primary hover:text-accent',
	'tertiary-on-dark': 'group gap-0.5 text-secondary hover:text-light',
};

// Which variants get the growing-line arrow
const ARROW_VARIANTS = new Set(['tertiary-on-light', 'tertiary-on-dark']);

/**
 * Reusable button link component.
 * @param {string} href - The destination link.
 * @param {string} variant - One of: 'primary-on-light', 'primary-on-dark', 'secondary-on-light', 'secondary-on-dark', 'tertiary-on-light', 'tertiary-on-dark'.
 * @param {boolean} external - Whether to use target="_blank".
 * @param {string} className - Additional classes.
 * @param {string} event - Optional event name for Vercel Analytics tracking (automatically prefixed with "CTA Click - ").
 * @param {ReactNode} children - The button label.
 */

export default function ButtonLink({
	href = '/',
	variant = 'primary-light',
	external = false,
	className = '',
	event, // Pass short name like "Hero - Free Consultation", component adds "CTA Click - " prefix
	children,
	...props
}) {
	// Track when component mounts (page load time)
	const pageLoadTime = useRef(null);
	useEffect(() => {
		pageLoadTime.current = Date.now();
	}, []);

	const baseStyles =
	'text-button inline-flex items-center justify-center rounded transition-all duration-300 px-1.25 py-[0.62rem] px-1';

	const combined = clsx(baseStyles, VARIANTS[variant], className);
	const showArrow = ARROW_VARIANTS.has(variant);

	// Track button clicks in Vercel Analytics when event is provided
	// Automatically prefixes event with "CTA Click - " for consistent naming
	// Example: event="Hero - Free Consultation" → tracks as "CTA Click - Hero - Free Consultation"
	const handleClick = () => {
		if (event) {
			// Calculate time on page before click (in seconds)
			const timeOnPage = pageLoadTime.current
				? Math.round((Date.now() - pageLoadTime.current) / 1000)
				: 0;

			track(`CTA Click - ${event}`, {
				destination: href, // Where the button goes
				buttonText: typeof children === 'string' ? children : 'button', // Button label
				timeOnPage: `${timeOnPage}s`, // How long before they clicked
			});
		}
	};

	const content = showArrow ? (
		<>
			<span>{children}</span>
			<ArrowGrow />
		</>
	) : (
		children
	);

if (external) {
	return (
		<a
			href={href}
			className={combined}
			target='_blank'
			rel='noopener noreferrer'
			onClick={handleClick}
			{...props}
		>
			{content}
			<span className='sr-only'> (opens in new tab)</span>
		</a>
	);
}

	return (
		<Link href={href} onClick={handleClick} className={combined} {...props}>
			{' '}
			{/* Triggers analytics tracking on click */}
			{content}
		</Link>
	);
}