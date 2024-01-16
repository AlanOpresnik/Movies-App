import { useMoviesContxt } from "@/context/MovieContext/MoviesContext";
import { UsePopularContext } from "@/context/PopularMoviesContext/PopularMoviesContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const PopularPoster = ({ movie }) => {
  const { URL_IMAGE } = UsePopularContext();
  const router = useRouter();
  return (
    <div
      key={movie?.id}
      onClick={() => router.push(`movieDetails/${movie.id}`)}
      className="mb-3 w-[210px] cursor-pointer  hover:scale-105 duration-300 transition-transform"
    >
      <Image
        alt={movie?.title}
        height={200}
        width={250}
        src={`${URL_IMAGE + movie?.poster_path}`}
      />
    </div>
  );
};

export default PopularPoster;
