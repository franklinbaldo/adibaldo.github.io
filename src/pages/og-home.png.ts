import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFile } from 'node:fs/promises';

export const prerender = true;

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

async function getFonts() {
	const regular = await readFile(new URL('../../public/fonts/atkinson-regular.woff', import.meta.url));
	const bold = await readFile(new URL('../../public/fonts/atkinson-bold.woff', import.meta.url));
	return [
		{ name: 'Atkinson', data: regular, weight: 400, style: 'normal' },
		{ name: 'Atkinson', data: bold, weight: 700, style: 'normal' },
	] as const;
}

export async function GET() {
	const fonts = await getFonts();
	const logoData = await readFile(new URL('../../public/favicon-adi.png', import.meta.url));
	const logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`;

	const svg = await satori(
		{
			type: 'div',
			props: {
				style: {
					width: `${OG_WIDTH}px`,
					height: `${OG_HEIGHT}px`,
					display: 'flex',
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center',
					padding: '64px',
					background: 'linear-gradient(180deg, #F5C77E 0%, #FDF0E2 100%)',
					color: '#1A1A1A',
					gap: '40px',
				},
				children: [
					{
						type: 'img',
						props: {
							src: logoBase64,
							style: {
								width: '320px',
								height: '320px',
								borderRadius: '999px',
								border: '4px solid #D4874E',
							},
						},
					},
					{
						type: 'div',
						props: {
							style: {
								display: 'flex',
								flexDirection: 'column',
								gap: '12px',
							},
							children: [
								{
									type: 'div',
									props: {
										style: {
											display: 'flex',
											fontFamily: 'Atkinson',
											fontSize: '72px',
											fontWeight: 700,
											lineHeight: 1.1,
										},
										children: ['Alfarrábios do Adi'],
									},
								},
								{
									type: 'div',
									props: {
										style: {
											display: 'flex',
											fontFamily: 'Atkinson',
											fontSize: '32px',
											fontWeight: 400,
											color: '#6B5B4F',
										},
										children: ['Memórias, causos e ensaios — sem pressa.'],
									},
								},
							],
						},
					},
				],
			},
		} as any,
		{
			width: OG_WIDTH,
			height: OG_HEIGHT,
			fonts: fonts.map((f) => ({
				name: f.name,
				data: f.data,
				weight: f.weight,
				style: f.style,
			})),
		},
	);

	const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: OG_WIDTH } });
	const pngData = resvg.render().asPng();

	return new Response(pngData, {
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': 'public, max-age=31536000, immutable',
		},
	});
}
