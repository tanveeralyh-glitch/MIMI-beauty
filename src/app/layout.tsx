import type { Metadata, Viewport } from "next";
import { Cinzel, Montserrat } from "next/font/google";
import { Providers } from "./providers";
import { ClientLayout } from "./client-layout";
import "../styles.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-cinzel",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MIMIbeauty · Luxury Skincare",
  description:
    "MIMIbeauty crafts small-batch luxury skincare with botanical actives and clinical results. Reveal your natural beauty.",
  openGraph: {
    title: "MIMIbeauty · Luxury Skincare",
    description: "Small-batch luxury skincare with botanical actives and clinical results.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/mimi-beauty-favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${cinzel.variable} ${montserrat.variable}`}>
      <body className={montserrat.className}>
        <Providers>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
