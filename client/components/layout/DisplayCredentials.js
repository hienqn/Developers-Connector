import React, { Fragment } from 'react'
import axios from 'axios';
// import { query } from 'express';

const DisplayCredentials = ({ experiences, educations }) => {


  const onClick = (id, type) => {
    console.log('here is my id', id, type);
    // e.preventDefault();
    // Mistake here, delete profile by accident;
    axios.delete('/api/profile/', {params: { [type]: id}});
    window.querySelector(`#${id}`).remove();
  }

  const experience = experiences.map(
    ({ title, company, from, to, _id }) => {
      console.log(_id);
      return (
        <tr key={_id} id={_id}>
          <td> {company} </td>
          <td className="hide-sm"> {title} </td>
          <td className="hide-sm">
            {from}
          </td>
          <td className="hide-sm">
            {to}
          </td>
          <td>
            <button className="btn btn-danger" onClick={(e) => onClick(_id,'exp_id')}>
              Delete
            </button>
          </td>
        </tr>
      )
    }
  )

  const education = educations.map(
    ({ school, degree, from, to, _id }) => {
      console.log(_id);
      return (
        <tr key={_id} id={_id}>
          <td>{school}</td>
          <td className="hide-sm">{degree}</td>
          <td className="hide-sm">
            {from}
          </td>
          <td className="hide-sm">
            {to}
          </td>
          <td>
            <button className="btn btn-danger" onClick={(e) => onClick(_id, 'edu_id')}>
              Delete
                </button>
          </td>
        </tr>
      )
    }
  )

  return (
    <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">From</th>
            <th className="hide-sm">To</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {experience}
        </tbody>
      </table>

      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">From</th>
            <th className="hide-sm">To</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {education}
        </tbody>
      </table>

      <div className="my-2">
        <button className="btn btn-danger">
          <i className="fas fa-user-minus"></i>
                Delete My Account
            </button>
      </div>
    </Fragment>
  )
}


export default DisplayCredentials;