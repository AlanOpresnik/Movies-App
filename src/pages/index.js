import Layout from "@/components/Layout/Layout";
import MainMoviesSection from "@/components/MainMoviesSection/MainMoviesSection";
import MovieBanner from "@/components/MainMoviesSection/MovieBanner";
import MainTvShowsSection from "@/components/MainTvShows/MainTvShowsSection";
import { useMoviesContxt } from "@/context/MovieContext/MoviesContext";

export default function Home() {

  return (
    <div className="bg-[#000000f5]  text-white">
      <div className="z-1 min-h-[100vh]">
        <MovieBanner />
      </div>
      <div className="mt-6 mx-auto ml-4  md:mx-auto md:max-w-[1580px]">
        <MainTvShowsSection />
      </div>
    </div>
  );
}
