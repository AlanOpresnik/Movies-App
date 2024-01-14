import { useMoviesContxt } from "@/context/MovieContext/MoviesContext";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import MainMoviesSection from "./MainMoviesSection";
import { Button } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const MovieBanner = () => {
  const { movie, URL_IMAGE, genres, fetchGenres } = useMoviesContxt();
  useEffect(() => {
    fetchGenres();
  }, []);

  const getGenreName = (genreIds) => {
    if (!Array.isArray(genres)) {
      // Manejo en caso de que genres no sea un array
      console.error("Error: genres is not an array");
      return "";
    }

    const genreNames = genreIds.map((genreId) => {
      const genre = genres.find((g) => g.id === genreId);
      console.log("Genre:", genre);
      return genre ? genre.name : "";
    });
    return genreNames.join(" / ");
  };

  return (
    <div className="relative w-full min-h-full ">
      {movie && (
        <div className="w-full h-[100vh] relative ">
          <Image
            className="w-full h-full object-cover"
            src={`${URL_IMAGE + movie?.backdrop_path}`}
            alt={movie?.title || movie?.name}
            width={100}
            height={100}
          />

          <div className="absolute h-[100vh] inset-0 bg-black opacity-50"></div>
          <div className="relative max-w-[1580px] ml-4  md:mx-auto">
            <div className="absolute bottom-0 w-full ">
              <div className="z-10 max-w-[700px] ">
                <p className="">{getGenreName(movie.genre_ids)}</p>
                <h3 className="text-3xl font-semibold">{movie.title}</h3>
                <div className="my-6">
                  <Button className="hover:scale-125 transition-all duration-300">
                    <PlayArrowIcon sx={{ color: "white" }} />
                  </Button>
                </div>
              </div>
              <MainMoviesSection />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default MovieBanner;
