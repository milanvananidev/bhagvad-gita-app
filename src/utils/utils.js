import { ToastAndroid } from 'react-native';
import Images from '../constants/Images';
import chapters from '../database/chapters';
import { quotes } from '../database/quotes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { hindiQuotes } from '../database/hindiQuotes';


export const seprateVerseValue = (inputString) => {
  const originalString = inputString;
  const modifiedString = originalString?.substring(0, originalString?.indexOf('।।'));
  return modifiedString;
};

export const androidToast = (value) => {
  ToastAndroid.showWithGravityAndOffset(
    value,
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
    25,
    50,
  );
};

export const getWallPapers = () => {
  return [
    Images.wallpaper_1,
    Images.wallpaper_2,
    Images.wallpaper_3,
    Images.wallpaper_4,
    Images.wallpaper_5,
    Images.wallpaper_6,
    Images.wallpaper_7,
    Images.wallpaper_8,
    Images.wallpaper_9,
    Images.wallpaper_10,
    Images.wallpaper_11,
    Images.wallpaper_12,
    Images.wallpaper_13,
    Images.wallpaper_14,
    Images.wallpaper_15,
    Images.wallpaper_16,
    Images.wallpaper_17,
    Images.wallpaper_18,
    Images.wallpaper_19,
    Images.wallpaper_20,
    Images.wallpaper_21,
    Images.wallpaper_22,
    Images.wallpaper_23,
    Images.wallpaper_24,
    Images.wallpaper_25,
    Images.wallpaper_26,
    Images.wallpaper_27,
  ];
};

export const checkForNextVerse = (chapter, verse) => {
  const findChapter = chapters?.filter((data) => data.chapter_number === chapter);
  const maxVerse = findChapter[0]?.verses_count;

  if (verse >= maxVerse) {
    return false;
  }

  return true;
};

export const getChapterVersesCount = (chapter) => {
  const findChapter = chapters?.filter((data) => data.chapter_number === chapter);
  const maxVerse = findChapter[0]?.verses_count;

  return maxVerse;
};

export const getTodayQuote = async ({ lang }) => {
  let lastValue = await AsyncStorage.getItem('quotedate');
  let value = await AsyncStorage.getItem('quote');
  let quoteLang = await AsyncStorage.getItem('quoteLang');

  if (lastValue !== moment().format('DD/MM/YYYY') || value === null || quoteLang !== lang) {

    let randomNumber;

    if (lang === 'hi') {
      randomNumber = Math.round(Math.random() * 37)
    } else {
      randomNumber = Math.round(Math.random() * 98)
    }

    await AsyncStorage.setItem('quotedate', String(moment().format('DD/MM/YYYY')));
    await AsyncStorage.setItem('quote', String(randomNumber))
    await AsyncStorage.setItem('quoteLang', String(lang))

    return lang == 'hi' ? hindiQuotes[randomNumber] : quotes[randomNumber] || ''
  } else {
    return lang == 'hi' ? hindiQuotes[parseInt(value)] : quotes[parseInt(value)] || ''
  }
}