import React, { useContext, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import { RadioButton } from 'react-native-radio-buttons-group';
import SettingsOptionsData from '../constants/SettingsOptionsData';
import Header from '../layout/Header';
import { FONTS } from '../theme/theme';
import themeContext from '../context/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { changeCommentrator, changeTranslator, changeUserLanguage, changeUserTheme } from '../redux/actions/user';
import { useTranslation } from 'react-i18next';
import { setToStorage } from '../utils/localStorage';
import { englishTranslators, hindiTranslators } from '../database/translators';
import { englishComentrators, hindiConmentretors } from '../database/comentrators';

const SettingsOptions = () => {
  const route = useRoute();
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const context = useContext(themeContext);
  const { i18n, t } = useTranslation();

  const { name } = route.params;
  const language = useSelector((state) => state.user?.Language);

  let radioButtons = useMemo(() => (SettingsOptionsData[name]), [name]);

  // Transltions is based on hindi or english language is selcted
  if (name === 'Translation') {
    if (language === 'hi') {
      radioButtons = hindiTranslators;
    } else {
      radioButtons = englishTranslators;
    }
  }

  if (name === 'Commentary') {
    if (language === 'hi') {
      radioButtons = hindiConmentretors;
    } else {
      radioButtons = englishComentrators;
    }
  }

  const changeTheme = (value) => {
    if (value === 'dark') {
      context.setDarkTheme();
      dispatch(changeUserTheme('dark'));
    } else if (value === 'light') {
      context.setLightTheme();
      dispatch(changeUserTheme('light'));
    }
  };

  const handleChange = (value) => {
    if (name === 'Language') {
      dispatch(changeUserLanguage(value));
      i18n.changeLanguage(value);
      setToStorage('language', String(value));

      // Change translators and comentrators when change language
      if (value === 'hi') {
        dispatch(changeTranslator(hindiTranslators[0]));
        dispatch(changeCommentrator(hindiConmentretors[0]));
        setToStorage('Translation', String(hindiTranslators[0]));
        setToStorage('Commentary', String(hindiConmentretors[0]));
      } else {
        dispatch(changeTranslator(englishTranslators[0]));
        dispatch(changeCommentrator(englishComentrators[0]));
        setToStorage('Translation', String(englishTranslators[0]));
        setToStorage('Commentary', String(englishComentrators[0]));
      }
    } else if (name === 'Theme') {
      changeTheme(value);
      setToStorage('theme', value);
    } else if (name === 'Translation') {
      setToStorage('Translation', String(value));
      dispatch(changeTranslator(value));
    } else if (name === 'Commentary') {
      dispatch(changeCommentrator(value));
      setToStorage('Commentary', String(value));
    }

    navigation.goBack();
  };

  const getLabel = (option) => {
    // For Translation and Commentray we dont have label
    if (name === 'Translation' || name === 'Commentary') {
      return option;
    }

    return t(`settings.${option?.label}`);
  };

  const getDefaultValues = () => {
    if (name === 'Language') {
      return 'en';
    } else if (name === 'Theme') {
      return 'dark';
    } else if (name === 'Translation') {
      return 'Shri Purohit Swami';
    } else if (name === 'Commentary') {
      return 'Swami Sivananda';
    }
  };

  const user = useSelector((state) => state.user);
  const dbValue = user[name] || getDefaultValues();


  return (
    <View>
      <Header title={t(`settings.${name}`)} leftIcon={'back'} />
      <View style={styles.mainView}>
        {
          radioButtons?.map((option) => {
            return (
              <View style={{ marginBottom: 15 }} key={option.id}>
                <RadioButton
                  key={option.id || option}
                  label={getLabel(option)}
                  labelStyle={[styles.labelStyle, { color: theme.colors.text }]}
                  onPress={() => {
                    handleChange(option.value || option);
                  }}
                  selected={dbValue === (option.value || option)}
                  i18nIsDynamicList={true}
                />
                <View style={{ flex: 1, borderBottomWidth: 0.6, marginTop: 10, borderBottomColor: theme.dark ? theme.colors.card : '#444' }} />
              </View>
            );
          })
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    paddingHorizontal: 15,
  },
  labelStyle: {
    ...FONTS.fontPoppins,
  },
});

export default SettingsOptions;
