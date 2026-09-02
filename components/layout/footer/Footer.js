import Logo from '../../lib/Logo';
import { fetchContent as fc } from '@/utils/cms/fetchContent';
import { FETCH_SEO_SETTINGS_QUERY as Q } from '@/data/queries/seo/FETCH_SEO_SETTINGS_QUERY';
import FooterBottomBar from './FooterBottomBar';
import Section from '@/components/layout/Section';
import FooterMark from '@/components/ui/FooterMark';

const Footer = async ({ businessName }) => {
	const seo = await fc(Q);
	const { phone, email, address } = seo ? seo : {};

	return (
		<footer>
			<Section
				as='div'
				py='py-5'
				bg='bg-primary'
				className='flex flex-col items-center gap-1 text-center text-light md:flex-row md:justify-between md:gap-3 lg:gap-5'
			>
				<div className='hidden w-[6rem] shrink-0 md:block lg:w-[7.5rem] 3xl:w-[10rem]'>
					<FooterMark />
				</div>

				<div className='flex flex-col items-center gap-1'>
					<Logo className='w-10 3xl:w-[15rem]' />

					<div className='space-y-1'>
						{phone && (
							<p>
								<a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className='hover:opacity-80'>
									{phone}
								</a>
							</p>
						)}
						{email && (
							<p>
								<a href={`mailto:${email}`} className='hover:opacity-80'>
									{email}
								</a>
							</p>
						)}
						{address?.street && (
							<p>
								{address.street}
								<br />
								{address.city}, {address.state} {address.zip}
							</p>
						)}
					</div>
				</div>

				<div className='hidden w-[6rem] shrink-0 md:block lg:w-[7.5rem] 3xl:w-[10rem]'>
					<FooterMark />
				</div>
			</Section>

			<FooterBottomBar businessName={businessName} />
		</footer>
	);
};

export default Footer;
export const revalidate = 10;