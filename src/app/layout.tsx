import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";

export const metadata: Metadata = {
  title:
    "Troubled Waters: Sailing with AI in Supply Chain | Accelalpha & Oracle",
  description:
    "Join Accelalpha and Oracle on 13th November 2024 at Marriott Resort, The Palm, Dubai for an exclusive physical event discussing digital transformation, warehouse optimization, SCM Innovations, and AI in Gulf Supply Chain & Logistics.",
  keywords:
    "Supply Chain, Logistics, AI, SCM, Oracle, Accelalpha, Event, Marriott Resort, The Palm, Dubai, WMS, Gen AI",
  authors: [{ name: "Cogent Solutions" }],
  openGraph: {
    title:
      "Troubled Waters: Sailing with AI in Supply Chain | Accelalpha & Oracle",
    description:
      "Exclusive physical invitation for supply chain and logistics leaders in the Gulf region.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
