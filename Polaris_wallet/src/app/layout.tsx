import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { type ReactNode } from "react";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: {
    icon: "/icon.ico",
  },
  title: "Polaris Wallet",
  description: "Polaris Wallet",
  twitter: {
    title: "Polaris Wallet",
    description: "Polaris wallet",
    images:
      "https://coinbase-smart-wallet-create-connect-sign.vercel.app/ogp.png",
  },
  openGraph: {
    title: "Polaris Wallet",
    description: "Polaris Wallet",
    images:
      "https://coinbase-smart-wallet-create-connect-sign.vercel.app/ogp.png",
  },
};

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en">
      {/* <Head>
        <link rel="icon" href="/icon.ico" />
      </Head> */}
      <body className={inter.className}>
        <Providers>{props.children}</Providers>
      </body>
    </html>
  );
}
