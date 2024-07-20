import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from '../../layout/Header';
import {FONTS} from '../../theme/theme';

const NoBookMarks = () => {
  const theme = useTheme();
  const {t} = useTranslation();

  return (
    <View>
      <Header title={t('tabs.Bookmarks')} />
      <View style={styles.mainview}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcon name={'bookmark-off-outline'} size={60} color={theme.colors.text} />
          <Text style={[styles.text, {color: theme.colors.text}]}>{t('bookmarks.No BookMarks Yet!')}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainview: {
    width: '100%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    gap: 20,
  },
  text: {
    ...FONTS.h5,
  },
});

export default NoBookMarks;
