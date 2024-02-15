"use client";
import Image from "next/image";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import { MdArrowOutward } from "react-icons/md";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { RiHandHeartFill } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { FaCarSide } from "react-icons/fa6";
import { LuEye } from "react-icons/lu";

const apiUrl = "http://localhost:8000/similar-links/"; // Replace with your actual API URL

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [urlList, setUrllist] = useState([]);

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  function getFirstnWords(str: string) {
    // Split the string into an array of words
    let words = str.split(/\s+/);
    // Extract the first 10 words
    let first10Words = words.slice(0, 15);
    // Join the first 10 words back into a string
    let result = first10Words.join(" ");
    return result;
  }

  const handleSearch = () => {
    axios.get(`${apiUrl}?desired_link=${inputValue}`).then(
      (response) => {
        var result = response.data;
        setUrllist(result["top_5_similar_links"]);
        console.log(result["top_5_similar_links"]);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const cardLogo = (keyword: string) => {
    if (new RegExp("\\b" + "car" + "\\b", "i").test(keyword)) {
      return (
        <FaCarSide
          className=" text-white/20 absolute bottom-2 right-0 "
          size={80}
        />
      );
    } else if (new RegExp("\\b" + "loan" + "\\b", "i").test(keyword)) {
      return (
        <FaIndianRupeeSign
          className=" text-white/20 absolute bottom-2 right-0 "
          size={80}
        />
      );
    } else if (new RegExp("\\b" + "home" + "\\b", "i").test(keyword)) {
      return (
        <FaHome
          className=" text-white/20 absolute bottom-2 right-0 "
          size={80}
        />
      );
    } else {
      return (
        <RiHandHeartFill
          className=" text-white/20 absolute bottom-2 right-0 "
          size={80}
        />
      );
    }
  };

  return (
    <main className="">
      <Navbar />
      <div className=" absolute top-3 left-[34rem] rounded-md flex">
        <input
          value={inputValue}
          onChange={handleInputChange}
          className="w-[50rem] h-10 px-10 rounded-md appearance-none "
          placeholder="Search for similer website"
        />
        <button
          onClick={handleSearch}
          className="bg-white w-10 px-2 text-neutral-500 border-l-[2px] border-gray-400"
        >
          <IoSearch size={25} />
        </button>
      </div>
      {/* Display the list of similar links */}
      <div className="mt-5 mx-40 ">
        <ul className="grid grid-cols-3 gap-4 pt-6">
          {urlList.map((link, index) => (
            <li key={index}>
              <a href={link.link} target="_blank" rel="noopener noreferrer">
                {
                  <div className=" overflow-hidden bg-gradient-to-r from-[#00b3cc] to-[#5862e6] h-[8.5rem] w-[28rem] m-2 p-3 gola relative group hover:shadow-lg ">
                    <h1 className=" text-white text-lg">
                      {getFirstnWords(link.description)
                        ? getFirstnWords(link.description)
                        : link.link}
                    </h1>
                    <div className=" group-hover:shadow-xl group-hover:scale-110 transition ease-in-out duration-75 gola_sm  h-[2.5rem] bg-neutral-700 p-2 pl-3 rounded-lg absolute left-0 flex bottom-0 m-1 ">
                      <span className="text-white hover">Visit</span>
                      <MdArrowOutward color="white" size={20} />
                    </div>
                    <RiHandHeartFill
                      className=" text-white/20 absolute bottom-4 right-0 "
                      size={80}
                    />

                    <div className=" absolute bottom-0 right-2 flex">
                      <div className=" px-2 text-neutral-200  ">
                        {link.date_published}
                      </div>
                      <div className="   text-neutral-200 flex ">
                        <span className=" pt-1 pr-12 flex ">
                          <div className="pt-[3px] pr-2">
                            <LuEye className="" />
                          </div>
                          <span>{link.views ? link.views : 0}</span>
                        </span>
                        <div className="  absolute  right-1 top-1 text-neutral-200 ">
                          {`${Math.round(
                            parseFloat(link.similarity).toFixed(2) * 100
                          )}%`}
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
