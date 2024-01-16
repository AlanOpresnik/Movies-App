import React from "react";
import Navbar from "../Navbar/Navbar";
import { MoviesContextProvider } from "@/context/MovieContext/MoviesContext";
import { TvContextProvider } from "@/context/TvContext/TvContext";

const Layout = ({ children }) => {
  return (
    <TvContextProvider>
      <MoviesContextProvider>
        <Navbar />

        <div className="bg-black w-full   h-[100vh]">{children}</div>
      </MoviesContextProvider>
    </TvContextProvider>
  );
};

export default Layout;
