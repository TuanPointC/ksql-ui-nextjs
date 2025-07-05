import "./globals.css";
import React from "react";
import Navbar from "@/components/navbar/Navbar";
import './layout.scss';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
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
