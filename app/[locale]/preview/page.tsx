import fs from 'fs';
import path from 'path';

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}

export default async function PreviewPage({ params }: { params: { locale: string } }) {
  const { locale } = params;

  const screenshotPath = path.join(process.cwd(), 'public', 'preview-home.png');
  const screenshotExists = fs.existsSync(screenshotPath);

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-serif mb-4">Homepage Preview</h1>
          <p className="text-white/70">
            Full-page screenshot of the ADEPT homepage (1440×900 viewport)
          </p>
        </div>

        {screenshotExists ? (
          <div className="border border-white/10 rounded-lg overflow-hidden bg-white">
            <img
              src="/preview-home.png"
              alt="Homepage Preview"
              className="w-full h-auto"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        ) : (
          <div className="border border-white/10 rounded-lg p-12 text-center bg-white/5">
            <div className="text-6xl mb-4">📸</div>
            <h2 className="text-2xl font-semibold mb-4">Screenshot Not Generated Yet</h2>
            <p className="text-white/70 mb-6">
              The homepage screenshot hasn't been created yet. Follow the instructions below to generate it.
            </p>
          </div>
        )}

        <div className="mt-8 p-6 bg-white/5 rounded-lg border border-white/10">
          <h2 className="text-xl font-semibold mb-4">Regenerate Screenshot</h2>
          <p className="text-white/70 mb-4">
            To regenerate this screenshot, ensure the dev server is running and execute:
          </p>
          <pre className="bg-black p-4 rounded text-sm overflow-x-auto">
            <code className="text-green-400">npm run snap:home</code>
          </pre>
          <p className="text-white/60 text-sm mt-4">
            The screenshot will be saved to <code className="text-white/80">/public/preview-home.png</code>
          </p>
        </div>
      </div>
    </div>
  );
}
