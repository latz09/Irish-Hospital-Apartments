import Section from '@/components/layout/Section';
import ButtonLink from '@/components/ui/ButtonLink';
import SanityImage from '@/components/ui/SanityImage';
import CornerPattern from '@/components/ui/CornerPattern';

const ResidentServices = ({ data }) => {
	const { heading, cards } = data ? data : {};

	return (
		<Section className='relative space-y-2.5 overflow-hidden lg:space-y-4' py='py-5.75 lg:py-8.75'>
			{/* <div className='pointer-events-none absolute left-0 top-0 w-[10rem] lg:w-[15rem]'>
				<CornerPattern />
			</div>
			<div className='pointer-events-none absolute right-0 top-0 w-[10rem] lg:w-[15rem]'>
				<CornerPattern flip />
			</div> */}

			<h2 className='text-center'>{heading}</h2>
			<ServiceCards cards={cards} />
		</Section>
	);
};

export default ResidentServices;

const ServiceCards = ({ cards }) => {
	return (
		<div className='grid gap-1.25 md:grid-cols-3'>
			{cards?.map((card, index) => {
				const { title, image, cta } = card;
				return (
					<div key={index} className='flex flex-col'>
						<div className='relative aspect-[76/63] w-full overflow-hidden rounded'>
							<SanityImage
								image={image}
								alt={title || 'Resident service'}
								preset='residentServiceCard'
								fill
								sizes='(max-width: 767px) 100vw, 33vw'
							/>
						</div>
						<div className='mt-1 border-y border-accent py-1'>
							<h5 className=''>{title}</h5>
							<ButtonLink
								href={cta?.url}
								variant='secondary-on-light'
								className='mt-1.5 self-start'
							>
								{cta?.label}
							</ButtonLink>
						</div>
					</div>
				);
			})}
		</div>
	);
};