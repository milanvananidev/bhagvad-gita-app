/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useRoute, useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import Header from '../layout/Header';
import * as Progress from 'react-native-progress';
import {COLORS, FONTS} from '../theme/theme';
import ChapterVerse from '../components/chapters/ChapterVerse';
import {useSelector} from 'react-redux';
import {getChapterVersesCount} from '../utils/utils';

const Chapter = () => {
  const {t} = useTranslation();
  const theme = useTheme();
  const {params} = useRoute();
  const {summary, name, number, verses} = params;

  const rededVerses = useSelector((state) => state.meta.rededverses) || [];
  const chapterVerses = rededVerses.filter((data) => data.chapter === number);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const veresCount = getChapterVersesCount(number);
    const reded = chapterVerses?.length;

    setProgress(reded / veresCount);
  }, [rededVerses]);

  return (
    <View>
      <Header title={t('chapter.Chapter', {number})} leftIcon={'back'} />
      <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 100}}>
        <View style={styles.chapterInfoView}>
          <Progress.Circle
            size={80}
            progress={progress}
            color={theme.dark ? COLORS.primary2 : COLORS.primary}
            showsText={true}
            textStyle={[styles.progressText, {color: theme.dark ? COLORS.primary2 : COLORS.primary}]}
            strokeCap={'round'}
          />
          <Text style={[styles.name, {color: theme.colors.text}]}>
            {name}
          </Text>
          <Text style={[styles.summary, {color: theme.colors.text}]}>
            {summary}
          </Text>
          <ChapterVerse verses={verses} chapter={number} addedChapterVerses={chapterVerses} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
  },
  chapterInfoView: {
    marginTop: 20,
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    ...FONTS.fontPoppins,
  },
  name: {
    ...FONTS.h4,
    marginVertical: 10,
  },
  summary: {
    lineHeight: 25,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  },
});

export default Chapter;
