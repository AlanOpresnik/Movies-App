import { useRouter } from "next/router";
import React, { useEffect } from "react";

import MovieDetails from "@/components/MovieDetails/MovieDetails";
import ActorsSection from "@/components/MovieDetails/MovieDetailsActorsSection/ActorsSection";
import CompanysSection from "@/components/MovieDetails/MovieDetailsCompanysSection/CompanysSection";
import Divider from "@/components/DividerMovieDetails/Divider";
import Footer from "@/components/Footer/Footer";
import TvCreator from "@/components/MainTvShows/TvShowsDetails/TvCreator";
const MovieDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <MovieDetails />
      <ActorsSection id={id} />
      <CompanysSection />
      <Divider />
      <Footer></Footer>
    </>
  );
};

export default MovieDetailsPage;
