/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Logo from '../../assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const { width: screenWidth } = Dimensions.get('window');

export default function Favourites({ navigation }) {

  const [products, setProducts] = useState([]);
  const handleIcon = () => {
    navigation.goBack();
};
  const ProductData = () => {
    let array = [];

    firestore()
      .collection('Property')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          const BannerData = documentSnapshot.data();
          array.push(BannerData);
        });
        setProducts(array);
      });
  };
  useEffect(() => {
    ProductData();
  }, []);
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
      <View style={{ paddingBottom: 30, paddingHorizontal: 25 }}>
        <Text style={styles.headerStyle}>
        Favourite Properties</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {products.map((item, index) => {
            return (
              <View style={styles.item} key={index}>
                <View style={styles.imageContainer}>
                  <Image source={{ uri: item.Url }} style={styles.image} />
                </View>
                <Text style={styles.title} numberOfLines={2}>{item.Title}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Ionicons name="location" size={20} color={'#000000'} />
                  <Text>{item.Location} </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 5,
                    marginTop: 5,
                  }}>
                  <Text
                    style={{ fontWeight: 'bold', fontSize: 16, color: '#000000eb' }}>
                    <Text style={{ fontWeight: '900', fontFamily: 'Montserrat-Bold' }}>Price:</Text> {item.Price} PKR
                  </Text>
                  <Button mode="contained" icon={'chevron-right'} contentStyle={{ flexDirection: 'row-reverse', justifyContent: 'center', alignItems: 'center' }} labelStyle={{ fontSize: 15 }} style={{ borderRadius: 7, padding: 2 }} buttonColor="#000000e5" onPress={() => navigation.navigate('Item', { item })}>
                    See More
                  </Button>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    width: screenWidth - 40,
    height: screenWidth - 100,
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 16,
    borderColor: '#333333',
    padding: 5,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 10,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#000000',
    marginVertical: 5,
    fontFamily: 'Montserrat-Bold',
  },
  headerStyle: {
    fontSize: 25,
    fontFamily: 'Montserrat-Bold',
    color: '#333333',
    textAlign: 'center',
},
});
