import { chromium } from 'playwright';
import * as path from 'path';
import * as fs from 'fs';

async function captureHomepage() {
  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });

  const page = await context.newPage();

  const appUrl = process.env.APP_URL || 'http://localhost:3000';

  console.log(`Navigating to ${appUrl}/fr ...`);

  await page.goto(`${appUrl}/fr`, {
    waitUntil: 'networkidle',
    timeout: 30000,
  });

  console.log('Page loaded, taking screenshot...');

  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const screenshotPath = path.join(publicDir, 'preview-home.png');

  await page.screenshot({
    path: screenshotPath,
    fullPage: true,
  });

  console.log(`Screenshot saved to ${screenshotPath}`);

  await browser.close();
}

captureHomepage().catch((error) => {
  console.error('Error capturing homepage:', error);
  process.exit(1);
});
