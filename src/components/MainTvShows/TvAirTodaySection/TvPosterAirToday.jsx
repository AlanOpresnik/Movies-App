import { useMoviesContxt } from "@/context/MovieContext/MoviesContext";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const TvPosterAirToday = ({ tvAir }) => {
  const { URL_IMAGE } = useMoviesContxt();
  const router = useRouter();
  return (
    <div
      key={tvAir.id}
      onClick={() => router.push(`seriesDetails/${tvAir?.id}`)}
      className="mb-3 w-[210px] cursor-pointer  hover:scale-105 duration-300 transition-transform"
    >
      <Image
        height={200}
        width={250}
        alt={tvAir?.name}
        src={`${URL_IMAGE + tvAir?.poster_path}`}
      />
    </div>
  );
};

export default TvPosterAirToday;
