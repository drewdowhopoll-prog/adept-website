import Link from 'next/link';
import { notFound } from 'next/navigation';
import { listProjectsFr, igUrl } from '@/lib/projects';
import { Instagram } from 'lucide-react';
import { formatEventDate } from '@/lib/formatDate';

export async function generateStaticParams() {
  return [
    { locale: 'fr' },
    { locale: 'en' },
  ];
}

export default function ProjectsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  if (!['fr', 'en'].includes(locale)) {
    notFound();
  }

  const list = listProjectsFr();

  const getDateLine = (p: any) => {
    if (p.plannedPeriodFr) return p.plannedPeriodFr;
    if (p.startDate) {
      const formatted = formatEventDate(p.startDate, p.endDate);
      return formatted ? `Date : ${formatted}` : '';
    }
    if (p.dates && p.dates[0]) {
      const dt = new Date(p.dates[0]);
      return dt.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    }
    return '';
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      en_cours: 'En cours',
      en_developpement: 'En développement',
      en_preparation: 'En préparation',
    };
    return labels[status] || status;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 px-4 py-2 mb-12 border border-white/20 rounded-lg hover:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 transition-colors"
          aria-label="Retour à l'accueil ADEPT"
        >
          ADEPT
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold mb-12">Projets</h1>

        <div className="grid gap-6">
          {list.map((p) => (
            <Link
              key={p.slug}
              href={`/${locale}/projects/${p.slug}`}
              className="block border border-white/10 rounded-lg p-6 hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/40 transition-colors"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold">{p.titleFr}</h2>
                    {p.subtitleFr && (
                      <p className="text-lg text-white/70 mt-1">{p.subtitleFr}</p>
                    )}
                  </div>
                  <span className="text-xs px-3 py-1 border border-white/20 rounded-full whitespace-nowrap">
                    {getStatusLabel(p.status)}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-white/60">
                  {getDateLine(p) && <span>{getDateLine(p)}</span>}
                </div>

                <div className="flex items-center gap-4 mt-2">
                  {p.linkFr && (
                    <span className="text-sm underline">Voir l'événement</span>
                  )}
                  {p.instagram && (
                    <a
                      href={igUrl(p.instagram)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Instagram ${p.titleFr} (@${p.instagram.replace(/^@/, '')})`}
                      className="inline-flex items-center gap-2 text-sm underline decoration-white/30 underline-offset-4 hover:decoration-white"
                    >
                      Instagram
                    </a>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
