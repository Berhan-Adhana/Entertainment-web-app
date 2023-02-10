import { computeHeadingLevel } from "@testing-library/react";
import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { loadSearchResults } from "../context/searchSlice";
import { useGetAllMovies, useGetMovies, useGetTvSeries } from "../hooks/movie";
import { useGetBookmarks } from "../hooks/user";
import SearchPlaceholder from "../utilities/SearchPlaceHolder";
const Search = () => {
  const { accessToken } = useSelector((state) => state.loggedUser.user);

  const { data: geners } = useGetAllMovies(accessToken);
  const { data: movies } = useGetMovies(accessToken);
  const { data: tvSeries } = useGetTvSeries(accessToken);
  const bookmarksQuery = useGetBookmarks(accessToken);
  const { data: bookMarks } = bookmarksQuery;
  const dispatch = useDispatch();
  // for changing the placeholder as pages changes
  const location = useLocation();

   const loadSearchResult = (data?, searchString) => {
     if (searchString === "") dispatch(loadSearchResults(null));
     else
       dispatch(
         loadSearchResults(
           data?.filter((genere) =>
             genere.title.toLowerCase().includes(searchString)
           )
         )
       );
   };

  const searchHandler = (searchStr) => {
    switch (location.pathname) {
      case "/":
        loadSearchResult(geners, searchStr);
        break;
      case "/movies":
        loadSearchResult(movies, searchStr);

        break;
      case "/tv-series":
        loadSearchResult(tvSeries, searchStr);

        break;

      case "/bookmarks":
        loadSearchResult(bookMarks, searchStr);
       
        break;

      default:
        break;
    }
  };

  return (
    <div className="relative max-w-screen ml-[60px]">
      <input
        type="text"
        placeholder={SearchPlaceholder()}
        // placeholder="Search a movie"
        className="search__input  p-5 rounded-md  w-full bg-transparent border-0 outline-none focus:border-b-2 border-[var(--border-color)]"
        onChange={(e) => {
          searchHandler(e.target.value);
        }}
      />

      <AiOutlineSearch className="absolute left-0 top-[50%] translate-y-[-50%] z-100  text-[1.2rem] cursor-pointer" />
    </div>
  );
};

export default Search;
