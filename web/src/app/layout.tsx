import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import NavBar from "@/layout/NavBar";
import ContentBox from "@/layout/ContentBox";
import Footer from "@/layout/Footer";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ClarityScan",
  description:
    "Easily enhance brain MRI Scans and diagnose lower grade glioma tumors using Deep Learning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <NavBar />
        <ContentBox>{children}</ContentBox>
        <Footer />
      </body>
    </html>
  );
}
