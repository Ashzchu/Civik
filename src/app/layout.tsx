import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Civik — Your City. Your Quest. Level Up Your World.",
  description:
    "Turn everyday civic actions into thrilling rewards. Snap proof, get verified by AI, earn Civic Points, and lead your city leaderboard.",
  keywords: [
    "civic engagement",
    "community quests",
    "gamified civic rewards",
    "AI verification",
    "Civik app",
  ],
  authors: [{ name: "Civik Inc." }],
};

import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Chelsea+Market&family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
