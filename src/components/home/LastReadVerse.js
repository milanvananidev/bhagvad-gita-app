import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import { COLORS, FONTS } from '../../theme/theme';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getVerse } from '../../requests/request';

const LastReadVerse = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const { t } = useTranslation();

  const rededVerses = useSelector((state) => state.meta.rededverses) || [];
  const lastRead = rededVerses[rededVerses?.length - 1];

  const [verseData, setVerseData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLastReadVerse = async () => {
      if (lastRead?.chapter && lastRead?.verse) {
        const data = await getVerse({ chapter: lastRead?.chapter, verse: lastRead?.verse });
        setVerseData({
          chapter: data?.chapter_number,
          verse: data?.verse_number,
          text: data?.text,
          translations: data?.translations[0],
        });
        setLoading(false);
      }
    };

    getLastReadVerse();
  }, [lastRead]);

  const readMore = () => {
    navigation?.navigate('verse', {
      chapter: verseData?.chapter,
      verse: verseData?.verse,
    });
  };

  if (loading) {
    return null;
  }

  return (
    <View style={styles.mainContainer}>
      <Text style={{ ...FONTS.h4, color: theme.colors.text }}>{t('home.Last Read')}</Text>
      <View style={[styles.container, { backgroundColor: theme.colors.card }]}>
        <View style={[styles.numberChip, { backgroundColor: theme?.dark ? COLORS.primary2 : COLORS.primary }]}>
          <Text style={{ ...FONTS.fontBold, color: theme.colors.background }}>
            {`${verseData?.chapter}.${verseData?.verse}`}
          </Text>
        </View>
        <Text style={[styles.verse, { color: theme.colors.text }]}>
          {verseData?.translations?.description}
        </Text>
        <TouchableOpacity onPress={readMore} style={[styles.button, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.buttonText, { color: theme.colors.text }]}>
            {t('home.Continue Read')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: 30
  },
  container: {
    marginTop: 10,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 20,
    elevation: 2,
  },
  numberChip: {
    backgroundColor: COLORS.primary2,
    alignSelf: 'flex-start',
    paddingVertical: 3,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 3,
    elevation: 3,
  },
  verse: {
    marginTop: 10,
    ...FONTS.fontBold,
  },
  button: {
    marginTop: 20,
    borderRadius: 50,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    ...FONTS.fontPoppins,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default LastReadVerse;
