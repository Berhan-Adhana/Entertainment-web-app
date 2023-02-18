import React from "react";
import { NavLink } from "react-router-dom";

const Account = ({ to, text1, text2 }) => {
  return (
    <p className="mt-3">
      {text1}
      <NavLink to={to} className="text-[var(--primary-color)] font-semibold ">
        {text2}
      </NavLink>
    </p>
  );
};

export default Account;
