/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { TextInput, Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Logo from '../../assets/images/logo.png';

const initialState = {
  Title: '',
  Location: '',
  Price: '',
  PType: '',
  Area: '',
  FType: '',
  Bedrooms: '',
  Bathrooms: '',
  Rooms: '',
  Reception: '',
  DRoom: '',
  Kitchen: '',
  Desc: '',
  Url: '',
};
const AddProduct = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isImageUpload, setIsImageUpload] = useState(false);
  const [isProcess , setIsProcess] = useState(false);

  const handleChange = (name, val) => {
    setState(s => ({ ...s, [name]: val }));
  };
  const handleUrl = (imageUrl) => {
    setUrl(imageUrl);
    alert(url);
  };
  const handleIcon = () => {
    navigation.openDrawer();
};
  const handleAddHouse = async () => {
    setIsLoading(true);
    await storage()
      .ref(`images/${image.fileName}`)
      .putFile(image)
      .then(async () => {
        const imageUrl = await storage()
          .ref(`images/${image.fileName}`)
          .getDownloadURL();
        handleUrl(imageUrl);
      })
      .catch(err => {
        console.error(err);
      });
    const { Title, Location, PhoneNo, Price, PType, Area, FType, Bedrooms, Bathrooms, Rooms, Reception, DRoom, Kitchen, Desc } = state;
  if (!Title) {
      setIsProcess(false);
      return (
        alert('Please Insert Title')
      );
    }
    else if (!Location) {
      setIsProcess(false);
      return (
        alert('Please Insert Location')
      );
    }
    else if (!Price) {
      setIsProcess(false);
      return (
        alert('Please Insert Price')
      );
    }
    else if (!Desc) {
      setIsProcess(false);
      return (
        alert('Please Insert Description')
      );
    }
    else if (!Bedrooms) {
      setIsProcess(false);
      return (
        alert('Please Insert No of Bedrooms')
      );
    }
    else if (!Area) {
      setIsProcess(false);
      return (
        alert('Please Insert Area of Property')
      );
    }
    else if (!Kitchen) {
      setIsProcess(false);
      return (
        alert('Please Insert No of Kitchens')
        );
    }
    else if (!Bathrooms) {
      setIsProcess(false);
      return (
        alert('Please Insert No of Bathrooms')
      );
    }
    else if (!PhoneNo) {
      setIsProcess(false);
      return (
        alert('Please Insert Phone No')
      );
    }
    else if (!PType) {
      setIsProcess(false);
      return (
        alert('Please Insert Property Type')
      );
    }
    else if (!FType) {
      setIsProcess(false);
      return (
        alert('Please Insert Furnish Type')
      );
    }
    else if (!Rooms) {
      setIsProcess(false);
      return (
        alert('Please Insert No of Living Rooms')
      );
    }
    else if (!Reception) {
      setIsProcess(false);
      return (
        alert('Please Insert No of Receptions')
      );
    }
    else if (!DRoom) {
      setIsProcess(false);
      return (
        alert('Please Insert No of Dining Rooms')
      );
    }
    const ProductData = {
      Title: Title,
      Location: Location,
      PhoneNo: PhoneNo,
      Price: Price,
      PType: PType,
      Area: Area,
      FType: FType,
      Bedrooms: Bedrooms,
      Bathrooms: Bathrooms,
      Rooms: Rooms,
      Reception: Reception,
      DRoom: DRoom,
      Kitchen: Kitchen,
      Desc: Desc,
      Url: url,
      dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
    };
    if (ProductData.Url === null) {
      alert('Please Select Image');
      return state;
    } else {
      alert(`ProductData Url => ${ProductData.Url}`);
      await firestore()
        .collection('Property')
        .add(ProductData)
        .then(() => {
          console.log('Property added!');
          alert('Property Added Succesfully');
          setIsLoading(false);
          setState(initialState);
        });
    }
  };
  const OpenImageGallery = () => {
    const options = {
      storateOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      console.log('Response =>', response);
      if (response.didCancel) {
        console.log('User Cancled Image Picker');
      } else if (response.error) {
        console.log('Image Picker Error => ', response.error);
      } else if (response.customButton) {
        console.log('Image Picker Error => ', response.customButton);
      } else {
        // const source = {uri: 'data:image/jpeg;base64' + response.base64};
        setImage(response.assets[0].uri);
      }
      setIsImageUpload(true);
    });
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 30,
            }}>
                <TouchableOpacity onPress={handleIcon} style={{ marginBottom: 5 }}>
                    <FontAwesomeIcon icon={faArrowLeft} size={23} color={'#000000'} />
                </TouchableOpacity>
                <Image source={Logo} style={styles.logo} />
                <TouchableOpacity onPress={() => { navigation.navigate('Account'); }}>
                    <Ionicons name="person-circle-outline" size={33} color={'#000000'} />
                </TouchableOpacity>
            </View>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.Card}>
          <TouchableOpacity activeOpacity={0.5} onPress={OpenImageGallery}>
            {isImageUpload ?
              <View style={styles.ImageContainer}>
                <Image source={{ uri: image }} style={styles.ImageContainer} />
              </View>
              :
              <View style={styles.ImageContainer}>
                <Ionicon name={'camera'} size={90} color={'#000000bd'} />
              </View>
            }
          </TouchableOpacity>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              mode="fill"
              label={'Property Title'}
              onChangeText={(val) => handleChange('Title', val)}
              keyboardType="numbers-and-punctuation"
            />
            <TextInput
              style={styles.input}
              mode="fill"
              label={'Location'}
              onChangeText={(val) => handleChange('Location', val)}
              keyboardType="numbers-and-punctuation"
            />
            <TextInput
              style={styles.input}
              mode="fill"
              label={'Phone No'}
              onChangeText={(val) => handleChange('PhoneNo', val)}
              keyboardType="number-pad"
              maxLength={12}
              placeholder={'0000-0000000'}
            />
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
              <TextInput
                style={[styles.input, { width: 145 }]}
                mode="fill"
                label={'Price'}
                onChangeText={(val) => handleChange('Price', val)}
                keyboardType="numbers-and-punctuation"
                right={<TextInput.Affix text="/PKR" />}
              />
              <TextInput
                style={[styles.input, { width: 145 }]}
                mode="fill"
                label={'Finish Type'}
                onChangeText={(val) => handleChange('FType', val)}
                keyboardType="numbers-and-punctuation"
              />
            </View>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
              <TextInput
                style={[styles.input, { width: 145 }]}
                mode="fill"
                label={'Property Type'}
                onChangeText={(val) => handleChange('PType', val)}
                keyboardType="numbers-and-punctuation"
              />
              <TextInput
                style={[styles.input, { width: 145 }]}
                mode="fill"
                label={'Area/Size'}
                onChangeText={(val) => handleChange('Area', val)}
                keyboardType="numbers-and-punctuation"
                right={<TextInput.Affix text="/sq ft /Marla" />}
              />
            </View>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
              <TextInput
                style={[styles.input, { width: 145 }]}
                mode="fill"
                label={'Bedrooms'}
                onChangeText={(val) => handleChange('Bedrooms', val)}
                keyboardType="number-pad"
              />
              <TextInput
                style={[styles.input, { width: 145 }]}
                mode="fill"
                label={'Bathrooms'}
                onChangeText={(val) => handleChange('Bathrooms', val)}
                keyboardType="number-pad"
              />
            </View>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
              <TextInput
                style={[styles.input, { width: 145 }]}
                mode="fill"
                label={'Rooms'}
                onChangeText={(val) => handleChange('Rooms', val)}
                keyboardType="number-pad"
              />
              <TextInput
                style={[styles.input, { width: 145 }]}
                mode="fill"
                label={'Reception'}
                onChangeText={(val) => handleChange('Reception', val)}
                keyboardType="number-pad"
              />
            </View>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
              <TextInput
                style={[styles.input, { width: 145 }]}
                mode="fill"
                label={'Dining Rooms'}
                onChangeText={(val) => handleChange('DRoom', val)}
                keyboardType="number-pad"
              />
              <TextInput
                style={[styles.input, { width: 145 }]}
                mode="fill"
                label={'Kitchens'}
                onChangeText={(val) => handleChange('Kitchen', val)}
                keyboardType="number-pad"
              />
            </View>
            <TextInput
              style={styles.input}
              mode="fill"
              label={'Description'}
              onChangeText={(val) => handleChange('Desc', val)}
              keyboardType="number-and-punctuation"
              multiline={true}
              numberOfLines={4}
            />
            <TouchableOpacity activeOpacity={0.7}>
              <Button mode="contained" labelStyle={{ fontSize: 18, fontFamily: 'Montserrat-Medium' }} style={styles.btn} loading={isLoading} onPress={handleAddHouse} > {!isLoading && <Icon name="home-plus" size={20} color="#ffff" />} Add Property</Button>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginTop: 3,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  Card: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    borderTopEndRadius: 13,
    borderTopStartRadius: 13,
  },
  ImageContainer: {
    width: 300,
    height: 190,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 13,
  },
  inputContainer: {
    width: '100%',
    marginTop: 10,
    paddingHorizontal: 30,
  },
  input: {
    backgroundColor: '#ffffff',
    marginBottom: 6,
    fontFamily: 'Montserrat-Bold',
  },
  btn: {
    marginTop: 10,
    marginBottom: 30,
    borderRadius: 3,
    padding: 4,
  },
});
