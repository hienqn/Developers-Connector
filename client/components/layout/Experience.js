import React, { Fragment, useState } from 'react';
import { addExperience } from './../../actions/profile';
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const Experience = ({ addExperience, history }) => {

  const [formData, setFormData] = useState(
    {
      title: '',
      company: '',
      location: '',
      from: '',
      to: '',
      current: false,
      description: ''
    })

  const {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  } = formData;

  const onChange = (e) => (setFormData({ ...formData, [e.target.name]: typeof e.target.value === "boolean" ? !e.target.value : e.target.value }));
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    addExperience(formData, history);
  }

  return (
    <Fragment>
      <h1 className="large text-primary">
        Add An Experience
        </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
          positions that you have had in the past
        </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => onSubmit(e)} >
        <div className="form-group">
          <input type="text"
            placeholder="* Job Title"
            name="title" required
            value={title}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Company" name="company" required
            value={company}
            onChange={(e) => onChange(e)} />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location"
            value={location}
            onChange={(e) => onChange(e)} />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from"
            value={from}
            onChange={(e) => onChange(e)} />
        </div>
        <div className="form-group">
          <p><input type="checkbox" name="current"
            value={current}
            onChange={(e) => onChange(e)}
          /> Current Job</p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input type="date" name="to" value={to}
            onChange={(e) => onChange(e)} />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link to='/dashboard'>
          <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
        </Link>
      </form>
    </Fragment>
  )
}

// const mapStateToProps = state => ({

// })

Experience.propTypes = {
  addExperience: PropTypes.func.isRequired
}

export default connect(null, { addExperience })(withRouter(Experience));