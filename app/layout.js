import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Genesis 2025 - The First High School Buildathon",
  description: "Genesis is the first high school buildathon where you go from idea to startup in just 48 hours. Join us October 10-12, 2025 in Toronto, Ontario.",
  keywords: "buildathon, hackathon, high school, startup, entrepreneurship, Toronto, Genesis, 2025",
  authors: [{ name: "Genesis Team" }],
  creator: "Genesis",
  publisher: "Genesis",
  openGraph: {
    title: "Genesis 2025 - The First High School Buildathon",
    description: "Transform your idea into a real startup in just 48 hours. October 10-12, 2025 in Toronto.",
    url: "https://genesis.ca",
    siteName: "Genesis",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Genesis 2025 - The First High School Buildathon",
    description: "Transform your idea into a real startup in just 48 hours. October 10-12, 2025 in Toronto.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
