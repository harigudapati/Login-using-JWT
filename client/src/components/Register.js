import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ChakraInput from "./ChakraInput";
import { Button } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: ""
  });

  const { email, password, name } = inputs;

  const onSubmitForm = async values => {
    console.log(values);

    try {
      //   const body = { email, password, name };

      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      console.log(response);

      const parseRes = await response.json();
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Registered sucessfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("Username is required"),
        email: Yup.string()
          .email("Email is invalid")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm Password is required")
      })}
      onSubmit={onSubmitForm}
    >
      {formik => {
        console.log("Formik Data", formik);
        return (
          <>
            <h1
              className="text-center my-5"
              style={{ fontWeight: "bold", fontSize: "30px", color: "navy" }}
            >
              Register
            </h1>
            <div
              style={{
                margin: "auto",
                width: "50%"
              }}
            >
              <Box border="1px solid black" w="100%" p={4} color="black">
                <Form>
                  <ChakraInput name="name" label="Username" type="text" />
                  <ChakraInput name="email" label="Email" type="email" />
                  <ChakraInput
                    name="password"
                    label="Password"
                    type="password"
                  />
                  <ChakraInput
                    name="confirmPassword"
                    label="Confirm password"
                    type="password"
                  />

                  <br />

                  <Button type="reset" colorScheme="teal" size="sm">
                    {" "}
                    Reset
                  </Button>

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
                  <Link to="/login" style={{ float: "right" }}>
                    <u>Login</u>
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

export default Register;
