import {View, Text} from 'react-native';
import React from 'react';
import ProfileImageUpload from '../components/Profile/ProfileImageUpload';
import ProfileTitle from '../components/Profile/ProfileTitle';
import NewBottomTab from '../components/NewBottomTab/NewBottomTab';

const ProfileScreen = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <ProfileTitle />
      <ProfileImageUpload />
      <View style={{bottom: 0}}>
        <NewBottomTab navigation={navigation} />
      </View>
    </View>
  );
};

export default ProfileScreen;
