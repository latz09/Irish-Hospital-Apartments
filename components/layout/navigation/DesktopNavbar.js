'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { track } from '@vercel/analytics';
import Logo from '@/components/lib/Logo';
import { DARK_NAV_ROUTES } from '@/data/config/navigation';

const DesktopNavbar = ({ navLinks, logoUrl, navBg = 'bg-primary/0' }) => {
	const pathname = usePathname();
	const isDark = DARK_NAV_ROUTES.includes(pathname);
	const mainLinks = navLinks.filter((link) => !link.isButton);
	const contactLink = navLinks.find((link) => link.isButton);

	const handleNavClick = (label, url) => {
		track(`CTA Click - Navbar - ${label}`, { destination: url, buttonText: label });
	};

	return (
		<div
			className={`hidden h-full lg:flex items-center  w-full transition-colors duration-500 ${navBg}`}
		>
			<div className='flex items-center w-full section-x-padding '>
				<Logo className='w-[12.12rem]' variant={isDark ? 'secondary' : 'secondary'} url={logoUrl} />
				<nav className='flex gap-2 items-center ml-auto'>
					{mainLinks.map((link, index) => (
						<Link
							key={index}
							href={link.url}
							onClick={() => handleNavClick(link.label, link.url)}
							className='block text-button text-light transition-all duration-200 cursor-pointer hover:underline hover:underline-offset-2'
						>
							{link.label}
						</Link>
					))}
					{contactLink && (
						<Link
							href={contactLink.url}
							onClick={() => handleNavClick(contactLink.label, contactLink.url)}
							className='block text-button text-primary bg-light hover:bg-primary hover:text-light transition-all duration-300 cursor-pointer  px-1 py-[0.62rem] rounded  k'
						>
							{contactLink.label}
						</Link>
					)}
				</nav>
			</div>
		</div>
	);
};

export default DesktopNavbar;