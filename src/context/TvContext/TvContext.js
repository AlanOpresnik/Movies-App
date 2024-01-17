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
  const [genres, setGenres] = useState([]);
  const [Tvs, SetTvs] = useState([]);
  const [trailerTv, setTrailerTv] = useState(null);
  const [playingTv, setPlayingTv] = useState(false);
  const [Tv, setTv] = useState(null);
  const [genresTv, setGenresTv] = useState([]);
  const [loading, setIsloading] = useState(true);
  const [TvDetails, setTvDetails] = useState([]);
  const [dateMovie, setDateMovie] = useState("");
  const [actores, setActores] = useState([]);
  const [videos, setVideos] = useState([]);
  const [AirToday, setAirToday] = useState([]);

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


  const fetchTVShowsAirToday = async (searchKey, page = 1) => {
    setIsloading(true);
    const type = searchKey ? "search" : "discover";
    const API_KEY = "a41c4738f02c64dfaa5c82049d53de66";
    const API_URL = "https://api.themoviedb.org/3";
    const IMAGE_PATH = "https://image.tmdb.org/t/p/original";
    const URL_IMAGE = "https://image.tmdb.org/t/p/original";


    try {
      let allResults = [];
      for (let page = 1; page <= totalPages; page++) {
        const response = await axios.get(`${API_URL}/tv/airing_today`, {
          params: {
            api_key: API_KEY,
            query: searchKey,
            page: page,
          },
        });
        const { results } = response.data;
        allResults = [...allResults, ...results];
        setAirToday(allResults);
        setIsloading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTVShowsAirToday();
  }, []);
  const fechMoreTvShowsAirToday = () => {
    setTotalPages(totalPages + 1);
  };
  useEffect(() => {
    fetchTVShowsAirToday();
  }, [totalPages]);


  const fetchGenres = async () => {
    setIsloading(true);
    try {
      const response = await fetch(
        `${API_URL}/genre/tv/list?api_key=${API_KEY}`
      );
      const data = await response.json();
      setGenres(data.genres);
      setIsloading(false);
    } catch (error) {
      console.error("Error fetching genres:", error);
      return [];
    }
  };

  
  const formatearFecha = async (date) => {
    try {
      console.log("Fecha Original:", date);

      // Si date es undefined, no hagas nada y sal del método
      if (date === undefined) {
        return "";
      }

      // Simula un retraso de 1 segundo para esperar la llegada de la fecha (puedes ajustar esto)
      await new Promise((resolve) => setTimeout(resolve, 0));

      const fecha = new Date(date);

      const opcionesDeFormato = { month: "long", year: "numeric" };
      const fechaFormateada = fecha.toLocaleString("es-ES", opcionesDeFormato);

      setDateMovie(fechaFormateada);
    } catch (error) {
      console.error("Error al formatear la fecha:", error);
    }
  };


  const fetchTvDetails = async (id) => {
    try {
      setIsloading(true);
      const response = await axios.get(`${API_URL}/tv/${id}`, {
        params: {
          api_key: API_KEY,
        },
      });

      setTvDetails(response.data);
      setIsloading(false);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  
  const obtenerActoresDeTv = async (id) => {
    try {
      const response = await fetch(
        `${API_URL}/tv/${id}/credits?api_key=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Error al obtener los datos de los actores.");
      }

      const data = await response.json();
      setActores(data.cast);

      console.log("Actores de la tv:", data.cast);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const fetchVideos = async (id) => {
    try {
      const response = await axios.get(
        `${API_URL}/tv/${id}/videos?api_key=${API_KEY}`
      );

      console.log("video")

      if (response.status !== 200) {
        throw new Error("Error al obtener los videos");
      }

      const data = response.data;

      // Filtrar solo los videos que son trailers de YouTube
      const youtubeTrailer = data.results.find(
        (video) => video.site === "YouTube" && video.type === "Trailer"
      );

      // Obtener la URL del primer trailer de YouTube
      const trailerUrl = youtubeTrailer
        ? `https://www.youtube.com/watch?v=${youtubeTrailer.key}`
        : null;

      // Establecer la URL del trailer en el estado
      setVideos(trailerUrl ? [trailerUrl] : []);

      console.log(trailerUrl);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TvContext.Provider
      value={{
        movies,
        setSearchKey,
        searchKey,
        setPlaying,
        URL_IMAGE,
        genres,
        fetchTVShows,
        fetchGenres,
        fetchVideos,
        formatearFecha,
        Tvs,
        SetTvs,
        actores,
        totalPages,
        setTotalPages,
        fechMoreTvShows,
        TvDetails,
        dateMovie,
        loading,
        actores,
        videos,
        obtenerActoresDeTv,
        fetchTvDetails,
        fechMoreTvShowsAirToday,
        AirToday,
      }}
    >
      {children}
    </TvContext.Provider>
  );
};

export const UseTvContext = () => {
  return useContext(TvContext);
};
