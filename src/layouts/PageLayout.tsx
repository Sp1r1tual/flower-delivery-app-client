import { Outlet } from "react-router-dom";

import { Navbar } from "@/components/navbar/Navbar";

import styles from "./styles/PageLayout.module.css";

const PageLayout = () => {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.mainContent}>
        <Outlet />
      </main>
    </div>
  );
};

export { PageLayout };
