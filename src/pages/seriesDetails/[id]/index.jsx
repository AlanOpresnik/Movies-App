import { useRouter } from "next/router";
import React, { useEffect } from "react";

import MovieDetails from "@/components/MovieDetails/MovieDetails";
import ActorsSection from "@/components/MovieDetails/MovieDetailsActorsSection/ActorsSection";
import CompanysSection from "@/components/MovieDetails/MovieDetailsCompanysSection/CompanysSection";
import Divider from "@/components/DividerMovieDetails/Divider";
import Footer from "@/components/Footer/Footer";
import ActorsTVSection from "@/components/MainTvShows/TvShowsDetails/ActorsTVSection";
import TvDetails from "@/components/MainTvShows/TvShowsDetails/TvDetails";
import TvCompanySection from "@/components/MainTvShows/TvShowsDetails/TvCompanySection";
import TvSeasonsSection from "@/components/MainTvShows/TvShowsDetails/TvSeasonsSection";
import TvCreator from "@/components/MainTvShows/TvShowsDetails/TvCreator";
const MovieDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
    <TvDetails id={id}/>
      <TvSeasonsSection id={id}/>
      <TvCreator/>
      <ActorsTVSection id={id} />
      <TvCompanySection />
      <Divider />
      <Footer></Footer>
    </>
  );
};

export default MovieDetailsPage;
