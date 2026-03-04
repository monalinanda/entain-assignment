import type { Genre } from '../../store/api/moviesApi';
import styles from './GenreFilter.module.css';

interface GenreFilterProps {
  genres: Genre[];
  selectedGenreId: number | null;
  onSelect: (genreId: number | null) => void;
}

function GenreFilter({ genres, selectedGenreId, onSelect }: GenreFilterProps) {
  return (
    <div className={styles.wrapper} role="group" aria-label="Filter by genre">
      <button
        className={`${styles.chip} ${selectedGenreId === null ? styles.active : ''}`}
        onClick={() => onSelect(null)}
        type="button"
      >
        All
      </button>
      {genres.map((genre) => (
        <button
          key={genre.id}
          className={`${styles.chip} ${selectedGenreId === genre.id ? styles.active : ''}`}
          onClick={() => onSelect(genre.id)}
          type="button"
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}

export default GenreFilter;
