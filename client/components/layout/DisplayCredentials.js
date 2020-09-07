import React, { Fragment, useState, useHistory } from 'react';
import { withRouter, Prompt } from 'react-router-dom';
import { logout } from "../../actions/auth";
import { connect } from 'react-redux';

import axios from 'axios';

const DisplayCredentials = ({ experiences, educations, history, logout }) => {
  const [allexperiences, setExperiences] = useState([...experiences]);
  const [alleducations, setEducations] = useState([...educations]);
  const [deleteuser, setdeleteuser] = useState(false);

  // const history = useHistory();

  const onClick = (id, type) => {
    let deletefield = '';
    if (type === 'exp_id') {
      deletefield = '/experience';
      setExperiences(allexperiences.filter(e => e._id !== id))
    } else if (type === 'edu_id') {
      deletefield = '/education';
      setEducations(alleducations.filter(e => e._id !== id))
    } 
    axios.delete(`/api/profile${deletefield}`, {params: { [type]: id}});
  }

  const deleteProfile = async (e) => {
    e.preventDefault();
    setdeleteuser(true);
    console.log('hit here')
    console.log(deleteuser);
    // const headers = { 'x-auth-token': localStorage.token};
    // const params = {};
    // await axios.delete(`/api/profile`, params, headers);
    // await logout();
    // await history.push('/');
  }

  const experience = allexperiences.map(
    ({ title, company, from, to, _id }) => {
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

  const education = alleducations.map(
    ({ school, degree, from, to, _id }) => {
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
      <Prompt when={deleteuser} message={'Are you sure you want to delete your profile?'} />

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
      
      {/* <Link to="/">
        <i className="fas fa-code" /> Codesmith Connector
        </Link> */}
      <div className="my-2">
        <a className="btn btn-danger" onClick={(e) => deleteProfile(e)}>
          <i className="fas fa-user-minus"></i>
                Delete My Account
            </a>
      </div>
      
    </Fragment>
  )
}

export default connect(null, { logout })(withRouter(DisplayCredentials));