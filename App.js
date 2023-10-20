import React, {useEffect} from 'react';
import {Text, View, StyleSheet, useColorScheme} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import RNBootSplash from 'react-native-bootsplash';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  TransitionPresets,
  TransitionSpecs,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';

import MainScreen from './source/screens/MainScreen';
import ProfileScreen from './source/screens/ProfileScreen';
import MusicTrackerScreen from './source/screens/MusicTrackerScreen';
import MusicPlayer from './source/components/MusicTracker/MusicPlayer';
import {Dark, Light} from './source/components/Theme/Colors';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CustomTabLabel = ({focused, color}) => (
  <View>
    <Text style={{color, fontSize: 17, fontWeight: '600', textAlign: 'center'}}>
      SongTrax
    </Text>
    <Text style={{color, fontSize: 12, fontWeight: '600', textAlign: 'center'}}>
      Find Nearby Music
    </Text>
  </View>
);

const App = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const RootNavigator = () => {
    const BottomTabs = () => {
      return (
        <Tab.Navigator
          initialRouteName="MainScreen"
          screenOptions={() => ({
            tabBarShowLabel: false,
            tabBarStyle: {display: 'none', keyboardHidesTabBar: false},
            // headerTitleStyle: {fontWeight: '800'},
            // tabBarActiveTintColor: '#800080',
            // tabBarInactiveTintColor: isDarkMode ? '#fff' : '#000',
            // tabBarLabelStyle: {
            //   fontSize: 12,
            //   fontWeight: '700',
            // },
            // tabBarStyle: {
            //   backgroundColor: isDarkMode
            //     ? Dark.BottomTabColor
            //     : Light.BottomTabColor,
            //   borderTopColor: '#1D1D1D',
            //   height: 55,
            // },
            // tabBarIcon: ({focused, color, size}) => {
            //   let iconComponent;
            //   switch (route.name) {
            //     case 'MainScreen':
            //       iconComponent = (
            //         <MaterialCommunityIcons
            //           name="map-outline"
            //           size={size}
            //           color={color}
            //         />
            //       );
            //       break;
            //     case 'ProfileScreen':
            //       iconComponent = (
            //         <Feather name="user" size={size} color={color} />
            //       );
            //       break;
            //     case 'MusicTrackerScreen':
            //       iconComponent = (
            //         <CustomTabLabel focused={focused} color={color} />
            //       );
            //       break;
            //     default:
            //       break;
            //   }
            //   return iconComponent;
            // },
          })}>
          <Tab.Screen
            name="MainScreen"
            options={{
              headerShown: false,
              tabBarLabel: 'Notes',
              tabBarHideOnKeyboard: true,
            }}
            component={MainScreen}
          />
          <Tab.Screen
            options={{
              headerShown: false,
              tabBarLabel: 'Notes',
              tabBarHideOnKeyboard: true,
            }}
            name="MusicTrackerScreen"
            component={MusicTrackerScreen}
          />
          <Tab.Screen
            options={{
              headerShown: false,
              tabBarLabel: 'Notes',
              tabBarHideOnKeyboard: true,
            }}
            name="ProfileScreen"
            component={ProfileScreen}
          />
        </Tab.Navigator>
      );
    };

    return (
      <Stack.Navigator>
        <Stack.Screen
          name="BottomTab"
          component={BottomTabs}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="MusicPlayer"
          component={MusicPlayer}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  };

  useEffect(() => {
    RNBootSplash.hide({fade: true});
  }, []);

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default App;
