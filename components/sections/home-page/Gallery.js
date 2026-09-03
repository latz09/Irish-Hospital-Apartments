import Section from '@/components/layout/Section';
import HeadingWithDescription from '@/components/ui/HeadingWithDescription';
import SectionHeading from '@/components/ui/SectionHeading';
import SanityImage from '@/components/ui/SanityImage';
import TopoPattern from '@/components/ui/TopoPattern';

const Gallery = ({ data }) => {
	const { heading, subheading, introParagraphs, images } = data ? data : {};

	return (
		<Section py='pb-2 lg:pb-4' className='space-y-4'>
			<SectionHeading heading={heading} className='text-dark' />
			<HeadingWithDescription
				className='text-dark'
				heading={subheading}
				description={introParagraphs}
			/>
			<GalleryMasonry images={images} />
				<div className='w-full overflow-hidden'>
					<TopoPattern className='text-accent/25' />
				</div>
		</Section>
	);
};

export default Gallery;

// Clamp how extreme any one card can get. A raw source ratio can range from
// a very tall portrait to a very wide landscape — clamping keeps the grid
// visually balanced instead of letting one shape dominate or shrink away.
const MIN_RATIO = 0.75; // tallest allowed (portrait cap)
const MAX_RATIO = 1.6; // widest allowed (landscape cap)

const GalleryMasonry = ({ images }) => {
	if (!images?.length) return null;

	return (
		<div className='columns-1 gap-1 sm:columns-2 lg:columns-3'>
			{images.map((image, index) => {
				const naturalRatio =
					image?.asset?.metadata?.dimensions?.aspectRatio || 4 / 3;
				const ratio = Math.min(Math.max(naturalRatio, MIN_RATIO), MAX_RATIO);

				// Request the crop at the SAME clamped ratio the container
				// uses, sized for retina at a reasonable max width — this
				// stops Sanity cropping to a mismatched fixed shape before
				// object-cover crops it again to fit the container.
				const targetWidth = 1000;
				const targetHeight = Math.round(targetWidth / ratio);

				return (
					<div
						key={index}
						className='relative mb-1.25 break-inside-avoid overflow-hidden rounded'
						style={{ aspectRatio: ratio }}
					>
						<SanityImage
							image={image}
							alt={`Irish Hospital Apartments unit photo ${index + 1}`}
							customSize={{
								width: targetWidth,
								height: targetHeight,
								quality: 90,
							}}
							fill
							sizes='(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw'
						/>
					</div>
				);
			})}
		</div>
	);
};
