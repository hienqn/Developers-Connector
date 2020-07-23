import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  CREATE_PROFILE
} from './types';

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get("api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
}

export const clearProfile = () => dispatch => {
  dispatch({
    type: CLEAR_PROFILE
  })
}


export const submitProfile = (profile) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify(profile);

  try {
    const res = await axios.post("api/profile/me", body, config);

    dispatch({
      type: CREATE_PROFILE,
      payload: res.data,
    });

  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });

  }
}