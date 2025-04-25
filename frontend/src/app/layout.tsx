import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "@/styles/globals.css";
import "keen-slider/keen-slider.min.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Calculadora de Carbono",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
