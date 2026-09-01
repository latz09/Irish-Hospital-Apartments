import Image from 'next/image';
import Link from 'next/link';
import primaryLogo from '@/public/images/logos/irish-hospital-apartments-1.png';
import secondaryLogo from '@/public/images/logos/irish-hospital-apartments-2.png';


const logos = {
	default: primaryLogo,
	secondary: secondaryLogo,
	// vertical: VerticalLogo,
	// stacked: StackedLogo,
};

const Logo = ({ className, url, variant = 'default', alt = 'logo', width = 200, height = 200 }) => {
	const LogoAsset = logos[variant] || logos.default;
	const isSvgComponent = typeof LogoAsset === 'function';

	return (
		<Link href={url || '/'} className='z-[9999] block h-auto'>
			{isSvgComponent ? (
				<LogoAsset className={className} />
			) : (
				<Image
					src={LogoAsset}
					alt={alt}
					className={className}
					width={width}
					height={height}
				/>
			)}
		</Link>
	);
};

export default Logo;