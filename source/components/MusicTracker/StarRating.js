import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const StarRating = ({rating}) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <TouchableOpacity key={i} activeOpacity={0.7}>
        <MaterialCommunityIcons
          name={i <= rating ? 'star' : 'star-outline'}
          size={30}
          color="#FFD700"
        />
      </TouchableOpacity>,
    );
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: '5%',
      }}>
      {stars}
    </View>
  );
};

export default StarRating;
