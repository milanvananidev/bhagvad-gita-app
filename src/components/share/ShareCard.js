import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Share from 'react-native-share';
import { useTranslation } from 'react-i18next';
import { COLORS, FONTS } from '../../theme/theme';
import { getWallPapers } from '../../utils/utils';
import FontAwesomeIcon from 'react-native-vector-icons/MaterialIcons';
import ViewShot from 'react-native-view-shot';
import Images from '../../constants/Images';

const ShareCard = ({ verse, chapter, verseTxt }) => {
  const ref = useRef(null);
  const { t } = useTranslation();
  const theme = useTheme();
  const backgrounds = getWallPapers();

  const [version, setVersion] = useState('square');
  const [image, setImage] = useState(Math.round(Math.random() * 26));

  const data = [
    { name: 'square', value: 'Square' },
    { name: 'portrait', value: 'Portrait' },
    { name: 'story', value: 'Story' },
  ];

  const getAspectRatio = () => {
    if (version === 'square') {
      return 1 / 1;
    } else if (version === 'portrait') {
      return 4 / 5;
    } else if (version === 'story') {
      return 9 / 16;
    }
  };

  const changeBG = () => {
    const randomBG = Math.round(Math.random() * 26);
    setImage(randomBG);
  };

  const createMessage = () => {
    return '';
  };

  const shareIMG = async () => {
    ref.current.capture().then((uri) => {
      const options = {
        url: uri,
        title: `Bhagvad Gita ( ${chapter} - ${verse} )`,
        message: createMessage(0),
        filename: `Bhagvad Gita-${chapter} - ${verse}`,
      };

      Share.open(options);
    });
  };


  return (
    <ScrollView style={styles.mainView} contentContainerStyle={{ paddingBottom: 250 }} showsVerticalScrollIndicator={false} >
      <View style={styles.actionButtons}>
        {
          data?.map((item) => {
            const isSelected = item.name === version;

            return (
              <TouchableOpacity key={item.name} onPress={() => {
                setVersion(item?.name);
              }} activeOpacity={0.8} style={[styles.iconBox, { backgroundColor: theme.colors.card, borderColor: isSelected ? theme.colors.text : theme.colors.card, borderWidth: 1 }]}>
                <FontAwesomeIcon name={'crop-square'} color={theme.colors.text} size={30} />
                <Text style={[{ color: theme.colors.text }]}>{item?.value}</Text>
              </TouchableOpacity>
            );
          })
        }
      </View>

      <View style={{ borderColor: '#fff', borderWidth: 0.6, borderRadius: 20, overflow: 'hidden', elevation: 3 }}>
        <ViewShot
          ref={ref}
          style={[styles.container, {
            aspectRatio: getAspectRatio(),
          }]}
        >
          <Image source={backgrounds[image]} style={styles.backgroundImg} resizeMode="cover" />

          <View style={{ alignItems: 'center' }}>
            <View style={[styles.verseChip]}>
              <Text style={[styles.verseDetails, { color: '#fff' }]}> {t('verse.Chapter', { number: chapter })} </Text>
              <Text style={[styles.verseDetails, { color: '#fff' }]}> {t('verse.Verse', { number: verse })} </Text>
            </View>

            <Text style={[styles.title, { color: COLORS.primary2, marginTop: -10 }]}>{t("extra.Bhagvad Gita")}</Text>
          </View>

          <Text style={[styles.text, { color: '#fff', lineHeight: version === 'square' ? 20 : undefined }]}>
            {verseTxt}
          </Text>

          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
            <Image source={Images.Logo} style={{ width: 30, height: 30, borderRadius: 20 }} />
            <Text style={styles.appName}>{t("extra.Bhagvad Gita App")}</Text>
          </View>
        </ViewShot>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={changeBG} activeOpacity={0.8} style={[styles.iconBox1, { backgroundColor: theme.colors.card }]}>
          <Text style={{ color: theme.colors.text, ...FONTS.fontPoppins, fontSize: 13, paddingVertical: 5, paddingHorizontal: 10 }}>{'Change Background'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={shareIMG} activeOpacity={0.8} style={[styles.iconBox1, { backgroundColor: theme.colors.card }]}>
          <Text style={{ color: theme.colors.text, ...FONTS.fontPoppins, fontSize: 13, paddingVertical: 5, paddingHorizontal: 10 }}>{'Share'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    marginHorizontal: 25,
  },
  container: {
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 2,
    backgroundColor: '#000',
    paddingVertical: 10
  },
  backgroundImg: {
    position: 'absolute',
    height: '110%',
    width: '100%',
    opacity: 0.2,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  verseChip: {
    flexDirection: 'row',
  },
  verseDetails: {
    ...FONTS.fontPoppinsSemiBold,
    fontSize: 15,
  },
  title: {
    ...FONTS.fontPoppinsExtraBold,
    fontSize: 28,
  },
  text: {
    ...FONTS.h5,
    ...FONTS.fontPoppinsBold,
    lineHeight: 32,
    textAlign: 'center',
    paddingHorizontal: 15,
  },
  appName: {
    ...FONTS.fontPoppinsMedium,
    color: COLORS.primary2
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
    marginVertical: 25,
  },
  iconBox: {
    borderRadius: 20,
    padding: 30,
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    marginTop: 10,
  },
  iconBox1: {
    borderRadius: 50,
    padding: 10,
    elevation: 1,
    flexDirection: 'row',
    backgroundColor: 'red',
  },
});

export default ShareCard;
