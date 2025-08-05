import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "laurent del rey - internet designer",
  description: "this is my journey",
  openGraph: {
    title: "laurent del rey - internet designer",
    description: "this is my journey",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "laurent del rey - internet designer",
    description: "this is my journey",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
