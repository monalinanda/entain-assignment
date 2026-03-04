export interface Genre {
  id: number;
  name: string;
}

export class GenresResponseDto {
  genres: Genre[];
}
