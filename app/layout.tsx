import "./globals.css";
import { Syne, Space_Grotesk, EB_Garamond } from "next/font/google";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ui",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-editorial",
});

export const metadata = { title: "ADEPT", description: "Association ADEPT" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${syne.variable} ${spaceGrotesk.variable} ${ebGaramond.variable}`}>
      <body className="min-h-screen bg-black text-white antialiased font-ui">
        {children}
      </body>
    </html>
  );
}
