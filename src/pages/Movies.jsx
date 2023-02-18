import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "../components/MovieCard";
import { useGetMovies } from "../hooks/movie";
import { useBookmarksMutation } from "../hooks/user";

const Movies = () => {
  const { accessToken } = useSelector((state) => state.loggedUser.user);
  const { data, isLoading } = useGetMovies(accessToken);
  const bookmarksMutation = useBookmarksMutation(accessToken);
  const handleBookmark = (movieId) => {
    bookmarksMutation.mutate({
      entertaimentId: movieId,
    });
  };
  const searchResults = useSelector((state) => state.searchMovie.results);

 

  return (
    <section className="grid   mx-auto ml-2 mr-2 ">
      <h1 className="mt-5 font-semibold mb-2 ">
        {searchResults?.length !== 0 ? "Movies" : ""}
      </h1>
      <div className="grid gap-y-2 small:grid-cols-1 medium:grid-cols-2 medium:gap-4 large:gap-5 tablet:grid-cols-3 tablet:gap-4 laptop:grid-cols-4 laptop:gap-8 desktop:gap-8">
        {searchResults ? (
          searchResults.length === 0 ? (
            <h2>No Movies with such Name!!</h2>
          ) : (
            searchResults?.map((movie, index) => {
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

export default Movies;
