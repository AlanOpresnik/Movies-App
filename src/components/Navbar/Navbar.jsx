import React, { useEffect, useState } from "react";
import NavbarItem from "./NavbarItem";
import UserNavbarSection from "./UserNavbarSection";
import {
  Button,
  ListItemText,
  Menu,
  Drawer,
  List,
  ListItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";

const navbarItems = [
  {
    title: "Inicio",
    path: "/",
  },
  {
    title: "Series",
    path: "/",
  },
  {
    title: "Peliculas",
    path: "/",
    
  },
  {
    title: "VER PELICULA SCRAPEADA",
    path: "/about",
    
  },
  {
    title: "Novedades populares",
    path: "/",
  },
];
const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 40;
      setIsScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleDrawer = (isOpen) => {
    setOpen(isOpen);
  };

  const navbarStyles = {
    background: isScrolled ? "rgba(0, 0, 0, 0.7)" : "transparent",
    backdropFilter: isScrolled ? "blur(10px)" : "none",
    transition: "background 0.3s, backdrop-filter 0.3s",
  };

  return (
    <div className="w-full h-[65px] z-[20] fixed" style={navbarStyles}>
      <div className="max-w-[1620px] mx-auto flex items-center h-[64px] gap-2 md:gap-12  z-10">
        <Button
          className="block md:hidden"
          sx={{ color: "white", background: "white" }}
          onClick={() => toggleDrawer(true)}
        >
          <MenuIcon />
        </Button>
        <Drawer anchor="left" open={open} onClose={() => toggleDrawer(false)}>
          <div
            role="presentation"
            onClick={() => toggleDrawer(false)}
            onKeyDown={() => toggleDrawer(false)}
          >
            <div className="w-full h-[60px] bg-black flex justify-center items-center">
              <h1 className="text-white text-2xl text-center">NETFIX</h1>
            </div>
            <List>
              <ListItem>
                <Link href={"/about"}>Reproducir película de prueba</Link>
              </ListItem>
              {navbarItems.map((item) => (
                <ListItem>
                  <NavbarItem key={item.path} item={item} />
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
        <p className="text-white text-3xl">Netflix</p>
        <div className="flex justify-between w-full">
          <nav className="gap-3 text-sm items-center hidden md:flex">
            {navbarItems.map((item) => (
              <NavbarItem key={item.path} item={item} />
            ))}
          </nav>
          <UserNavbarSection />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
