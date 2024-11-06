import "./globals.css";
import data from "@/lib/data";
import dayjs from "dayjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import relativeTime from "dayjs/plugin/relativeTime";
import { Analytics } from "@vercel/analytics/react";
import { cn } from "@/lib/utils";

dayjs.extend(relativeTime);

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const story = data.story;
const app_name = "Developer Story";
const title = `${story.name} - ${app_name}`;
export const metadata: Metadata = {
  title: title,
  description: story.description,
  twitter: {
    card: "summary_large_image",
    site: story.website,
    title: title,
    description: story.description,
    images: { url: story.image_url, alt: story.description },
  },
  openGraph: {
    type: "website",
    siteName: app_name,
    title: title,
    description: story.description,
    images: [
      {
        url: story.image_url,
        alt: story.description,
      },
    ],
    url: story.website,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
