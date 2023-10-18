import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import StarRating from './StarRating';
import {useNavigation} from '@react-navigation/native';

const data = [
  {
    songID: '1',
    rating: '2',
    date: '25/02/2021',
    song: 'https://firebasestorage.googleapis.com/v0/b/songtrax-e5491.appspot.com/o/Songs%2FDammu%20Kissa%20Botha%20-%20PagalRingtone.Com.mp3?alt=media&token=11f6e2eb-611a-4921-890f-4a0c326fd793',
  },
  {
    songID: '2',
    rating: '3',
    date: '25/02/2021',
    song: 'https://firebasestorage.googleapis.com/v0/b/songtrax-e5491.appspot.com/o/Songs%2FMannaru%20Na%20Mannaru%20Gana-(DJPunjab).mp3?alt=media&token=f1aa0999-8f04-494f-b532-84e8cbbaed98',
  },
  {
    songID: '3',
    rating: '5',
    date: '25/02/2021',
    songUr:
      'https://firebasestorage.googleapis.com/v0/b/songtrax-e5491.appspot.com/o/Songs%2FMattikinaru%20Ortharu%20-%20Potti%20Gana%20Song.mp3?alt=media&token=c641f935-0d3c-4ef7-a651-67e578fe46f7',
  },
];

const MusicList = () => {
  const navigation = useNavigation();

  const handleSongPress = (id, rating, songUrl) => {
    // Navigate to the MusicPlayer page and pass the song details as params
    navigation.navigate('MusicPlayer', {id, rating, songUrl});
  };

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      onPress={() => handleSongPress(item.songID, item.rating, item.song)}>
      <View style={styles.itemContainer}>
        <Text style={{marginLeft: '5%'}}>Song: {index + 1}</Text>
        <Text style={{marginLeft: '5%'}}>Date: {item.date}</Text>
        <StarRating rating={item.rating} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{backgroundColor: '#fff', marginTop: '5%'}}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.songID}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginTop: '3%',
    borderBottomWidth: 0.8, // Add a border at the bottom
    borderStyle: 'dashed',
    paddingBottom: 10, // Add some padding to separate the content from the line
    borderColor: '#000',
    width: '90%',
    alignSelf: 'center',
  },
});

export default MusicList;
