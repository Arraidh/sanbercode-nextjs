import Layout from "@/layout";
import styles from "@/styles/Home.module.css";
import dynamic from "next/dynamic";
import Link from "next/link";

const DynamicLayout = dynamic(() => import("@/layout"));

export default function ChessGM({ erikClubs }) {
  const renderedClub = erikClubs.clubs.slice(0, 10);
  console.log(renderedClub);
  return (
    <div className={`${styles.page}`}>
      <DynamicLayout
        metaTitle={"Next JS"}
        metaDescription={
          "Sanber code intensive Next JS Bootcamp Batch 60 covering intermediate javascript framework practical approach. Made by Kadek Ari Dharmika"
        }
      >
        <div className="container flex flex-wrap gap-4 justify-center">
          <h1>Chess Clubs</h1>
          <div className="container flex flex-wrap gap-4">
            {renderedClub.map((player) => (
              <Link href={player.url} target="_blank">
                <button className="bg-white text-black px-6 py-2 rounded-lg">
                  {player.name}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </DynamicLayout>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://api.chess.com/pub/player/erik/clubs");
  const erikClubs = await res.json();
  return { props: { erikClubs } };
}
