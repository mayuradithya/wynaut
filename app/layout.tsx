import type { Metadata } from "next";
import "./globals.css";
import CircleCursor from "./components/CircleCursor";

export const metadata: Metadata = {
  title: "Wynaut - Portfolio Framer Template",
  description:
    "Wynaut is a refined portfolio template designed for photographers and videographers. It features a minimal, cinematic layout that highlights visual storytelling through timeless design and smooth transitions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/wynaut-logo.png" />
        <link rel="apple-touch-icon" href="/wynaut-logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300;0,400;1,300;1,400&family=Geist:wght@600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CircleCursor />
        {children}
      </body>
    </html>
  );
}
