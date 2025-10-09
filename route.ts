import { existsSync } from 'fs';
import { join } from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  const filePath = join(process.cwd(), 'public/gallery/pasmur-rachuiko/pasmur-rachuiko_untitled-90_80x50cm.png');
  const exists = existsSync(filePath);

  return NextResponse.json({ exists });
}
