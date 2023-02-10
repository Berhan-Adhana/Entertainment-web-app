import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import store from "./context/Store";
import { Bookmarks, Home, Login, Movies, Signup, TvSeries } from "./pages";
import "./css/style.css";
// register Swiper custom elements

import "react-toastify/dist/ReactToastify.css";
import ProtectedRoutes from "./components/ProtectedRoutes";
function Dashboard() {
  return (
    <div className="flex flex-col gap-1 laptop:flex-row">
      <Navbar />
      <div className="">
        <Search />
        <Outlet />
      </div>
    </div>
  );
}
const route = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <Dashboard />
      </ProtectedRoutes>
    ),
    // errorElement: <ErrorPage />,
    children: [
      {
        path: "/",

        element: <Home />,
      },
      {
        path: "/movies",

        element: <Movies />,
      },
      {
        path: "/bookmarks",
        element: <Bookmarks />,
      },
      {
        path: "/tv-series",
        element: <TvSeries />,
      },
    ],
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/user/signup",
    element: <Signup />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <ToastContainer />
    <Provider store={store}>
      <QueryClientProvider client={new QueryClient()}>
        <RouterProvider router={route} />
      </QueryClientProvider>
    </Provider>
  </>
);
