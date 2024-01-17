import Footer from "@/components/Footer/Footer";
import Layout from "@/components/Layout/Layout";
import MainMoviesSection from "@/components/MainMoviesSection/MainMoviesSection";
import MovieBanner from "@/components/MainMoviesSection/MovieBanner";
import MainTvShowsSection from "@/components/MainTvShows/MainTvShowsSection";
import TvAirTodaySection from "@/components/MainTvShows/TvAirTodaySection/TvAirTodaySection";
import MainPopularMoviesSection from "@/components/PopularMoviesSection/MainPopularMoviesSection";
import { useMoviesContxt } from "@/context/MovieContext/MoviesContext";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setloading] = useState(true);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setloading(false);
    }, 800);
    return () => clearTimeout(timeoutId);
  }, []);

  if (loading) {
    return (
      <div className="h-[100vh] flex justify-center z-50 items-center bg-black w-full">
        <span class="loader"></span>
      </div>
    );
  }

  return (
    <div className="bg-[#000000f5]  text-white">
      <div className="z-1 min-h-[100vh]">
        <MovieBanner />
      </div>
      <div className="mt-6 mx-auto ml-4  md:mx-auto md:max-w-[1580px]">
        <MainTvShowsSection />
      </div>
      <div className="mt-6 mx-auto ml-4  md:mx-auto md:max-w-[1580px]">
        <MainPopularMoviesSection />
      </div>
      <div className="mt-6 mx-auto ml-4  md:mx-auto md:max-w-[1580px]">
        <TvAirTodaySection />
      </div>
      <Footer></Footer>
    </div>
  );
}
