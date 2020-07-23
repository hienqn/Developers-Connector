import React, { Fragment } from 'react';
import {Redirect, Route} from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from "prop-types";

const PrivateRoute = ({component: Component, isAuthenticated, loading, ...rest}) => 
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated && !loading ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      )
    }
  />;


PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
};

const mapPropsToState = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
})


export default connect(mapPropsToState)(PrivateRoute);