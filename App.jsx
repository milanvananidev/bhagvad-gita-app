import React, { useEffect, useState } from 'react';
import { NativeModules } from 'react-native';
import Routes from './src/navigation/Routes';
import { persistor, store } from './src/redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { useTranslation } from 'react-i18next';
import { getFromStorage } from './src/utils/localStorage';
import TrackPlayer from 'react-native-track-player';
import PushNotification from 'react-native-push-notification'
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {

  const { i18n } = useTranslation();

  const [isFirstLaunch, setFirstLaunch] = useState(false);

  useEffect(() => {
    const handleLanguage = async () => {
      let value = await getFromStorage('language');
      i18n.changeLanguage(value);
    };

    handleLanguage();
  }, [i18n]);


  const createNotificationChannel = () => {
    PushNotification.createChannel({
      channelId: 'daily-verse',
      channelName: 'Daily verse channel',
      soundName: 'default',
      importance: 4,
      vibrate: true,
    });
  };

  useEffect(() => {
    createNotificationChannel();
    TrackPlayer.setupPlayer();
  }, []);

  const CheckFirstLaunch = async () => {
    const appData = await AsyncStorage.getItem("appLaunched");
    if (appData == null) {
      setFirstLaunch(true);
      AsyncStorage.setItem("appLaunched", "false");
    } else {
      setFirstLaunch(false);
    }
  }

  useEffect(() => {
    CheckFirstLaunch()
  }, [])

  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Routes isFirstLaunch={isFirstLaunch} />
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
