"use client";
import Link from "next/link";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useMoviesContxt } from "@/context/MovieContext/MoviesContext";
import { Button } from "@mui/material";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));
const UserNavbarSection = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { movies, searchMovies, setSearchKey, searchKey } = useMoviesContxt();

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <>
      <div className="text-white items-center gap-4 hidden md:flex">
        <div className="cursor-pointer hidden md:block" onClick={toggleSearch}>
          <SearchIcon />
        </div>
        <div>
          <form onSubmit={searchMovies}>
            <input
              type="text"
              placeholder="¿Que estas buscando?"
              className="text-black bg-[#111111] text-xs xl:w-[250px]  py-2 px-4 rounded-md"
              onChange={(e) => setSearchKey(e.target.value)}
            />
          </form>
        </div>

        <NotificationsIcon />
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </StyledBadge>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        ></Badge>
      </div>
    </>
  );
};

export default UserNavbarSection;
