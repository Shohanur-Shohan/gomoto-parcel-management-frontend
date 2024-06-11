import styles from "./Loader.module.css";
const Loader = () => {
  return (
    <div className="flex h-[100vh] w-full items-center justify-center">
      <div className={styles.loading}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Loader;
