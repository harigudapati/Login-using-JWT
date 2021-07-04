import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ChakraInput from "./ChakraInput";
import { Button } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import axios from "axios";

const ResetPassword = ({ setAuth }) => {
  const [updated, setUpdated] = useState(false);
  const [error, setError] = useState(false);

  const updatePassword = async values => {
    console.log(values);
    try {
      const response = await fetch(
        "http://localhost:5000/updatePasswordViaEmail",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values)
        }
      );
      const parseRes = await response.json();

      // if (response.data.message === "password updated") {
      //   setUpdated(true);
      //   setError(false);
      // } else {
      //   setUpdated(false);
      //   setError(true);
      // }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  if (error) {
    return (
      <div>
        {/* <HeaderBar title={title} /> */}
        <div>
          <h4>Problem resetting password. Please send another reset link.</h4>
          <Link to="/forgotPassword" />
        </div>
      </div>
    );
  }

  // if (isLoading) {
  //   return (
  //     <div>
  //       <HeaderBar title={title} />
  //       <div style={loading}>Loading User Data...</div>
  //     </div>
  //   );
  // }

  return (
    <Formik
      initialValues={{
        newPassword: "",
        confirmPassword: ""
      }}
      validationSchema={Yup.object().shape({
        newPassword: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
          .required("Confirm Password is required")
      })}
      onSubmit={updatePassword}
    >
      {formik => {
        console.log("Formik Data", formik);
        return (
          <>
            <h1
              className="text-center my-5"
              style={{ fontWeight: "bold", fontSize: "30px", color: "navy" }}
            >
              Reset password
            </h1>
            <div
              style={{
                margin: "auto",
                width: "50%"
              }}
            >
              <Box border="1px solid black" w="100%" p={4} color="black">
                <Form>
                  <ChakraInput
                    name="newPassword"
                    label="New password"
                    type="password"
                  />
                  <ChakraInput
                    name="confirmPassword"
                    label="Confirm password"
                    type="password"
                  />
                  <br />

                  <Button
                    type="submit"
                    colorScheme="teal"
                    size="sm"
                    ml="6px"
                    disabled={!formik.isValid || formik.isSubmitting}
                  >
                    {" "}
                    Update password
                  </Button>
                  <Link to="/login" style={{ float: "right" }}>
                    <u>Login</u>
                  </Link>
                </Form>
                {updated && (
                  <div>
                    <p>
                      Your password has been successfully reset, please try
                      logging in again.
                    </p>
                    <Link to="/login" style={{ float: "right" }}>
                      <u>Login</u>
                    </Link>
                  </div>
                )}
              </Box>
            </div>
          </>
        );
      }}
    </Formik>
  );
};

export default ResetPassword;
