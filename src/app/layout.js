import "./globals.css";
import { Playfair_Display, Poppins } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

// Absolute origin for link previews (og:image must be a full URL).
// On Vercel this resolves to the production domain automatically; locally it
// falls back to the deployed domain — update it if you rename the project or
// add a custom domain.
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://forever-us-dusky.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Forever Us ❤️",
  description: "A little website made with a lot of love.",
  // Personal site: keep it out of search engines. Remove this line if you
  // ever want it to be discoverable.
  robots: { index: false, follow: false },
  // Link previews when the URL is shared.
  openGraph: {
    title: "Forever Us ❤️",
    description: "A little website made with a lot of love.",
    type: "website",
    locale: "en_US",
    images: [{ url: "/images/og-cover.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Forever Us ❤️",
    description: "A little website made with a lot of love.",
    images: ["/images/og-cover.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${playfair.variable} ${poppins.variable}`}>
        {children}
      </body>
    </html>
  );
}
