/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { Button , Searchbar, TextInput } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width: screenWidth } = Dimensions.get('window');

export default function Filter({ navigation }) {

  const [products, setProducts] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [newData, setNewData] = useState('');

  const handleIcon = () => {
    console.log('Bars Icon Pressed');
  };
  const handleSearch = (event) => {
    setIsFocused(true);
    const data = products;
    const searchData = data.filter((item) => {
      return item.Title.toLowerCase().includes(event.toLowerCase());
    });
    setNewData(searchData);
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

  const renderItem = ({item}) => {
    return (
      <View style={styles.item} >
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
            style={{
              fontWeight: 'bold',
              fontSize: 16,
              color: '#000000eb',
            }}>
            <Text style={{
              fontWeight: '900',
              fontFamily: 'Montserrat-Bold',
            }}>Price:</Text> {item.Price} PKR
          </Text>
          <Button mode="contained" icon={'chevron-right'}
            contentStyle={{
              flexDirection: 'row-reverse',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            labelStyle={{ fontSize: 15 }}
            style={{
              borderRadius: 7,
              padding: 2,
            }}
            buttonColor="#000000e5"
            onPress={() => navigation.navigate('Item', { item })}>
            See More
          </Button>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
            <TouchableOpacity activeOpacity={0.9}
              style={styles.iconContainer}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="chevron-back" style={{backgroundColor: '#fff'}} size={35} color="#000000" />
            </TouchableOpacity>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderRadius: 7,
          }}>
            <TextInput mode="outlined" left={<TextInput.Icon name={'magnify'} />}
            right={isFocused ? <TextInput.Icon  name={'close'} /> : ''} style={{backgroundColor: '#fff', width: '87%'}} iconColor={'#000000'} placeholder="Find Property..."  onChangeText={(event) => handleSearch(event)} onPressIn={() => setIsFocused(false)} />
          </View>
        </View>
        <View style={{ marginVertical: 20 }}>
          <Text style={styles.header}>Find Houses</Text>
        </View>
        <View style={{ flex: 1}}>
          <View style={styles.itemContainer}>
            <FlatList style={styles.flatList}
              data={isFocused ? newData : products}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    height: '100%',
    marginTop: 20,
    backgroundColor: '#fff',
  },
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  iconContainer: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontWeight: 'normal',
    fontSize: 29,
    fontFamily: 'Montserrat-Bold',
    color: '#030303',
    textAlign: 'center',
  },
  container:{
    marginTop: 30,
    flex: 1,
  },
  itemContainer: {
    marginVertical: 20,
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
});
