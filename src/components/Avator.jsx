import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { updateUser } from "../context/userSlice";

const Avator = ({ position, userName }) => {
  const [showSignout, setShowSignout] = useState(false);
  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(
      updateUser({
        name: "",
        email: "",
        accessToken: "",
        id: "",
        bookmarks: [],
      })
    );
    <Navigate to="/auth/login" />;
  };
  const getInitial = () => userName?.substring(0, 1).toUpperCase();

  return (
    <button
      className="rounded-full w-[40px] h-[40px] relative"
      onClick={() => {
        setShowSignout(!showSignout);
      }}
    >
      <div className="w-[40px] h-[40px] bg-[var(--primary-color)] rounded-full flex justify-center items-center">
        <span className="text-white font-bold text-2xl">{getInitial()}</span>
      </div>
      {position === "left" ? (
        showSignout ? (
          <div className="absolute left-10 top-[-40px] w-max bg-[var(--primary-color)] p-4 rounded-sm z-[999]">
            <button href="" onClick={handleSignOut}>
              Sign Out
            </button>
          </div>
        ) : (
          ""
        )
      ) : showSignout ? (
        <div className="absolute right-10 top-6 w-max bg-[var(--primary-color)] p-4 rounded-sm z-[999]">
          <button href="" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      ) : (
        ""
      )}
    </button>
  );
};

export default Avator;
