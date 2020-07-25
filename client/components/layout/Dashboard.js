import React, { Fragment, useEffect } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';

const Dashboard = ({
  getCurrentProfile,
  auth : {user},
  profile : {profile, loading}
}) => {

  useEffect(() => {
    getCurrentProfile();
  }, []);
    
  return ( 
    loading && profile === null ?
    <Spinner /> :
    <Fragment>
      <h1 className="large text-primary"> Dashboard </h1>
      <p className="lead">
      </p>
      <h1> Welcome {user && user.name} </h1>
      {profile != null ? (
        <Fragment>
          <DashboardActions />
        </Fragment>
      ) : (
        <Fragment>
          <p> Please set up a profile. </p>
          <Link to='/create-profile' className="btn btn-primary my-1">
            CREATE PROFILE
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
  
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
