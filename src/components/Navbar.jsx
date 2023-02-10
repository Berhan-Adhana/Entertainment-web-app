import React from "react";
import Logo from "../assets/logo.svg";
import { NavLink } from "react-router-dom";
import { BsBookmarkFill } from "react-icons/bs";
import { BiMoviePlay, BiCategory } from "react-icons/bi";
import { FiMonitor } from "react-icons/fi";
import Avator from "./Avator";
import { useSelector } from "react-redux";

const Navbar = () => {
  const user = useSelector((state) => state.loggedUser.user);
  let userName;
  if (user) {
    userName = user.name;
  }
  return (
    <>
      {/* Desktop navigation bar */}
      <div className="h-screen w-[56px] bg-[var(--container-color)]   flex-col justify-between items-center hidden  laptop:flex ">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "text-red-500" : "mb-3")}
        >
          <img src={Logo} alt="" className="self-start mx-auto mt-4" />
        </NavLink>
        <div className="mt-[6rem] flex  flex-col items-center ">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-red-500 mb-3" : "mb-3"
            }
          >
            <BiCategory
              size={25}
              className={({ isActive }) => {
                return isActive ? "text-red-500 mb-3" : "mb-3";
              }}
            />
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) => {
              return isActive ? "text-red-500 mb-3" : "mb-3";
            }}
          >
            <BiMoviePlay size={25} className="mb-3" />
          </NavLink>
          <NavLink
            to="/tv-series"
            className={({ isActive }) => {
              return isActive ? "text-red-500 mb-3" : "mb-3";
            }}
          >
            <FiMonitor size={25} className="mb-3" />
          </NavLink>
          <NavLink
            to="/bookmarks"
            className={({ isActive }) => {
              return isActive ? "text-red-500 mb-3" : "mb-3";
            }}
          >
            <BsBookmarkFill size={25} className="mb-5" />
          </NavLink>
        </div>
        <Avator position="left" userName={userName} />
      </div>
      {/*  Movbile navigation bar */}
      <div className="h-[56px] w-screen bg-[var(--container-color)]  justify-between items-center p-6 flex mx-auto  laptop:hidden ">
        <NavLink
          to="/"
          className={({ isActive }) => {
            return isActive ? "text-red-500 mb-3" : "mb-3";
          }}
        >
          <img src={Logo} alt="" className=" mx-auto mt-4" />
        </NavLink>
        <div className="flex items-center justify-between h-full ">
          <NavLink
            to="/"
            className={({ isActive }) => {
              return isActive ? "text-red-500 mr-5" : "mr-5";
            }}
          >
            <BiCategory size={25} />
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) => {
              return isActive ? "text-red-500 mr-5" : "mr-5";
            }}
          >
            <BiMoviePlay size={25} />
          </NavLink>
          <NavLink
            to="/tv-series"
            className={({ isActive }) => {
              return isActive ? "text-red-500 mr-5" : "mr-5";
            }}
          >
            <FiMonitor size={25} />
          </NavLink>
          <NavLink
            to="/bookmarks"
            className={({ isActive }) => {
              return isActive ? "text-red-500 mr-5" : "mr-5";
            }}
          >
            <BsBookmarkFill size={25} />
          </NavLink>
        </div>

        <Avator position="right" userName={userName} />
      </div>
    </>
  );
};

export default Navbar;
