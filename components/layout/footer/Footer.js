import Logo from '../../lib/Logo';
import Link from 'next/link';
import { getNavLinks } from '@/data/config/getNavLinks';
import FooterBottomBar from './FooterBottomBar';
import Section from '@/components/layout/Section';

const Footer = async ({ businessName }) => {
	const navLinks = await getNavLinks();

	return (
		<footer>
			<Section as='div' py='pt-12 pb-2' bg='' className='flex flex-col md:flex-row  items-center gap-2 md:gap-0  md:items-end justify-between'>
				<Logo className='w-10'  />

				<nav className='flex flex-wrap items-center justify-center gap-2'>
					{navLinks.map((link, index) => (
						<Link key={index} href={link.url} className='text-overline'>
							{link.label}
						</Link>
					))}
				</nav>
			</Section>

			<FooterBottomBar businessName={businessName} />
		</footer>
	);
};

export default Footer;
export const revalidate = 10;