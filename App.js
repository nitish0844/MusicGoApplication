import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  TransitionPresets,
  TransitionSpecs,
  HeaderStyleInterpolators,
} from '@react-navigation/stack';

import MainScreen from './source/screens/MainScreen';
import ProfileScreen from './source/screens/ProfileScreen';
import MusicTrackerScreen from './source/screens/MusicTrackerScreen';
import MusicPlayer from './source/components/MusicTracker/MusicPlayer';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const CustomTabLabel = ({focused, color}) => (
  <View>
    <Text style={{color, fontSize: 17, fontWeight: '600', textAlign: 'center'}}>
      SongsTrax
    </Text>
    <Text style={{color, fontSize: 12, fontWeight: '600', textAlign: 'center'}}>
      Find Nearby Music
    </Text>
  </View>
);

const App = () => {
  const RootNavigator = () => {
    const BottomTabs = () => {
      return (
        <Tab.Navigator
          initialRouteName="MainScreen"
          screenOptions={({route}) => ({
            tabBarShowLabel: false, // Hide default tab labels
            headerTintColor: '#fff',
            headerTitleStyle: {fontWeight: '800'},
            tabBarActiveTintColor: '#800080',
            tabBarInactiveTintColor: '#000',
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '700',
            },
            tabBarStyle: {
              height: 55,
            },
            tabBarIcon: ({focused, color, size}) => {
              let iconComponent;
              switch (route.name) {
                case 'MainScreen':
                  iconComponent = (
                    <MaterialCommunityIcons
                      name="map-outline"
                      size={size}
                      color={color}
                    />
                  );
                  break;
                case 'ProfileScreen':
                  iconComponent = (
                    <Feather name="user" size={size} color={color} />
                  );
                  break;
                case 'MusicTrackerScreen':
                  iconComponent = (
                    <CustomTabLabel focused={focused} color={color} />
                  );
                  break;
                default:
                  break;
              }
              return iconComponent;
            },
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

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default App;
