import type { Metadata } from "next";
import { Sora, Space_Grotesk } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { LocaleProvider, type Locale } from "@/components/LocaleProvider";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jhon Tajumbina | Full-Stack Developer",
  description: "Full-Stack Developer | React · Express · Laravel - Estudiante de Ingeniería de Sistemas",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("locale")?.value;
  const initialLocale: Locale = cookieLocale === "en" ? "en" : "es";

  return (
    <html lang={initialLocale} translate="no" suppressHydrationWarning>
      <head>
        <meta name="google" content="notranslate" />
      </head>
      <body
        suppressHydrationWarning
        className={`${sora.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <LocaleProvider initialLocale={initialLocale}>
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
