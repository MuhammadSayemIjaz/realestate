/* eslint-disable prettier/prettier */
import React from 'react';
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import Demo from '../assets/images/Demo.jpg';

const Item = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar backgroundColor="transparent" barStyle={'light-content'} translucent />
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={Demo} style={styles.image} />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Item;

const styles = StyleSheet.create({
    safeArea:{
        flex: 1,
        height: '100%',
    },
    items: {
        fontFamily: 'Poppins-Bold',
    },
    container:{
        flex: 1,
    },
    imageContainer:{
        height: '50%',
        backgroundColor: 'red',
    },
    image:{
        height: '100%',
        width: '100%',
    },
    
});
