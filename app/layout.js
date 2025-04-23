import { Geist, Geist_Mono } from "next/font/google";
import { Jost } from 'next/font/google';
import "./globals.css";
import AnimatedNavbar from "../components/navbar";
import Footer from "../components/footer";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import Head from "next/head";
import Script from 'next/script'
import Link from "next/link";

const geistSans = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

const geistMono = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

export const metadata = {
  title: "Learnmania | Learn & Grow",
  description: "Made by Ehsan Saleem",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script src="https://cdn.jsdelivr.net/npm/cloudinary-video-player@2.3.5/dist/cld-video-player.min.js" crossorigin="anonymous" referrerpolicy="no-referrer"></Script>
      <Script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript" />
      <Script src="https://cdn.jsdelivr.net/npm/cloudinary-video-player@2.3.5/dist/cld-video-player.min.js" crossorigin="anonymous" referrerpolicy="no-referrer"></Script>
      <UserProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <AnimatedNavbar />
          {children}
          <Footer />
        </body>
      </UserProvider>
    </html>
  );
}
