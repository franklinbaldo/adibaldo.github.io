import { getCollection } from 'astro:content';
import { getImage } from 'astro:assets';

export async function GET() {
  const posts = (await getCollection('blog'))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const data = await Promise.all(
    posts.map(async (p) => {
      let heroImageUrl: string | null = null;
      if (p.data.heroImage) {
        const img = await getImage({ src: p.data.heroImage, width: 800, format: 'webp' });
        heroImageUrl = img.src;
      }
      return {
        id: p.id,
        title: p.data.title,
        description: p.data.description ?? '',
        pubDate: p.data.pubDate.toISOString(),
        tags: p.data.tags ?? [],
        placeLabel: p.data.placeLabel ?? null,
        heroImage: heroImageUrl,
      };
    })
  );

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}
