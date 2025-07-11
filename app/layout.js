"use client";

import "./globals.css";
import { useEffect } from "react";
import Navbar from "@/components/navbar/Navbar";
import './layout.scss';
import '@/styles/globals.scss';
import { useThemeStore } from '@/store/index.js';

// export const metadata = {
//   title: "KSQL UI",
//   icons: {
//     icon: [
//       { url: '/favicon_io/favicon.ico' }
//     ],
//     apple: [
//       { url: '/favicon_io/android-chrome-512x512' },
//     ],
//     android: [
//       { url: '/favicon_io/android-chrome-192x192.png' }
//     ],
//   }
// }

export default function RootLayout({ children }) {
  const theme = useThemeStore((state) => state.theme);
  useEffect(() => {
    // Apply the theme from the store on mount
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div className="container">
          <div className="left-block">
            <Navbar />
          </div>
          <div className="right-block">
            <div className="content">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
