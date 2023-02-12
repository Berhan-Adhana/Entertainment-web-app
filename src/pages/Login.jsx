import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Loading from "../components/Loading";
import { updateUser } from "../context/userSlice";
import { useLogin } from "../hooks/user";
import Logo from "../assets/logo.svg";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signIn = useLogin();

  useEffect(() => {
    if (signIn.data) {
      const { accessToken, email, userName, _id, bookmarks } = signIn.data;

      dispatch(
        updateUser({
          name: userName,
          email: email,
          id: _id,
          bookmarks: bookmarks,
          accessToken: accessToken,
        })
      );

      navigate("/", { replace: true });
      // redirect(".././");
    }
  }, [signIn.data, dispatch, navigate]);

  const initialValues = {
    userName: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .required("UserName is required")
      .min(3, "username is too short"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
  });

  return (
    <div className=" h-screen relative">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        // onSubmit={handleSubmit}
      >
        {({ errors, touched, resetForm, values, isSubmitting }) => (
          <Form className="bg-[var(--container-color)] p-6 rounded-3xl  absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]  w-[90%]  shadow  large:max-w-md block mr-5 mx-auto min-w-[285px]">
            <img src={Logo} alt="" className="mx-auto mb-4" />
            <h1 className="text-left">Login</h1>

            <div className="form-group">
              <Field
                name="userName"
                type="text"
                placeholder="Enter your User Name"
                className={
                  "w-full p-4  border-b-2 mb-2 bg-transparent border-b-[var(--border-color)]" +
                  (errors.userName && touched.userName
                    ? "border-2 border-rose-500"
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
                name="password"
                type="password"
                placeholder="Enter your password"
                className={
                  "w-full p-4  border-b-2 mb-2 bg-transparent border-b-[var(--border-color)]" +
                  (errors.password && touched.password
                    ? "border-2 border-rose-500"
                    : "")
                }
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-rose-500 mb-1"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required=""
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label
                    for="remember"
                    className="text-gray-500 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <Link
                to={""}
                className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Forgot password?
              </Link>
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="font-semibold text-white bg-[var(--primary-color)]  w-full p-2 rounded-md mt-3 hover:bg-white hover:text-black"
                disabled={isSubmitting || errors.password || errors.userName}
                onClick={async (e) => {
                  e.preventDefault();

                  const user = {
                    userName: values.userName,
                    password: values.password,
                  };
                  await signIn.mutate(user);
                }}
              >
                {signIn.isLoading ? <Loading /> : "Login"}
              </button>
              <p className="mt-3">
                Don't have an account?{" "}
                <NavLink
                  to="/user/signup"
                  className="text-[var(--primary-color)] font-semibold "
                >
                  Sign Up
                </NavLink>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
