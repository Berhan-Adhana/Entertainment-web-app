import React, { useState } from "react";
import IconPlay from "../assets/icon-play.svg";
import TvIcon from "../assets/icon-nav-tv-series.svg";
import { BsBookmark, BsFillBookmarkFill, BsFilm } from "react-icons/bs";
import { useGetBookmarks } from "../hooks/user";
import { useSelector } from "react-redux";

const MovieCard = ({ movie, onClick }) => {
  const { accessToken } = useSelector((state) => state.loggedUser.user);
  let isBookmarked;
  const bookmarksQuery = useGetBookmarks(accessToken);
  const { data } = bookmarksQuery;

  data?.map((m, index) => {
    if (m._id === movie._id) {
      return isBookmarked=true;
    }
  });

  return (
    <article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="w-[90%] large:max-w-sm mx-auto  group rounded-lg text-green-50  relative  overflow-hidden transition-all duration-500"
    >
      {/* <div className="max-w-[200px] medium:max-w-[150px] large:max-w-[200px] tablet:max-w-[270px] desktop:w-[300px]"> */}

      <picture className="group-hover:scale-100 ">
        <source
          media="(min-width:992px)"
          src={require(`../${movie.thumbnail.regular.large}`)}
        />
        <source
          media="(min-width:425px)"
          src={require(`../${movie.thumbnail.regular.medium}`)}
        />
        <img
          src={require(`../${movie.thumbnail.regular.small}`)}
          alt="thumbnails"
        />
      </picture>

      <div className="opacity-0 absolute top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%] group-hover:opacity-100 transition ease-in-out duration-300">
        <img
          src={IconPlay}
          alt=""
          className="group-hover:bg-[rgba(197, 193, 193, 0.5)] cursor-pointer"
        />
        <span>Play</span>
      </div>
      <div className="flex flex-col small:text-xs large:text-sm laptop:text-lg ">
        <div className="flex gap-x-2 md:gap-x-4 opacity-75 mix-blend-normal">
          <p className="flex items-center relative ml-2">
            <span className="absolute left-[-9px] top-[-4px] text-[18px] font-bold">
              .
            </span>
            {movie.year}
          </p>
          <span className="flex items-center relative ml-2">
            {movie.category === "Movie" ? (
              <BsFilm />
            ) : (
              <img
                src={TvIcon}
                alt="tv series category"
                className="w-[13px] h-[13px]"
              />
            )}
          </span>
          <p className="flex items-center relative ml-2">
            <span className="absolute left-[-9px] top-[-4px] text-[18px] font-bold">
              .
            </span>
            {movie.category}
          </p>
          <p className="flex items-center relative ml-2">
            <span className="absolute left-[-9px] top-[-4px] text-[18px] font-bold">
              .
            </span>
            {movie.rating}
          </p>
        </div>
        <div className="font-bold">{movie.title}</div>
      </div>
      <button
        className="absolute top-2 right-2 z-10 cursor-pointer w-[2rem] rounded-[50%]  bg-[#10141e] mix-blend-normal opacity-50  h-[2rem] flex justify-center items-center"
        onClick={onClick}
        aria-label={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
      >
        {isBookmarked ? (
          <BsFillBookmarkFill className="text-[var(--white-color)] font-[300] text-[1.2rem]" />
        ) : (
          <BsBookmark className="text-[var(--white-color)] font-[300] text-[1.2rem]" />
        )}
      </button>
    </article>
  );
};

export default MovieCard;
