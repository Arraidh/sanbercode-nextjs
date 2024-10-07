import Layout from "@/layout";
import styles from "@/styles/Home.module.css";
import dynamic from "next/dynamic";
import Link from "next/link";

const DynamicLayout = dynamic(() => import("@/layout"));

export default function DetailChessGM({ gmPlayer }) {
  console.log(gmPlayer);
  return (
    <div className={`${styles.page}`}>
      <DynamicLayout
        metaTitle={"Chess Grand Master Detail"}
        metaDescription={
          "Sanber code intensive Next JS Bootcamp Batch 60 covering intermediate javascript framework practical approach. Made by Kadek Ari Dharmika"
        }
      >
        <div className="container flex flex-col gap-4 items-center justify-center">
          <h1>Chess Player Grand Master {gmPlayer.username}</h1>
          <table>
            <tbody>
              <tr>
                <th>Status :</th>
                <td> {gmPlayer.status}</td>
              </tr>
              <tr>
                <th>League :</th>
                <td> {gmPlayer.league}</td>
              </tr>
              <tr>
                <th>Followers :</th>
                <td> {gmPlayer.followers}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </DynamicLayout>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch("https://api.chess.com/pub/titled/GM");
  const gmPlayer = await res.json();

  const paths = gmPlayer.players.map((player) => ({
    params: {
      username: player,
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { username } = context.params;
  const res = await fetch(`https://api.chess.com/pub/player/${username}`);
  const gmPlayer = await res.json();
  return { props: { gmPlayer } };
}
