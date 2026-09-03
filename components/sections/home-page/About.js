'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Section from '@/components/layout/Section';
import HeadingWithDescription from '@/components/ui/HeadingWithDescription';
import SectionHeading from '@/components/ui/SectionHeading';
import SanityImage from '@/components/ui/SanityImage';
import TopoPattern from '@/components/ui/TopoPattern';

const About = ({ data }) => {
	const {
		heading,
		historyHeading,
		historyParagraphs,
		carouselImages,
		renovationHeading,
		renovationParagraphs,
	} = data ? data : {};

	return (
		<div id='about' className='overflow-x-hidden bg-primary scroll-target'>
			<Section py='py-6.25 lg:py-8' className='space-y-4 bg-primary'>
				<SectionHeading heading={heading} />
				<HeadingWithDescription
					heading={historyHeading}
					description={historyParagraphs}
				/>
				<AboutCarousel images={carouselImages} />
				<HeadingWithDescription
					heading={renovationHeading}
					description={renovationParagraphs}
				/>
				<TopoPattern />
			</Section>
		</div>
	);
};

export default About;

const AboutCarousel = ({ images }) => {
	const containerRef = useRef(null);
	const trackRef = useRef(null);
	const [offset, setOffset] = useState(0);
	const [step, setStep] = useState(0);
	const [maxOffset, setMaxOffset] = useState(0);

	const measure = useCallback(() => {
		const container = containerRef.current;
		const track = trackRef.current;
		if (!container || !track || track.children.length === 0) return;

		const card = track.children[0];
		const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
		const cardWidth = card.getBoundingClientRect().width + gap;
		const max = Math.max(0, track.scrollWidth - container.clientWidth);

		setStep(cardWidth);
		setMaxOffset(max);
		setOffset((o) => Math.min(o, max));
	}, []);

	useEffect(() => {
		measure();
		const ro = new ResizeObserver(measure);
		if (containerRef.current) ro.observe(containerRef.current);
		return () => ro.disconnect();
	}, [measure, images?.length]);

	if (!images?.length) return null;

	const onDragEnd = (_, info) => {
		if (step === 0) return;
		const projected = offset - info.offset.x - info.velocity.x * 0.2;
		const snapped = Math.max(
			0,
			Math.min(maxOffset, Math.round(projected / step) * step),
		);
		setOffset(snapped);
	};
	return (
		<div className='ml-[calc(-50vw+50%)] mr-[calc(-50vw+50%)]'>
			<div ref={containerRef} className='overflow-hidden'>
				<motion.div
					ref={trackRef}
					className='flex gap-1.25 lg:gap-1.75'
					drag={maxOffset > 0 ? 'x' : false}
					dragConstraints={{ left: -maxOffset, right: 0 }}
					dragElastic={0.1}
					dragMomentum={false}
					onDragEnd={onDragEnd}
					animate={{ x: -offset }}
					transition={{ type: 'spring', stiffness: 300, damping: 40 }}
				>
					{images.map((image, index) => (
						<div
							key={index}
							className='relative aspect-square w-[70vw] shrink-0 overflow-hidden rounded select-none sm:w-[45vw] md:w-[38vw] lg:w-[26rem]'
						>
							<SanityImage
								image={image}
								alt={`About Irish Hospital Apartments image ${index + 1}`}
								preset='aboutCarousel'
								fill
								sizes='(max-width: 767px) 70vw, (max-width: 1023px) 40vw, 26rem'
								draggable={false}
								className='rounded'
							/>
						</div>
					))}
					<div className='w-0 shrink-0 md:w-2' aria-hidden='true' />
				</motion.div>
			</div>
		</div>
	);
};