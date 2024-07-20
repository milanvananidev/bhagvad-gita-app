import React, { useContext, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { getFromStorage } from '../utils/localStorage';
import { useTranslation } from 'react-i18next';
import themeContext from '../context/ThemeContext';
import TodayQuote from '../components/home/TodayQuote';
import TodayTasks from '../components/home/TodayTasks';
import PeaceOfMind from '../components/home/PeaceOfMind';
import HomeHeader from '../components/home/HomeHeader';
import ReadFullGita from '../components/home/ReadFullGita';
import UserProgress from '../components/home/UserProgress';

const Home = () => {
  const { i18n } = useTranslation();
  const context = useContext(themeContext);

  useEffect(() => {
    getFromStorage('language')?.then((res) => {
      i18n.changeLanguage(res);
    });
  }, [i18n]);

  useEffect(() => {
    getFromStorage('theme').then((res) => {
      if (res === 'light') {
        context.setLightTheme();
      } else {
        context.setDarkTheme();
      }
    });
  }, []);

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
        <HomeHeader />
        <TodayQuote />
        <TodayTasks />
        <UserProgress />
        <PeaceOfMind />
        <ReadFullGita />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default Home;
