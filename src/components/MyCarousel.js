/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
import React, { useRef, useState, useEffect } from 'react';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { View, Dimensions, StyleSheet, Platform } from 'react-native';
import { Text } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';

const ENTRIES1 = [
    {
        illustration: 'https://i.imgur.com/UYiroysl.jpg',
    },
    {
        illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
    },
    {
        illustration: 'https://i.imgur.com/MABUbpDl.jpg',
    },
    {
        illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
    },
    {
        illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
    },
];
const { width: screenWidth } = Dimensions.get('window');

const MyCarousel = props => {
    const carouselRef = useRef(null);
    // const [BannerDocs, setBannerDocs] = useState([]);
    const [entries , setEntries] = useState([]);

    // const BannerData = () => {
    //     let array = [];
    //     firestore()
    //         .collection('Banners')
    //         .get()
    //         .then(querySnapshot => {
    //             querySnapshot.forEach(documentSnapshot => {
    //                 const BannerData = documentSnapshot.data();
    //                 array.push(BannerData);
    //             });
    //             // setBannerDocs(array);
    //         });
    // };
    // useEffect(() => {
    //     BannerData();
    // }, []);

    useEffect(() => {
        setEntries(ENTRIES1);
    }, []);


    const renderItem = ({ item, index }, parallaxProps) => {
        return (
            <View style={styles.item}>
                <ParallaxImage
                    source={{ uri: item.illustration }}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />
                <View style={styles.title} numberOfLines={2}>
                    <Text style={styles.text}>
                        <Text style={styles.priceHeader}>Price:</Text>  1.7 Lac PKR</Text>
                </View>
                <View style={styles.details}>
                    <Text style={[styles.priceHeader, { marginBottom: 10, color: '#fff' }]}>Title</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="location" color={'#00afef'} size={20} />
                        <Text style={[styles.text, { marginLeft: 6 }]}>Location</Text>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Carousel
                ref={carouselRef}
                sliderWidth={screenWidth}
                sliderHeight={screenWidth}
                itemWidth={screenWidth - 60}
                data={entries}
                renderItem={renderItem}
                hasParallaxImages={true}
            />
        </View>
    );
};

export default MyCarousel;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        width: screenWidth - 60,
        height: screenWidth - 150,
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
    title: {
        position: 'absolute',
        top: 0,
        borderRadius: 0,
        backgroundColor: '#00afef',
        borderTopStartRadius: 7,
        padding: 15,
        paddingHorizontal: 20,
    },
    text: {
        color: '#ffffffcf',
        fontSize: 15,
        fontFamily: 'Montserrat-Bold',
    },
    details: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: '#333333d1',
        padding: 20,
        borderBottomEndRadius: 7,
        borderBottomStartRadius: 7,
    },
    priceHeader:{
        fontFamily: 'Montserrat-Bold',
        fontSize: 20,
        color: '#333333',
    },
});
