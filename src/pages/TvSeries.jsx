import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";
import { useGetTvSeries } from "../hooks/movie";
import { useBookmarksMutation } from "../hooks/user";

const TvSeries = () => {
  const { accessToken } = useSelector((state) => state.loggedUser.user);
  const { data, isLoading } = useGetTvSeries(accessToken);
  const bookmarksMutation = useBookmarksMutation(accessToken);
  const handleBookmark = (movieId) => {
    bookmarksMutation.mutate({
      entertaimentId: movieId,
    });
  };
  const searchResult = useSelector((state) => state.searchMovie.results);

 
  return (
    <section className="grid  mx-auto ml-2 mr-2">
      <h1 className="mt-5  font-semibold mb-2">
        {searchResult?.length !== 0 ? "Tv Series" : ""}
      </h1>
      <div className="grid small:grid-cols-1 medium:grid-cols-2 medium:gap-4 gap-5 tablet:grid-cols-3 tablet:gap-4 laptop:grid-cols-4 laptop:gap-8 desktop:gap-8 ">
        {searchResult ? (
          searchResult.length === 0 ? (
            <h2>No Tv Shows with such Name!!</h2>
          ) : (
            searchResult?.map((movie, index) => {
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
          )
        ) : isLoading ? (
          "Loading..."
        ) : (
          data?.map((movie, index) => {
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
        )}
      </div>
    </section>
  );
};

export default TvSeries;
