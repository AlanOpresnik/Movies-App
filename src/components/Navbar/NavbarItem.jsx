import Link from "next/link";
import React from "react";

const NavbarItem = ({item}) => {
  return (
    <div className=" md:text-white ">
      <Link href={item.path}>
        {item.title}
      </Link>
    </div>
  );
};

export default NavbarItem;