import Link from 'next/link';

export default function Footer({ locale }: { locale: string }) {
  return (
    <footer className="border-t border-white/10 mt-24 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-center">
          <Link
            href={`/${locale}/mentions-legales`}
            className="text-sm text-white/60 hover:text-white hover:underline focus:outline-none focus:ring-2 focus:ring-white/40 transition-colors"
          >
            Mentions légales
          </Link>
        </div>
      </div>
    </footer>
  );
}
