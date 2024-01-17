import React from "react";
import Navbar from "../Navbar/Navbar";
import { MoviesContextProvider } from "@/context/MovieContext/MoviesContext";
import { TvContextProvider } from "@/context/TvContext/TvContext";
import { PopularContextProvider } from "@/context/PopularMoviesContext/PopularMoviesContext";

const Layout = ({ children }) => {
  return (
    <TvContextProvider>
      <MoviesContextProvider>
        <PopularContextProvider>
          <Navbar />

          <div className="bg-black w-full   h-[100vh]">{children}</div>
        </PopularContextProvider>
      </MoviesContextProvider>
    </TvContextProvider>
  );
};

export default Layout;
