import styles from './RecentSearches.module.css';

interface RecentSearchesProps {
  searches: string[];
  onSelect: (term: string) => void;
  onClear: () => void;
}

function RecentSearches({ searches, onSelect, onClear }: RecentSearchesProps) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <h2 className={styles.title}>Recent Searches</h2>
        {searches.length > 0 && (
          <button className={styles.clearBtn} onClick={onClear} aria-label="Clear all recent searches">
            Clear all
          </button>
        )}
      </div>

      {searches.length === 0 ? (
        <p className={styles.empty}>No recent searches</p>
      ) : (
        <ul className={styles.list}>
          {searches.map((term) => (
            <li key={term} className={styles.item}>
              <button className={styles.termBtn} onClick={() => onSelect(term)}>
                <span className={styles.icon} aria-hidden="true">
                  &#128269;
                </span>
                <span className={styles.term}>{term}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

export default RecentSearches;
