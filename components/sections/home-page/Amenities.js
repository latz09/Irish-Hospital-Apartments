import Section from '@/components/layout/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import SanityImage from '@/components/ui/SanityImage';

const Amenities = ({ data }) => {
	const { heading, intro, items, image } = data ? data : {};

	return (
		<div id='amenities' className='bg-primary scroll-target'>
			<Section py='pb-6.25 lg:pb-8' className='bg-primary'>
				<div className='rounded border border-secondary p-[0.55rem]'>
					<div className='space-y-2.5 rounded-[0.5rem] border border-secondary p-1 md:p-2 lg:space-y-4 lg:p-4'>
						<div className='max-w-[50rem] space-y-1.5'>
							<SectionHeading heading={heading} className='text-light' />
							<p className='text-paragraph text-light'>{intro}</p>
						</div>
						<Items items={items} />
						{image && (
							<div className='relative aspect-[167/88] w-full overflow-hidden rounded'>
								<SanityImage
									image={image}
									alt='Kitchen inside Irish Hospital Apartments'
									preset='amenitiesFeature'
									fill
									sizes='(max-width: 1023px) 100vw, 72rem'
									className='rounded'
								/>
							</div>
						)}
					</div>
				</div>
			</Section>
		</div>
	);
};

export default Amenities;

const Items = ({ items }) => {
	if (!items?.length) return null;

	return (
		<div className='grid grid-cols-1 gap-y-1 md:grid-cols-2 md:gap-x-[3.62rem] md:gap-y-2 lg:grid-cols-3'>
			{items.map((item, index) => (
				<p
					key={index}
					className='text-paragraph border-t border-secondary/50 py-0.5 text-light md:py-1 md:text-paragraph-lg md:text-light'
				>
					{item}
				</p>
			))}
		</div>
	);
};