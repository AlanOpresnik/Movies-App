import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const TvContext = createContext();

export const TvContextProvider = ({ children }) => {
  const API_KEY = "a41c4738f02c64dfaa5c82049d53de66";
  const API_URL = "https://api.themoviedb.org/3";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";
  const URL_IMAGE = "https://image.tmdb.org/t/p/original";
  const [totalPages, setTotalPages] = useState(2);

  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [trailer, setTrailer] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [movie, setMovie] = useState(null);
  const [genres, setGenres] = useState([]);
  const [Tvs, SetTvs] = useState([]);
  const [trailerTv, setTrailerTv] = useState(null);
  const [playingTv, setPlayingTv] = useState(false);
  const [Tv, setTv] = useState(null);
  const [genresTv, setGenresTv] = useState([]);
  const [loading, setIsloading] = useState(true);
  const [movieDetails, setMovieDetails] = useState([]);
  const [dateMovie, setDateMovie] = useState("");
  const [actores, setActores] = useState([]);
  const [videos, setVideos] = useState([]);

  const fetchTVShows = async (searchKey, page = 1) => {
    setIsloading(true);
    const type = searchKey ? "search" : "discover";
    const API_KEY = "a41c4738f02c64dfaa5c82049d53de66";
    const API_URL = "https://api.themoviedb.org/3";
    const IMAGE_PATH = "https://image.tmdb.org/t/p/original";
    const URL_IMAGE = "https://image.tmdb.org/t/p/original";

    try {
      let allResults = [];
      for (let page = 1; page <= totalPages; page++) {
        const response = await axios.get(`${API_URL}/${type}/tv`, {
          params: {
            api_key: API_KEY,
            query: searchKey,
            page: page,
          },
        });
        const { results } = response.data;
        allResults = [...allResults, ...results];
        SetTvs(allResults);
        setIsloading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTVShows();
  }, []);
  const fechMoreTvShows = () => {
    setTotalPages(totalPages + 1);
  };
  useEffect(() => {
    fetchTVShows();
  }, [totalPages]);
  return (
    <TvContext.Provider
      value={{
        movies,
        setSearchKey,
        searchKey,
        movie,
        setPlaying,
        setMovie,
        URL_IMAGE,
        genres,
        fetchTVShows,
        Tvs,
        SetTvs,
        totalPages,
        setTotalPages,
        fechMoreTvShows,
        movieDetails,
        dateMovie,
        loading,
        actores,
        videos,
      }}
    >
      {children}
    </TvContext.Provider>
  );
};

export const UseTvContext = () => {
  return useContext(TvContext);
};
