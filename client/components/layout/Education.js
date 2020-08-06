import React, { Fragment, useState, useRef } from 'react';
import { withRouter, Link } from 'react-router-dom';
import {addEducation} from '../../actions/profile';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const Education = ({addEducation, history}) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    current: false,
    to: "",
    description: ""
  })  
  const countRender = useRef(0);

  const { school, degree, fieldofstudy, from, current, to, description } = formData;
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: typeof e.target.value === 'boolean' ? !e.target.value : e.target.value })
  const onSubmit = (e) => {
    e.preventDefault();
    addEducation(formData, history);
  }
  return (
    <Fragment>
      <h1 className="large text-primary">
        Add Your Education
      </h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
        you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            required
            value={school}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            required
            value={degree}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Field Of Study" name="fieldofstudy" value={fieldofstudy}
            onChange={(e) => onChange(e)} />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input type="date" name="from"
            value={from}
            onChange={(e) => onChange(e)} />
        </div>
        <div className="form-group">
          <p>
            <input type="checkbox" name="current" value="" value={current}
              onChange={(e) => onChange(e)} /> Current School or Bootcamp
          </p>
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
            placeholder="Program Description"
            value={description}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link to='/dashboard'>
          <a className="btn btn-light my-1" href="dashboard.html">Go Back {countRender.current++}; </a>
        </Link>
      </form>
    </Fragment>
  )
}

Education.propTypes = {
  addEducation: PropTypes.func.isRequired
}

export default connect(null, { addEducation })(withRouter(Education));
