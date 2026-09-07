'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import {
	motion,
	useMotionValue,
	useAnimationFrame,
	animate,
} from 'framer-motion';
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
				<div className='w-full overflow-hidden'>
					<TopoPattern className='text-secondary/25' />
				</div>
			</Section>
		</div>
	);
};

export default About;

// px/sec — matches the house marquee convention (see ImageCarousel.js)
const getAutoplaySpeed = () =>
	typeof window !== 'undefined' && window.innerWidth < 1024 ? 35 : 40;

const RESUME_DELAY = 4000; // ms after manual interaction before autoplay resumes
const SNAP_TRANSITION = { type: 'spring', stiffness: 300, damping: 40 };

const AboutCarousel = ({ images }) => {
	const containerRef = useRef(null);
	const trackRef = useRef(null);

	const x = useMotionValue(0); // track's live translateX — 0 to -maxOffset

	const [step, setStep] = useState(0);
	const [maxOffset, setMaxOffset] = useState(0);

	const directionRef = useRef(1); // 1 = forward (toward end), -1 = backward
	const isPausedRef = useRef(false); // hovered / recently touched
	const isInteractingRef = useRef(false); // actively dragging
	const resumeTimeoutRef = useRef(null);
	const reducedMotionRef = useRef(false);

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

		// Clamp current position in case the viewport shrank
		if (-x.get() > max) x.set(-max);
	}, [x]);

	useEffect(() => {
		measure();
		const ro = new ResizeObserver(measure);
		if (containerRef.current) ro.observe(containerRef.current);
		return () => ro.disconnect();
	}, [measure, images?.length]);

	useEffect(() => {
		reducedMotionRef.current = window.matchMedia(
			'(prefers-reduced-motion: reduce)',
		).matches;
	}, []);

	useEffect(() => {
		return () => {
			if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
		};
	}, []);

	// Continuous autoplay — smooth pixel-by-pixel scroll, exact bounds each frame
	useAnimationFrame((_, delta) => {
		if (isPausedRef.current || isInteractingRef.current) return;
		if (maxOffset === 0 || reducedMotionRef.current) return;

		const distance = (getAutoplaySpeed() * delta) / 1000;
		let next = -x.get() + distance * directionRef.current;

		if (next >= maxOffset) {
			next = maxOffset;
			directionRef.current = -1;
		} else if (next <= 0) {
			next = 0;
			directionRef.current = 1;
		}
		x.set(-next);
	});

	const pause = useCallback(() => {
		isPausedRef.current = true;
		if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
	}, []);

	const scheduleResume = useCallback(() => {
		if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
		resumeTimeoutRef.current = setTimeout(() => {
			isPausedRef.current = false;
		}, RESUME_DELAY);
	}, []);

	if (!images?.length) return null;

	const onDragStart = () => {
		isInteractingRef.current = true;
		pause();
	};

	const onDragEnd = (_, info) => {
		isInteractingRef.current = false;

		if (step > 0) {
			const projected = -x.get() - info.velocity.x * 0.2;
			const snapped = Math.max(
				0,
				Math.min(maxOffset, Math.round(projected / step) * step),
			);
			animate(x, -snapped, SNAP_TRANSITION);
			if (snapped >= maxOffset) directionRef.current = -1;
			else if (snapped <= 0) directionRef.current = 1;
		}

		scheduleResume();
	};

	return (
		<div>
			<div
				ref={containerRef}
				className='overflow-hidden'
				onMouseEnter={pause}
				onMouseLeave={() => {
					if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
					isPausedRef.current = false;
				}}
				onTouchStart={() => {
					isInteractingRef.current = true;
					pause();
				}}
				onTouchEnd={() => {
					isInteractingRef.current = false;
					scheduleResume();
				}}
			>
				<motion.div
					ref={trackRef}
					className='flex gap-1.25 lg:gap-1.75'
					style={{ x }}
					drag={maxOffset > 0 ? 'x' : false}
					dragConstraints={{ left: -maxOffset, right: 0 }}
					dragElastic={0.1}
					dragMomentum={false}
					onDragStart={onDragStart}
					onDragEnd={onDragEnd}
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
