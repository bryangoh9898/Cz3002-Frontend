import React from "react";
import {
  Route,
  Redirect,
} from "react-router-dom";
import { useAuth } from "../context/auth";

export default function PrivateRoute({ children, ...rest }) {
    const auth = useAuth();
    console.log(!auth.loading || auth.token!=null);
    return (
      <Route
        {...rest}
        render={({ location }) =>
        auth.loading ? <div></div> : auth.token!=null ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }