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

  const [movies, setMovies] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [trailer, setTrailer] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [movie, setMovie] = useState(null); // Inicializar con null u otro valor por defecto si es apropiado
  const [genres, setGenres] = useState([]);
  console.log(movie);

  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover";
    const totalPages = 2;

    try {
      let allResults = [];

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
      }

      console.log("All results from API:", allResults);

      setMovies(allResults);
      setMovie(allResults[0]);
      console.log(allResults[0]);
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
    try {
      const response = await fetch(
        `${API_URL}/genre/movie/list?api_key=${API_KEY}`
      );
      const data = await response.json();
      setGenres(data.genres);
      console.log(data.genres);
    } catch (error) {
      console.error("Error fetching genres:", error);
      return [];
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
