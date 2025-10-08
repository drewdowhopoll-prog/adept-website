"use client";

import { useState } from "react";
import Link from "next/link";
import { type Artwork } from "@/lib/artworks";

type ArtworkCardProps = {
  artwork: Artwork;
  locale: string;
  artistName: string;
  formatPrice: (price: number) => string;
  onAddToCart: (artwork: Artwork) => void;
};

export function ArtworkCard({ artwork, locale, artistName, formatPrice, onAddToCart }: ArtworkCardProps) {
  const [imgSrc, setImgSrc] = useState(artwork.image);

  return (
    <div className="group">
      <Link href={`/${locale}/gallery/artworks/${artwork.slug}`} className="block mb-4">
        <div className="aspect-[3/4] bg-white/5 overflow-hidden mb-4">
          <img
            src={imgSrc}
            alt={artwork.alt}
            width={1200}
            height={750}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            onError={() => setImgSrc('/gallery/placeholder.svg')}
          />
        </div>
        <h3 className="text-xl font-bold mb-1">{artwork.title}</h3>
        <p className="text-white/60 text-sm mb-2">{artistName}</p>
        <p className="text-white/80 mb-2">{formatPrice(artwork.price)} €</p>
      </Link>
      <div className="flex gap-2">
        <button
          onClick={() => onAddToCart(artwork)}
          className="flex-1 px-4 py-2 border border-white/20 hover:border-white/60 transition-colors text-sm"
        >
          Add to Cart
        </button>
        <button className="flex-1 px-4 py-2 bg-white text-black hover:bg-white/90 transition-colors text-sm font-medium">
          Buy Now
        </button>
      </div>
    </div>
  );
}
