import React from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import WallpaperCard from '../components/wallpaper/WallpaperCard';
import { getWallPapers } from '../utils/utils';
import Header from '../layout/Header';
import { useTranslation } from 'react-i18next';
import WallpaperList from '../components/wallpaper/WallpaperList';

function Wallpaper() {

  const { t } = useTranslation();
  const wallpapers = getWallPapers();

  return (
    <View style={{ marginTop: 20, marginHorizontal: 10 }}>
      <Header title={t('wallpaper.Wallpapers')} />
      <FlatList
        data={wallpapers}
        renderItem={({ item }, index) => <WallpaperList key={index} Wallpaper={item} />}
        contentContainerStyle={{ marginHorizontal: 10, paddingBottom: 80 }}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    marginHorizontal: 15,
    marginTop: 20,
    paddingBottom: 200,
    alignItems: 'center',
  },
});

export default Wallpaper;
