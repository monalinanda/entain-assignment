import type { Movie } from '../interfaces/movie.interface';

export class MovieResponseDto {
  movies: Movie[];
  page: number;
  totalPages: number;
}
