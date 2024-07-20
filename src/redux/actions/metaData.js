import { ADD_TO_READ_VERSE, DELETE_BOOKMARK, QUOTE_OF_THE_DAY, REMOVE_YESTERDAY_COMPLATED_VERSES, SET_BOOKMARK, SET_NOTIFICATION_TIME, SET_TODAY_READ_VERSES, SET_TODAY_VERSES } from '../types/metaData';

export const addToBookmarks = (payload) => ({
  type: SET_BOOKMARK,
  payload,
});

export const deleteBookMark = (payload) => ({
  type: DELETE_BOOKMARK,
  payload,
});

export const addToReadVerse = (payload) => ({
  type: ADD_TO_READ_VERSE,
  payload,
});


export const setNotificationTime = (payload) => ({
  type: SET_NOTIFICATION_TIME,
  payload,
});

export const setTodayChallange = (payload) => ({
  type: SET_TODAY_VERSES,
  payload
});

export const setTodayReadVerse = (payload) => {
  return {
    type: SET_TODAY_READ_VERSES,
    payload
  }
};

export const removeYesterdayComplatedVerse = (payload) => {
  return {
    type: REMOVE_YESTERDAY_COMPLATED_VERSES,
    payload: payload
  }
}