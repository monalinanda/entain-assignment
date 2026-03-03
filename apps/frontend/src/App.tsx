import Layout from './components/Layout/Layout';
import MovieGrid from './components/MovieGrid/MovieGrid';
import { dummyMovies } from './data/dummyMovies';

function App() {
  return (
    <Layout>
      <MovieGrid movies={dummyMovies} />
    </Layout>
  );
}

export default App;
