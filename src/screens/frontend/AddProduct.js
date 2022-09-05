/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native';
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
import Logo from '../../assets/images/favLogo.png';

const initialState = {
  Title: '',
  Location: '',
  Price: '',
  PType: '',
  PhoneNo:'',
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
  const handleUrl = async (imageUrl) => {
    const { Title, Location, PhoneNo, Price, PType, Area, FType, Bedrooms, Bathrooms, Rooms, Reception, DRoom, Kitchen, Desc } = state;
    if (!Title) {
        setIsProcess(false);
        return (
          ToastAndroid.show('Please Insert Title' ,ToastAndroid.SHORT)
        );
      }
      else if (!Location) {
        setIsProcess(false);
        return (
          ToastAndroid.show('Please Insert Location' ,ToastAndroid.SHORT)
        );
      }
      else if (!Price) {
        setIsProcess(false);
        return (
          ToastAndroid.show('Please Insert Price' ,ToastAndroid.SHORT)
        );
      }
      else if (!PhoneNo) {
        setIsProcess(false);
        return (
          ToastAndroid.show('Please Insert PhoneNo' ,ToastAndroid.SHORT)
        );
      }
      else if (!Desc) {
        setIsProcess(false);
        return (
          ToastAndroid.show('Please Insert Description' ,ToastAndroid.SHORT)
        );
      }
      else if (!Bedrooms) {
        setIsProcess(false);
        return (
          ToastAndroid.show('Please Insert No of Bedrooms' ,ToastAndroid.SHORT)
        );
      }
      else if (!Area) {
        setIsProcess(false);
        return (
          ToastAndroid.show('Please Insert Property Area' ,ToastAndroid.SHORT)
        );
      }
      else if (!Kitchen) {
        setIsProcess(false);
        return (
          ToastAndroid.show('Please Insert No of Kitchens' ,ToastAndroid.SHORT)
          );
      }
      else if (!Bathrooms) {
        setIsProcess(false);
        return (
          ToastAndroid.show('Please Insert No of Bathrooms' ,ToastAndroid.SHORT)
        );
      }
      else if (!PhoneNo) {
        setIsProcess(false);
        return (
          ToastAndroid.show('Please Insert Phone No' ,ToastAndroid.SHORT)
        );
      }
      else if (!PType) {
        setIsProcess(false);
        return (
          ToastAndroid.show('Please Insert Property Type' ,ToastAndroid.SHORT)
        );
      }
      else if (!FType) {
        setIsProcess(false);
        return (
          ToastAndroid.show('Please Insert Furnish Type' ,ToastAndroid.SHORT)
        );
      }
      else if (!Rooms) {
        setIsProcess(false);
        return (
          ToastAndroid.show('Please Insert No of Living Rooms' ,ToastAndroid.SHORT)
        );
      }
      else if (!Reception) {
        setIsProcess(false);
        return (
          ToastAndroid.show('Please Insert No of Receptions' ,ToastAndroid.SHORT)
        );
      }
      else if (!DRoom) {
        setIsProcess(false);
        return (
          ToastAndroid.show('Please Insert No of Dining Room' ,ToastAndroid.SHORT)
        );
      }
      const id = Math.random().toString(36).slice(2);
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
        Url: imageUrl,
        uid : id,
        dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
      };
        await firestore()
          .collection('Property')
          .add(ProductData)
          .then(() => {
            ToastAndroid.show(`Property Added Successfully with ${ProductData.Title}` ,ToastAndroid.SHORT);
            setIsLoading(false);
            setState(initialState);
            setIsImageUpload(false);
          });
    setUrl(imageUrl);
  };
  const handleIcon = () => {
    navigation.goBack();
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
        ToastAndroid.show(err ,ToastAndroid.SHORT);
      });
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
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
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
              value={state.Title}
              onChangeText={(val) => handleChange('Title', val)}
              keyboardType="numbers-and-punctuation"
            />
            <TextInput
              style={styles.input}
              mode="fill"
              label={'Location'}
              value={state.Location}
              onChangeText={(val) => handleChange('Location', val)}
              keyboardType="numbers-and-punctuation"
            />
            <TextInput
              style={styles.input}
              mode="fill"
              label={'Phone No'}
              value={state.PhoneNo}
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
                value={state.Price}
                onChangeText={(val) => handleChange('Price', val)}
                keyboardType="numbers-and-punctuation"
                right={<TextInput.Affix text="/PKR" />}
              />
              <TextInput
                style={[styles.input, { width: 145 }]}
                mode="fill"
                label={'Finish Type'}
                value={state.FType}
                onChangeText={(val) => handleChange('FType', val)}
                keyboardType="numbers-and-punctuation"
              />
            </View>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
              <TextInput
                style={[styles.input, { width: 145 }]}
                mode="fill"
                label={'Property Type'}
                value={state.PType}
                onChangeText={(val) => handleChange('PType', val)}
                keyboardType="numbers-and-punctuation"
              />
              <TextInput
                style={[styles.input, { width: 145 }]}
                mode="fill"
                label={'Area/Size'}
                value={state.Area}
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
                value={state.Bedrooms}
                onChangeText={(val) => handleChange('Bedrooms', val)}
                keyboardType="number-pad"
              />
              <TextInput
                style={[styles.input, { width: 145 }]}
                mode="fill"
                label={'Bathrooms'}
                value={state.Bathrooms}
                onChangeText={(val) => handleChange('Bathrooms', val)}
                keyboardType="number-pad"
              />
            </View>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
              <TextInput
                style={[styles.input, { width: 145 }]}
                mode="fill"
                label={'Rooms'}
                value={state.Rooms}
                onChangeText={(val) => handleChange('Rooms', val)}
                keyboardType="number-pad"
              />
              <TextInput
                style={[styles.input, { width: 145 }]}
                mode="fill"
                label={'Reception'}
                value={state.Reception}
                onChangeText={(val) => handleChange('Reception', val)}
                keyboardType="number-pad"
              />
            </View>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
              <TextInput
                style={[styles.input, { width: 145 }]}
                mode="fill"
                label={'Dining Rooms'}
                value={state.DRoom}
                onChangeText={(val) => handleChange('DRoom', val)}
                keyboardType="number-pad"
              />
              <TextInput
                style={[styles.input, { width: 145 }]}
                mode="fill"
                label={'Kitchens'}
                value={state.Kitchen}
                onChangeText={(val) => handleChange('Kitchen', val)}
                keyboardType="number-pad"
              />
            </View>
            <TextInput
              style={styles.input}
              mode="fill"
              label={'Description'}
              value={state.Desc}
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
