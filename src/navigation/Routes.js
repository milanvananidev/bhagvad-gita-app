import React, { useRef, useState } from 'react';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import StackNavigator from './StackNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import analytics from '@react-native-firebase/analytics';
import themeContext from '../context/ThemeContext';
import { COLORS } from '../theme/theme';

const Routes = ({ isFirstLaunch }) => {

  const routeNameRef = useRef(null);
  const navigationRef = useRef(null);

  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const authContext = React.useMemo(() => ({
    setDarkTheme: () => {
      setIsDarkTheme(true);
    },
    setLightTheme: () => {
      setIsDarkTheme(false);
    },
  }), []);

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      text: COLORS.text,
      background: '#eaeaea',
      card: COLORS.white,
      background2: '#4b0f0f',
      primary: COLORS.primary
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      text: 'rgba(255, 255, 255, 1)',
      background: COLORS.darkBg,
      card: '#444',
      cardBg: '#746',
      background2: '#f9a656',
      primary: COLORS.primary2
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  return (
    <SafeAreaProvider>
      <themeContext.Provider value={authContext}>
        <NavigationContainer
          theme={theme}
          ref={navigationRef}
          onReady={() => {
            routeNameRef.current = navigationRef.current.getCurrentRoute().name;
          }}
          onStateChange={async () => {
            const previousRouteName = routeNameRef.current;
            const currentRouteName = navigationRef.current.getCurrentRoute().name;

            if (previousRouteName !== currentRouteName) {
              await analytics().logScreenView({
                screen_name: currentRouteName,
                screen_class: currentRouteName,
              });
            }
            routeNameRef.current = currentRouteName;
          }}
        >
          <StackNavigator isFirstLaunch={isFirstLaunch} />
        </NavigationContainer>
      </themeContext.Provider>
    </SafeAreaProvider>
  );
};
export default Routes;
