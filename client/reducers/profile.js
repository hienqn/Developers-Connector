import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, CREATE_PROFILE, ADD_EXPERIENCE, ADD_EDUCATION } from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
}

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_EXPERIENCE:
      return {
        ...state,
        loading: false,
        profile: { ...payload, experience: [...payload.experience]}
      }

    case ADD_EDUCATION:
      return {
        ...state,
        loading: false,
        profile: { ...payload, education: [...payload.education] }
      }

    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };

    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        error: payload,
        loading: false,
      };

    case CREATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      }

    default:
      return { ...state };
  }
}