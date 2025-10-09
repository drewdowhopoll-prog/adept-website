'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

type Artwork = {
  id: string;
  title: string;
  slug: string;
  hero_image: string;
  year: number;
  medium: string;
  dimensions_h: number;
  dimensions_w: number;
  dimensions_d?: number;
  dimensions_unit: string;
  price: number;
  currency: string;
  availability: string;
  artist_id: string;
  artist?: { name: string };
};

interface HighlightsProps {
  artworks: Artwork[];
  locale: string;
}

export function Highlights({ artworks, locale }: HighlightsProps) {
  const refs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) (e.target as HTMLElement).classList.add('hi-in');
      });
    }, { threshold: 0.2 });

    refs.current.forEach(el => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {artworks.map((artwork, index) => (
        <div
          key={artwork.id}
          ref={(el) => { if (el) refs.current[index] = el; }}
          className="hi opacity-0 translate-y-2 transition duration-500 will-change-transform"
          style={{ transitionDelay: `${index * 80}ms` }}
        >
          <Link
            href={`/${locale}/gallery/artworks/${artwork.slug}`}
            className="group block"
          >
            <div className="aspect-[3/4] bg-neutral-800 rounded overflow-hidden mb-4">
              <img
                src={artwork.hero_image}
                alt={artwork.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-lg font-display group-hover:text-neutral-300 transition-colors">
                {artwork.title}
              </h3>
              <p className="text-sm text-neutral-400">{artwork.artist?.name}</p>
              <p className="text-sm text-neutral-500">
                {artwork.year} · {artwork.medium}
              </p>
              <p className="text-sm text-neutral-500">
                {artwork.dimensions_h} × {artwork.dimensions_w}
                {artwork.dimensions_d && ` × ${artwork.dimensions_d}`}{' '}
                {artwork.dimensions_unit}
              </p>
              <div className="flex items-center justify-between pt-2">
                <p className="font-medium">
                  {artwork.price.toLocaleString()} {artwork.currency}
                </p>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    artwork.availability === 'in_stock'
                      ? 'bg-green-900 text-green-200'
                      : artwork.availability === 'sold'
                      ? 'bg-red-900 text-red-200'
                      : 'bg-blue-900 text-blue-200'
                  }`}
                >
                  {artwork.availability === 'in_stock'
                    ? 'In Stock'
                    : artwork.availability === 'sold'
                    ? 'Sold'
                    : 'Edition'}
                </span>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
