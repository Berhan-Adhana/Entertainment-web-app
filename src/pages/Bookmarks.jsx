import React from "react";
import { useSelector } from "react-redux";
import { useBookmarksMutation, useGetBookmarks } from "../hooks/user";
import MovieCard from "../components/MovieCard";
const Bookmarks = () => {
  const { accessToken } = useSelector((state) => state.loggedUser.user);
  const bookmarksQuery = useGetBookmarks(accessToken);
  const bookmarksMutation = useBookmarksMutation(accessToken);
  const { data, isLoading } = bookmarksQuery;

  const handleBookmark = (movieId) => {
    bookmarksMutation.mutate({
      entertaimentId: movieId,
    });
  };

  const getBookMarkedMovies = () => {
    const res = data?.filter((movie) => movie.category === "Movie");
    return res;
  };
  const getBookMarkedTvShows = () => {
    const res = data?.filter((movie) => movie.category === "TV Series");
    return res;
  };

  const bookmarksSearchResults = useSelector(
    (state) => state.searchMovie.results
  );

  return (
    <section className="grid  mx-auto ml-2 mr-2">
      <h1 className="mt-5 text-2xl font-semibold mb-2 ">
        {bookmarksSearchResults?.length !== 0 ? (
          "Bookmarked Movies"
        ) : (
          <h2>No Bookmarked movie with such Name!!</h2>
        )}
      </h1>
      <div className="grid small:grid-cols-1 medium:grid-cols-2 medium:gap-4 gap-5 tablet:grid-cols-3 tablet:gap-4 laptop:grid-cols-4 laptop:gap-8 desktop:gap-8 ">
        {bookmarksSearchResults
          ? bookmarksSearchResults
              ?.filter(
                (bookmarksSearchResult) =>
                  bookmarksSearchResult.category === "Movie"
              )
              .map((movie, index) => {
                return (
                  <MovieCard
                    movie={movie}
                    key={index}
                    onClick={() => {
                      handleBookmark(movie._id);
                    }}
                  />
                );
              })
          : isLoading
          ? "Loading.."
          : getBookMarkedMovies()?.map((movie, index) => {
              return (
                <MovieCard
                  movie={movie}
                  onClick={() => {
                    handleBookmark(movie._id);
                  }}
                  key={index}
                />
              );
            })}
      </div>
      <h1 className="mt-5 text-2xl font-semibold mb-2">
        {" "}
        {bookmarksSearchResults?.length !== 0 ? (
          "Bookmarked TV Series"
        ) : (
          <h2>No Bookmarked Tv Show with such Name!!</h2>
        )}
      </h1>
      <div className="grid small:grid-cols-1 medium:grid-cols-2 medium:gap-4 gap-5 tablet:grid-cols-3 tablet:gap-4 laptop:grid-cols-4 laptop:gap-8 desktop:gap-8 ">
        {bookmarksSearchResults
          ? bookmarksSearchResults
              ?.filter(
                (bookmarksSearchResult) =>
                  bookmarksSearchResult.category === "TV Series"
              )
              .map((movie, index) => {
                return (
                  <MovieCard
                    movie={movie}
                    key={index}
                    onClick={() => {
                      handleBookmark(movie._id);
                    }}
                  />
                );
              })
          : isLoading
          ? "Loading.."
          : getBookMarkedTvShows()?.map((movie, index) => {
              return (
                <MovieCard
                  movie={movie}
                  onClick={() => {
                    handleBookmark(movie._id);
                  }}
                  key={index}
                />
              );
            })}
      </div>
    </section>
  );
};

export default Bookmarks;
