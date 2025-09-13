import styles from "./styles/ContentWrapper.module.css";

interface IContentWrapperProps {
  children: React.ReactNode;
}

const ContentWrapper = ({ children }: IContentWrapperProps) => {
  return <div className={styles.layout}>{children}</div>;
};

export { ContentWrapper };
