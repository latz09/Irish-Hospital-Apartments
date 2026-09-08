/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.sanity.io',
				pathname: '/**',
			},
		],
	},
	async redirects() {
		return [
			{ source: '/apartment-units', destination: '/', permanent: true },
			{ source: '/contact', destination: '/', permanent: true },
			{ source: '/about', destination: '/', permanent: true },
			{ source: '/application-form', destination: '/', permanent: true },
			{ source: '/in-the-media', destination: '/', permanent: true },
			{ source: '/pay-your-rent', destination: '/', permanent: true },
		];
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: [
				{
					loader: '@svgr/webpack',
					options: {
						svgoConfig: {
							plugins: [
								{
									name: 'preset-default',
									params: {
										overrides: {
											removeViewBox: false,
										},
									},
								},
								'removeDimensions',
							],
						},
					},
				},
			],
		});
		return config;
	},
};

export default nextConfig;