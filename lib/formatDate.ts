export function formatEventDate(start?: string | null, end?: string | null): string {
  if (!start) return "";

  const fmt = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  const startFormatted = fmt.format(new Date(start));

  if (end && end !== start) {
    const endFormatted = fmt.format(new Date(end));
    return `${startFormatted} – ${endFormatted}`;
  }

  return startFormatted;
}
