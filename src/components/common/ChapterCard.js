import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import { COLORS, FONTS } from '../../theme/theme';
import { useTranslation } from 'react-i18next';

const ChapterCard = ({ chapterNumer, chapterName, chapterSummary, versesCount, rededVerses }) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const { t } = useTranslation();

  const handleChapterCardClick = () => {
    navigation.navigate('chapter', {
      number: chapterNumer,
      name: chapterName,
      summary: chapterSummary,
      verses: versesCount,
    });
  };

  const percent = Math.round((rededVerses?.length / versesCount) * 100);
  const progress = rededVerses?.length / versesCount;

  return (
    <>
      <TouchableOpacity style={[styles.container, { backgroundColor: theme.colors.card }]} activeOpacity={0.7} onPress={handleChapterCardClick}>
        <View style={styles.chapterView}>
          <View style={{ padding: 10, flexShrink: 1, justifyContent: 'space-around' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={[styles.chapterNumber, { backgroundColor: theme?.dark ? COLORS.primary2 : COLORS.primary }]}>
                <Text style={[{ ...FONTS.fontPoppins, marginTop: 3, ...FONTS.h6, color: theme.colors.background }]}>{chapterNumer}</Text>
              </View>
              <Text style={[styles.chapterName, { color: theme.colors.text }]}>{chapterName} </Text>
            </View>
            <Text numberOfLines={2} style={[styles.summary, { color: theme.colors.text }]}>{chapterSummary}</Text>

            <View style={{ marginTop: 20, paddingRight: 10, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <Progress.Bar progress={progress} width={180} color={theme?.dark ? COLORS.primary2 : COLORS.primary} animated={false} />
              </View>
              <Text style={[styles.complatedText, { color: theme.colors.text }]}>
                {t('chapter.Complated', { percent })}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 2,
  },
  chapterView: {
    flexDirection: 'row',
    minHeight: 120,
  },
  chapterNumber: {
    backgroundColor: COLORS.primary2,
    height: 30,
    width: 30,
    marginRight: 8,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chapterName: {
    ...FONTS.fontPoppins,
    ...FONTS.h6,
  },
  summary: {
    marginTop: 10,
    paddingRight: 10,
    lineHeight: 20,
  },
  complatedText: {
    ...FONTS.fontNunito,
  },
});

export default ChapterCard;
