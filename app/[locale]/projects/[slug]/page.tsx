import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProjectBySlug, listProjectsFr, igUrl } from '@/lib/projects';
import { Instagram } from 'lucide-react';
import { formatEventDate } from '@/lib/formatDate';

export async function generateStaticParams() {
  const projects = listProjectsFr();
  const params = [];
  for (const locale of ['fr', 'en']) {
    for (const project of projects) {
      params.push({ locale, slug: project.slug });
    }
  }
  return params;
}

export default function ProjectDetailPage({
  params: { locale, slug },
}: {
  params: { locale: string; slug: string };
}) {
  if (!['fr', 'en'].includes(locale)) {
    notFound();
  }

  const p = getProjectBySlug(slug);
  if (!p) {
    notFound();
  }

  const getDateLine = () => {
    if (p.plannedPeriodFr) return p.plannedPeriodFr;
    if ((p as any).startDate) {
      const formatted = formatEventDate((p as any).startDate, (p as any).endDate);
      return formatted ? `Date : ${formatted}` : '';
    }
    if ((p as any).dates && (p as any).dates[0]) {
      const dt = new Date((p as any).dates[0]);
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

  const paragraphs = p.bodyFr?.split('\n\n').filter(para => para.trim() !== '') || [];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <Link
          href={`/${locale}/projects`}
          className="inline-flex items-center gap-2 px-4 py-2 mb-12 border border-white/20 rounded-lg hover:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 transition-colors"
        >
          ← Projets
        </Link>

        <article className="space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold">{p.titleFr}</h1>
            {p.subtitleFr && (
              <p className="text-xl text-white/70 mt-3">{p.subtitleFr}</p>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm text-white/60 border-t border-b border-white/10 py-4">
            <span className="px-3 py-1 border border-white/20 rounded-full">
              {getStatusLabel(p.status)}
            </span>
            {getDateLine() && <span>{getDateLine()}</span>}
          </div>

          <div className="space-y-6 text-lg leading-relaxed">
            {paragraphs.map((para, idx) => (
              <p key={idx} className="text-white/90">{para}</p>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-8">
            {p.linkFr && (
              <Link
                href={p.linkFr}
                className="px-6 py-3 bg-white text-black font-medium rounded-lg hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/40 transition-colors"
              >
                Voir l'événement
              </Link>
            )}
            {p.instagram && (
              <a
                href={igUrl(p.instagram)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram ${p.titleFr} (@${p.instagram.replace(/^@/, '')})`}
                className="inline-flex items-center gap-2 underline decoration-white/30 underline-offset-4 hover:decoration-white"
              >
                Instagram
              </a>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
