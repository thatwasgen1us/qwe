import axios from "axios";

const apiKey = '59dd80af783e49ceff4c476c65e0d56a';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1OWRkODBhZjc4M2U0OWNlZmY0YzQ3NmM2NWUwZDU2YSIsIm5iZiI6MTczNjQ1NDc3Ni4xNiwic3ViIjoiNjc4MDMyNzg3NzMyMjA5ZTE3YmIzY2IxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.xY2hgvuhkOJsQGxwl_9vCJiH7D5I5JE-mDZ5K50Omfc';

const getGuestSessionId = () => {
  return localStorage.getItem('guest_session_id');
};

const setGuestSessionId = (sessionId) => {
  localStorage.setItem('guest_session_id', sessionId);
};

const fetchFilms = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
};

const searchMovies = async (query, page = 1) => {
  const url = `${BASE_URL}/search/movie`;
  const completeUrl = `${url}?api_key=${apiKey}&query=${encodeURIComponent(query)}&page=${page}`;
  return await fetchFilms(completeUrl);
};

const createGuestSession = async () => {
  let guestSessionId = getGuestSessionId();
  if (!guestSessionId) {
    try {
      const response = await axios.get(`${BASE_URL}/authentication/guest_session/new?api_key=${apiKey}`);
      guestSessionId = response.data.guest_session_id;
      setGuestSessionId(guestSessionId);
      console.log('Создана новая гостевая сессия:', guestSessionId);
    } catch (error) {
      console.error('Ошибка при создании гостевой сессии:', error);
      throw error;
    }
  }
  return guestSessionId;
};

const addRating = async (movieId, rating, sessionId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/movie/${movieId}/rating`,
      {
        value: `${rating}`,
      },
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
        params: {
          guest_session_id: sessionId,
        },
      },
    );
    console.log('Успешно добавлен рейтинг для фильма:', response.data);
    return response.data;
  } catch (error) {
    console.error('Ошибка при добавлении рейтинга:', error);
    throw error;
  }
};

const rateMovie = async (movieId, rating) => {
  try {
    const sessionId = await createGuestSession();
    await addRating(movieId, rating, sessionId);
    console.log('sessionId', sessionId);
  } catch (error) {
    console.error('Ошибка при оценивании фильма:', error);
  }
};

const getRatedMovies = async () => {
  try {
    const sessionId = getGuestSessionId(); // Убедитесь, что эта функция возвращает корректный sessionId
    const response = await axios.get(`${BASE_URL}/guest_session/${sessionId}/rated/movies`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_TOKEN}`
      }
    });
    return response.data; // Убедитесь, что вы правильно обрабатываете возвращенные данные
  } catch (error) {
    return []; 
  }
};

export { fetchFilms, searchMovies, createGuestSession, getRatedMovies, rateMovie };
