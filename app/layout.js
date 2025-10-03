import { Instrument_Sans, Instrument_Serif } from "next/font/google";
import { Honk } from 'next/font/google';
import localFont from 'next/font/local';
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-sans",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-serif",
  weight: '400',
});

const ditty = localFont({
  src: '../public/fonts/Ditty/Ditty.ttf',
  variable: '--font-ditty',
  display: 'swap',
});

const honk = Honk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-honk',
  axes: ['MORF', 'SHLN'],
  // These values will be overridden by CSS variables
  axis: 'MORF 15, SHLN 50',
});

export const metadata = {
  title: "Genesis 2025 - The First High School Buildathon",
  description: "Genesis is the first high school buildathon where you go from idea to startup in just 48 hours. Join us October 10-12, 2025 in Toronto, Ontario.",
  keywords: "buildathon, hackathon, high school, startup, entrepreneurship, Toronto, Genesis, 2025",
  authors: [{ name: "Genesis Team" }],
  creator: "Genesis",
  publisher: "Genesis",
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: "Genesis 2025 - The First High School Buildathon",
    description: "Transform your idea into a real startup in just 48 hours. October 10-12, 2025 in Toronto.",
    url: "https://genesis.ca",
    siteName: "Genesis",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    description: "Transform your idea into a real startup in just 48 hours. October 10-12, 2025 in Toronto.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${instrumentSans.variable} ${instrumentSerif.variable} ${ditty.variable} ${honk.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
