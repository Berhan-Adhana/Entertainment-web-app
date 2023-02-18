import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { updateUser } from "../context/userSlice";
import { useLogin } from "../hooks/user";
import Logo from "../assets/logo.svg";
import Button from "../components/Button";
import Account from "../components/Account";
import Input from "../components/Input";

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
        {({
          errors,
          touched,
          resetForm,
          values,
          isSubmitting,
          handleChange,
        }) => (
          <Form className="bg-[var(--container-color)] p-6 rounded-3xl  absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]  w-[90%]  shadow  large:max-w-md block mr-5 mx-auto min-w-[285px]">
            <img src={Logo} alt="" className="mx-auto mb-4" />
            <h1 className="text-left">Login</h1>
            <Input
              isError={errors.userName && touched.userName}
              name="userName"
              type="text"
              placeholder="Enter your User Name"
              onChange={handleChange}
              error={errors.userName}
            />
            <Input
              isError={errors.password && touched.password}
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={handleChange}
              error={errors.password}
            />

            <Button
              isDisabled={isSubmitting || errors.userName || errors.password}
              text="Login"
              isLoading={signIn.isLoading}
              onClick={async (e) => {
                e.preventDefault();

                const user = {
                  userName: values.userName,
                  password: values.password,
                };
                await signIn.mutate(user);
              }}
            ></Button>
            <Account
              to="/user/signup"
              text1=" Don't have an account? "
              text2="Sign Up"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
