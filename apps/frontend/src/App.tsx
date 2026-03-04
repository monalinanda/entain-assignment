import { useState, useEffect } from 'react';
import Layout from './components/Layout/Layout';
import MovieGrid from './components/MovieGrid/MovieGrid';
import Loader from './components/Loader/Loader';
import GenreFilter from './components/GenreFilter/GenreFilter';
import RecentSearches from './components/RecentSearches/RecentSearches';
import {
  useGetPopularMoviesQuery,
  useSearchMoviesQuery,
  useGetGenresQuery,
  useGetMoviesByGenreQuery,
} from './store/api/moviesApi';
import useDebounce from './hooks/useDebounce';
import useRecentSearches from './hooks/useRecentSearches';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);
  const debouncedQuery = useDebounce(searchQuery, 300);

  const { recentSearches, addSearch, clearSearches } = useRecentSearches();

  const isSearching = debouncedQuery.trim().length > 0;
  const isFilteringByGenre = !isSearching && selectedGenreId !== null;

  // Record a search term once the debounced value settles and is non-empty
  useEffect(() => {
    if (debouncedQuery.trim().length > 0) {
      addSearch(debouncedQuery.trim());
    }
    // addSearch is stable (defined outside render), debouncedQuery drives the effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  // Always fetch genres for the filter bar
  const { data: genresData } = useGetGenresQuery();

  // Priority: search > genre filter > popular
  const popular = useGetPopularMoviesQuery(1, {
    skip: isSearching || isFilteringByGenre,
  });
  const search = useSearchMoviesQuery(
    { query: debouncedQuery.trim(), page: 1 },
    { skip: !isSearching },
  );
  const byGenre = useGetMoviesByGenreQuery(
    { genreId: selectedGenreId ?? 0, page: 1 },
    { skip: !isFilteringByGenre },
  );

  const active = isSearching ? search : isFilteringByGenre ? byGenre : popular;
  const { data, isLoading, isError } = active;

  const isEmpty = !isLoading && !isError && data?.movies.length === 0;

  const handleGenreSelect = (genreId: number | null) => {
    setSelectedGenreId(genreId);
    // Clear search when a genre is selected
    if (genreId !== null) setSearchQuery('');
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    // Clear genre filter when user starts searching
    if (value.trim().length > 0) setSelectedGenreId(null);
  };

  const handleRecentSearchSelect = (term: string) => {
    setSearchQuery(term);
    setSelectedGenreId(null);
  };

  const sidebar = (
    <RecentSearches
      searches={recentSearches}
      onSelect={handleRecentSearchSelect}
      onClear={clearSearches}
    />
  );

  return (
    <Layout searchQuery={searchQuery} onSearchChange={handleSearchChange} sidebar={sidebar}>
      {genresData && (
        <GenreFilter
          genres={genresData.genres}
          selectedGenreId={selectedGenreId}
          onSelect={handleGenreSelect}
        />
      )}
      {isLoading && <Loader />}
      {isError && (
        <p style={{ textAlign: 'center', padding: '80px 24px', color: 'var(--color-text-secondary)' }}>
          Failed to load movies. Please check that the backend is running.
        </p>
      )}
      {isEmpty && (
        <p style={{ textAlign: 'center', padding: '80px 24px', color: 'var(--color-text-secondary)' }}>
          {isSearching
            ? `No movies found for "${debouncedQuery}".`
            : 'No movies found for this genre.'}
        </p>
      )}
      {data && data.movies.length > 0 && <MovieGrid movies={data.movies} />}
    </Layout>
  );
}

export default App;
