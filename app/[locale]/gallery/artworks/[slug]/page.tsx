import Link from "next/link";
import { notFound } from "next/navigation";
import { getArtworkBySlug, listArtworks } from "@/lib/artworks";
import artistsData from "@/data/artists.json";

export async function generateStaticParams() {
  const artworks = listArtworks();
  const params = [];
  for (const locale of ['fr', 'en']) {
    for (const artwork of artworks) {
      params.push({ locale, slug: artwork.slug });
    }
  }
  return params;
}

export default function ArtworkPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale, slug } = params;

  const artwork = getArtworkBySlug(slug);
  if (!artwork) {
    notFound();
  }

  const artist = artistsData.find(a => a.slug === artwork.artistSlug);

  const formatPrice = (price: number) => {
    return price.toLocaleString('fr-FR').replace(',', ' ');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Link href={`/${locale}`} className="text-2xl font-bold tracking-wider hover:text-white/80 transition-colors">
              ADEPT
            </Link>
            <div className="flex items-center gap-6">
              <Link href={`/${locale}/gallery`} className="text-sm text-white/60 hover:text-white transition-colors">
                ← Back to Gallery
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="bg-white/5 overflow-hidden">
              <img
                src={artwork.image}
                alt={artwork.alt}
                width={1200}
                height={750}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-5xl font-bold mb-4">{artwork.title}</h1>
              <p className="text-xl text-white/60">{artist?.name}</p>
            </div>

            <div className="space-y-4 text-white/80">
              {artwork.year && (
                <div className="flex justify-between py-3 border-b border-white/10">
                  <span className="text-white/60">Year</span>
                  <span>{artwork.year}</span>
                </div>
              )}
              <div className="flex justify-between py-3 border-b border-white/10">
                <span className="text-white/60">Medium</span>
                <span>{artwork.medium}</span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/10">
                <span className="text-white/60">Dimensions</span>
                <span>
                  {artwork.dimensions.h} × {artwork.dimensions.w} {artwork.dimensions.units}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b border-white/10">
                <span className="text-white/60">Availability</span>
                <span className="text-green-400">
                  {artwork.availability === "in_stock" ? "In Stock" : "Sold"}
                </span>
              </div>
            </div>

            <div className="pt-6">
              <div className="text-4xl font-bold mb-6">
                {formatPrice(artwork.price)} €
              </div>
              <div className="flex gap-4">
                <Link
                  href={`/${locale}/gallery`}
                  className="flex-1 px-8 py-4 text-center border border-white/20 hover:border-white/60 transition-colors font-medium"
                >
                  Back to Gallery
                </Link>
                <a
                  href={`mailto:contact@ad-ept.fr?subject=Inquiry about ${artwork.title}`}
                  className="flex-1 px-8 py-4 text-center bg-white text-black hover:bg-white/90 transition-colors font-medium"
                >
                  Inquire
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
