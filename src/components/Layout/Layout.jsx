import React from "react";
import Navbar from "../Navbar/Navbar";
import { MoviesContextProvider } from "@/context/MovieContext/MoviesContext";

const Layout = ({ children }) => {
  return (
    <MoviesContextProvider>
        <Navbar />
    
        {children}
  
      </MoviesContextProvider>
  );
};

export default Layout;
