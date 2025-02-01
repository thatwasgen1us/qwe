import { Rate } from 'antd';
import moment from 'moment';
import getGenres from '../store/genres';
import { rateMovie } from '../store/store';
import truncateText from '../utils/truncateText';



const Movie = ({ films }) => {

  const borderColor = (vote) => {
    if (vote <= 3) {
      return `text-xs rounded-full min-w-[30px] h-[30px] flex items-center justify-center border-2 border-[#E90000] self-start`
    } else if (vote <= 5) {
      return `text-xs rounded-full min-w-[30px] h-[30px] flex items-center justify-center border-2 border-[#E97E00] self-start`
    } else if (vote <= 7) {
      return `text-xs rounded-full min-w-[30px] h-[30px] flex items-center justify-center border-2 border-[#E9D100] self-start`
    } else {
      return `text-xs rounded-full min-w-[30px] h-[30px] flex items-center justify-center border-2 border-[#66E900] self-start`
    }
  }

  return (
    <>
      {films.map(el => (
        <li className='max-w-[451px] aspect-video flex shadow max-lg:relative' key={el.id}>
          <img
            src={el.poster_path ? `https://image.tmdb.org/t/p/w500${el.poster_path}` : 'https://cdn.pixabay.com/photo/2022/07/17/19/22/movie-7328179_640.png'}
            alt={el.title}
            className='object-cover w-1/3 max-lg:w-[60px] max-lg:h-[90px] max-lg:absolute max-lg:left-[10px] max-lg:top-[6px]'
          />
          <div className='flex flex-col w-full p-5 gap-y-2 max-lg:px-2 max-lg:py-1'>
            <div className='flex items-center justify-between max-lg:ml-[83px]'>
              <h2 className='text-xl'>
                {truncateText(el.title, 40)}
              </h2>
              <div className={borderColor(el.vote_average.toFixed(1))}>
                {el.vote_average.toFixed(1)}
              </div>
            </div>
            <div className='text-xs text-[#827E7E] max-lg:ml-[83px]'>{moment(el.release_date).format('MMMM d, yyyy')}</div>
            <ul className='flex flex-wrap gap-2 max-lg:ml-[83px]  '>
              {el.genre_ids.length > 0 ? (
                getGenres(el.genre_ids).map((genre, index) => (
                  <li key={el.id + 'genres' + index} className='px-[5px] border border-[#D9D9D9] rounded'>
                    {genre}
                  </li>
                )
                )
              ) : (
                <li className='px-[5px] border border-[#D9D9D9] rounded'>
                  N/A
                </li>
              )}
            </ul>
            <div className='text-container max-h-[228px] flex-grow overflow-hidden w-full max-lg:mt-[10px]'>
              <p className='m-0'>
                {truncateText(el.overview, 80) || "Don't have overview"}
              </p>
            </div>
            <Rate count={10} onChange={(value) => rateMovie(el.id, value)} value={el.rating} className='self-end' />
          </div>
        </li>
      ))}
    </>
  );
};

export default Movie;
