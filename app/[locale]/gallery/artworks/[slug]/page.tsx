"use client";

import { useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArtworkBySlug, type Artwork } from "@/lib/artworks";
import artistsData from "@/data/artists.json";

export default function ArtworkPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale, slug } = params;
  const [cart, setCart] = useState<Artwork[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const artwork = getArtworkBySlug(slug);
  if (!artwork) {
    notFound();
  }

  const [imgSrc, setImgSrc] = useState(artwork.image);
  const artist = artistsData.find(a => a.slug === artwork.artistSlug);

  const formatPrice = (price: number) => {
    return price.toLocaleString('fr-FR').replace(',', ' ');
  };

  const addToCart = () => {
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
            <div className="flex items-center gap-6">
              <Link href={`/${locale}/gallery`} className="text-sm text-white/60 hover:text-white transition-colors">
                ← Back to Gallery
              </Link>
              <button
                onClick={() => setCartOpen(!cartOpen)}
                className="px-4 py-2 border border-white/20 rounded hover:border-white/60 transition-colors text-sm"
              >
                Cart ({cart.length})
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <div className="bg-white/5 overflow-hidden">
              <img
                src={imgSrc}
                alt={artwork.alt}
                width={1200}
                height={750}
                className="w-full h-full object-contain"
                onError={() => setImgSrc('/gallery/placeholder.svg')}
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
                <button
                  onClick={addToCart}
                  className="flex-1 px-8 py-4 border border-white/20 hover:border-white/60 transition-colors font-medium"
                >
                  Add to Cart
                </button>
                <button className="flex-1 px-8 py-4 bg-white text-black hover:bg-white/90 transition-colors font-medium">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
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
                      <p className="text-sm text-white/60">{artist?.name}</p>
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
