import Layout from "@/layout";
import styles from "@/styles/Home.module.css";

export default function Profile() {
  return (
    <div className={`${styles.page}`}>
      <Layout metaTitle={"Profile Page"}>
        <button className="bg-blue-900 px-8 py-2">Profile Page</button>
      </Layout>
    </div>
  );
}
