import { CHANGE_COMMENTRATOR, CHANGE_LANGUAGE, CHANGE_THEME, CHANGE_TRANSLATOR, SET_APP_OPEN, SET_USER_DETAILS } from '../types/user';

export const changeUserLanguage = (value) => {
  return {
    type: CHANGE_LANGUAGE,
    payload: value,
  };
};

export const changeUserTheme = (value) => {
  return {
    type: CHANGE_THEME,
    payload: value,
  };
};

export const changeTranslator = (value) => {
  return {
    type: CHANGE_TRANSLATOR,
    payload: value,
  };
};

export const changeCommentrator = (value) => {
  return {
    type: CHANGE_COMMENTRATOR,
    payload: value,
  };
};

export const setUserDetails = (value) => {
  return {
    type: SET_USER_DETAILS,
    payload: value,
  };
};
