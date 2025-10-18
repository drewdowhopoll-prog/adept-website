import Link from 'next/link';
import { Calendar, MapPin } from 'lucide-react';
import { getUpcoming } from '@/lib/events';

export default function EventsIndexPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const list = getUpcoming(locale);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    return date.toLocaleDateString('fr-FR', options);
  };

  const getNextDate = (dates: string[]) => {
    const now = new Date();
    const future = dates.filter(d => new Date(d) > now).sort();
    return future[0] || dates[0];
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 sm:mb-8 border border-white/20 rounded-lg hover:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 transition-colors"
          aria-label="Retour à l'accueil ADEPT"
        >
          ADEPT
        </Link>

        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Événements
          </h1>
        </header>

        {list.length === 0 ? (
          <p className="text-white/60">Aucun événement à venir</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {list.map((event) => (
              <Link
                key={event.slug}
                href={`/${locale}/events/${event.slug}`}
                className="group block p-8 border border-white/10 hover:border-white/30 transition-colors bg-black"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-white/60">
                    <Calendar className="w-4 h-4" />
                    <time>
                      {(event as any).datesDisplayFr || formatDate(getNextDate(event.dates))}
                    </time>
                  </div>

                  <h2 className="text-3xl font-bold group-hover:text-white/80 transition-colors">
                    {event.title}
                  </h2>

                  {event.subtitle && (
                    <p className="text-lg text-white/70">{event.subtitle}</p>
                  )}

                  {(event as any).description && (
                    <p className="text-white/60 line-clamp-3">
                      {(event as any).description.split('\n')[0]}
                    </p>
                  )}

                  <div className="flex items-start gap-2 text-white/60 pt-2 border-t border-white/10">
                    <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                    <div className="text-sm">
                      <div>{event.venue} — {event.address}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
