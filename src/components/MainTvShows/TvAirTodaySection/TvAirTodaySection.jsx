import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from 'swiper/modules';



import { UseTvContext } from "@/context/TvContext/TvContext";
import TvPosterAirToday from "./TvPosterAirToday";

const TvAirTodaySection = () => {
  const { AirToday, fechMoreTvShowsAirToday } = UseTvContext();

  const [activeSlide, setActiveSlide] = useState(0);
  const [actionActivated, setActionActivated] = useState(false);

  const handleSwiperSlideChange = (swiper) => {
    setActiveSlide(swiper.activeIndex);

    // Verifica si el índice del slider es 21 y esta en la última página
    if (activeSlide >= 20 && !actionActivated) {
      fechMoreTvShowsAirToday();
      setActionActivated(true);
    }
  };

  return (
    <div className="w-full md:max-w-[1580px]">
      <h2 className="py-6">Tv shows que se emiten hoy</h2>
      <Swiper
        slidesPerView={1}
        onSlideChange={handleSwiperSlideChange}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        className="mySwiper"
        keyboard={true}
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
            slidesPerView: 4.3,
            spaceBetween: 30,
          },
          980: {
            slidesPerView: 4.4,
            spaceBetween: 30,
          },
          1025: {
            slidesPerView: 4.6,
            spaceBetween: 30,
          },
          1065: {
            slidesPerView: 4.8,
            spaceBetween: 30,
          },
          1135: {
            slidesPerView: 5.2,
            spaceBetween: 30,
          },
          1235: {
            slidesPerView: 5.4,
            spaceBetween: 30,
          },
          1295: {
            slidesPerView: 5.6,
            spaceBetween: 30,
          },
          1325: {
            slidesPerView: 5.8,
            spaceBetween: 30,
          },
          1325: {
            slidesPerView: 5.8,
            spaceBetween: 30,
          },
          1425: {
            slidesPerView: 6.2,
            spaceBetween: 30,
          },
          1525: {
            slidesPerView: 6.4,
            spaceBetween: 30,
          },
          1625: {
            slidesPerView: 6.8,
            spaceBetween: 30,
          },
          1725: {
            slidesPerView: 7,
            spaceBetween: 30,
          },
        }}
      >
        {AirToday?.map((tvAir, index) => (
          <SwiperSlide key={index}>
            <TvPosterAirToday tvAir={tvAir} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TvAirTodaySection;
