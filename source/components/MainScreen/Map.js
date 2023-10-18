import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Platform,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import {DarkMapStyle} from './DarkMapStyle';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;

const Map = () => {
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  const [loading, setLoading] = useState(true);
  const [requestPermissionAgain, setRequestPermissionAgain] = useState(false);

  const colorScheme = useColorScheme(); // Get the current system appearance mode
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
              locationGettingError(); // Display location error notification
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
            PermissionError(); // Display permission error notification
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
  }, []);

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
              <Marker coordinate={region} pinColor="red" />
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
});

export default Map;
