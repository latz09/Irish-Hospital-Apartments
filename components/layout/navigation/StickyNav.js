'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import MobileNavbar from './MobileNavbar';
import DesktopNavbar from './DesktopNavbar';

const StickyNav = ({ navLinks, logoUrl }) => {
	const [hidden, setHidden] = useState(false);
	const [isAtTop, setIsAtTop] = useState(true);
	const threshold = useRef(0);
	const { scrollY } = useScroll();

	useEffect(() => {
		const setThreshold = () => {
			threshold.current = window.innerHeight * 0.75;
		};
		setThreshold();
		window.addEventListener('resize', setThreshold);

		// Covers page loads mid-scroll (anchor links, refresh) so bg isn't wrong on mount.
		setIsAtTop(window.scrollY <= 0);

		return () => window.removeEventListener('resize', setThreshold);
	}, []);

	useMotionValueEvent(scrollY, 'change', (latest) => {
		const previous = scrollY.getPrevious();
		setIsAtTop(latest <= 0);

		if (latest < threshold.current) {
			setHidden(false);
			return;
		}
		setHidden(latest > previous);
	});

	// bg-primary/0 at the top or while the nav is hidden off-screen.
	// bg-primary/50 once it's visible again and you're away from the top.
	const navBg = !isAtTop && !hidden ? 'bg-primary/75' : 'bg-primary/50';

	return (
		<motion.nav
			className='fixed top-0 left-0 w-full z-50 flex items-center h-[var(--nav-h)] '
			animate={hidden ? 'hidden' : 'visible'}
			variants={{ visible: { y: 0 }, hidden: { y: '-100%' } }}
			transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
		>
			<MobileNavbar navLinks={navLinks} logoUrl={logoUrl} navBg={navBg} />
			<DesktopNavbar navLinks={navLinks} logoUrl={logoUrl} navBg={navBg} />
		</motion.nav>
	);
};

export default StickyNav;