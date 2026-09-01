import { Analytics } from '@vercel/analytics/next';
import Footer from '@/components/layout/footer/Footer';
import { fetchSeoSettings } from '@/utils/cms/fetchSeoSettings';
import { buildOrganizationSchema } from '@/lib/seo/buildOrganizationSchema';
import JsonLd from '@/components/seo/JsonLd';
import NavigationContainer from '@/components/layout/navigation/NavigationContainer';
import './globals.css';
import { Jost, Libre_Franklin } from 'next/font/google';
import DesignSystemBadge from '@/components/design/DesignSystemBadge';

// Headings — Jost. Guide uses weight 600 (H1-H4) and weight 500 (H5-H6), no
// italics anywhere in the guide, so normal style only.
const jost = Jost({
	subsets: ['latin'],
	weight: ['500', '600'],
	style: ['normal'],
	display: 'swap',
	variable: '--font-heading',
});

// Body — Libre Franklin. Guide uses weight 400 throughout (paragraphs,
// caption); Button Text is set in Jost per the guide, so Libre Franklin only
// needs the one weight.
const libreFranklin = Libre_Franklin({
	subsets: ['latin'],
	weight: ['400'],
	style: ['normal'],
	display: 'swap',
	variable: '--font-body',
});

export async function generateMetadata() {
	const seo = await fetchSeoSettings();
	if (!seo?.siteUrl) return {};

	return {
		metadataBase: new URL(seo.siteUrl),
		applicationName: seo.siteName,
		title: {
			default: seo.defaultTitle,
			template: seo.titleTemplate,
		},
		description: seo.defaultDescription,
		keywords: seo.keywords,
		icons: { icon: '/favicon.ico' },
		verification: {
			google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
		},
		openGraph: {
			title: seo.defaultTitle,
			description: seo.defaultDescription,
			url: seo.siteUrl,
			siteName: seo.siteName,
			images: [{ url: seo.ogImage, width: 1200, height: 630 }],
			type: 'website',
		},
		twitter: {
			card: 'summary_large_image',
			title: seo.defaultTitle,
			description: seo.defaultDescription,
			...(seo.twitterHandle && { creator: seo.twitterHandle }),
			images: [seo.ogImage],
		},
	};
}

export default async function RootLayout({ children }) {
	const seo = await fetchSeoSettings(); // same cached call — no extra Sanity hit
	const schema = buildOrganizationSchema(seo);

	return (
		<html lang='en'>
			<body className={`min-h-screen ${jost.variable} ${libreFranklin.variable}`}>
				{schema && <JsonLd data={schema} />}
				<NavigationContainer />
				<main>{children}</main>
				<Analytics />
				<Footer businessName={seo?.siteName} />
				<DesignSystemBadge />
			</body>
		</html>
	);
}