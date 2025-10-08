'use client';

export default function FontBadge() {
  if (process.env.NODE_ENV === 'production') return null;
  return (
    <div
      aria-hidden
      className="fixed bottom-3 left-3 z-[9999] rounded-lg border border-white/20 bg-black/60 px-3 py-1 text-xs text-white backdrop-blur-sm"
    >
      Fonts: <span className="font-display">Syne</span> (display),{' '}
      <span className="font-ui">Space Grotesk</span> (ui)
    </div>
  );
}
