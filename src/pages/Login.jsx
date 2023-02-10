import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  NavLink,
  useNavigate,
} from "react-router-dom";
import * as Yup from "yup";
import Loading from "../components/Loading";
import { updateUser } from "../context/userSlice";
import { useLogin } from "../hooks/user";
import Logo from "../assets/logo.svg"

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
          <Form className="max-w-[400px] bg-[var(--container-color)] p-6 rounded-3xl  absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] block">
            <img src={Logo} alt="" className="mx-auto mb-4" />
            <h1 className="text-left">Login</h1>

            <div className="form-group">
              <Field
                name="userName"
                type="text"
                placeholder="Enter your UserName"
                className={
                  "form-control p-4  border-b-2 mb-2 bg-transparent border-[ #5A698F]" +
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
                  "form-control p-4  border-b-2 mb-2 bg-transparent border-[ #5A698F]" +
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

            <div className="form-group">
              <button
                type="submit"
                className="font-semibold bg-[var(--primary-color)]  w-full p-2 rounded-md mt-3"
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
