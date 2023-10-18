import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {useRoute} from '@react-navigation/native';
import StarRating from './StarRating';

const MusicPlayer = () => {
  const [trackTitle, setTrackTitle] = useState('');
  const [trackArtist, setTrackArtist] = useState('');
  const route = useRoute();
  const {id, rating, songUrl} = route.params;

  // Initialize TrackPlayer when the component mounts
  useEffect(() => {
    async function initializeTrackPlayer() {
      await TrackPlayer.setupPlayer();
      // Add a track to the queue
      await TrackPlayer.add({
        id: 'trackId',
        url: songUrl,
        title: 'Track Title',
        artist: 'Track Artist',
        // artwork: require('track.png'),
      });

      // Set track information
      setTrackTitle('Track Title');
      setTrackArtist('Track Artist');

      // Start playing it
      await TrackPlayer.play();
    }

    initializeTrackPlayer();

    // Clean up when the component unmounts
    return () => {
      TrackPlayer.destroy();
    };
  }, [songUrl]);

  const pauseTrack = async () => {
    await TrackPlayer.pause();
  };

  const playTrack = async () => {
    await TrackPlayer.play();
    await TrackPlayer.reset();
  };

  return (
    <View>
      <Text>MusicPlayer</Text>
      <Text>Title: {trackTitle}</Text>
      <Text>Artist: {trackArtist}</Text>
      <Button title="Pause" onPress={pauseTrack} />
      <Button title="Play" onPress={playTrack} />
      <StarRating rating={rating} />
    </View>
  );
};

export default MusicPlayer;

// import React, {useState, useEffect, Button} from 'react';
// import {View, Text} from 'react-native';
// import {useRoute} from '@react-navigation/native';
// import TrackPlayer from 'react-native-track-player';

// const MusicPlayer = () => {
//   // Get the route object using the useRoute hook
//   const route = useRoute();

//   // Access the params you passed from the MusicList component
//   const {id, rating, songUrl} = route.params;
//   const [isPlaying, setIsPlaying] = useState(false);

//   useEffect(() => {
//     // Initialize TrackPlayer when the component mounts
//     async function initializeTrackPlayer() {
//       await TrackPlayer.setupPlayer();

//       // Add a track to the queue
//       await TrackPlayer.add({
//         id: 'trackId',
//         url: songUrl,
//         title: 'Track Title',
//         artist: 'Track Artist',
//         // artwork: require('track.png'),
//       });

//       // Set track information
//       setTrackTitle('Track Title');
//       setTrackArtist('Track Artist');

//       // Start playing it
//       await TrackPlayer.play();
//     }

//     initializeTrackPlayer();

//     // Clean up when the component unmounts
//     return () => {
//       TrackPlayer.destroy();
//     };
//   }, []);

//   const togglePlayPause = async () => {
//     if (isPlaying) {
//       await TrackPlayer.pause();
//     } else {
//       await TrackPlayer.play();
//     }
//   };

//   // Function to restart the track

//   return (
//     <View>
//       <Text>MusicPlayer</Text>
//       <Text>ID: {id}</Text>
//       <Text>Rating: {rating}</Text>
//       <Text>Song URL: {songUrl}</Text>
//       <Button title={isPlaying ? 'Pause' : 'Play'} onPress={togglePlayPause} />
//       {/* <Button title="Restart" onPress={restartTrack} /> */}
//     </View>
//   );
// };

// export default MusicPlayer;
