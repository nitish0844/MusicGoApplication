import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const PlayerCurrentLocation = () => {
  const [userName, setUserName] = useState(''); // State for user name
  const [profileImageUrl, setProfileImageUrl] = useState(''); // State for profile image URL

  useEffect(() => {
    // Retrieve user name from AsyncStorage
    AsyncStorage.getItem('Name')
      .then(value => {
        if (value) {
          setUserName(value);
        }
      })
      .catch(error => {
        console.error('Error retrieving user name: ', error);
      });

    // Retrieve profile image URL from AsyncStorage
    AsyncStorage.getItem('profileImageURL')
      .then(value => {
        if (value) {
          setProfileImageUrl(value);
        }
      })
      .catch(error => {
        console.error('Error retrieving profile image URL: ', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.TextContainer}>
        <Text style={styles.text}>Currently At this Location</Text>
      </View>

      <View style={styles.ImageContainer}>
        <View style={[styles.imageBackground, {padding: 5}]}>
          <Image source={{uri: profileImageUrl}} style={styles.profileImage} />
        </View>
        <Text style={styles.userName}>{userName}</Text>
      </View>
      <View style={styles.ImageContainer}>
        <View style={styles.imageBackground}>
          {/* <Image source={{uri: profileImageUrl}} style={styles.profileImage} /> */}
          <FontAwesome5
            name="smile-beam"
            size={95}
            color="#800080"
            style={{backgroundColor: '#fff', borderRadius: 50}}
          />
        </View>
        <Text style={styles.userName}>And others...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: '30%',
  },
  TextContainer: {
    marginLeft: '5%',
    alignContent: 'flex-end',
  },
  text: {
    color: '#800080',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 85,
    height: 85,
    borderRadius: 50,
  },
  imageBackground: {
    backgroundColor: '#800080', // Violet background color
    borderRadius: 50, // Make it circular
    // padding: 5, // Add some padding
  },
  ImageContainer: {
    flexDirection: 'row',
    marginLeft: '5%',
    alignItems: 'center', // Center vertically
    marginTop: '5%',
  },
  userName: {
    color: '#800080',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: '5%',
  },
});

export default PlayerCurrentLocation;
