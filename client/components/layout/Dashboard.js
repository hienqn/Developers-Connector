import React, { Fragment, useEffect } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from '../layout/Spinner';

// { getCurrentProfile, auth, profile: {profile, loading} }

const Dashboard = () => {
  // useEffect(() => {
  //   getCurrentProfile();
  // }, []);

  // return !loading && profile === null ? <Spinner /> : <Fragment> No Spinner </Fragment>;
  return <Spinner></Spinner>
};

// Dashboard.propTypes = {
//   getCurrentProfile: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   profile: PropTypes.object.isRequired,
// };

// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   profile: state.profile,
// });

// export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
export default Dashboard;