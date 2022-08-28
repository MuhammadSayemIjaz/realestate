/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { TextInput, Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const AddProduct = ({navigation}) => {
  const initialState = {
    Title: '',
    Location: '',
    NoofBedrooms: '',
    Area: '',
    Price: '',
    Type: '',
    Desc: '',
    Url: '',
  };
  const [state, setState] = useState(initialState);
  const [image, setImage] = useState('');
  const [url, setUrl] = useState('');
  const [isLoading , setIsLoading] =useState(false);

  const handleChange = (name, val) => {
    setState(s => ({ ...s, [name]: val }));
  };

  const handleAddHouse = async () => {
    setIsLoading(true);
    await storage()
      .ref(`images/${image.fileName}`)
      .putFile(image.uri)
      .then(async () => {
        const url = await storage()
          .ref(`images/${image.fileName}`)
          .getDownloadURL();
        console.log(url);
        setUrl(url);
      })
      .catch(err => {
        console.error(err);
      });
    const { Title, Location, NoofBedrooms, Area, Price, Type, Desc  } = state;
    const ProductData = {
      Title: Title,
      Location: Location,
      NoofBedrooms: NoofBedrooms,
      Area: Area,
      Price: Price,
      Type: Type,
      Desc: Desc,
      Url: url,
    };
    console.log(ProductData);
    firestore()
      .collection('Products')
      .add(ProductData)
      .then(() => {
        console.log('User added!');
        setIsLoading(false);
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
        const source = { uri: 'data:image/jpeg;base64' + response.base64 };
        setImage(response.assets[0]);
      }
    });
    alert('Images Gallery is Opened');
  };
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.Card}>
        <TouchableOpacity activeOpacity={0.5} onPress={OpenImageGallery}>
          <View style={styles.ImageContainer}>
            <Ionicon name={'camera'} size={90} color={'#00aeef'} />
          </View>
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
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
            <TextInput
              style={[styles.input, { width: 200 }]}
              mode="fill"
              label={'No of Bedrooms'}
              onChangeText={(val) => handleChange('NoOfBedrooms', val)}
              keyboardType="number-pad"
            />
            <TextInput
              style={[styles.input, { width: 90 }]}
              mode="fill"
              label={'Area'}
              onChangeText={(val) => handleChange('Area', val)}
              keyboardType="number-pad"
            />
          </View>
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
            <TextInput
              style={[styles.input, { width: 145 }]}
              mode="fill"
              label={'Price'}
              onChangeText={(val) => handleChange('Price', val)}
              keyboardType="number-pad"
            />
            <TextInput
              style={[styles.input, { width: 145 }]}
              mode="fill"
              label={'Type'}
              onChangeText={(val) => handleChange('Type', val)}
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
            <Button mode="contained" icon="medical-bag" style={styles.btn} loading={isLoading} onPress={handleAddHouse}> Add Product</Button>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
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
    borderTopEndRadius: 13,
    borderTopStartRadius: 13,
    borderBottomEndRadius: 13,
    borderBottomStartRadius: 13,
  },
  inputContainer: {
    width: '100%',
    marginTop: 10,
    paddingHorizontal: 30,
  },
  input: {
    backgroundColor: '#ffffff',
    marginBottom: 6,
  },
  btn: {
    marginTop: 20,
    marginBottom: 40,
    borderTopEndRadius: 3,
    borderTopStartRadius: 3,
    borderBottomEndRadius: 3,
    borderBottomStartRadius: 3,
  },
});
