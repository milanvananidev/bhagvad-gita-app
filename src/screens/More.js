import React, { useState } from 'react';
import analytics from '@react-native-firebase/analytics';
import IntentLauncher from 'react-native-intent-launcher'
import Header from '../layout/Header';
import SettingsCard from '../components/settings/SettingsCard';
import { useNavigation, useTheme } from '@react-navigation/native';
import { Linking, NativeModules, PermissionsAndroid, Platform, ScrollView, Text, View } from 'react-native';
import { FONTS } from '../theme/theme';
import { useTranslation } from 'react-i18next';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import PushNotification from 'react-native-push-notification';
import { useDispatch, useSelector } from 'react-redux';
import { setNotificationTime } from '../redux/actions/metaData';
import moment from 'moment';
import InAppReview from 'react-native-in-app-review';
import Share from 'react-native-share';
import { SHARE_IMAGE } from '../constants/Constant';

const More = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { PermissionManager } = NativeModules;

  const language = i18n.language;

  const notificationTime = useSelector((state) => state.meta.notificationTime);
  const formatedTime = moment(notificationTime).format('hh:mm A');

  const [showPicker, setShowPicker] = useState(false);

  const handlePress = (type) => {
    if (type === 'profile') {
      navigation.navigate('profile');
    } else if (type === 'settings') {
      navigation.navigate('settings');
    } else if (type === 'reminder') {
      setShowPicker(true);
    } else if (type === 'fb') {
      analytics().logEvent('join_facebook')
      Linking.openURL('https://www.facebook.com/groups/bhagvadgeetacommunity/');
    } else if (type === 'insta') {
      analytics().logEvent('follow_instagram')
      Linking.openURL('https://www.instagram.com/bhagvad_gita_app/');
    } else if (type === 'rate') {
      try {
        InAppReview.RequestInAppReview();
      } catch (error) { }
    } else if (type === 'share') {
      analytics().logEvent('share_app')
      const options = {
        url: SHARE_IMAGE,
        title: 'Download Bhagvad Geeta App Now ',
        message: 'Download Bhagvad Geeta App Now - https://play.google.com/store/apps/details?id=com.bhagvadgeeta.live',
      };
      Share.open(options);
    } else if (type === 'policy') {
      navigation.navigate('webview', { path: 'https://vananitech.in/bhagvadgeeta/privacy.html' });
    }
  };

  const hideModal = () => {
    setShowPicker(false);
  };

  const checkForPermission = async () => {
    try {
      await PermissionManager.AlarmPermission();
      return true
    } catch (e) {
      IntentLauncher.startActivity({
        action: 'android.settings.REQUEST_SCHEDULE_EXACT_ALARM',
        data: 'package:com.bhagvadgeeta.live'
      })
      return false;
    }
  };

  const handleSetTime = (dateTime) => {
    const dateObject = new Date(dateTime);

    const OsVer = Platform?.constants['Release'];

    if (OsVer >= 13) {
      checkForPermission();
    }

    // If don't have permission then ask for it
    PermissionsAndroid.check('android.permission.POST_NOTIFICATIONS').then((has) => {
      if (!has) {
        PermissionsAndroid.request('android.permission.POST_NOTIFICATIONS');
      }
    });

    PushNotification.localNotificationSchedule({
      channelId: 'daily-verse',
      title: 'Bhagavad Gita - Reminder',
      message: 'Read your today verses.',
      date: dateObject,
      allowWhileIdle: false,
      repeatTime: 1,
      repeatType: 'day',
    });

    dispatch(setNotificationTime(dateTime));
  };

  return (
    <>
      <Header leftIcon={'back'} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 60 }}>
        <Text style={{ ...FONTS.h4, paddingHorizontal: 15, color: theme.colors.text, marginHorizontal: 15, marginBottom: 15 }}>
          {t('more.Settings')}
        </Text>
        {/* <SettingsCard title={t('more.Profile')} icon={'account'} onPress={() => {
          handlePress('profile');
        }} /> */}
        <SettingsCard title={t('more.Settings')} icon={'cog'} onPress={() => {
          handlePress('settings');
        }} />
        <SettingsCard title={t('more.Reminder')} icon={'bell'} showRedDot={!notificationTime} value={notificationTime ? formatedTime : t('more.Not set')} onPress={() => {
          handlePress('reminder');
        }} />

        <View style={{ marginTop: 20 }}>
          <Text style={{ ...FONTS.h4, paddingHorizontal: 15, color: theme.colors.text, marginHorizontal: 15, marginBottom: 15 }}>
            {t('more.Social')}
          </Text>
          <SettingsCard title={t('more.Join facebook community')} icon={'facebook'} onPress={() => {
            handlePress('fb');
          }} />
          <SettingsCard title={t('more.Follow us on Instagram')} icon={'instagram'} onPress={() => {
            handlePress('insta');
          }} />
        </View>

        <View style={{ marginTop: 30 }}>
          <Text style={{ ...FONTS.h4, paddingHorizontal: 15, color: theme.colors.text, marginHorizontal: 15, marginBottom: 15 }}>
            {t('more.Growth')}
          </Text>
          <SettingsCard title={t('more.Rate app')} icon={'star'} onPress={() => {
            handlePress('rate');
          }} />
          <SettingsCard title={t('more.Share app')} icon={'share'} onPress={() => {
            handlePress('share');
          }} />
        </View>

        <View style={{ marginTop: 20 }}>
          <Text style={{ ...FONTS.h4, paddingHorizontal: 15, color: theme.colors.text, marginHorizontal: 15, marginBottom: 15 }}>
            {t('more.Policies')}
          </Text>
          <SettingsCard title={t('more.Privacy Policy')} icon={'web'} onPress={() => {
            handlePress('policy');
          }} />
        </View>
      </ScrollView>

      <DateTimePickerModal
        key={showPicker}
        isVisible={showPicker}
        mode="time"
        date={new Date()}
        onConfirm={(value) => {
          handleSetTime(value);
        }}
        onCancel={hideModal}
        onHide={hideModal}
        themeVariant={theme.dark ? 'dark' : 'light'}
      />

    </>
  );
};

export default More;
