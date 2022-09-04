/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-shadow */
import React, { useRef, useState, useEffect } from 'react';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { View, Dimensions, StyleSheet, Platform } from 'react-native';
import { Text } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';


const { width: screenWidth } = Dimensions.get('window');

const MyCarousel = props => {
    const carouselRef = useRef(null);
    const [entries, setEntries] = useState([]);

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
                setEntries(array);
            });
    };
    useEffect(() => {
        ProductData();
    }, []);


    const renderItem = ({ item, index }, parallaxProps) => {
        return (
            <View style={styles.item} key={index}>
                <ParallaxImage
                    source={{ uri: item.Url }}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
                />
                <View style={styles.title} numberOfLines={5}>
                    <Text style={styles.text}>
                        <Text style={styles.priceHeader}>Price:</Text>  {item.Price} PKR</Text>
                </View>
                <View style={styles.details}>
                    <Text style={[styles.priceHeader, { marginBottom: 10, color: '#fff' }]}>{item.Title}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="location" color={'#ffff'} size={20} />
                        <Text style={[styles.text, { marginLeft: 6 }]}>{item.Location}</Text>
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
                autoplay={true}
                // autoplayInterval={2000}
                loop={true}
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
        width: screenWidth - 55,
        height: screenWidth - 110,
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
        backgroundColor: '#000000',
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
    priceHeader: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 16,
        color: '#ffffff',
    },
});
