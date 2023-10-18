import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const ProfileTitle = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text1}>Edit Profile</Text>
        <Text style={styles.text2}>Mirror, Mirror on the Wall...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  textContainer: {
    marginLeft: '7%',
  },
  text1: {
    color: '#800080',
    marginTop: '5%',
    fontSize: 23,
    fontWeight: 'bold',
  },
  text2: {
    color: '#800080',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default ProfileTitle;
