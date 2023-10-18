import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  LogBox,
} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {useRoute} from '@react-navigation/native';
import StarRating from './StarRating';
import MusicListHeader from './MusicListHeader';

LogBox.ignoreAllLogs();

const MusicPlayer = () => {
  const route = useRoute();
  const {id, rating, songUrl} = route.params;

  // Initialize TrackPlayer when the component mounts
  useEffect(() => {
    async function initializeTrackPlayer() {
      // const isPlayerInitialized = await TrackPlayer.isInitialized();
      // if (!isPlayerInitialized) {
      //   await TrackPlayer.setupPlayer();
      // }

      await TrackPlayer.setupPlayer();

      // Add a track to the queue
      await TrackPlayer.add({
        id: 'trackId',
        url: songUrl,
        title: 'Track Title',
        artist: 'Track Artist',
        // artwork: require('track.png'),
      });

      // Start playing it
      await TrackPlayer.play();
    }

    // Check if TrackPlayer is initialized, and initialize it if necessary
    initializeTrackPlayer();

    // Clean up when the component unmounts
    return async () => {
      await TrackPlayer.reset(); // Stop and clear the queue
      await TrackPlayer.destroy(); // Destroy the player
    };
  }, [songUrl]);

  const pauseTrack = async () => {
    await TrackPlayer.pause();
  };

  const playTrack = async () => {
    // Reset the player and play the new song
    await TrackPlayer.reset();
    await TrackPlayer.add({
      id: 'trackId',
      url: songUrl,
      title: 'Track Title',
      artist: 'Track Artist',
      // artwork: require('track.png'),
    });
    await TrackPlayer.play();
  };

  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <MusicListHeader />
      <View>
        <Text style={styles.songID}>Song: {id}</Text>
        <TouchableOpacity style={styles.buttonContainer} onPress={playTrack}>
          <Text style={styles.ButtonText}>Play Music</Text>
        </TouchableOpacity>
        <StarRating rating={rating} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    backgroundColor: '#800080',
    width: '90%',
    height: '15%',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: '8%',
  },
  songID: {
    color: '#800080',
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: '5%',
    marginLeft: '5%',
  },
});

export default MusicPlayer;
