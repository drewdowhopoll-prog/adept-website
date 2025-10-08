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

async function getLegalContent(locale: string) {
  const contentDir = path.join(process.cwd(), 'content', 'legal');
  const filePath = path.join(contentDir, `legal.${locale}.mdx`);

  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return content;
  } catch {
    const fallbackPath = path.join(contentDir, 'legal.fr.mdx');
    try {
      return fs.readFileSync(fallbackPath, 'utf-8');
    } catch {
      return null;
    }
  }
}

function parseMDX(content: string) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith('# ')) {
      elements.push(<h1 key={key++} className="text-4xl md:text-5xl font-bold mb-8">{line.slice(2)}</h1>);
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={key++} className="text-2xl font-semibold mt-12 mb-4">{line.slice(3)}</h2>);
    } else if (line.trim() === '') {
      continue;
    } else {
      elements.push(<p key={key++} className="mb-4 text-white/80 leading-relaxed">{line}</p>);
    }
  }

  return elements;
}

export default async function MentionsLegalesPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  if (!['fr', 'en'].includes(locale)) {
    notFound();
  }

  const content = await getLegalContent(locale);
  if (!content) {
    notFound();
  }

  const elements = parseMDX(content);

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

        <article className="space-y-2">
          {elements}
        </article>
      </div>
    </div>
  );
}
