/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Platform,
} from 'react-native';
import { Button, Text } from 'react-native-paper';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useFavContext } from '../context/FavouriteContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import logo from '../assets/images/logo.png';


const { width: screenWidth } = Dimensions.get('window');

export default function Favourites({ navigation }) {

  const { favHouses, dispatch } = useFavContext();

  return (
    <SafeAreaView style={styles.safeArea}>
    <ScrollView style={{ backgroundColor: '#fff', padding: 20 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back"
          size={30} color="#000000" />
        <Image source={logo} style={{ width: 80, height: 40 }} />
        <Ionicons
          name="person-circle-outline"
          size={32}
          color="#000000"
          onPress={() => navigation.navigate('Account')} />
      </View>
      <View
        style={{
          paddingTop: 25,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderBottomColor: '#ccc9',
          paddingBottom: 15,
        }}>
        <Ionicons name="heart" color="red" size={35} />
        <Text
          variant="headlineLarge"
          style={{ textAlign: 'center', fontFamily: 'Monsterrat-Bold' }}>
          {' '}
          My WishList{' '}
        </Text>
      </View>
      <View style={styles.container}>
        {favHouses.length < 1 ? (
          ''
        ) : (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              paddingVertical: 5,
            }}
            onPress={() => dispatch({ type: 'EMPTY' })}>
            <Ionicons name="trash-outline" size={22} />
            <Text style={{ fontFamily: 'Monsterrat-Bold' }}>Clear All </Text>
          </TouchableOpacity>
        )}
        {favHouses.length === 0 ? (
          <Text
            variant="titleLarge"
            style={{
              fontFamily: 'Monsterrat-Bold',
              textAlign: 'center',
              paddingVertical: 10,
            }}>
            {' '}
            You Have No House in Wishlist{' '}
          </Text>
        ) : (
          favHouses.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#ccc',
                  paddingVertical: 5,
                }}>
                <TouchableOpacity
                  style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}
                  onPress={() =>
                    dispatch({ type: 'DELETE', id: item.uid, item })
                  }>
                  <Ionicons name="close-circle-outline" size={20} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ flexDirection: 'row', padding: 3 }}
                  onPress={() => navigation.navigate('Item', { item })}>
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
                </TouchableOpacity>
              </View>
            );
          })
        )}
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
