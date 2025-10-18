import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ExternalLink, Calendar } from 'lucide-react';
import { getBySlug } from '@/lib/events';

export async function generateStaticParams() {
  return [
    { locale: 'fr', slug: 'ok-kult' },
    { locale: 'en', slug: 'ok-kult' },
  ];
}

export default function EventDetailPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  const ev = getBySlug(locale, slug);
  if (!ev) notFound();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return date.toLocaleDateString('fr-FR', options);
  };

  const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(`${ev.venue} ${ev.address}`)}`;

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 sm:mb-8 border border-white/20 rounded-lg hover:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 transition-colors"
          aria-label="Retour à l'accueil ADEPT"
        >
          ADEPT
        </Link>

        <Link
          href={`/${locale}/events`}
          className="inline-block mb-8 text-sm text-white/60 hover:text-white transition-colors"
        >
          ← Tous les événements
        </Link>

        <div className="space-y-12">
          <header className="space-y-4 pb-8 border-b border-white/10">
            <h1 className="font-display tracking-tight text-5xl md:text-7xl font-bold">
              {ev.title}
            </h1>

            {ev.subtitle && (
              <p className="text-xl text-white/70">{ev.subtitle}</p>
            )}

            {(ev as any).instagram && (
              <div className="pt-2">
                <a
                  href={`https://instagram.com/${(ev as any).instagram.replace(/^@/, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Instagram ${ev.title} (@${(ev as any).instagram.replace(/^@/, '')})`}
                  className="inline-flex items-center gap-2 underline decoration-white/30 underline-offset-4 hover:decoration-white"
                >
                  Instagram
                </a>
              </div>
            )}

            <div className="pt-4">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-lg text-white/80 hover:text-white transition-colors group"
              >
                <span>{ev.venue} — {ev.address}</span>
                <ExternalLink className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </header>

          <section className="space-y-4">
            <h2 className="text-sm uppercase tracking-wider text-white/60">Dates</h2>
            <div className="space-y-2">
              {(ev as any).datesDisplayFr ? (
                <div className="text-2xl font-medium">
                  {(ev as any).datesDisplayFr}
                </div>
              ) : (
                ev.dates.map((date, idx) => (
                  <div key={idx} className="text-2xl font-medium">
                    {formatDate(date)}
                  </div>
                ))
              )}
            </div>
          </section>

          <div className="pt-4">
            <a
              href={ev.ics}
              download
              className="inline-flex items-center gap-3 px-6 py-3 border border-white/60 rounded-xl hover:border-white focus:outline-none focus:ring-2 focus:ring-white/40 transition-colors"
              aria-label="Ajouter au calendrier (.ics)"
            >
              <Calendar className="w-5 h-5" />
              Ajouter au calendrier (.ics)
            </a>
          </div>

          {((ev as any).description || ev.body.length > 0) && (
            <article className="prose prose-invert prose-lg max-w-none pt-8 border-t border-white/10">
              <div className="space-y-6">
                {(ev as any).description ? (
                  (ev as any).description.split('\n').map((para: string, idx: number) => (
                    <p key={idx} className="text-white/80 leading-relaxed whitespace-pre-line">
                      {para}
                    </p>
                  ))
                ) : (
                  ev.body.map((para, idx) => (
                    <p key={idx} className="text-white/80 leading-relaxed">
                      {para}
                    </p>
                  ))
                )}
              </div>
            </article>
          )}

          {(ev as any).participants && (ev as any).participants.length > 0 && (
            <section className="space-y-4 pt-8 border-t border-white/10">
              <h2 className="text-sm uppercase tracking-wider text-white/60">Artistes</h2>
              <div className="flex flex-wrap gap-3">
                {(ev as any).participants.map((participant: any, idx: number) => {
                  const participantName = typeof participant === 'string' ? participant : participant.name;
                  const instagramHandle = typeof participant === 'object' ? participant.instagram : null;

                  if (instagramHandle) {
                    return (
                      <a
                        key={idx}
                        href={`https://instagram.com/${instagramHandle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 border border-white/20 rounded-lg text-sm hover:border-white/40 transition-colors no-underline"
                        style={{ textDecoration: 'none' }}
                      >
                        {participantName}
                      </a>
                    );
                  }

                  return (
                    <span
                      key={idx}
                      className="px-4 py-2 border border-white/20 rounded-lg text-sm"
                    >
                      {participantName}
                    </span>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
