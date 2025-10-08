import events from '@/data/events.json';

export type EventItem = typeof events[number];

export function getEvents(locale: string) {
  return (events as EventItem[]).filter(e => e.locale === locale);
}

export function getUpcoming(locale: string) {
  const now = new Date();
  return getEvents(locale).filter(e => e.dates.some(d => new Date(d) > now));
}

export function getBySlug(locale: string, slug: string) {
  return getEvents(locale).find(e => e.slug === slug) || null;
}
