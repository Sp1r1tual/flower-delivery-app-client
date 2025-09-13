import styles from "./styles/Sidebar.module.css";

interface ISideBarProps {
  children: React.ReactNode;
}

const Sidebar = ({ children }: ISideBarProps) => {
  return <aside className={styles.sidebar}>{children}</aside>;
};

export { Sidebar };
