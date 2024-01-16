import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

// Crear el contexto
const MoviesContext = createContext();

// Crear el proveedor del contexto
export const MoviesContextProvider = ({ children }) => {
  const API_KEY = "a41c4738f02c64dfaa5c82049d53de66";
  const API_URL = "https://api.themoviedb.org/3";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";
  const URL_IMAGE = "https://image.tmdb.org/t/p/original";
  const [totalPages, setTotalPages] = useState(2);

  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [trailer, setTrailer] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [movie, setMovie] = useState(null); // Inicializar con null u otro valor por defecto si es apropiado
  const [genres, setGenres] = useState([]);
  const [trailerTv, setTrailerTv] = useState(null);
  const [playingTv, setPlayingTv] = useState(false);
  const [genresTv, setGenresTv] = useState([]);
  const [loading, setIsloading] = useState(true);
  const [movieDetails, setMovieDetails] = useState([]);
  const [dateMovie, setDateMovie] = useState("");
  const [actores, setActores] = useState([]);
  const [videos, setVideos] = useState([]);
  console.log(movie);

  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover";

    try {
      let allResults = [];
      setIsloading(true);
      for (let page = 1; page <= totalPages; page++) {
        const response = await axios(`${API_URL}/${type}/movie`, {
          params: {
            api_key: API_KEY,
            query: searchKey,
            page: page,
          },
        });

        const { results } = response.data;
        allResults = [...allResults, ...results];
        console.log(allResults);
      }

      setMovies(allResults);
      setMovie(allResults[0]);
      setIsloading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const searchMovies = (e) => {
    e.preventDefault();
    fetchMovies(searchKey, 1);
  };

  const fetchGenres = async () => {
    setIsloading(true);
    try {
      const response = await fetch(
        `${API_URL}/genre/movie/list?api_key=${API_KEY}`
      );
      const data = await response.json();
      setGenres(data.genres);
      setIsloading(false);
    } catch (error) {
      console.error("Error fetching genres:", error);
      return [];
    }
  };

  const fetchMovieDetails = async (id) => {
    try {
      setIsloading(true);
      const response = await axios.get(`${API_URL}/movie/${id}`, {
        params: {
          api_key: API_KEY,
        },
      });

      setMovieDetails(response.data);
      setIsloading(false);
    } catch (error) {
      console.error("Error fetching movie details:", error);
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

  const obtenerActoresDePelicula = async (id) => {
    try {
      const response = await fetch(
        `${API_URL}/movie/${id}/credits?api_key=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Error al obtener los datos de los actores.");
      }

      const data = await response.json();
      setActores(data.cast);

      console.log("Actores de la película:", data.cast);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  const getYouTubeTrailerUrl = (video) => {
    if (video.site === "YouTube" && video.type === "Trailer") {
      return `https://www.youtube.com/watch?v=${video.key}`;
    } else {
      // Si no es un trailer de YouTube, puedes manejarlo según tus necesidades
      return null;
    }
  };
  const fetchVideos = async (id) => {
    try {
      const response = await axios.get(
        `${API_URL}/movie/${id}/videos?api_key=${API_KEY}`
      );

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
    <MoviesContext.Provider
      value={{
        movies,
        searchMovies,
        setSearchKey,
        searchKey,
        movie,
        setPlaying,
        setMovie,
        URL_IMAGE,
        fetchMovies,
        fetchGenres,
        genres,
        totalPages,
        setTotalPages,
        fetchMovieDetails,
        movieDetails,
        formatearFecha,
        dateMovie,
        loading,
        obtenerActoresDePelicula,
        actores,
        fetchVideos,
        videos,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

// Crear un hook personalizado para acceder al contexto
export const useMoviesContxt = () => {
  return useContext(MoviesContext);
};
