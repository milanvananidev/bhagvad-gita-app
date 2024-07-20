import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, BackHandler, ActivityIndicator } from 'react-native';
import ManageWallpaper, { TYPE } from 'react-native-manage-wallpaper';
import RNExitApp from 'react-native-exit-app';
import analytics from '@react-native-firebase/analytics';
import { useTheme } from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/MaterialIcons';
import { androidToast, getWallPapers } from '../../utils/utils';
import { FONTS } from '../../theme/theme';
import Images from '../../constants/Images';
import { useTranslation } from 'react-i18next';

const WallpaperCard = ({ Wallpaper }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const windowWidth = Dimensions.get('window').width;
  const width = windowWidth - 100;
  const height = width * 838 / 406;

  const [isLoading, setIsLoading] = useState(false);

  const onSet = () => {
    setIsLoading(true)
    analytics().logEvent('wallpaper_set');

    ManageWallpaper.setWallpaper(Wallpaper, () => {
      RNExitApp.exitApp();
      androidToast('Wallpaper set successfully');
      setIsLoading(false)
    }, TYPE.BOTH);
  };

  return (
    <View>
      <Image source={Images.blackMobileFrame} style={[styles.frame, { width, height }]} resizeMode="contain" />
      <Image source={Wallpaper} style={[styles.wallpaper, { width: width - 10, height: height - 10 }]} resizeMode="cover" />
      <TouchableOpacity onPress={onSet} activeOpacity={0.8} style={[styles.textBox, { backgroundColor: theme.colors.text }]}>
        {isLoading ? <ActivityIndicator color={theme.colors.background} style={{ paddingHorizontal: 30 }} /> : <Text style={[styles.text, { color: theme.colors.background }]}>{t('wallpaper.Set Wallpaper')}</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wallpaper: {
    position: 'absolute',
    zIndex: -10,
    borderRadius: 30,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderWidth: 10,
    marginTop: 5,
  },
  frame: {
    aspectRatio: 406 / 838,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  textBox: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    height: 50,
    marginTop: 30
  },
  text: {
    ...FONTS.fontPoppins,
  },
});

export default WallpaperCard;
