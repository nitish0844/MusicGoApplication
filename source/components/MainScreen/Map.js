import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Platform,
  useColorScheme,
  ActivityIndicator,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import MapView, {Marker, Callout, Circle} from 'react-native-maps';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import {DarkMapStyle} from './DarkMapStyle';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';
import {useNavigation} from '@react-navigation/native';

import {MusicData} from '../../assets/Data/Data';
import StarRating from '../MusicTracker/StarRating';

import AsyncStorage from '@react-native-async-storage/async-storage';

import haversineDistance from 'haversine-distance';

const LATITUDE_DELTA = 0.0022;
const LONGITUDE_DELTA = 0.0221;

const MarkerUrl =
  'https://firebasestorage.googleapis.com/v0/b/songtrax-e5491.appspot.com/o/png-clipart-fashion-red-headphone-music-cds-fashion-red-removebg-preview.png?alt=media&token=28482076-d067-4a01-96e5-4fcdcde9789d';

const Map = () => {
  const navigation = useNavigation();
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  const userLocation = {
    latitude: region.latitude,
    longitude: region.longitude,
  };

  const radius = 700; //1000 meters raduis

  const [loading, setLoading] = useState(true);

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const normalMapStyle = [];

  const PermissionError = async () => {
    const dialogResult = await Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: 'Alert',
      textBody: 'Please Accept the location permission',
      button: 'ok',
    });
  };

  const locationGettingError = () => {
    Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: 'Alert',
      textBody: 'Failed to get location',
      button: 'close',
      // autoClose: 2000,
    });
  };

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      try {
        const permissionResult = await check(
          PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        );

        if (permissionResult === RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            position => {
              const {latitude, longitude} = position.coords;
              setRegion({
                latitude,
                longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              });
              setLoading(false);
            },
            error => {
              console.error(error);
              setLoading(false);
              locationGettingError();
            },
            {enableHighAccuracy: true, timeout: 30000, maximumAge: 10000},
          );
        } else {
          const requestResult = await request(
            PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
          );

          if (requestResult === RESULTS.GRANTED) {
            Geolocation.getCurrentPosition(
              position => {
                const {latitude, longitude} = position.coords;
                setRegion({
                  latitude,
                  longitude,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                });
                setLoading(false);
              },
              error => {
                console.error(error);
                setLoading(false);
                locationGettingError();
              },
              {enableHighAccuracy: true, timeout: 30000, maximumAge: 10000},
            );
          } else {
            setLoading(false);
            PermissionError();
          }
        }
      } catch (err) {
        console.warn(err);
        setLoading(false);
      }
    } else {
      try {
        const permissionResult = await check(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );

        if (permissionResult === RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            position => {
              const {latitude, longitude} = position.coords;
              setRegion({
                latitude,
                longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              });
              setLoading(false);
            },
            error => {
              console.error(error);
              setLoading(false);
              locationGettingError();
            },
            {enableHighAccuracy: true, timeout: 30000, maximumAge: 10000},
          );
        } else {
          const requestResult = await request(
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          );

          if (requestResult === RESULTS.GRANTED) {
            Geolocation.getCurrentPosition(
              position => {
                const {latitude, longitude} = position.coords;
                setRegion({
                  latitude,
                  longitude,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                });
                setLoading(false);
              },
              error => {
                console.error(error);
                setLoading(false);
                locationGettingError();
              },
              {enableHighAccuracy: true, timeout: 30000, maximumAge: 10000},
            );
          } else {
            setLoading(false);
            PermissionError();
          }
        }
      } catch (err) {
        console.warn(err);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    requestLocationPermission();

    const watchId = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setRegion({
          latitude,
          longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        });
      },
      error => {
        console.error(error);
        locationGettingError();
      },
      {enableHighAccuracy: true, timeout: 30000, maximumAge: 10000},
    );

    return () => {
      // Stop watching the user's location when the component unmounts
      Geolocation.clearWatch(watchId);
    };
  }, []);

  // const handleSongPress = async (id, rating, songUrl) => {
  //   // Navigate to the MusicPlayer page and pass the song details as params
  //   await storeSongIDInAsyncStorage(id);
  //   navigation.navigate('MusicPlayer', {id, rating, songUrl});
  // };

  useEffect(() => {
    const songIDs = [];

    MusicData.forEach((musicItem, index) => {
      const markerLocation = {
        latitude: parseFloat(musicItem.latitude),
        longitude: parseFloat(musicItem.longitude),
      };

      const distance = haversineDistance(userLocation, markerLocation, {
        unit: 'meter',
      });

      if (distance <= radius) {
        songIDs.push(musicItem.songID);
      }
    });

    // Store the song IDs as an array in AsyncStorage (replace 'songIDKey' with an appropriate key)
    AsyncStorage.setItem('songIDKey', JSON.stringify(songIDs));
  }, [userLocation]); // Execute when userLocation changes

  return (
    <AlertNotificationRoot>
      <View style={styles.container}>
        <StatusBar
          backgroundColor={isDarkMode ? '#000' : '#fff'}
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        />
        <View style={styles.mapContainer}>
          {loading ? ( // Show the Activity Indicator while loading is true
            <ActivityIndicator
              size="large"
              color="#800080"
              style={styles.loadingIndicator}
            />
          ) : (
            <MapView
              style={styles.map}
              region={region}
              showsUserLocation={true}
              customMapStyle={isDarkMode ? DarkMapStyle : normalMapStyle}>
              {MusicData.map((musicItem, index) => {
                // Calculate the distance between the user's location and the marker
                const markerLocation = {
                  latitude: parseFloat(musicItem.latitude),
                  longitude: parseFloat(musicItem.longitude),
                };

                const distance = haversineDistance(
                  userLocation,
                  markerLocation,
                  {
                    unit: 'meter',
                  },
                );

                if (distance <= radius) {
                  return (
                    <View key={index}>
                      <Circle
                        center={markerLocation}
                        radius={200}
                        fillColor={
                          isDarkMode == 'dark'
                            ? 'rgba(128,0,128,0.5)'
                            : 'rgba(210,169,210,0.5)'
                        }
                        strokeColor="#A42DE8"
                        strokeWidth={3}>
                        <View style={styles.circleContainer}>
                          <Text style={{textAlign: 'center'}}>
                            {musicItem.date}
                          </Text>
                          <StarRating rating={musicItem.rating} />
                        </View>
                      </Circle>
                    </View>
                  );
                } else {
                  return null; // Do not render the marker
                }
              })}
            </MapView>
          )}
        </View>
      </View>
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  mapContainer: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  customMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customMarker: {
    width: 40, // Customize the width of the marker
    height: 40, // Customize the height of the marker
  },
});

export default Map;
