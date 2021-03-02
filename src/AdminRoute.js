import React from "react";
import PropTypes from "prop-types";
import {Redirect, Route} from "react-router-dom";

export const AdminRoute = ({isAuthenticated, component: Component, ...rest}) => (
  <Route
    {...rest}
    render={props => isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

AdminRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};

