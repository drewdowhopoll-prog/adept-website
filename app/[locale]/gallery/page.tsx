"use client";

import { useState } from "react";
import Link from "next/link";
import { listArtworks, type Artwork } from "@/lib/artworks";
import { ArtworkCard } from "@/components/gallery/ArtworkCard";
import artistsData from "@/data/artists.json";

type Artist = {
  slug: string;
  name: string;
  bio: string;
  instagram: string;
};

export default function GalleryPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const [cart, setCart] = useState<Artwork[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const artworks = listArtworks();
  const artists = artistsData as Artist[];

  const formatPrice = (price: number) => {
    return price.toLocaleString('fr-FR').replace(',', ' ');
  };

  const getArtistName = (artistSlug: string) => {
    const artist = artists.find(a => a.slug === artistSlug);
    return artist?.name || '';
  };

  const addToCart = (artwork: Artwork) => {
    setCart([...cart, artwork]);
    setCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Link href={`/${locale}`} className="text-2xl font-bold tracking-wider hover:text-white/80 transition-colors">
              ADEPT
            </Link>
            <button
              onClick={() => setCartOpen(!cartOpen)}
              className="px-4 py-2 border border-white/20 rounded hover:border-white/60 transition-colors"
            >
              Cart ({cart.length})
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-16">
        <h1 className="text-5xl md:text-7xl font-bold mb-16">Gallery</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((artwork) => (
            <ArtworkCard
              key={artwork.slug}
              artwork={artwork}
              locale={locale}
              artistName={getArtistName(artwork.artistSlug)}
              formatPrice={formatPrice}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </div>

      {cartOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center" onClick={() => setCartOpen(false)}>
          <div className="bg-neutral-900 p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Cart ({cart.length})</h2>
              <button onClick={() => setCartOpen(false)} className="text-white/60 hover:text-white">✕</button>
            </div>
            {cart.length === 0 ? (
              <p className="text-white/60">Your cart is empty</p>
            ) : (
              <div className="space-y-4">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex gap-4 border-b border-white/10 pb-4">
                    <img src={item.image} alt={item.alt} className="w-20 h-20 object-cover" />
                    <div className="flex-1">
                      <h3 className="font-bold">{item.title}</h3>
                      <p className="text-sm text-white/60">{getArtistName(item.artistSlug)}</p>
                      <p className="text-white/80 mt-1">{formatPrice(item.price)} €</p>
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex justify-between text-xl font-bold mb-4">
                    <span>Total</span>
                    <span>{formatPrice(cart.reduce((sum, item) => sum + item.price, 0))} €</span>
                  </div>
                  <button className="w-full px-6 py-3 bg-white text-black font-medium hover:bg-white/90 transition-colors">
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
