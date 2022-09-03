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
  ScrollView,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import FilterOptions from './FilterOptions';
import Slider from '@react-native-community/slider';

const { width: screenWidth } = Dimensions.get('window');

export default function Filter({ navigation }) {

  const [products, setProducts] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [newData, setNewData] = useState('');
  const [isFilterPressed, setIsFilterPressed] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [price, setPrice] = useState(0);
  const [LocFilter, setLocFilter] = useState(false);
  const [showRooms, setShowRooms] = useState(false);
  const [showType, setShowType] = useState(false);
  // Pressed Btn States
  const [isPriceBtnPressed, setisPriceBtnPressed] = useState(false);
  const [isLocBtnPressed, setisLocBtnPressed] = useState(false);
  const [isBedroomBtnPressed, setIsBedroomBtnPressed] = useState(false);
  const [isRoomsBtnPressed, setIsRoomsBtnPressed] = useState(false);
  const [isTypeBtnPressed, setIsTypeBtnPressed] = useState(false);
  const [isBathroomBtnPressed, setisBathroomBtnPressed] = useState(false);
  const [isReceptionBtnPressed, setisReceptionBtnPressed] = useState(false);
  const [isDiningBtnPressed, setIsDiningBtnPressed] = useState(false);
  const [isKitchenBtnPressed, setIsKitchenBtnPressed] = useState(false);

  const handlePrice = () => {
    setShowPrice(true);
    setisPriceBtnPressed(true);
};
const handleLocation = () => {
    setisLocBtnPressed(true);
};
const handleRooms = () => {
    setShowRooms(true);
    setIsRoomsBtnPressed(true);
};
const handleType = () => {
    setIsTypeBtnPressed(true);
};
const handleBedroom = () => {
    setIsBedroomBtnPressed(true);
};
const handleBathroom = () => {
    setisBathroomBtnPressed(true);
};
const handleReception = () => {
    setisReceptionBtnPressed(true);
};
const handleDining = () => {
    setIsDiningBtnPressed(true);
};
const handleKitchen = () => {
    setIsKitchenBtnPressed(true);
};
  const handleFilterIcon = () => {
    setIsFilterPressed(true);
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

  const renderItem = ({ item }) => {
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
            <Ionicons name="arrow-back" style={{ backgroundColor: '#fff' }} size={35} color="#000000" />
          </TouchableOpacity>
          <View style={{ width: '70%' }}>
            <Text style={styles.header}>Find Houses</Text>
          </View>
        </View>
        <View style={{
          paddingHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: 7,
          marginTop: 20,
        }}>
          <TextInput mode="outlined"
            left={<TextInput.Icon name={'magnify'} />}
            right={isFocused ? <TextInput.Icon name={'close'} /> : ''}
            style={{ backgroundColor: '#fff', width: '80%', padding: 2 }} iconColor={'#000000'} placeholder="Find Property..."
            onChangeText={(event) => handleSearch(event)} onPressIn={() => setIsFocused(false)} />
          <TouchableOpacity activeOpacity={0.6}
            style={{
              backgroundColor: '#000000',
              width: '17%',
              height: 55,
              marginTop: 5,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 7,
            }}
            onPress={handleFilterIcon}>
            {isFilterPressed ?
              <Ionicons name={'close'} color="#fff" size={27} onPress={() => setIsFilterPressed(false)} />
              : <Ionicons name={'options-outline'} color="#fff" size={27} />
            }
          </TouchableOpacity>
        </View>
        {isFilterPressed ? <View style={styles.filterContainer}>
        <View style={styles.filterButtonsSection}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <TouchableOpacity activeOpacity={0.6} onPress={handlePrice}>
                    {isPriceBtnPressed ?
                        <Button mode={'contained'} style={styles.filterBtn} labelStyle={styles.btnLabelStyle} onPress={() => { setisPriceBtnPressed(false); setShowPrice(false) }}>Price</Button>
                        :
                        <Button mode={'outlined'} style={styles.filterBtn} labelStyle={styles.btnLabelStyle}>Price</Button>
                    }
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} onPress={handleLocation}>
                    {isLocBtnPressed ?
                        <Button mode={'contained'} style={styles.filterBtn} labelStyle={styles.btnLabelStyle} onPress={() => { setisLocBtnPressed(false); }}>Location</Button>
                        :
                        <Button mode={'outlined'} style={styles.filterBtn} labelStyle={styles.btnLabelStyle}>Location</Button>
                    }
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} onPress={handleRooms}>
                    {isRoomsBtnPressed ?
                        <Button mode={'contained'} style={styles.filterBtn} labelStyle={styles.btnLabelStyle} onPress={() => { setIsRoomsBtnPressed(false); setShowRooms(false) }}>Rooms</Button>
                        :
                        <Button mode={'outlined'} style={styles.filterBtn} labelStyle={styles.btnLabelStyle}>Rooms</Button>
                    }
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} onPress={handleType}>
                    {isTypeBtnPressed ?
                        <Button mode={'contained'} style={styles.filterBtn} labelStyle={styles.btnLabelStyle} onPress={() => { setIsTypeBtnPressed(false); }}>Property Type</Button>
                        :
                        <Button mode={'outlined'} style={styles.filterBtn} labelStyle={styles.btnLabelStyle}>Property Type</Button>
                    }
                </TouchableOpacity>
            </ScrollView>
        </View>
        {showPrice ? <View style={styles.priceContainer}>
            <View>
                <View style={{ position: 'absolute', top: 0, left: 10, right: 0, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text >0</Text>
                    <Text >{price}</Text>
                    <Text >{10000000}</Text>
                </View>
                <Slider
                    style={{ width: '100%', height: 50, marginTop: 10 }}
                    minimumValue={0}
                    maximumValue={10000000}
                    minimumTrackTintColor="#000000"
                    maximumTrackTintColor="#000000"
                    thumbTintColor="#000000"
                    value={10}
                    onValueChange={(value) => setPrice(value)}
                />
            </View>
        </View> : ''}
        {showRooms ? <View style={styles.RoomsContainer}>
            <View style={styles.filterButtonsSection}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity activeOpacity={0.6} onPress={handleBedroom}>
                        {isBedroomBtnPressed ?
                            <Button mode={'contained'} style={styles.filterBtn} labelStyle={styles.btnLabelStyle} onPress={() => { setIsBedroomBtnPressed(false); }}>Bedrooms</Button>
                            :
                            <Button mode={'outlined'} style={styles.filterBtn} labelStyle={styles.btnLabelStyle}>Bedrooms</Button>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.6} onPress={handleBathroom}>
                        {isBathroomBtnPressed ?
                            <Button mode={'contained'} style={styles.filterBtn} labelStyle={styles.btnLabelStyle} onPress={() => { setisBathroomBtnPressed(false); }}>Bathrooms</Button>
                            :
                            <Button mode={'outlined'} style={styles.filterBtn} labelStyle={styles.btnLabelStyle}>Bathrooms</Button>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.6} onPress={handleReception}>
                        {isReceptionBtnPressed ?
                            <Button mode={'contained'} style={styles.filterBtn} labelStyle={styles.btnLabelStyle} onPress={() => { setisReceptionBtnPressed(false); }}>Receptions</Button>
                            :
                            <Button mode={'outlined'} style={styles.filterBtn} labelStyle={styles.btnLabelStyle}>Receptions</Button>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.6} onPress={handleDining}>
                        {isDiningBtnPressed ?
                            <Button mode={'contained'} style={styles.filterBtn} labelStyle={styles.btnLabelStyle} onPress={() => { setIsDiningBtnPressed(false); }}>Dining Rooms</Button>
                            :
                            <Button mode={'outlined'} style={styles.filterBtn} labelStyle={styles.btnLabelStyle}>Dining Rooms</Button>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.6} onPress={handleKitchen}>
                        {isKitchenBtnPressed ?
                            <Button mode={'contained'} style={styles.filterBtn} labelStyle={styles.btnLabelStyle} onPress={() => { setIsKitchenBtnPressed(false); }}>Kitchens</Button>
                            :
                            <Button mode={'outlined'} style={styles.filterBtn} labelStyle={styles.btnLabelStyle}>Kitchens</Button>
                        }
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View> : ''}
    </View> : '' }
        <View style={{ flex: 1 }}>
          <View style={styles.itemContainer}>
            <FlatList style={styles.flatList}
              data={isFocused ? newData : products}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
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
    paddingHorizontal: 20,
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
  container: {
    marginTop: 30,
    flex: 1,
  },
  filterContainer: {
    paddingTop: 10,
    paddingHorizontal: 25,
    marginTop: 10,
},
filterButtonsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
},
filterBtn: {
    borderRadius: 10,
    marginRight: 10,
    padding: 2,
},
btnLabelStyle: {
    fontFamily: 'Montserrat-Bold',
},
priceContainer: {
    marginTop: 10,
},
RoomsContainer: {
    marginTop: 20,
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
