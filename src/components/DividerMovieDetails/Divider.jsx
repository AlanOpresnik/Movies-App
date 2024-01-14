import Image from "next/image";
import React, { useEffect } from "react";
import michi from "../../../public/michi.png";
import { Button } from "@mui/material";

import "./animate.css";
import { Element } from "react-scroll";
import { useRouter } from "next/navigation";

const Divider = () => {
    const router = useRouter()
  useEffect(() => {
    const handleScroll = () => {
        const element = document.querySelector(".animated-section-divider");
        if (element) {
          const rect = element.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
          if (isVisible) {
            element.classList.add("active");
          }
        }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="bg-black h-[350px]">
      <Element name="animatedSection" className="animated-section-divider">
        <div className="flex justify-center flex-col items-center z-40">
          <div className="">
            <Image width={200} height={200} src={michi} />
          </div>
          <div className="flex flex-col text-[#B6B6B6] font-semibold text-xl text-center">
            <p>¿Sigues buscando algo que ver?</p>
            <p>Revisa nuestro catalogo</p>
          </div>
          <Button
          onClick={() => router.push("/")}
            className="mt-6 text-sm py-4 rounded-xl"
            variant="outlined"
            sx={{ borderColor: "#B6B6B6" }}
          >
            Ver mas peliculas
          </Button>
        </div>
      </Element>
    </div>
  );
};

export default Divider;
