import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Loading from "../components/Loading";
import { useSignUp } from "../hooks/user";
import Logo from "../assets/logo.svg";

const SignUp = () => {
  const navigate = useNavigate();
  const signUp = useSignUp();

  useEffect(() => {
    if (signUp.isSuccess) {
      navigate("/auth/login");
    }
  }, [signUp.isSuccess, navigate]);
  const initialValues = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .required("Username is required")
      .min(4, "Username must be at least 4 characters")
      .max(20, "Username must not exceed 20 characters"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
  });

  return (
    <div className=" h-screen relative">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        // onSubmit={handleSubmit}
      >
        {({
          errors,
          touched,
          resetForm,
          values,
          handleChange,
          isSubmitting,
        }) => (
          <Form className="bg-[var(--container-color)] p-6 rounded-3xl  absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]  w-[90%]  shadow  large:max-w-md block mr-5 mx-auto min-w-[285px]">
            <img src={Logo} alt="" className="mx-auto mb-4" />
            <h1 className="text-left">SignUp</h1>
            <div className="form-group">
              <Field
                name="userName"
                type="text"
                placeholder="Enter your name"
                onChange={handleChange}
                className={
                  "form-control p-4 w-full border-b-2 mb-2 bg-transparent border-b-[var(--border-color)]" +
                  (errors.userName && touched.userName
                    ? "border-2 border-rose-500 rounded-sm"
                    : "")
                }
              />
              <ErrorMessage
                name="userName"
                component="div"
                className="invalid-feedback text-rose-500 mb-1"
              />
            </div>

            <div className="form-group">
              <Field
                name="email"
                type="email"
                onChange={handleChange}
                placeholder="Enter your email"
                className={
                  "form-control w-full p-4  border-b-2 mb-2 bg-transparent border-b-[var(--border-color)]" +
                  (errors.email && touched.email
                    ? "border-2 border-rose-500 rounded-sm"
                    : "")
                }
              />
              <ErrorMessage
                name="email"
                component="div"
                className="invalid-feedback text-rose-500 mb-1"
              />
            </div>

            <div className="form-group">
              <Field
                name="password"
                type="password"
                onChange={handleChange}
                placeholder="Enter your password"
                className={
                  "form-control w-full p-4  border-b-2 mb-2 bg-transparent border-b-[var(--border-color)]" +
                  (errors.password && touched.password
                    ? "border-2 border-rose-500 rounded-sm"
                    : "")
                }
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-rose-500 mb-1"
              />
            </div>

            <div className="form-group">
              <Field
                name="confirmPassword"
                type="password"
                onChange={handleChange}
                placeholder="confirm your password"
                className={
                  "form-control w-full p-4  border-b-2 mb-2 bg-transparent border-b-[var(--border-color)]" +
                  (errors.confirmPassword && touched.confirmPassword
                    ? " is-invalid border-2 border-rose-500 rounded-sm"
                    : "")
                }
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="invalid-feedback text-rose-500 mb-1"
              />
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="font-semibold text-white bg-[var(--primary-color)] w-full p-2 rounded-md mt-3 hover:bg-white hover:text-black"
                disabled={
                  isSubmitting ||
                  errors.userName ||
                  errors.email ||
                  errors.password ||
                  errors.confirmPassword
                }
                onClick={async (e) => {
                  e.preventDefault();
                  const user = {
                    userName: values.userName,
                    email: values.email,
                    password: values.password,
                  };
                  await signUp.mutate(user);
                }}
              >
                {signUp.isLoading ? <Loading /> : "Register"}
              </button>
              <p className="mt-3">
                Already have an account?{" "}
                <NavLink
                  to="/auth/login"
                  className="text-[var(--primary-color)] font-semibold "
                >
                  Sign In
                </NavLink>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
