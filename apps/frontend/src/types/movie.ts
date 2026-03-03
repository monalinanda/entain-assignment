export interface Movie {
  id: number;
  title: string;
  overview: string;
  posterUrl: string;
  releaseYear: string;
  rating: number;
  genreIds: number[];
}
