import Layout from './components/Layout/Layout';
import MovieGrid from './components/MovieGrid/MovieGrid';
import Loader from './components/Loader/Loader';
import { useGetPopularMoviesQuery } from './store/api/moviesApi';

function App() {
  const { data, isLoading, isError } = useGetPopularMoviesQuery(1);

  return (
    <Layout>
      {isLoading && <Loader />}
      {isError && (
        <p style={{ textAlign: 'center', padding: '80px 24px', color: 'var(--color-text-secondary)' }}>
          Failed to load movies. Please check that the backend is running.
        </p>
      )}
      {data && <MovieGrid movies={data.movies} />}
    </Layout>
  );
}

export default App;
