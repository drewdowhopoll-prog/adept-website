import {notFound} from "next/navigation";

export function generateStaticParams() {
  return [{locale: "fr"}, {locale: "en"}];
}

export default async function LocaleLayout({
  children,
  params: {locale},
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  if (!["fr", "en"].includes(locale)) {
    notFound();
  }

  return <>{children}</>;
}
