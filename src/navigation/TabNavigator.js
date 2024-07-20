import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FOntAwesomeIcons from 'react-native-vector-icons/FontAwesome6';

import Home from '../screens/Home';
import Wallpaper from '../screens/Wallpaper';
import BookMarks from '../screens/BookMarks';
import Settings from '../screens/Settings';

import {useTheme} from '@react-navigation/native';
import More from '../screens/More';

const Tab = createBottomTabNavigator();

const TabNavigator = (props) => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({size, focused}) => (
            <MaterialCommunityIcons name="home" color={focused ? theme.colors.background2 : theme.colors.text} size={30} />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Bookmarks"
        component={BookMarks}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({size, focused}) => (
            <MaterialCommunityIcons name="bookmark-multiple" color={focused ? theme.colors.background2 : theme.colors.text} size={27} />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Wallpaper"
        component={Wallpaper}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({size, focused}) => (
            <MaterialCommunityIcons name="image-edit" color={focused ? theme.colors.background2 : theme.colors.text} size={30} />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="More"
        component={More}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: ({size, focused}) => (
            <FOntAwesomeIcons name="bars" color={focused ? theme.colors.background2 : theme.colors.text} size={25} />
          ),
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  );
};


export default TabNavigator;
