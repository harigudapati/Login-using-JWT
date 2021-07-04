import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ChakraInput from "./ChakraInput";
import { Button } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { Box } from "@chakra-ui/react";

const Login = ({ setAuth }) => {
  const onSubmitForm = async values => {
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });

      /*response.json() will send a response that is the parameter converted to a JSON string using JSON.stringify().
            The parameter can be any JSON type, including object, array, string, Boolean, number, or null, and you can also use it to convert other values to JSON.*/
      const parseRes = await response.json();
      console.log(parseRes);
      if (parseRes.token) {
        // console.log(parseRes);
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("login sucessfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: ""
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Email is invalid")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required")
      })}
      onSubmit={onSubmitForm}
    >
      {formik => {
        console.log("Formik Data", formik);
        return (
          <>
            <h1
              className="mt-5 text-center"
              style={{ color: "navy", fontSize: "30px", fontWeight: "bold" }}
            >
              Login
            </h1>
            <div
              style={{
                margin: "auto",
                width: "50%",
                paddingTop: "10px"
              }}
            >
              <Box border="1px solid black" w="100%" p={4} color="black">
                <Form>
                  <ChakraInput name="email" label="Email" type="email" />
                  <ChakraInput
                    name="password"
                    label="Password"
                    type="password"
                  />
                  <br />
                  <Link to="/forgotPassword">
                    <u>ForgotPassword?</u>
                  </Link>

                  <Button
                    type="submit"
                    colorScheme="teal"
                    size="sm"
                    ml="6px"
                    disabled={!formik.isValid || formik.isSubmitting}
                  >
                    {" "}
                    Submit
                  </Button>
                  <Link to="/register" style={{ float: "right" }}>
                    <u>register</u>
                  </Link>
                </Form>
              </Box>
            </div>
          </>
        );
      }}
    </Formik>
  );
};

export default Login;
