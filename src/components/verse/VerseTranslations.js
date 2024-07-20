import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {COLORS, FONTS} from '../../theme/theme';
import {useTranslation} from 'react-i18next';

const VerseTranslations = ({data, isCommentry = false}) => {
  const theme = useTheme();
  const {t} = useTranslation();

  return (
    <View style={styles.mainView}>
      <View style={styles.header}>
        <Text style={[styles.title, {color: theme.colors.text}]}>
          {isCommentry ? t('verse.Commentary') : t('verse.Translation')}
        </Text>
        <Text style={{color: theme.dark ? COLORS.primary2 : COLORS.primary, ...FONTS.fontNunito}}>{`- ${data?.author_name || ''}`}</Text>
      </View>
      <Text style={[styles.translation, {color: theme.colors.text}]}>{data?.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    paddingHorizontal: 25,
    marginTop: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
  },
  title: {
    ...FONTS.h5,
  },
  translation: {
    ...FONTS.fontNunito,
    fontSize: 16,
    marginTop: 10,
    lineHeight: 30,
  },
});

export default VerseTranslations;
