import React, { Fragment, useState, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//components
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import { theme, ThemeProvider, ChakraProvider } from "@chakra-ui/react";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";

import FormikContainer from "./components/FormikContainer";

toast.configure();

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const setAuth = boolean => {
    setAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      const response = await fetch("http://localhost:5000/auth/verify", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseRes = await response.json();
      parseRes === true ? setAuthenticated(true) : setAuthenticated(false);
      console.log(parseRes);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    isAuth();
  });

  return (
    <ChakraProvider theme={theme}>
      <Fragment>
        <Router>
          <div className="container">
            <Switch>
              <Route
                exact
                path="/login"
                render={props =>
                  !isAuthenticated ? (
                    <Login {...props} setAuth={setAuth} />
                  ) : (
                    <Redirect to="/dashboard" />
                  )
                }
              />
              <Route
                exact
                path="/register"
                render={props =>
                  !isAuthenticated ? (
                    <Register {...props} setAuth={setAuth} />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />
              <Route
                exact
                path="/dashboard"
                render={props =>
                  isAuthenticated ? (
                    <Dashboard {...props} setAuth={setAuth} />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />
              <Route
                exact
                path="/forgotPassword"
                render={props => <ForgotPassword {...props} />}
              />
              <Route
                exact
                path="/resetPassword"
                render={props => <ResetPassword {...props} />}
              />
            </Switch>
          </div>
        </Router>
      </Fragment>
    </ChakraProvider>
  );
}

export default App;
