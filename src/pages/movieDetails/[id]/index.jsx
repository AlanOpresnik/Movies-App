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
import MovieDetails from "@/components/MovieDetails/MovieDetails";
import ActorsSection from "@/components/MovieDetails/MovieDetailsActorsSection/ActorsSection";
import CompanysSection from "@/components/MovieDetails/MovieDetailsCompanysSection/CompanysSection";
const MovieDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return(
    <>
    <MovieDetails/>
    <ActorsSection id={id}/>
    <CompanysSection/>
    </>
   )
};

export default MovieDetailsPage;
