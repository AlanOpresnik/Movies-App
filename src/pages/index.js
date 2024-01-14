import Layout from "@/components/Layout/Layout";
import MainMoviesSection from "@/components/MainMoviesSection/MainMoviesSection";
import MovieBanner from "@/components/MainMoviesSection/MovieBanner";

export default function Home() {
  return (
    <div className="bg-[#141414] text-white">
     <div className="z-1 min-h-[100vh]">
        <MovieBanner />
      </div>
      
    </div>
  );
}
