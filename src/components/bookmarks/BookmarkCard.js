import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import FontAwesomeIcon from 'react-native-vector-icons/MaterialIcons';
import { FONTS, COLORS } from '../../theme/theme';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBookMark } from '../../redux/actions/metaData';
import { androidToast } from '../../utils/utils';

const BookmarkCard = ({ item, setUpdate }) => {
  const { verse, chapter, verseTxt } = item;
  const { t } = useTranslation();
  const theme = useTheme();
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const bookMarks = useSelector((state) => state.meta.bookmarks);

  const onReadMore = () => {
    navigation.navigate('verse', {
      chapter, verse,
    });
  };

  const onShare = () => {
    navigation.navigate('share', {
      chapter, verse, verseTxt,
    });
  };

  const onDelete = () => {
    const allBookMark = bookMarks;
    const index = allBookMark.findIndex((obj) => obj.verse === verse && obj.chapter === chapter);
    allBookMark.splice(index, 1);
    dispatch(deleteBookMark(allBookMark));
    // the props do not change because we're changing an object property but the object itself does not change from the react side.
    setUpdate((prev) => !prev);
    return androidToast(t('verse.Bookmark deleted successfully'));
  };


  return (
    <View>
      <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
        <View style={[styles.verseChip, { backgroundColor: theme.colors.primary }]}>
          <Text style={[styles.verseDetails, { color: theme.colors.card }]}> {t('verse.Chapter', { number: chapter })} </Text>
          <Text style={[styles.verseDetails, { color: theme.colors.card }]}> {t('verse.Verse', { number: verse })} </Text>
        </View>

        <Text style={[styles.text, { color: theme.colors.text }]}>
          {verseTxt}
        </Text>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={onReadMore} activeOpacity={0.8} style={[styles.iconBox, { backgroundColor: theme.colors.text }]}>
          <FontAwesomeIcon name={'read-more'} color={theme.colors.card} size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onShare} activeOpacity={0.8} style={[styles.iconBox, { backgroundColor: theme.colors.text }]}>
          <FontAwesomeIcon name={'share'} color={theme.colors.card} size={30} style={{ left: -1 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} activeOpacity={0.8} style={[styles.iconBox, { backgroundColor: theme.colors.text }]}>
          <FontAwesomeIcon name={'delete'} color={theme.colors.card} size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 60,
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
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    marginTop: -30,
    marginBottom: 50,
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

export default BookmarkCard;
