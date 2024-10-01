import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Layout from "@/layout";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <>
      <div
        className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
      >
        <Layout
          metaTitle={"Next JS"}
          metaDescription={
            "Sanber code intensive Next JS Bootcamp Batch 60 covering intermediate javascript framework practical approach. Made by Kadek Ari Dharmika"
          }
        >
          Testing Component
        </Layout>
      </div>
    </>
  );
}
