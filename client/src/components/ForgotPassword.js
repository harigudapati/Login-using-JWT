import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ChakraInput from "./ChakraInput";
import { Button } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { Box } from "@chakra-ui/react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const ForgotPassword = () => {
  const [inputs, setInputs] = useState({
    email: ""
  });

  const [showError, setShowError] = useState(false);
  const [messageFromServer, setmessageFromServer] = useState("");

  const { email } = inputs;

  const sendEmail = async values => {
    console.log(values.email);
    if (values.email === "") {
      setShowError(false);
      setmessageFromServer("");
    } else {
      console.log("inside else");
      console.log(JSON.stringify(values));
      const response = await fetch("http://localhost:5000/forgotPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      const parseRes = await response.json();

      // axios
      // .post('http://localhost:5000/forgotPassword', {
      //     email: values.email,
      // })
      console.log(parseRes);

      // if(response.data === 'email not in db') {
      //     setShowError(true);
      //     setmessageFromServer('');
      // }
      // else if (response.data === 'recovery email sent') {
      //     setShowError(false);
      //     setmessageFromServer('recovery email sent');
      // }
    }
  };

  return (
    <Formik
      initialValues={{
        email: ""
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Email is invalid")
          .required("Email is required")
      })}
      onSubmit={sendEmail}
    >
      {formik => {
        console.log("Formik Data", formik);
        return (
          <>
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
                  <br />
                  <Button
                    type="submit"
                    colorScheme="teal"
                    size="sm"
                    ml="6px"
                    disabled={!formik.isValid || formik.isSubmitting}
                  >
                    {" "}
                    Send password reset mail
                  </Button>

                  <Button
                    type="button"
                    colorScheme="teal"
                    size="sm"
                    ml="6px"
                    // onClick={BrowserHistory.goBack}
                  >
                    {" "}
                    Go back
                  </Button>
                </Form>
              </Box>
              {messageFromServer === "recovery email sent" && (
                <div>
                  <h3>Passowrd Reset Email successfully sent!</h3>
                </div>
              )}
            </div>
          </>
        );
      }}
    </Formik>
  );
};

export default ForgotPassword;
