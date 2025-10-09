import all from '@/data/projects.json';

export type Project = (typeof all)[number];

export function listProjectsFr(): Project[] {
  return (all as Project[])
    .slice()
    .sort((a, b) => {
      const ao = (a as any).order ?? 9999;
      const bo = (b as any).order ?? 9999;
      if (ao !== bo) return ao - bo;
      const as = a.sortDate ?? '';
      const bs = b.sortDate ?? '';
      return (bs < as) ? -1 : 1;
    });
}

export function getProjectBySlug(slug: string): Project | null {
  return (all as Project[]).find(p => p.slug === slug) ?? null;
}

export function igUrl(h?: string) {
  if (!h) return "";
  return h.startsWith('http') ? h : `https://instagram.com/${h.replace(/^@/, '')}`;
}
