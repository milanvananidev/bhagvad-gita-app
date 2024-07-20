import { CHANGE_COMMENTRATOR, CHANGE_LANGUAGE, CHANGE_THEME, CHANGE_TRANSLATOR, SET_APP_OPEN, SET_REMINDER, SET_USER_DETAILS } from '../types/user';

const initialState = {
  Language: 'en',
  Theme: 'dark',
  Translation: 'Shri Purohit Swami',
  Commentary: 'Swami Sivananda',
  Firstname: '',
  Lastname: '',
  Email: '',
  AppOpen: 0,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE: {
      return {
        ...state,
        Language: action.payload,
      };
    }

    case CHANGE_THEME: {
      return {
        ...state,
        Theme: action.payload,
      };
    }

    case CHANGE_TRANSLATOR: {
      return {
        ...state,
        Translation: action.payload,
      };
    }

    case CHANGE_COMMENTRATOR: {
      return {
        ...state,
        Commentary: action.payload,
      };
    }

    case SET_USER_DETAILS: {
      return {
        ...state,
        Firstname: action.payload.Firstname,
        Lastname: action.payload.Lastname,
        Email: action.payload.Email,
      };
    }

    default:
      return state;
  }
};

export default userReducer;
