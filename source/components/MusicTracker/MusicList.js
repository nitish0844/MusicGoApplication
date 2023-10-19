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
import {MusicData} from '../../assets/Data/Data';

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
        data={MusicData}
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
