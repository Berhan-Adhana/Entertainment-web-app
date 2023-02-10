import React from "react";
import { useSelector } from "react-redux";
import { useBookmarksMutation } from "../hooks/user";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGetAllMovies } from "../hooks/movie";
import MovieCard from "../components/MovieCard";
import TrendingMovieCard from "../components/TrendingMovieCard";
import { Autoplay, Pagination, Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";

const Home = () => {
  const searchResults = useSelector((state) => state.searchMovie.results);
  const { accessToken } = useSelector((state) => state.loggedUser.user);

  const allMoviesQuery = useGetAllMovies(accessToken);
  const bookmarksMutation = useBookmarksMutation(accessToken);
  const handleBookmark = (movieId) => {
    bookmarksMutation.mutate({
      entertaimentId: movieId,
    });
  };

  const { data, isLoading } = allMoviesQuery;

  return (
    <section className="grid  mx-auto ml-2 mr-2">
      <div className="container">
        <h1 className="mt-5 text-2xl font-semibold mb-2">Trending</h1>
        <Swiper
          className="mySwiper "
          spaceBetween={30}
          slidesPerView={1.2}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay,Pagination,Navigation]}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {searchResults ? (
            searchResults.length === 0 ? (
              <h2>No Movies with such Name!!</h2>
            ) : (
              searchResults
                ?.filter((trending) => trending.isTrending)
                .map((movie, index) => {
                  return (
                    <SwiperSlide>
                      <TrendingMovieCard
                        movie={movie}
                        key={index}
                        onClick={() => {
                          handleBookmark(movie._id);
                        }}
                      />
                    </SwiperSlide>
                  );
                })
            )
          ) : isLoading ? (
            "Loading..."
          ) : (
            data
              ?.filter((trending) => trending.isTrending)
              .map((trending, index) => {
                return (
                  <SwiperSlide>
                    <TrendingMovieCard
                      movie={trending}
                      key={index}
                      onClick={() => {
                        handleBookmark(trending._id);
                      }}
                    />
                  </SwiperSlide>
                );
              })
          )}
        </Swiper>
      </div>
      <section className="grid  mx-auto ml-2 mr-2">
        <h1 className="mt-5 text-2xl font-semibold mb-2">
          Recommended for you
        </h1>
        <div className="grid small:grid-cols-1 medium:grid-cols-2 medium:gap-4 gap-5 tablet:grid-cols-3 tablet:gap-4 laptop:grid-cols-4 laptop:gap-8 desktop:gap-8 ">
          {searchResults ? (
            searchResults.length === 0 ? (
              <h2 style={{ width: "100%" }} className="">
                No Movies with such Name!!
              </h2>
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
    </section>
  );
};

export default Home;
