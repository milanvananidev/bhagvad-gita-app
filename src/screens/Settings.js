import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import Header from '../layout/Header';
import SettingsCard from '../components/settings/SettingsCard';
import { useSelector } from 'react-redux';

const Settings = ({ navigation }) => {
  const { t } = useTranslation();

  const onPressCard = (name) => {
    navigation.navigate('settingOptions', { name });
  };

  const user = useSelector((state) => state.user);

  const getLanguageName = (lang) => {
    if (lang === 'en') {
      return t('settings.English');
    } else if (lang === 'hi') {
      return t('settings.Hindi');
    }
  };

  const getThemeName = (theme) => {
    if (theme === 'dark') {
      return 'Dark';
    } else if (theme === 'light') {
      return 'Light';
    }
  };


  return (
    <ScrollView styles={styles.mainView} contentContainerStyle={{ paddingBottom: 50 }}>
      <View>
        <Header title={t('tabs.Settings')} leftIcon={'back'} />
        <SettingsCard title={t('settings.Language')} value={getLanguageName(user.Language)} onPress={() => {
          onPressCard('Language');
        }} icon="google-translate" />
        <SettingsCard title={t('settings.Theme')} value={getThemeName(user.Theme)} onPress={() => {
          onPressCard('Theme');
        }} icon="theme-light-dark" />
      </View>

      <View style={{ marginTop: 30 }}>
        <View style={{ marginHorizontal: 15 }}>
          <Header title={t('settings.Preferences')} />
        </View>
        <SettingsCard title={t('verse.Translation')} value={user?.Translation || 'Shri Purohit Swami'} onPress={() => {
          onPressCard('Translation');
        }} icon="comment-quote-outline" />
        <SettingsCard title={t('verse.Commentary')} value={user?.Commentary || 'Swami Sivananda'} onPress={() => {
          onPressCard('Commentary');
        }} icon="comment-multiple-outline" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginHorizontal: 15,
  },
  container: {
    paddingHorizontal: 15,
  },

});

export default Settings;
