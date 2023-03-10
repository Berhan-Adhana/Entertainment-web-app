import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import http from "../services/httpService";

// https://entertainment-web-app-backend.vercel.app

export const useGetBookmarks = (accessToken) => {
  // const token = useSelector((state) => state.loggedUser.user);
  return useQuery({
    queryKey: ["bookmarks", accessToken],
    queryFn: async () => {
      return await http
        .get(
          "/api/users/bookmarks",
          {
            headers: { "x-auth-token": accessToken },
          }
        )
        .then((res) => res.data);
    },
  });
};
export const useBookmarksMutation = (accessToken) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (entertaimentId) => {
      return await http
        .post(
          "/api/users/bookmark",
          entertaimentId,
          {
            headers: { "x-auth-token": accessToken },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      queryClient.invalidateQueries({ queryKey: ["movies"] });
      queryClient.invalidateQueries({ queryKey: ["allMovies"] });
      queryClient.invalidateQueries({ queryKey: ["tvSeries"] });
    },
  });
};
export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user) => {
      return await http
        .post(
          "/api/auth/signin",
          user
        )
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
export const useSignUp = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (user) => {
      return await http
        .post(
          "/api/users/signup",
          user
        )
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
