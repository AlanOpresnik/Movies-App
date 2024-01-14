import MainMoviesSection from "@/components/MainMoviesSection/MainMoviesSection";
import { useMoviesContxt } from "@/context/MovieContext/MoviesContext";
import { Button, Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StarIcon from "@mui/icons-material/Star";
import WatchLaterIcon from "@mui/icons-material/WatchLater";

import "./loader.css";
const MovieDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const {
    fetchMovieDetails,
    movieDetails,
    URL_IMAGE,
    genres,
    fetchGenres,
    formatearFecha,
    dateMovie,
    loading,
  } = useMoviesContxt();
  useEffect(() => {
    fetchGenres();
    formatearFecha(movieDetails.release_date);
  }, []);
  useEffect(() => {
    if (id) {
      fetchMovieDetails(id);
    }
  }, [id]);

  console.log(movieDetails);
  const getGenreName = (genre) => {
    const genero = genre?.map((genre) => {
      const generoID = genres.find((g) => g.id === genre.id);
      return generoID ? generoID.name : "";
    });
    return genero?.join(" / ");
  };

  if (loading) {
    return (
      <div className="h-[100vh] flex justify-center items-center bg-black w-full">
        <span class="loader"></span>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-full ">
      {movieDetails && (
        <div className="w-full h-[100vh] relative ">
          <Image
            className="w-full h-full object-cover"
            src={`${URL_IMAGE + movieDetails?.backdrop_path}`}
            alt={movieDetails?.title || movieDetails?.name}
            width={100}
            height={100}
          />

          <div className="absolute h-[100vh] text-white inset-0 bg-black opacity-50"></div>

          <div className="relative max-w-[1580px] ml-4  md:mx-auto">
            <div className="absolute bottom-[620px] md:bottom-[750px] right-10 md:right-[90px]">
              <div className="flex items-center gap-2 mb-2  text-white h-[10px]">
                <p className="text-xl flex gap-2 font-bold mb-2 text-white">
                  <StarIcon />
                  {Math.ceil(movieDetails.vote_average)}
                </p>
                <span className="text-md font-bold">/ 10</span>
              </div>
              <div className="absolute hidden md:block h-[200px] w-[200px]  top-[460px]">
                <Image
                  width={300}
                  height={300}
                  alt={movieDetails.title}
                  src={URL_IMAGE + movieDetails.poster_path}
                />
              </div>
              <div className="text-white  flex gap-2 text-md mb-2 ">
                <p className="font-bold">{movieDetails.vote_count} </p>
                <span>Califaciones</span>
              </div>
            </div>

            <div className="absolute bottom-36 w-full ">
              <div className="z-10  md:max-w-[700px] ">
                <p className="text-md text-white">
                  {movieDetails && getGenreName(movieDetails.genres)}
                </p>

                <h3 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl mb-6 max-w-[250px] text-white uppercase font-semibold">
                  {movieDetails.title}
                </h3>
                <p className="text-lg xl:text-xl max-w-[350px] text-white">
                  {movieDetails.overview}
                </p>
                <div className="flex gap-2 mt-6">
                  <p className="text-white">
                    Duration: {movieDetails.runtime} min
                  </p>
                  <WatchLaterIcon sx={{ color: "#dbdbdb" }} />
                  <p className="text-white">{dateMovie}</p>
                </div>
                <div className="my-6">
                  <Button
                    sx={{
                      color: "white",
                      borderColor: "white",
                      "&:hover": {
                        borderColor: "white",
                      },
                    }}
                    variant="outlined"
                    className="hover:scale-105 transition-all duration-300"
                  >
                    Ver ahora
                    <PlayArrowIcon sx={{ color: "white" }} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
