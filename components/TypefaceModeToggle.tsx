'use client';

import { useEffect, useState } from 'react';

type TypefaceMode = 'minimal' | 'editorial' | 'brut';

export function TypefaceModeToggle() {
  const [mode, setMode] = useState<TypefaceMode>('minimal');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedMode = localStorage.getItem('typeface-mode') as TypefaceMode;
    if (savedMode && ['minimal', 'editorial', 'brut'].includes(savedMode)) {
      setMode(savedMode);
      document.documentElement.classList.remove('mode-minimal', 'mode-editorial', 'mode-brut');
      document.documentElement.classList.add(`mode-${savedMode}`);
    } else {
      document.documentElement.classList.add('mode-minimal');
    }
  }, []);

  const handleModeChange = (newMode: TypefaceMode) => {
    setMode(newMode);
    localStorage.setItem('typeface-mode', newMode);
    document.documentElement.classList.remove('mode-minimal', 'mode-editorial', 'mode-brut');
    document.documentElement.classList.add(`mode-${newMode}`);
  };

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <span className="text-white/60">Typeface:</span>
        <div className="flex gap-1 border border-white/20 rounded">
          <button className="px-3 py-1 bg-white text-black">Minimal</button>
          <button className="px-3 py-1 hover:bg-white/10 transition-colors">Editorial</button>
          <button className="px-3 py-1 hover:bg-white/10 transition-colors">Brut</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-white/60">Typeface:</span>
      <div className="flex gap-1 border border-white/20 rounded">
        <button
          onClick={() => handleModeChange('minimal')}
          className={`px-3 py-1 transition-colors ${
            mode === 'minimal' ? 'bg-white text-black' : 'hover:bg-white/10'
          }`}
        >
          Minimal
        </button>
        <button
          onClick={() => handleModeChange('editorial')}
          className={`px-3 py-1 transition-colors ${
            mode === 'editorial' ? 'bg-white text-black' : 'hover:bg-white/10'
          }`}
        >
          Editorial
        </button>
        <button
          onClick={() => handleModeChange('brut')}
          className={`px-3 py-1 transition-colors ${
            mode === 'brut' ? 'bg-white text-black' : 'hover:bg-white/10'
          }`}
        >
          Brut
        </button>
      </div>
    </div>
  );
}
