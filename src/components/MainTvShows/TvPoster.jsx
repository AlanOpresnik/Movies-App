import { useMoviesContxt } from "@/context/MovieContext/MoviesContext";
import Image from "next/image";
import React from "react";

const TvPoster = ({ tv }) => {
  const { URL_IMAGE } = useMoviesContxt();
  return (
    <div key={tv.id} className="mb-3 w-[210px]">
      <Image
        height={200}
        width={250}
        src={`${URL_IMAGE + tv.poster_path}`}
      />
    </div>
  );
};

export default TvPoster;
