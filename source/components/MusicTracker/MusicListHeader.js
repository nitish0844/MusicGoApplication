import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const MusicListHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.IconContainer}>
        <FontAwesome5 name="map-pin" size={60} color={'#800080'} />
        <View style={styles.textContainer}>
          <Text style={styles.locationText}>UQ Lake</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  IconContainer: {
    marginTop: '8%',
    marginLeft: '20%',
    flexDirection: 'row',
  },
  container: {
    backgroundColor: '#fff',
  },
  locationText: {
    color: '#800080',
    fontSize: 28,
    fontWeight: 'bold',
  },
  textContainer: {
    justifyContent: 'center',
    marginLeft: '20%',
  },
});

export default MusicListHeader;
