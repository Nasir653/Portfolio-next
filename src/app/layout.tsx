import "tailwindcss/index.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

const letterNFavicon = new URL("../assets/letter-n.png", import.meta.url);
const ogImage = "/Logo-dark.png";

export const metadata: Metadata = {
  title: "Nasir Malik | Software Engineer Portfolio",
  description:
    "Portfolio of Nasir Malik, a software engineer specializing in Next.js, React, TypeScript, and modern web application development. Explore projects, skills, experience, and contact details.",

  keywords: [
    "Nasir Malik",
    "Aadi",
    "Aadi Malik",
    "Software Engineer Portfolio",
    "Nasir",
    "Malik",
    "Software Engineer",
    "Full Stack Developer",
    "Frontend Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript Developer",
    "JavaScript Developer",
    "Web Developer Portfolio",
    "Software Engineer Portfolio",
    "Next.js Portfolio",
    "React Portfolio",
    "Freelance Developer",
    "Modern Web Applications",
  ],

  authors: [
    {
      name: "Nasir Malik",
    },
  ],

  creator: "Nasir Malik",
  publisher: "Nasir Malik",

  metadataBase: new URL("https://nasirmalik.vercel.app/"),

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Nasir Malik | Software Engineer Portfolio",
    description:
      "Explore the portfolio of Nasir Malik, a software engineer building high-performance web applications with Next.js, React, and TypeScript.",
    url: "https://nasirmalik.vercel.app/",
    siteName: "Nasir Malik Portfolio",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Nasir Malik Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Nasir Malik | Software Engineer Portfolio",
    description:
      "Portfolio of Nasir Malik — Software Engineer specializing in Next.js, React, and TypeScript.",
    images: [ogImage],
    creator: "@nasirmalik",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      {
        url: letterNFavicon,
        type: "image/png",
        sizes: "64x64",
      },
    ],
    shortcut: letterNFavicon,
    apple: letterNFavicon,
  },
  category: "technology",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen overflow-x-hidden bg-slate-50 font-sans text-slate-950 antialiased transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
