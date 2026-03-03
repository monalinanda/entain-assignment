import type { Movie } from '../../types/movie';
import styles from './MovieCard.module.css';

interface MovieCardProps {
  movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
  const { title, posterUrl, releaseYear, rating, overview } = movie;

  return (
    <article className={styles.card}>
      <div className={styles.posterWrapper}>
        <img
          src={posterUrl}
          alt={`${title} poster`}
          className={styles.poster}
          loading="lazy"
        />
      </div>
      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.year}>{releaseYear}</span>
          <span className={styles.rating}>
            <span className={styles.ratingIcon}>★</span>
            {rating.toFixed(1)}
          </span>
        </div>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.overview}>{overview}</p>
      </div>
    </article>
  );
}

export default MovieCard;
