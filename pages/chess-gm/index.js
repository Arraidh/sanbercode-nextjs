import Layout from "@/layout";
import styles from "@/styles/Home.module.css";
import dynamic from "next/dynamic";
import Link from "next/link";

const DynamicLayout = dynamic(() => import("@/layout"));

export default function ChessGM({ gmPlayer }) {
  const renderedGMPlayer = gmPlayer.players.slice(0, 10);
  console.log(renderedGMPlayer);
  return (
    <div className={`${styles.page}`}>
      <DynamicLayout
        metaTitle={"Next JS"}
        metaDescription={
          "Sanber code intensive Next JS Bootcamp Batch 60 covering intermediate javascript framework practical approach. Made by Kadek Ari Dharmika"
        }
      >
        <div className="container flex flex-wrap gap-4 justify-center">
          <h1>Chess Player Grand Master</h1>
          <div className="container flex flex-wrap gap-4">
            {renderedGMPlayer.map((player) => (
              <Link href={`/chess-gm/${player}`}>
                <button className="bg-white text-black px-6 py-2 rounded-lg">
                  {player}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </DynamicLayout>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://api.chess.com/pub/titled/GM");
  const gmPlayer = await res.json();
  return { props: { gmPlayer } };
}
