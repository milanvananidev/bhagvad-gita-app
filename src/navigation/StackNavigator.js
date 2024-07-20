import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@react-navigation/native';
import { StatusBar } from 'react-native';

// Importing screens
import TabNavigator from './TabNavigator';
import SettingsOptions from '../screens/SettingsOptions';
import Chapter from '../screens/Chapter';
import Verse from '../screens/Verse';
import Share from '../screens/Share';
import Settings from '../screens/Settings';
import WebView from '../screens/WebView';
import OnBoarding from '../screens/OnBoarding';
import TodayVerse from '../screens/TodayVerse';
import UserProfile from '../screens/UserProfile';
import FullGita from '../screens/FullGita';
import SinglePeace from '../screens/SinglePeace';
import SingleWallpaper from '../screens/SingleWallpaper';

const StackComponent = createStackNavigator();

const StackNavigator = ({ isFirstLaunch }) => {
  const theme = useTheme();

  return (
    <>
      <StatusBar backgroundColor={theme.colors.background} barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <StackComponent.Navigator
        initialRouteName={isFirstLaunch ? 'onboarding' : 'Tabs'}
        detachInactiveScreens={true}
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: 'transparent' },
        }}
      >
        {isFirstLaunch ? <StackComponent.Screen name="onboarding" component={OnBoarding} /> : null}
        <StackComponent.Screen name="Tabs" component={TabNavigator} />
        <StackComponent.Screen name="settingOptions" component={SettingsOptions} />
        <StackComponent.Screen name="chapter" component={Chapter} />
        <StackComponent.Screen name="verse" component={Verse} />
        <StackComponent.Screen name="share" component={Share} />
        <StackComponent.Screen name="settings" component={Settings} />
        <StackComponent.Screen name="webview" component={WebView} />
        <StackComponent.Screen name="todayverse" component={TodayVerse} />
        <StackComponent.Screen name="peace" component={SinglePeace} />
        <StackComponent.Screen name="profile" component={UserProfile} />
        <StackComponent.Screen name="fullgita" component={FullGita} />
        <StackComponent.Screen name="singlewallpaper" component={SingleWallpaper} />
        {/* component screens end */}
      </StackComponent.Navigator>
    </>
  );
};
export default StackNavigator;
