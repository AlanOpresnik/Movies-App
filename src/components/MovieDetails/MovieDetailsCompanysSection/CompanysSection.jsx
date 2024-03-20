import { useMoviesContxt } from "@/context/MovieContext/MoviesContext";
import React, { useEffect } from "react";
import { Element } from "react-scroll";

// import "./animate.css"
const CompanysSection = () => {
  const { movieDetails } = useMoviesContxt();
  function formatMoney(amount) {
    return amount?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  }

  useEffect(() => {
    const handleScroll = () => {
      const element = document.querySelector(".animated-section");
      if (element) {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

        if (isVisible) {
          element.classList.add("active");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="bg-black">
      <Element name="animatedSection" className="animated-section">
        <div className="max-w-[1280px] mx-auto flex md:px-0 px-6 flex-col items-center md:items-start justify-between md:flex-row md:justify-between text-[#B6B6B6] py-28">
          <div className="flex flex-col justify-center items-center md:flex md:items-start mb-12">
            <h3 className="text-2xl text-center md:text-start mb-2 font-semibold">
              Compañias en produccion
            </h3>
            {movieDetails?.production_companies?.map((company) => (
              <p key={company.name} className="text-white text-sm py-1">{company.name}</p>
            ))}
          </div>
          <div className="flex flex-col justify-center items-center md:flex md:items-start mb-12">
            <h3 className="text-2xl mb-2 font-semibold">
              Paises en produccion
            </h3>
            {movieDetails?.production_countries?.map((countrie) => (
              <p key={countrie.name} className="text-white text-sm py-1">{countrie.name}</p>
            ))}
          </div>
          <div className="flex flex-col justify-center items-center md:flex md:items-start mb-12">
            <h3 className="text-2xl mb-2 font-semibold">Ingresos generados</h3>

            <p className="text-white text-sm py-1">
              ${formatMoney(movieDetails.revenue)}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center md:flex md:items-start mb-12">
            <h3 className="text-2xl mb-2 font-semibold">Presupuesto incial</h3>

            <p className="text-white text-sm py-1">
              {formatMoney(movieDetails.budget)}
            </p>
          </div>
        </div>
      </Element>
    </div>
  );
};

export default CompanysSection;
