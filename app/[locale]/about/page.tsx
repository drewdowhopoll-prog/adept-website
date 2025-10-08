import { notFound } from 'next/navigation';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

export async function generateStaticParams() {
  return [
    { locale: 'fr' },
    { locale: 'en' },
  ];
}

async function getAboutContent(locale: string) {
  const contentDir = path.join(process.cwd(), 'content');
  const filePath = path.join(contentDir, `about.${locale}.mdx`);

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return content;
  } catch {
    const fallbackPath = path.join(contentDir, 'about.fr.mdx');
    try {
      return fs.readFileSync(fallbackPath, 'utf-8');
    } catch {
      return null;
    }
  }
}

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  if (!['fr', 'en'].includes(locale)) {
    notFound();
  }

  const content = await getAboutContent(locale);
  if (!content) {
    notFound();
  }

  const title = locale === 'fr' ? 'À propos' : 'About';

  const paragraphs = content
    .split('\n\n')
    .filter(p => p.trim() !== '');

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 px-4 py-2 mb-12 border border-white/20 rounded-lg hover:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 transition-colors"
          aria-label="Retour à l'accueil ADEPT"
        >
          ADEPT
        </Link>

        <article className="space-y-12">
          <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>

          <div className="space-y-6">
            {paragraphs.map((paragraph, index) => (
              <p key={index} className="text-lg leading-relaxed text-white/90">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="pt-12 border-t border-white/10">
            <p className="text-sm text-white/70 hover:text-white/100 transition-colors">
              <Link
                href={`/${locale}/mentions-legales`}
                className="underline"
              >
                Mentions légales
              </Link>
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
