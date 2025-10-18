import Link from "next/link";
import { Instagram, ArrowUpRight } from "lucide-react";
import { TypefaceModeToggle } from "@/components/TypefaceModeToggle";

export default function Home({params:{locale}}:{params:{locale:string}}){
  const navItems = [
    { label: "About", href: `/${locale}/about` },
    { label: "Projects", href: `/${locale}/projects` },
    { label: "Events", href: `/${locale}/events` },
    { label: "Music", href: `/${locale}#music` },
    { label: "Gallery", href: `/${locale}#gallery` },
    { label: "Contact", href: `/${locale}#contact` },
    { label: "Donate", href: `/${locale}#donate` },
  ];

  const cards = [
    { title: "Gallery", kicker: "Artworks & Editions", href: `/${locale}/gallery` },
    { title: "Projects", kicker: "Transmedia Works", href: `/${locale}/projects` },
    { title: "Events", kicker: "Performances & Talks", href: `/${locale}/events` },
    { title: "Music", kicker: "Sound & Composition", href: `/${locale}#music` },
    { title: "About", kicker: "Mission & Values", href: `/${locale}/about` },
    { title: "Contact", kicker: "Get in Touch", href: `/${locale}#contact` },
  ];

  const dayOfMonth = new Date().getDate();
  const getCardSpan = (index: number) => {
    const seed = (dayOfMonth + index) % 3;
    return seed === 0 ? 2 : seed === 1 ? 3 : 1;
  };

  const getCardJitter = (index: number) => {
    const jitters = [2, -3, 1, -4, 3, -2];
    return jitters[index % jitters.length];
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <header className="border-b border-zinc-800">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Link
              href={`/${locale}`}
              className="text-2xl font-bold font-display tracking-wider hover:text-zinc-300 transition-colors"
            >
              ADEPT
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="hover:text-zinc-300 transition-colors text-sm"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-6">
              <TypefaceModeToggle />

              <div className="flex items-center gap-3 text-sm">
                <Link href="/fr" className={locale === "fr" ? "font-bold" : "hover:text-zinc-300"}>
                  FR
                </Link>
                <span className="text-zinc-600">/</span>
                <Link href="/en" className={locale === "en" ? "font-bold" : "hover:text-zinc-300"}>
                  EN
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 py-20">
        <div className="text-center space-y-12 max-w-5xl mx-auto mb-24 bg-noise py-20">
          <h1 className="text-[clamp(4rem,15vw,12rem)] font-display leading-none" style={{ fontWeight: 800 }}>
            ADEPT
          </h1>

          <p className="text-3xl md:text-5xl font-display leading-tight animate-weight-pulse">
            Association pour le Développement et l'Échange des Pratiques Transmédiums
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link
              href={`/${locale}/gallery`}
              className="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 text-lg font-medium"
            >
              View Gallery
            </Link>
            <Link
              href={`/${locale}/events/ok-kult`}
              className="px-8 py-4 bg-white text-black hover:bg-zinc-200 transition-all duration-300 text-lg font-medium"
            >
              Upcoming Event
            </Link>
          </div>
        </div>

        <div className="container mx-auto max-w-7xl mb-24">
          <div className="border border-zinc-800 p-8 md:p-12">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-sm uppercase tracking-wider text-zinc-400">Upcoming Events</h2>
                <Link
                  href={`/${locale}/events`}
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  View all →
                </Link>
              </div>

              <div className="space-y-4">
                <h3 className="text-3xl md:text-5xl font-display font-bold">ØK KÜLT</h3>
                <p className="text-lg md:text-xl text-zinc-400">23 octobre — La Mûresserie</p>
                <p className="text-base md:text-lg text-zinc-300 leading-relaxed max-w-3xl">
                  Le mystique, l'immense, le cosmos — ØK KÜLT.<br />
                  23 octobre — La Mûresserie.<br />
                  Immersion transmédium mystique : musique & peinture, vidéo-art & photo, concerts acoustiques & DJ set, séance de psychomagie & lecture de la carte natale de la Ve République.<br />
                  12 artistes, 12 médiums — un soir où l'avenir prend corps.
                </p>
                <div className="pt-4">
                  <Link
                    href={`/${locale}/events/ok-kult`}
                    className="inline-flex items-center gap-2 px-6 py-3 border border-white/60 hover:border-white transition-colors"
                  >
                    Learn more
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {cards.map((card, index) => (
              <Link
                key={card.title}
                href={card.href}
                className="group border border-zinc-800 p-6 hover:border-zinc-600 transition-all duration-300"
                style={{
                  gridColumn: `span ${getCardSpan(index)}`,
                  transform: `translateY(${getCardJitter(index)}px)`,
                }}
              >
                <div className="space-y-3">
                  <span className="text-xs uppercase tracking-wider text-zinc-400 section-label">
                    {card.kicker}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display font-bold group-hover:tracking-[.015em] transition-all duration-300">
                    {card.title}
                  </h3>
                  <div className="flex items-center gap-2 text-zinc-400 group-hover:text-white transition-colors">
                    <span className="text-sm border-b border-transparent group-hover:border-white transition-all duration-300" style={{ textUnderlineOffset: '4px' }}>
                      Explore
                    </span>
                    <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-800">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col items-center gap-8">
            <div className="flex items-center gap-6">
              <Link
                href="https://instagram.com/ad.ept"
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center opacity-80 hover:opacity-100 border border-white/0 hover:border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
                aria-label="Instagram ADEPT (@ad.ept)"
              >
                <Instagram className="w-8 h-8" />
              </Link>
            </div>

            <div className="text-center space-y-2">
              <p className="text-zinc-400">
                <a
                  href="mailto:info@ad-ept.fr"
                  className="hover:text-white transition-colors"
                >
                  info@ad-ept.fr
                </a>
              </p>
              <p className="text-sm text-zinc-500">
                © {new Date().getFullYear()} ADEPT. All rights reserved.
              </p>
              <p className="text-sm mt-4">
                <Link
                  href={`/${locale}/mentions-legales`}
                  className="text-zinc-500 hover:text-white hover:underline focus:outline-none focus:ring-2 focus:ring-white/40 transition-colors"
                >
                  Mentions légales
                </Link>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
