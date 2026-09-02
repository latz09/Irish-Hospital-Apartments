import Link from 'next/link';
import Section from '@/components/layout/Section';

const currentYear = new Date().getFullYear();

// Always-included legal/credit row — every project needs Privacy Policy
// and Accessibility, no exceptions. "Powered by" is NOT universal (Premier
// Federal Logistics shipped without it), so it's an opt-out per project,
// not something to assume.
const FooterBottomBar = ({
	businessName = 'Your Business Name',
	showPoweredBy = false,
}) => {
	return (
		<Section
			as='div'
			py='0'
			bg='bg-primary'
			className=''
		>
			<div className='flex flex-col sm:flex-row items-center justify-between gap-1 border-t py-1 border-white'>
				<p className='text-paragraph-sm text-[#B7B7B7]'>{`© ${currentYear} by ${businessName}`}</p>
				{showPoweredBy && (
					<a
						href='https://www.latzwebdesign.com'
						target='_blank'
						rel='noopener noreferrer'
						className='text-paragraph-sm text-[#B7B7B7]'
					>
						Powered by LatzWebDesign
					</a>
				)}
				<div className='flex items-center gap-1.5 text-[#B7B7B7]'>
					<Link href='/legal/privacy-policy'>Privacy Policy</Link>
					<Link href='/legal/accessibility'>Accessibility</Link>
				</div>
			</div>
		</Section>
	);
};

export default FooterBottomBar;
