import { ADD_TO_READ_VERSE, DELETE_BOOKMARK, REMOVE_YESTERDAY_COMPLATED_VERSES, SET_BOOKMARK, SET_NOTIFICATION_TIME, SET_TODAY_READ_VERSES, SET_TODAY_VERSES } from '../types/metaData';

const initialState = {
  bookmarks: [],
  rededverses: [],
  notificationTime: '',
  dailyVerse: {
    date: '',
    verses: [],
  },
  todayComplatedVerses: [],
  yesterdayComplatedVerses: [],
};

const metaDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOKMARK: {
      return {
        ...state,
        bookmarks: [...state.bookmarks, action?.payload],
      };
    }

    case DELETE_BOOKMARK: {
      return {
        ...state,
        bookmarks: action?.payload,
      };
    }

    case ADD_TO_READ_VERSE: {
      return {
        ...state,
        rededverses: [...state.rededverses, action?.payload],
      };
    }

    case SET_NOTIFICATION_TIME: {
      return {
        ...state,
        notificationTime: action.payload,
      };
    }

    case SET_TODAY_VERSES: {
      return {
        ...state,
        dailyVerse: action.payload,
      };
    }

    case SET_TODAY_READ_VERSES: {
      return {
        ...state,
        todayComplatedVerses: [...state.todayComplatedVerses, action.payload],
      };
    }

    case REMOVE_YESTERDAY_COMPLATED_VERSES: {
      return {
        ...state,
        todayComplatedVerses: [],
        yesterdayComplatedVerses: action.payload
      }
    }

    default:
      return state;
  }
};

export default metaDataReducer;
