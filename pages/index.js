import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import Layout from "@/layout";
import dynamic from "next/dynamic";

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

const DynamicLayout = dynamic(() => import("@/layout"));

export default function Home() {
  return (
    <>
      <div
        className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
      >
        <DynamicLayout
          metaTitle={"Next JS"}
          metaDescription={
            "Sanber code intensive Next JS Bootcamp Batch 60 covering intermediate javascript framework practical approach. Made by Kadek Ari Dharmika"
          }
        >
          Testing Component
        </DynamicLayout>
      </div>
    </>
  );
}
