import {View, Text} from 'react-native';
import React from 'react';
import ProfileImageUpload from '../components/Profile/ProfileImageUpload';
import ProfileTitle from '../components/Profile/ProfileTitle';

const ProfileScreen = () => {
  return (
    <View style={{flex: 1}}>
      <ProfileTitle />
      <ProfileImageUpload />
    </View>
  );
};

export default ProfileScreen;
