'use client';

import SanityImage from '@/components/ui/SanityImage';
import ButtonLink from '@/components/ui/ButtonLink';

// Swap these paths once the actual badge files are added to the project
// (e.g. /public/badges/*.svg). Keys must match the `badge` string option
// values on homePage.hero in the Sanity schema.
const BADGES = {
	irishHospitalOutline: '/images/badges/irish-hospital-outline.svg',
	nowLeasing: '/images/badges/irish-hospital-now-leasing.svg',
};

const BADGE_ALT_TEXT = {
	irishHospitalOutline: 'Irish Hospital Apartments — Est. 2021',
	nowLeasing: 'Now Leasing',
};

// Placeholder-link CTAs: label exists but url hasn't been set in Sanity yet.
// Renders fully styled/active — just swallows the click instead of
// navigating anywhere until a real url is added.
const CtaButton = ({ cta, variant, event }) => {
	if (!cta?.label) return null;

	const hasUrl = Boolean(cta.url);

	return (
		<ButtonLink
			href={hasUrl ? cta.url : '#'}
			variant={variant}
			external={hasUrl && cta.url.startsWith('http')}
			event={hasUrl ? event : undefined}
			onClick={hasUrl ? undefined : (e) => e.preventDefault()}
		>
			{cta.label}
		</ButtonLink>
	);
};

const Hero = ({ data }) => {
	const {
		headline,
		subheadline,
		backgroundImage,
		badge,
		ctaPrimary,
		ctaSecondary,
	} = data ? data : {};

	const badgeSrc = BADGES[badge];
	const badgeAlt = BADGE_ALT_TEXT[badge] ?? '';

	return (
		<header className='relative h-[93svh] md:h-[100svh] min-h-[40rem] overflow-hidden'>
			{backgroundImage && (
				<SanityImage
					image={backgroundImage}
					alt=''
					preset='hero'
					fill
					priority
					sizes='100vw'
					className='-z-20'
				/>
			)}

			{/* Blurred backdrop behind the text — fades out toward the building */}
			<div
				className='absolute inset-0 -z-15 backdrop-blur-sm'
				style={{
					maskImage:
						'linear-gradient(to right, black 0%, black 25%, transparent 55%)',
					WebkitMaskImage:
						'linear-gradient(to right, black 0%, black 25%, transparent 55%)',
				}}
			/>

			{/* Legibility wash — heavier at bottom-left where the text sits */}
			<div className='absolute inset-0 -z-10 bg-gradient-to-l from-dark/30 via-dark/60 to-dark/80' />

			{badgeSrc && (
				<div className='hidden md:block absolute md:right-2.5 lg:right-5 3xl:right-8 lg:top-6 3xl:top-8 md:w-[10rem] lg:w-[13rem] 3xl:w-[16rem]'>
					<img src={badgeSrc} alt={badgeAlt} className='h-auto w-full' />
				</div>
			)}

			<div className='section-x-padding relative flex h-full flex-col justify-between py-3.5 md:justify-center md:gap-2.5 md:py-0'>
				{headline && (
					<h1 className='max-w-none pt-4 text-light lg:max-w-[38rem] lg:pt-0 3xl:max-w-[62rem]'>
						{headline}
					</h1>
				)}

				<div className=''>
					<div className='h-[2px] w-full max-w-full bg-secondary lg:w-[25.6rem]' />

					{subheadline && (
						<p className='text-paragraph-lg max-w-[27rem] text-light mt-1 md:mt-2.5 mb-2.5'>
							{subheadline}
						</p>
					)}

					{(ctaPrimary?.label || ctaSecondary?.label) && (
						<div className='flex flex-wrap gap-1'>
							<CtaButton
								cta={ctaPrimary}
								variant='primary-on-dark'
								event='Hero - Apply for a Unit'
							/>
							<CtaButton
								cta={ctaSecondary}
								variant='secondary-on-dark'
								event='Hero - Pay Rent'
							/>
						</div>
					)}
				</div>
			</div>
		</header>
	);
};

export default Hero;
