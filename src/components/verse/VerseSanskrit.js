/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ToastAndroid} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/MaterialIcons';
import {COLORS, FONTS} from '../../theme/theme';
import {useNavigation, useTheme} from '@react-navigation/native';
import {androidToast, seprateVerseValue} from '../../utils/utils';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {addToBookmarks} from '../../redux/actions/metaData';
import TrackPlayer, {Capability, useTrackPlayerEvents} from 'react-native-track-player';

const VerseSanskrit = ({text, verse, chapter}) => {
  const {t} = useTranslation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const verseTxt = seprateVerseValue(text);
  const bookMarks = useSelector((state) => state.meta.bookmarks) || [];

  const [isAdded, setIsAdded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // If previous audio has playing then remove upcoming
    TrackPlayer.removeUpcomingTracks();
    TrackPlayer.stop();
  }, [verse, chapter]);

  const isVerseIsAddedToBookMarks = () => {
    const filterData = bookMarks?.filter((bookmark) => {
      return bookmark.verse === verse && bookmark.chapter === chapter;
    });
    setIsAdded(filterData?.length > 0);
  };

  useTrackPlayerEvents(['playback-state'], (event) => {
    if (event.state === 'playing') {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  });

  useEffect(() => {
    isVerseIsAddedToBookMarks();
  }, [bookMarks]);

  const handleAddToBookmark = () => {
    if (isAdded) {
      return androidToast(t('verse.Verse is already added to bookmarks'));
    }

    dispatch(addToBookmarks({
      chapter, verse, verseTxt,
    }));
    setIsAdded(true);
  };

  const playAudio = async () => {
    await TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.Stop,
      ]});

    const trackState = await TrackPlayer.getPlaybackState();

    // replay audio method
    if (trackState?.state === 'ended') {
      await TrackPlayer.seekTo(0);
      await TrackPlayer.play();
    }

    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  const handleShare = () => {
    navigation.navigate('share', {
      verse, chapter, verseTxt,
    });
  };

  return (
    <View style={styles.mainView}>
      <View style={[styles.container, {backgroundColor: theme.colors.card}]}>
        <View style={[styles.verseChip, {backgroundColor: theme.dark ? COLORS.primary2 : COLORS.primary}]}>
          <Text style={[styles.verseDetails, {color: theme.colors.card}]}> {t('verse.Chapter', {number: chapter})} </Text>
          <Text style={[styles.verseDetails, {color: theme.colors.card}]}> {t('verse.Verse', {number: verse})} </Text>
        </View>

        <Text style={[styles.text, {color: theme.colors.text}]}>
          {verseTxt}
        </Text>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={handleAddToBookmark} activeOpacity={0.8} style={[styles.iconBox, {backgroundColor: theme.colors.card}]}>
          <FontAwesomeIcon name={isAdded ? 'bookmark-added' : 'bookmark-add'} color={theme.colors.text} size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={playAudio} activeOpacity={0.8} style={[styles.sound, {backgroundColor: theme.colors.card}]}>
          <FontAwesomeIcon name={isPlaying ? 'pause' : 'play-arrow'} color={theme.colors.text} size={20} />
          <Text style={[styles.changeImgText, {color: theme.colors.text}]}>{t('verse.Play Audio')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare} activeOpacity={0.8} style={[styles.iconBox, {backgroundColor: theme.colors.card}]}>
          <FontAwesomeIcon name={'share'} color={theme.colors.text} size={30} style={{left: -1}} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    marginHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    aspectRatio: 1 / 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    elevation: 2,
  },
  verseChip: {
    flexDirection: 'row',
    width: '60%',
    marginBottom: 40,
    justifyContent: 'center',
    backgroundColor: COLORS.primary2,
    borderRadius: 100,
    padding: 10,
    elevation: 1,
  },
  verseDetails: {
    ...FONTS.fontPoppins,
  },
  text: {
    ...FONTS.h5,
    ...FONTS.fontPoppins,
    lineHeight: 32,
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
    width: '90%',
    marginTop: 20,
  },
  sound: {
    paddingVertical: 12,
    elevation: 1,
    paddingHorizontal: 25,
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  iconBox: {
    borderRadius: 100,
    padding: 10,
    elevation: 1,
  },
  changeImgText: {
    ...FONTS.fontPoppins,
  },
});

export default VerseSanskrit;
