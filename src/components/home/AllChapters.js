import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { FONTS } from '../../theme/theme';
import { useTranslation } from 'react-i18next';
import ChapterCard from '../common/ChapterCard';
import { getChapters } from '../../requests/request';
import { useSelector } from 'react-redux';

const AllChapters = () => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const chapters = getChapters();
  const rededVerses = useSelector((state) => state.meta.rededverses) || [];

  return (
    <View style={styles.mainView}>
      <Text style={{ ...FONTS.h4, color: theme.colors.text, marginBottom: 10 }}>
        {t('home.All Chapters')}
      </Text>
      {
        chapters?.map((item, index) => {
          const chapterRededVerse = rededVerses?.filter((verse) => verse?.chapter === item.chapter_number);
          return <ChapterCard
            key={index}
            chapterNumer={item?.chapter_number}
            chapterName={language === 'hi' ? item?.name : item?.name_translated}
            chapterSummary={language === 'hi' ? item?.chapter_summary_hindi : item?.chapter_summary}
            versesCount={item?.verses_count}
            rededVerses={chapterRededVerse}
          />;
        })
      }
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {}
});

export default AllChapters;
