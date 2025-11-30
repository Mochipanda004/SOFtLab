import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/navigation";
import { Toaster } from "sonner";
import { ChatbotWidget } from "@/components/chatbot-widget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Academia Melody Labs - Aprende música con los mejores profesores",
  description:
    "Plataforma educativa musical con cursos de guitarra, piano, canto, batería y más. Aprende con profesores profesionales. Certificación oficial.",
  keywords:
    "academia de música, cursos de música, guitarra, piano, canto, batería, música online, profesores de música",
  authors: [{ name: "Academia Melody Labs" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Academia Melody Labs - Aprende música con los mejores profesores",
    description:
      "Plataforma educativa musical con cursos de guitarra, piano, canto, batería y más. Aprende con profesores profesionales. Certificación oficial.",
    type: "website",
    locale: "es_CO",
    siteName: "Academia Melody Labs",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#2563eb" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
        role="document"
      >
        <div
          id="skip-link"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded"
        >
          <a href="#main-content" className="focus:outline-none">
            Saltar al contenido principal
          </a>
        </div>
        <Navigation />
        <div id="main-content" className="min-h-screen">
          {children}
        </div>
        <Toaster richColors position="top-right" />
        <ChatbotWidget />
      </body>
    </html>
  );
}
