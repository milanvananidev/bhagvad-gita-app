/* eslint-disable react-hooks/exhaustive-deps */
import {
  StyleSheet, ScrollView, ActivityIndicator, View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute, useTheme } from '@react-navigation/native';
import GestureRecognizer from 'react-native-swipe-gestures';
import { useDispatch, useSelector } from 'react-redux';
import { useNetInfo } from '@react-native-community/netinfo';
import TrackPlayer from 'react-native-track-player';
import { getVerse } from '../requests/request';
import Header from '../layout/Header';
import VerseSanskrit from '../components/verse/VerseSanskrit';
import VerseTranslations from '../components/verse/VerseTranslations';
import VerseFooter from '../components/verse/VerseFooter';
import VerseNextPervious from '../components/verse/VerseNextPervious';
import { checkForNextVerse, getWallPapers } from '../utils/utils';
import { addToReadVerse, setTodayReadVerse } from '../redux/actions/metaData';
import NoConnection from '../components/common/NoConnection';
import { getAudioURL } from '../helper/firebase';

function Verse() {
  const { params } = useRoute();
  const dispatch = useDispatch();
  const netInfo = useNetInfo();
  const theme = useTheme();

  const chapter = params?.chapter;
  const isFromToday = params?.isFromToday;

  const [verse, setVerse] = useState(params?.verse);

  const rededVerses = useSelector((state) => state.meta.rededverses) || [];
  const todayComplatedVerses = useSelector((state) => state.meta.todayComplatedVerses) || [];
  const chapterVerses = rededVerses.filter((data) => data.chapter === chapter);

  const [verseData, setVerseData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getVerseData = async () => {
    const data = await getVerse({ chapter, verse });

    const {
      text, translations, chapter_number, verse_number, commentaries, word_meanings,
    } = data;

    setVerseData({
      text,
      translations: translations[0],
      chapter_number,
      verse_number,
      commentaries: commentaries[0],
      word_meanings,
    });

    setIsLoading(false);
    handleTodayVerseComplate()
    if (chapterVerses?.filter((item) => item.verse === verse)?.length <= 0) {
      dispatch(addToReadVerse({ chapter, verse }));
    }
  };

  const handleAudioPlayer = async () => {
    const makeUrl = await getAudioURL(chapter, verse);

    try {
      await TrackPlayer.removeUpcomingTracks();

      const track = {
        id: 0,
        url: makeUrl,
        title: `Chapter ${chapter} - Verse ${verse}`,
        album: 'Gita',
        artwork: getWallPapers()[Math.round(Math.random() * 25)],
      };

      await TrackPlayer.load(track);
    } catch (error) {
    }
  };

  const handleTodayVerseComplate = () => {
    let has = todayComplatedVerses?.filter((obj) => obj.chapter === chapter && obj.verse === verse);
    if (isFromToday && has?.length <= 0) {
      dispatch(setTodayReadVerse({
        chapter, verse
      }))
    }
  };

  useEffect(() => {
    TrackPlayer.removeUpcomingTracks();
    getVerseData();
    handleAudioPlayer();

    return async () => {
      await TrackPlayer.remove([0]);
    };
  }, [verse, chapter]);


  const config = {
    velocityThreshold: 0.8,
    directionalOffsetThreshold: 50,
  };

  const onNextVerse = () => {
    if (isFromToday) { return null }

    setIsLoading(true);
    // checking for maximum number of verse in each chapter
    const check = checkForNextVerse(chapter, verse);

    if (check) {
      setVerse((prev) => prev + 1);
    } else {
      setIsLoading(false);
    }
  };

  const onPreviousVerse = () => {
    if (isFromToday) { return null }

    setIsLoading(true);
    if (verse !== 1) {
      setVerse((prev) => prev - 1);
    } else {
      setIsLoading(false);
    }
  };

  const handleTodayNext = () => {
    alert(11)
  }

  if (!netInfo?.isConnected && isLoading) {
    return <NoConnection />;
  }

  if (isLoading) {
    return (
      <>
        <Header leftIcon="back" />
        <View style={{
          height: '90%', width: '100%', justifyContent: 'center', alignItems: 'center',
        }}
        >
          <ActivityIndicator size="large" color={theme.colors.text} />
        </View>
      </>
    );
  }

  return (
    <>
      <Header leftIcon="back" />
      <ScrollView style={styles.mainView} contentContainerStyle={{ paddingBottom: 80 }}>
        <GestureRecognizer onSwipeLeft={onNextVerse} onSwipeRight={onPreviousVerse} config={config} >
          <VerseSanskrit text={verseData.text} chapter={chapter} verse={verse} />
          <VerseTranslations data={verseData.translations} />
          <VerseTranslations data={verseData.commentaries} isCommentry />
          {!isFromToday ? <VerseNextPervious onNextVerse={onNextVerse} onPreviousVerse={onPreviousVerse} /> : null}
        </GestureRecognizer>
      </ScrollView>
      {/* <VerseFooter /> */}
    </>
  );
}

const styles = StyleSheet.create({
  mainView: {},
});

export default Verse;
