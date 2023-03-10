import React from "react";
import IconPlay from "../assets/icon-play.svg";
import TvIcon from "../assets/icon-nav-tv-series.svg";
import { BsFilm } from "react-icons/bs";
import { useGetBookmarks } from "../hooks/user";
import { useSelector } from "react-redux";

const MovieCard = ({ movie, onClick }) => {
  const { accessToken } = useSelector((state) => state.loggedUser.user);
  let isBookmarked;
  const bookmarksQuery = useGetBookmarks(accessToken);
  const { data } = bookmarksQuery;

  data?.map((m, index) => {
    if (m._id === movie._id) {
      return (isBookmarked = true);
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

      <picture className=" group-hover:scale-100 ">
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

      <div className=" w-[117px] opacity-0  absolute top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%]  z-[0] mix-blend-screen shadow-lg  bg-[rgba(255,255,255,0.25)]  rounded-md group-hover:opacity-100 ">
        <div className="flex gap-x-7 items-center justify-start px-1 !opacity-100 transition ease-in-out duration-300 py-1">
          <img
            src={IconPlay}
            alt="play icon"
            className=" cursor-pointer   !opacity-100 "
          />
          <span className="text-white  !opacity-100 ">Play</span>
        </div>
      </div>
      <div className="flex flex-col  ">
        <div className="flex gap-x-2 md:gap-x-4 opacity-75 mix-blend-normal">
          <p className="flex items-center relative ml-2">
            <span className="absolute left-[-9px] top-[-4px]  font-bold">
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
            <span className="absolute left-[-9px] top-[-4px]  font-bold">
              .
            </span>
            {movie.category}
          </p>
          <p className="flex items-center relative ml-2">
            <span className="absolute left-[-9px] top-[-4px]  font-bold">
              .
            </span>
            {movie.rating}
          </p>
        </div>
        <h2 className="font-bold mt-1">{movie.title}</h2>
      </div>
      <button
        className="group/bookmark absolute top-2 right-2 z-10  cursor-pointer w-[2rem] rounded-[50%]  bg-[#10141e] mix-blend-normal opacity-50  h-[2rem]  justify-center items-center hover:bg-white flex"
        onClick={onClick}
        aria-label={isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"}
      >
        {isBookmarked ? (
          <svg
            width="12"
            height="14"
            xmlns="http://www.w3.org/2000/svg"
            stroke-width="1.5"
            className="group-hover/bookmark:stroke-black"
          >
            <path
              d="M10.61 0c.14 0 .273.028.4.083a1.03 1.03 0 0 1 .657.953v11.928a1.03 1.03 0 0 1-.656.953c-.116.05-.25.074-.402.074-.291 0-.543-.099-.756-.296L5.833 9.77l-4.02 3.924c-.218.203-.47.305-.756.305a.995.995 0 0 1-.4-.083A1.03 1.03 0 0 1 0 12.964V1.036A1.03 1.03 0 0 1 .656.083.995.995 0 0 1 1.057 0h9.552Z"
              fill="#FFF"
            />
          </svg>
        ) : (
          <svg
            width="12"
            height="14"
            xmlns="http://www.w3.org/2000/svg"
            className="group-hover/bookmark:stroke-black"
          >
            <path
              d="m10.518.75.399 12.214-5.084-4.24-4.535 4.426L.75 1.036l9.768-.285Z"
              stroke="#FFF"
              stroke-width="1.5"
              fill="#10141e"
            />
          </svg>
        )}
      </button>
    </article>
  );
};

export default MovieCard;
