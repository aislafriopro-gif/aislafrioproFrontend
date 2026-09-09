import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { QueryProvider, ThemeProvider, SessionProvider } from "@/providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Cortinas industriales de PVC | AislaFrioPro",
    template: "%s | AislaFrioPro",
  },
  description:
    "Instalación de cortinas industriales de PVC para separación de espacios y aislamiento térmico.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <QueryProvider>
            <SessionProvider>
              {children}
            </SessionProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}