import artworksData from "@/data/artworks.json";

export type Artwork = {
  slug: string;
  title: string;
  artistSlug: string;
  price: number;
  currency: string;
  availability: string;
  year: string;
  medium: string;
  dimensions: {
    w: number;
    h: number;
    units: string;
  };
  image: string;
  alt: string;
};

export function listArtworks(): Artwork[] {
  return artworksData as Artwork[];
}

export function getArtworkBySlug(slug: string): Artwork | null {
  const artworks = listArtworks();
  return artworks.find(a => a.slug === slug) || null;
}
