import { UseTvContext } from "@/context/TvContext/TvContext";
import Image from "next/image";
import React from "react";

const TvCreator = () => {
  const { TvDetails, URL_IMAGE } = UseTvContext();
  return (
    <div className="bg-[#000000f5]   text-white">
      <div className="py-24 max-w-[1280px] mx-auto">
        <p className="text-center md:text-start text-4xl font-semibold mb-12 text-[#B6B6B6]">
          {TvDetails.created_by?.length > 1 ? "Creadores" : "Creador"}
        </p>
        {TvDetails.created_by?.length > 1 ? (
          <div className="flex gap-6  justify-center md:justify-start md:gap-12">
            {TvDetails.created_by?.map((creator) => (
              <div className="relative">
                <Image
                  className="rounded-lg w-[180px] md:w-[260px] md:h-[360px]"
                  width={500}
                  height={500}
                  src={URL_IMAGE + creator.profile_path}
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10 rounded-lg opacity-65"></div>
                <div className="max-w-[200px] mx-auto relative z-20">
                  <h3 className="absolute text-white bottom-8 text-lg font-semibold">
                    {creator.name}
                  </h3>
                  <p className="absolute text-white bottom-2 text-sm font-semibold">
                    {creator.gender === 2 ? "Femenino" : "Masculino"}
                  </p>
                  {/* Agrega una sombra en la parte inferior */}
                </div>
                <div className="absolute inset-x-0 bottom-0 h-[200px] bg-gradient-to-t from-black to-transparent"></div>
              </div>
            ))}
          </div>
        ):"No tenemos informacion de su creador"}
      </div>
    </div>
  );
};

export default TvCreator;
