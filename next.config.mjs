import NextMdx from "@next/mdx";

const withMDX = NextMdx({
	extension: /\.mdx?$/,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "institutocordial.com.br",
			},
			{
				protocol: "https",
				hostname: "reedu.de",
			},
		],
	},
};

export default withMDX(nextConfig);
