/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBath, faBellConcierge, faKitchenSet, faRestroom, faUtensils } from '@fortawesome/free-solid-svg-icons';
import MakeCall from './MakeCall';
import { useFavContext } from '../context/FavouriteContext';
const Item = ({ navigation, route }) => {
    const { favHouses, dispatch } = useFavContext();
    const [favIcon, setFavIcon] = useState('heart-outline');

    const { Url, Title, Location, PhoneNo, Price, PType, Area, FType, Bedrooms, Bathrooms, Rooms, Reception, DRoom, Kitchen, Desc } = route.params.item;

    useEffect(() => {
        const FavData = favHouses.map((prod, index) => {
            if (prod.uid === route.params.id.uid) {
                return setFavIcon('heart');
            }
        });
    }, []);
    const handleData = (item) => {
        setFavIcon('heart');
        dispatch({ type: 'ADD_TO_FAV', id: item.uid, item });
        ToastAndroid.show('Property is added in your Favourities', ToastAndroid.SHORT);
    };
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar backgroundColor="transparent" barStyle={'light-content'} translucent />
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: Url }} style={styles.image} />
                    <View style={styles.navigation}>
                        <TouchableOpacity style={styles.iconContainer} onPress={() => navigation.goBack()}>
                            <Ionicons name="chevron-back" size={25} color="#555355" />
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.header}>Details</Text>
                        </View>
                        <TouchableOpacity style={styles.iconContainer} onPress={() => handleData(route.params.item)}>
                            <Ionicons name={favIcon} size={25} color="#555355" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.imageTextContainer}>
                        <Text style={styles.title}>{Title}</Text>
                        <View style={styles.locationContainer} >
                            <Ionicons name="location-outline" size={20} color="#ffffff" />
                            <Text style={[styles.title, { fontSize: 15, marginLeft: 8 }]}>{Location}</Text>
                        </View>
                    </View>
                </View>
                <ScrollView>
                    <View style={styles.priceContainer}>
                        <View style={styles.priceSection}>
                            <Text style={[styles.title, { color: '#333333' }]}>{Price} PKR /</Text>
                            <Text style={[styles.title, { fontSize: 17, color: '#8f9294' }]}> month</Text>
                        </View>
                        <View style={styles.areaSection}>
                            {/* <Ionicons name="star" size={25} color={'#FFD958'} /> */}
                            <Text style={[styles.title, { fontSize: 20, color: '#333333' }]}>{Area}</Text>
                        </View>
                    </View>
                    <View style={styles.facilitiesContainer}>
                        <View style={styles.facilitiesSection}>
                            <View style={styles.facilities}>
                                <Ionicons name="bed" size={35} color="#000000db" />
                                <Text style={styles.text}>{Bedrooms} Bed</Text>
                            </View>
                            <View style={{ borderWidth: 1, borderColor: '#F6F7F9', height: 30 }} />
                            <View style={styles.facilities}>
                                <FontAwesomeIcon icon={faBath} size={30} color="#000000db" />
                                <Text style={styles.text}>{Bathrooms} Bath</Text>
                            </View>
                            <View style={{ borderWidth: 1, borderColor: '#F6F7F9', height: 30 }} />
                            <View style={styles.facilities}>
                                <FontAwesomeIcon icon={faRestroom} size={30} color="#000000db" />
                                <Text style={styles.text}>{Rooms} Rooms</Text>
                            </View>
                            <View style={styles.facilities}>
                                <FontAwesomeIcon icon={faBellConcierge} size={30} color="#000000db" />
                                <Text style={styles.text}>{Reception} Recep</Text>
                            </View>
                            <View style={{ borderWidth: 1, borderColor: '#F6F7F9', height: 30 }} />
                            <View style={styles.facilities}>
                                <FontAwesomeIcon icon={faUtensils} size={30} color="#000000db" />
                                <Text style={styles.text}>{DRoom} Dining</Text>
                            </View>
                            <View style={{ borderWidth: 1, borderColor: '#F6F7F9', height: 30 }} />
                            <View style={styles.facilities}>
                                <FontAwesomeIcon icon={faKitchenSet} size={30} color="#000000db" />
                                <Text style={styles.text}>{Kitchen} Kitchen</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.descContainer}>
                        <Text style={[styles.header, { color: '#333333' }]}>Description</Text>
                        <Text style={styles.content}>{Desc}</Text>
                    </View>
                    <MakeCall PhoneNo={PhoneNo} />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Item;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        height: '100%',
    },
    items: {
        fontFamily: 'Poppins-Bold',
    },
    container: {
        flex: 1,
    },
    imageContainer: {
        height: '50%',
        backgroundColor: '#F6F7F9',
    },
    image: {
        height: '100%',
        width: '100%',
    },
    navigation: {
        position: 'absolute',
        top: '8%',
        left: '0%',
        width: '100%',
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconContainer: {
        width: 40,
        height: 40,
        backgroundColor: '#ffffff7d',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 60,
    },
    header: {
        fontWeight: 'normal',
        fontSize: 24,
        fontFamily: 'Montserrat-Bold',
        color: '#ffff',
    },
    imageTextContainer: {
        position: 'absolute',
        bottom: '0%',
        width: '100%',
        height: '35%',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontWeight: 'normal',
        fontSize: 20,
        fontFamily: 'Montserrat-Bold',
        color: '#ffff',
    },
    locationContainer: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    priceContainer: {
        paddingVertical: 30,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    priceSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '45%',
    },
    areaSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '20%',
    },
    facilitiesContainer: {
        width: '100%',
        paddingHorizontal: 20,
    },
    facilitiesSection: {
        borderRadius: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
        backgroundColor: '#ffffffff',
    },
    facilities: {
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        width: '32%',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    text: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 12,
        marginHorizontal: 5,
    },
    descContainer: {
        marginVertical: 30,
        paddingHorizontal: 20,
    },
    content: {
        paddingTop: 20,
        fontFamily: 'Montserrat-Bold',
    },

});
