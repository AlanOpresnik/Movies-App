
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import { UseTvContext } from "@/context/TvContext/TvContext";
const TvSeasonsSection = ({ id }) => {
  const { fetchTvDetails, TvDetails, URL_IMAGE } = UseTvContext();
  const [actoresCargados, setActoresCargados] = useState(false);

  useEffect(() => {
    const obtenerActores = async () => {
      await fetchTvDetails(id);

      setActoresCargados(true);
    };

    obtenerActores();
  }, [id]);
  return (
    <div className="bg-[#000000f5]   text-white">
      <div className="py-32 pb-12 max-w-[1280px] mx-auto">
        <p className="text-center md:text-start text-4xl font-semibold mb-12 text-[#B6B6B6]">
          Temporadas
        </p>
        <Swiper
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          className="mySwiper"
          modules={[Autoplay]}
          breakpoints={{
            // Define tus breakpoints aquí
            278: {
              slidesPerView: 1.2,
              spaceBetween: 30,
            },
            328: {
              slidesPerView: 1.4,
              spaceBetween: 30,
            },
            358: {
              slidesPerView: 1.6,
              spaceBetween: 30,
            },
            418: {
              slidesPerView: 1.8,
              spaceBetween: 30,
            },
            450: {
              slidesPerView: 2.2,
              spaceBetween: 30,
            },
            520: {
              slidesPerView: 2.4,
              spaceBetween: 30,
            },
            570: {
              slidesPerView: 2.6,
              spaceBetween: 30,
            },
            630: {
              slidesPerView: 2.8,
              spaceBetween: 30,
            },
            660: {
              slidesPerView: 3.1,
              spaceBetween: 30,
            },
            710: {
              slidesPerView: 3.2,
              spaceBetween: 30,
            },
            750: {
              slidesPerView: 3.3,
              spaceBetween: 30,
            },
            780: {
              slidesPerView: 3.4,
              spaceBetween: 30,
            },
            800: {
              slidesPerView: 3.6,
              spaceBetween: 30,
            },
            850: {
              slidesPerView: 3.8,
              spaceBetween: 30,
            },
            870: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
            920: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
        >
          {TvDetails.seasons?.map((season) => 
            <SwiperSlide key={season.id}>
              <div className="relative h-[351px] ">
                <Image
                  className="rounded-lg h-[350px]"
                  width={500}
                  height={500}
                  src={URL_IMAGE + season.poster_path}
              
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 rounded-lg opacity-65"></div>
                <div className="max-w-[200px] mx-auto relative z-20">
                  <h3 className="absolute text-white bottom-8 text-lg font-semibold">
                    {season.name}
                  </h3>
                  <p className="absolute text-white bottom-2 text-sm font-semibold">
                    {season.air_date}
                  </p>
                  {/* Agrega una sombra en la parte inferior */}
                </div>
                <div className="absolute inset-x-0 bottom-0 h-[200px] bg-gradient-to-t from-black to-transparent"></div>
              </div>
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default TvSeasonsSection;
