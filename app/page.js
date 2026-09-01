import { fetchContent as fc } from '@/utils/cms/fetchContent';
import { buildPageMetadata as BPM } from '@/utils/seo/buildPageMetadata';
import { FETCH_HOME_PAGE_QUERY as Q } from '@/data/queries/pages/FETCH_HOME_PAGE_QUERY';

import PageContainer from '@/components/animations/PageContainer';
import SanitySetup from '@/data/set-up/SanitySetup';
import SEOSetup from '@/data/set-up/SEOSetup';
import ProjectChecklist from '@/components/design/ProjectChecklist';
import Hero from '@/components/sections/home-page/Hero';
import About from '@/components/sections/home-page/About';
import Amenities from '@/components/sections/home-page/Amenities';
import ResidentServices from '@/components/sections/home-page/ResidentServices';
import Gallery from '@/components/sections/home-page/Gallery';
import ContactSection from '@/components/sections/home-page/ContactSection';

export async function generateMetadata() {
	return await BPM({ slug: '/', query: Q });
}

export default async function Home() {
	const data = await fc(Q);
	const { hero, about, amenities, residentServices, photoGallery, contact } =
		data ? data : {};

	return (
		<PageContainer>
			<Hero data={hero} />
			<About data={about} />
			<Amenities data={amenities} />
			<ResidentServices data={residentServices} />
			<Gallery data={photoGallery} />
			<ContactSection data={contact} />
		</PageContainer>
	);
}

export const revalidate = 10;
