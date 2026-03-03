import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <h1 className={styles.title}>Movie Library</h1>
        <div className={styles.searchWrapper}>
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Search movies..."
            aria-label="Search movies"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
