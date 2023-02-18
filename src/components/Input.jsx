import { Field } from "formik";
import React from "react";

const Input = ({ isError, name, placeholder, onChange, type, error }) => {
  return (
    <div className="relative flex">
      <Field
        name={name}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        className={
          "w-full p-4 outline-none  border-b-2 mb-2 bg-transparent border-b-[var(--border-color)] focus:border-b-[var(--white-color)]  caret-[var(--primary-color)]" +
          (isError ? "border-2 border-rose-500" : "")
        }
      />
      <span className="absolute right-0 top-5 text-rose-500">
        {isError && error}
      </span>
    </div>
  );
};

export default Input;
