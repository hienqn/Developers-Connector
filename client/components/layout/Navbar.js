import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {logout} from '../../actions/auth'
import { clearProfile } from "../../actions/profile";

// assumming you're getting isAuthenticated 
const Navbar = ({ loading, isAuthenticated, logout, clearProfile }) => {
  const LoggedIn = (
    <ul>
      <li>
        <Link to="/dashboard">Dashboard</Link>
      </li>
      <li>
        <Link onClick={() => {logout(); clearProfile()}} to="/">
          {" "}
          Log Out{" "}
        </Link>
      </li>
    </ul>
  );

  const LoggedOut = (
    <ul>
      <li>
        <Link to="/profile">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code" /> Codesmith Connector
        </Link>
      </h1>
      {!loading && (
        <Fragment> {isAuthenticated ? LoggedIn : LoggedOut} </Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func,
  clearProfile: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
};

const mapPropsToState = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading
})


export default connect(mapPropsToState, { logout, clearProfile })(Navbar);