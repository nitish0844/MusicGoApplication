import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, {useState, useRef} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import {
  ALERT_TYPE,
  Dialog,
  AlertNotificationRoot,
  Toast,
} from 'react-native-alert-notification';

const ProfileImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [name, setName] = useState('');
  const scrollViewRef = useRef(null);

  const pickImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setSelectedImage(image.path);
      })
      .catch(error => {
        console.log('Image picker error:', error);
      });
  };

  const handleNameChange = text => {
    setName(text);
  };

  const uploadImage = async path => {
    try {
      console.log('Image path:', path); // Log the path for debugging
      const response = await fetch(path);
      const blob = await response.blob();

      const storageRef = storage().ref(`/profile/${name}.jpg`);
      await storageRef.put(blob);

      const downloadUrl = await storageRef.getDownloadURL();

      await AsyncStorage.setItem('profileImageURL', downloadUrl);

      console.log('Image uploaded successfully!');
    } catch (error) {
      console.log('Image upload error:', error);
    }
  };

  useFocusEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({x: 0, y: 0, animated: false});
    }
  });

  const UploadName = async () => {
    await AsyncStorage.setItem('Name', name); // Corrected the function
    console.log('Name Updated successfully!');
  };

  const NameError = () => {
    Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: 'Alert',
      textBody: 'Please Enter the Name',
      button: 'close',
      // autoClose: 2000,
    });
  };

  const ImageError = () => {
    Dialog.show({
      type: ALERT_TYPE.DANGER,
      title: 'Alert',
      textBody: 'Please Add an Image',
      button: 'close',
      // autoClose: 2000,
    });
  };

  const UploadSuccess = () => {
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Successful 👍',
      textBody: 'Profile Uploaded Successfully',
      button: 'close',
      autoClose: 2000,
    });
  };

  const UpdateButton = () => {
    if (name.trim() === '') {
      NameError();
    } else if (!selectedImage) {
      ImageError();
    } else {
      uploadImage(selectedImage);
      UploadName();
      UploadSuccess();
    }
  };

  return (
    <AlertNotificationRoot>
      <KeyboardAvoidingView
        style={{backgroundColor: '#fff', flex: 1}}
        behavior="height">
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ScrollView
            ref={scrollViewRef}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
            <View
              style={{
                alignItems: 'center',
                backgroundColor: '#fff',
                flex: 1,
                paddingTop: '5%',
              }}>
              <View
                style={{
                  width: '85%',
                  height: '70%',
                  backgroundColor: 'transparent',
                  borderWidth: 2,
                  borderColor: '#800080', // Border color
                  borderRadius: 10, // Border radius
                  borderStyle: 'dashed',
                  borderColor: selectedImage ? 'transparent' : '#800080',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 16,
                }}>
                {selectedImage ? (
                  <>
                    <Image
                      source={{uri: selectedImage}}
                      style={{
                        width: '100%',
                        height: '100%',
                        marginTop: '12%',
                        position: 'absolute',
                        borderRadius: 20,
                      }}
                    />
                    <TouchableOpacity
                      style={[styles.buttonBg, {marginTop: '120%'}]}
                      onPress={pickImage}>
                      <Text style={styles.buttonText}>Change Photo</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity style={styles.buttonBg} onPress={pickImage}>
                    <Text style={styles.buttonText}>Add Photo</Text>
                  </TouchableOpacity>
                )}
              </View>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={handleNameChange}
              />
              <TouchableOpacity
                style={[styles.buttonBg, {marginTop: '5%'}]}
                onPress={UpdateButton}>
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </AlertNotificationRoot>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  buttonBg: {
    backgroundColor: '#800080',
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    position: 'relative',
  },
  input: {
    width: '80%',
    height: '8%',
    borderWidth: 1,
    color: '#000',
    backgroundColor: '#f0c4f0',
    borderWidth: 1,
    borderColor: '#800080', // Border color
    borderRadius: 10, // Border radius
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default ProfileImageUpload;
