import {View, Text} from 'react-native';
import React from 'react';
import MusicListHeader from '../components/MusicTracker/MusicListHeader';
import MusicList from '../components/MusicTracker/MusicList';

const MusicTrackerScreen = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <MusicListHeader />
      <MusicList />
    </View>
  );
};

export default MusicTrackerScreen;
