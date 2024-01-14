import { useMoviesContxt } from "@/context/MovieContext/MoviesContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const MoviePoster = ({ movie }) => {
  const { URL_IMAGE } = useMoviesContxt();
  const router = useRouter();
  return (
    <div
      key={movie.id}
      onClick={()=> router.push(`movieDetails/${movie.id}`)}
      className="mb-3 w-[210px] cursor-pointer  hover:scale-105 duration-300 transition-transform"
    >
      <Image
      
        height={200}
        width={250}
        src={`${URL_IMAGE + movie.poster_path}`}
      />
    </div>
  );
};

export default MoviePoster;
