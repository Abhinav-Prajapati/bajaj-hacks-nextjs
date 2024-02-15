"use client";
import Image from "next/image";
import Logo from "../../public/bajaj-logo-sep-15.webp";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="">
      <div className=" w-full h-[6.5rem] bg-[#002a53] relative flex justify-center z-[-20] items-center">
        <div className="w-[80%] h-[6.5rem]  my-10 ">
          <div className="">
            <Image
              src={Logo}
              width={100}
              height={100}
              alt="bajaj logo"
              className="pt-2"
            />
          </div>
        </div>
        <div className=" w-full h-[3rem] bg-[#002142] absolute  bottom-0 z-[-10]"></div>
      </div>
    </nav>
  );
};

export default Navbar;
