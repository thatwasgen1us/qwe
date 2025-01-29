import { useEffect, useState } from 'react';
import Header from './components/Header';
import { Pagination } from 'antd';
import { getRatedMovies, searchMovies } from './store/store';
import MovieList from './components/MovieList';
import { debounce } from 'lodash';

const App = () => {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [rated, setRated] = useState(false);

  const pageSize = 20;

  const mergeMovies = (searchMovies, ratedMovies) => {
    return searchMovies.map(searchMovie => {
      const ratedMovie = ratedMovies ? ratedMovies.find(rated => rated.id === searchMovie.id) : null;
      return ratedMovie ? { ...searchMovie, ...ratedMovie } : searchMovie;
    });
  };

  const fetchData = async (searchTerm, page) => {
    setLoading(true);
    setError(false);
    try {
      if (rated) {
        const body = await getRatedMovies();
        setFilms(body.results || []);
        setTotalResults(body.total_results || []);
      } else {
        if (!searchTerm) {
          setFilms([]);
          setTotalResults(0);
          return;
        }
        const bodyRated = await getRatedMovies();
        const body = await searchMovies(searchTerm, page);
        const result = mergeMovies(body.results, bodyRated.results);
        setFilms(result);
        setTotalResults(body.total_results);
      }
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchData = debounce((searchTerm, page) => fetchData(searchTerm, page), 500);

  useEffect(() => {
    debouncedFetchData(search, currentPage);

    return () => {
      debouncedFetchData.cancel();
    };
  }, [search, currentPage, rated]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const onRated = () => {
    setRated(true);
    setCurrentPage(1);
    fetchData(search, 1);
  };

  const onSearch = () => {
    setRated(false);
    setCurrentPage(1);
    fetchData(search, 1);
  };

  return (
    <div className='container flex flex-col h-screen mx-auto'>
      <Header setSearch={setSearch} onSearch={onSearch} onRated={onRated} rated={rated} />
      <main className='flex flex-col items-center justify-center grow'>
        <MovieList loading={loading} films={films} error={error} search={search} />
      </main>
      <Pagination
        align="center"
        current={currentPage}
        pageSize={pageSize}
        total={totalResults}
        onChange={handlePageChange}
        className='mb-4 mt-9'
        showSizeChanger={false}
        itemRender={(page, type, originalElement) => {
          if (type === 'page') {
            return <a>{page}</a>;
          }
          return originalElement;
        }}
      />
    </div>
  );
};

export default App;

