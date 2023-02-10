import { useLocation } from "react-router-dom";

const SearchPlaceholder = () => {
  const location = useLocation();
  if (location.pathname === "/") return "Search for movies or TV series";
  else if (location.pathname === "/movies") return "Search for movies";
  else if (location.pathname === "/tv-series") return "Search for Tv Shows";
  else if (location.pathname === "/bookmarks") return "Search for Bookmarks";
};

export default SearchPlaceholder;
