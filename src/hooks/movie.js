import { useQuery } from "@tanstack/react-query";
import http from "../services/httpService";

export const useGetMovies = (accessToken) => {
  return useQuery({
    queryKey: ["movies", accessToken],
    queryFn: async () => {
      return await http
        .get("/api/movies/movies", {
          headers: { "x-auth-token": accessToken },
        })
        .then((res) => res.data);
    },
  });
};
export const useGetTvSeries = (accessToken) => {
  return useQuery({
    queryKey: ["tvSeries", accessToken],
    queryFn: async () => {
      return await http
        .get("/api/movies/tv-series", {
          headers: { "x-auth-token": accessToken },
        })
        .then((res) => res.data);
    },
  });
};

export const useGetAllMovies = (accessToken) => {
  return useQuery({
    queryKey: ["allMovies", accessToken],
    queryFn: async () => {
      return await http
        .get("/api/movies/all", {
          headers: { "x-auth-token": accessToken },
        })
        .then((res) => res.data);
    },
  });
};
