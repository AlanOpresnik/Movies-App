import MainMoviesSection from "@/components/MainMoviesSection/MainMoviesSection";
import { useMoviesContxt } from "@/context/MovieContext/MoviesContext";
import { Button, Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StarIcon from "@mui/icons-material/Star";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import ReactPlayer from "react-player";
import CloseIcon from "@mui/icons-material/Close";
import { UseTvContext } from "@/context/TvContext/TvContext";

const TvDetails = () => {
  const router = useRouter();
  const [loading, setloading] = useState(true);
  const { id } = router.query;
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });

  const {
    fetchTvDetails,
    TvDetails,
    URL_IMAGE,
    genres,
    fetchGenres,
    formatearFecha,
    dateMovie,
    fetchVideos,
    videos,
  } = UseTvContext();
  useEffect(() => {
    fetchGenres();
    fetchVideos(id);
    formatearFecha(TvDetails.first_air_date);
    const timeoutId = setTimeout(() => {
      setloading(false);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (id) {
        fetchTvDetails(id);
    }
  }, [id]);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };
  const handleCloseClick = () => {
    setIsPlaying(false);
  };

  console.log(TvDetails);
  const getGenreName = (genre) => {
    const genero = genre?.map((genre) => {
      const generoID = genres.find((g) => g.id === genre.id);
      return generoID ? generoID.name : "";
    });
    return genero?.join(" / ");
  };

  if (loading) {
    return (
      <div className="h-[100vh] flex justify-center items-center bg-black w-full">
        <span class="loader"></span>
      </div>
    );
  }

  return (
    <>
      {isPlaying && (
        <div
          className={`absolute top-[26%] md:top-[10%] left-[5%] w-[90%] h-[50%] md:h-[80%] z-50`}
          style={{ cursor: "grab" }}
        >
          <button
            className="absolute top-2 right-0 text-white cursor-pointer"
            onClick={handleCloseClick}
          >
            <CloseIcon sx={{ width: "42px", height: "40px" }} />
          </button>
          <ReactPlayer
            url={videos}
            playing={true}
            controls={true}
            width="100%"
            height="100%"
          />
        </div>
      )}

      <div className="relative w-full min-h-full ">
        {TvDetails && (
          <div className="w-full h-[100vh] relative ">
            <Image
              className="w-full h-full object-cover"
              src={`${URL_IMAGE + TvDetails?.backdrop_path}`}
              alt={TvDetails?.title || TvDetails?.name}
              width={100}
              height={100}
            />

            <div className="absolute h-[100vh] text-white inset-0 bg-black opacity-50"></div>

            <div className="relative max-w-[1580px] ml-4  md:mx-auto">
              <div className="absolute bottom-[620px] md:bottom-[750px] right-10 md:right-[90px]">
                <div className=" hidden md:flex items-center gap-2 mb-2  text-white h-[10px]">
                  <p className="text-xl  gap-2 font-bold mb-2 text-white">
                    <StarIcon />
                    {Math.ceil(TvDetails.vote_average)}
                  </p>
                  <span className="text-md font-bold">/ 10</span>
                </div>

                <div className="absolute hidden md:block h-[200px] w-[200px]   top-[460px]">
                  <Image
                    width={300}
                    height={300}
                    alt={TvDetails.title}
                    src={URL_IMAGE + TvDetails.poster_path}
                  />
                </div>

                <div className="text-white hidden md:flex  gap-2 text-md mb-2 ">
                  <p className="font-bold">{TvDetails.vote_count} </p>
                  <span>Califaciones</span>
                </div>
              </div>

              <div className="absolute bottom-36 w-full ">
                <div className="z-10  md:max-w-[700px] ">
                  <p className="text-md text-white">
                    {TvDetails && getGenreName(TvDetails.genres)}
                  </p>

                  <h3 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl mb-2 max-w-[250px] md:max-w-[600px] text-white uppercase font-semibold">
                    {TvDetails.title || TvDetails?.name}
                  </h3>
                  <div className="flex mb-4">
                    <Rating
                      sx={{ borderColor: "white", outline: "white" }}
                      max={10}
                      name="read-only"
                      className="flex md:hidden"
                      value={Math.ceil(TvDetails.vote_average)}
                      readOnly
                    />
                    <label className="text-white block md:hidden">
                      {Math.ceil(TvDetails.vote_average)} / 10
                    </label>
                  </div>
                  <p className="text-lg xl:text-xl max-w-[350px] md:max-w-[600px] text-white">
                    {TvDetails.overview}
                  </p>
                  <div className="flex gap-2 mt-6">
                    <p className="text-white">
                      Duration: {TvDetails.runtime} min
                    </p>
                    <WatchLaterIcon sx={{ color: "#dbdbdb" }} />
                    <p className="text-white">{dateMovie}</p>
                  </div>
                  <div className="my-6">
                    <Button
                      sx={{
                        color: "white",
                        borderColor: "white",
                        marginRight: "10px",
                        "&:hover": {
                          borderColor: "white",
                        },
                      }}
                      variant="outlined"
                      className="hover:scale-105 transition-all duration-300"
                    >
                      Ver ahora
                      <PlayArrowIcon sx={{ color: "white" }} />
                    </Button>
                    <Button
                      onClick={handlePlayClick}
                      sx={{
                        color: "white",
                        borderColor: "white",
                        border: "none",
                        "&:hover": {
                          borderColor: "white",
                          border: "none",
                        },
                      }}
                      variant="outlined"
                      className="hover:scale-105 transition-all duration-300"
                    >
                      Ver trailer
                      <PlayArrowIcon sx={{ color: "white" }} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TvDetails;
