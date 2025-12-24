import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Рулетка Ведущих",
  description:
    "Честный, веселый и автоматический выбор ведущего встречи для вашей команды",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-oid="b1jifow">
      <body className="antialiased" data-oid="hqec2:a">
        {children}

        <Script
          src="https://cdn.jsdelivr.net/gh/onlook-dev/onlook@d3887f2/apps/web/client/public/onlook-preload-script.js"
          strategy="afterInteractive"
          type="module"
          id="onlook-preload-script"
          data-oid="qkaaltf"
        ></Script>
      </body>
    </html>
  );
}
