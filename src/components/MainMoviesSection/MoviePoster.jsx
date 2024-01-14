import { useMoviesContxt } from "@/context/MovieContext/MoviesContext";
import Image from "next/image";
import React from "react";

const MoviePoster = ({ movie }) => {
  const { URL_IMAGE } = useMoviesContxt();
  return (
    <div key={movie.id} className="mb-3 w-[210px]">
      <Image
        height={200}
        width={250}
        src={`${URL_IMAGE + movie.poster_path}`}
      />
    </div>
  );
};

export default MoviePoster;
