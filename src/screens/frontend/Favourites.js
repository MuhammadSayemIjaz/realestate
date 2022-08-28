/* eslint-disable prettier/prettier */
import { StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Demo from '../../assets/images/Demo.jpg';

const initialState = [{
    Title: 'Demo Image',
    Location : 'New York',
    PType : 'Villa',
    Area : 23,
    FType : 'AC',
    Bedrooms: 12,
    Bathrooms: 6,
    Rooms: 15,
    Reception: 2,
    DRoom: 2,
    Kitchen: 3,
    Price: '23.6 Lac',
    uri: 'https://unsplash.com/photos/w3eFhqXjkZE',
},
{
    Title: 'Demo Image 2',
    Location : 'New York',
    PType : 'Villa',
    Area : 23,
    FType : 'AC',
    Bedrooms: 12,
    Bathrooms: 6,
    Rooms: 15,
    Reception: 2,
    DRoom: 2,
    Kitchen: 3,
    Price: '23.6 Lac',
    uri: 'https://unsplash.com/photos/9gGvNWBeOq4',
}
];

const Favourites = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [Products, setProducts] = useState(initialState);

    const handleFavourite = () => {
        setIsFocused(true);
    };
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {Products.map((item, index) => {
                    return (<View key={index} style={styles.image}>
                        <View style={[styles.container, { backgroundColor: 'red' }]}>
                            <Image source={{uri: item.uri}} style={styles.ImageContainer} />
                        </View>
                        <TouchableOpacity  style={styles.icon} onPress={handleFavourite}>
                            <Ionicon name={isFocused ? 'heart' : 'heart-outline'} size={23} />
                        </TouchableOpacity>
                    </View>
                    );
                })}
            </View>
        </SafeAreaView>
    );
};

export default Favourites;

const styles = StyleSheet.create({
    image:{
        marginTop: 20,
    },
    safeArea: {
        padding: 10,
        paddingHorizontal: 25,
        flex: 1,
    },
    container: {
        width: '100%',
        borderRadius:13,
    },
    ImageContainer: {
        width: 300,
        height: 190,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    icon: {
        position: 'absolute',
        top: 20,
        right: 30,
    },
});
