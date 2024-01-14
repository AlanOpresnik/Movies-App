import React from "react";
import Navbar from "../Navbar/Navbar";
import { MoviesContextProvider } from "@/context/MovieContext/MoviesContext";

const Layout = ({ children }) => {
  return (
    <MoviesContextProvider>
      <Navbar />

      <div className="bg-black w-full   h-[100vh]">{children}</div>
    </MoviesContextProvider>
  );
};

export default Layout;
