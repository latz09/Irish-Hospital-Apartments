import { urlFor } from './sanityConnection';

// Generate optimized image URL from Sanity image object
export function getSanityImageUrl(image, options = {}) {
	if (!image?.asset) return null;

	const {
		width = 1920,
		height = 1080,
		quality = 90,
		format = 'webp',
		fit = 'crop',
	} = options;

	return urlFor(image)
		.width(width)
		.height(height)
		.quality(quality)
		.format(format)
		.fit(fit)
		.url();
}

// Get CSS object-position from Sanity hotspot data
export function getHotspotStyles(image) {
	if (!image?.hotspot) {
		return { objectPosition: 'center center' };
	}

	const { x, y } = image.hotspot;
	return {
		objectPosition: `${x * 100}% ${y * 100}%`,
	};
}

// Get responsive image URLs for different breakpoints
export function getResponsiveImageUrls(image, breakpoints = {}) {
	if (!image?.asset) return {};

	const defaultBreakpoints = {
		mobile: { width: 640, height: 360 },
		tablet: { width: 1024, height: 576 },
		desktop: { width: 1920, height: 1080 },
		...breakpoints,
	};

	const urls = {};

	Object.entries(defaultBreakpoints).forEach(([key, { width, height }]) => {
		urls[key] = getSanityImageUrl(image, { width, height });
	});

	return urls;
}

export const IMAGE_PRESETS = {
	aboutCarousel: { width: 900, height: 900, quality: 90 },
	amenitiesFeature: { width: 1600, height: 843, quality: 90 },
	residentServiceCard: { width: 800, height: 663, quality: 90 },
	galleryMosaic: { width: 800, height: 1000, quality: 90 },
};
