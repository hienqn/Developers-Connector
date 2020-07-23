import axios from "axios";
import { setAlert } from "../components/layout/Alert";
import {
  GET_PROFILE,
  PROFILE_ERROR
} from './types';

// Get current users profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get("api/profile/me");
    console.log('getting res', res);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.respond.statusText, status: err.response.status },
    });
  }
}

