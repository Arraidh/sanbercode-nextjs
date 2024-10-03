import Layout from "@/layout";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";

export default function UserByName() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className={`${styles.page}`}>
      <Layout metaTitle={`User ${id}`}>User Named {id}</Layout>
    </div>
  );
}
