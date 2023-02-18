import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useSignUp } from "../hooks/user";
import Logo from "../assets/logo.svg";
import Button from "../components/Button";
import Input from "../components/Input";
import Account from "../components/Account";

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
      .oneOf([Yup.ref("password"), null], "Password does not match"),
  });

  return (
    <div className=" h-screen relative">
      <Formik initialValues={initialValues} validationSchema={validationSchema}>
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

            <Input
              isError={errors.userName && touched.userName}
              name="userName"
              type="text"
              placeholder="Enter your name"
              onChange={handleChange}
              error={errors.userName}
            />

            <Input
              isError={errors.email && touched.email}
              name="email"
              type="email"
              onChange={handleChange}
              placeholder="Enter your email"
              error={errors.email}
            />

            <Input
              isError={errors.password && touched.password}
              name="password"
              type="password"
              onChange={handleChange}
              placeholder="Enter your password"
              error={errors.password}
            />

            <Input
              isError={errors.confirmPassword && touched.confirmPassword}
              name="confirmPassword"
              type="password"
              onChange={handleChange}
              placeholder="confirm your password"
              error={errors.confirmPassword}
            />

            <Button
              isLoading={signUp.isLoading}
              isDisabled={
                isSubmitting ||
                errors.userName ||
                errors.email ||
                errors.password ||
                errors.confirmPassword
              }
              text="Register"
              onClick={async (e) => {
                e.preventDefault();

                const user = {
                  userName: values.userName,
                  password: values.password,
                };
                await signUp.mutate(user);
              }}
            ></Button>

            <Account
              to={"/auth/login"}
              text1="Already have an account? "
              text2=" Sign In"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
