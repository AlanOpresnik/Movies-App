import { useMoviesContxt } from "@/context/MovieContext/MoviesContext";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const TvPoster = ({ tv }) => {
  const { URL_IMAGE } = useMoviesContxt();
  const router = useRouter();
  return (
    <div
      key={tv.id}
      onClick={() => router.push(`seriesDetails/${tv.id}`)}
      className="mb-3 w-[210px] cursor-pointer  hover:scale-105 duration-300 transition-transform"
    >
      <Image
        height={200}
        width={250}
        alt={tv.name}
        src={`${URL_IMAGE + tv.poster_path}`}
      />
    </div>
  );
};

export default TvPoster;
