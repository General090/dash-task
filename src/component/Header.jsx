// src/components/Header.js
import React from "react";
import { CiSearch } from "react-icons/ci";
import Input from "./Input";

const Header = () => {
  return (
    <header className="header">
      <div className="div md:flex lg:flex justify-between items-center m-5 mx-[30px]">
        <div className="greetins ">
          <h1 className="text-1xl md:text-2xl font-[600] logoText">
            Hello Evano👋,
          </h1>
        </div>
        <div className="searc mt-4 md:mt-0 lg:mt-0">
          <div className="search">
            <div className="flex items-center gap-1 px-2 bg-white">
              <CiSearch className="w-5 h-5 text-[#AAAAAA]" />{" "}
              {/* Adjust the size and color */}
              <input
                type="text"
                placeholder="Search Table"
                className="border-0 font-[200] text-[12px] bg-transparent outline-0 h-[36px] w-[180px] px-2 py-3"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
