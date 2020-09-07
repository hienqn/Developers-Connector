import React, {Fragment, useState} from 'react';
import axios from 'axios';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import {setAlert} from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({isAuthenticated, setAlert, register}) => {
  const [formData, setFormData] = useState(
    {
      name: '',
      email: '',
      password: '',
      password2: '',
    }
  );
  
  const {name, email, password, password2} = formData;
  const onChange = (e) => setFormData({...formData, [e.target.name] : e.target.value})
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Password does not match.', 'danger');
    } else {
      console.log('Hit register');
      register({name, email, password});
    }
  }
  
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" action="create-profile.html" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input type="text" 
            placeholder="Name" 
            name="name" 
            required 
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email}
            onChange={(e) => onChange(e)}/>
          <small className="form-text"
          >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            value={password2}
            onChange={(e) => onChange(e)}
            name="password2"
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStatetoProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStatetoProps, {setAlert, register})(Register);