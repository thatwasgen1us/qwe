import { Alert, Spin } from 'antd';
import Movie from './Movie';

const MovieList = ({ loading, films, error, search }) => {
  const noResults = search.length > 0 && films.length === 0 && !loading && !error;

  return (
    <>
      {noResults && (
        <Alert message="Упс, нет фильмов по данному запросу" type="error" />
      )}
      {error && !loading && (
        <Alert message="Ошибка при получении данных" type="error" />
      )}
      {loading ? (
        <Spin />
      ) : (
        <ul className='grid items-center justify-center grid-cols-1 my-8 gap-9 md:grid-cols-2'>
          <Movie films={films}/>
        </ul>
      )}
    </>
  );
};

export default MovieList;
