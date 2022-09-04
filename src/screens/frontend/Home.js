/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, TextInput, View, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyCarousel from '../../components/MyCarousel';
import Demo from '../../assets/images/Demo.jpg';
import Logo from '../../assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import  Toast  from 'react-native-toast-message';

const Home = ({ navigation }) => {
    <Toast ref = {(ref) => Toast.setRef(ref)} />
    const [isPressed, setIsPressed] = useState(false);
    const handleIcon = () => {
        setIsPressed(true);
        Toast.show({
            type: 'error',
            text1: 'Email Already Have an Account',
            text2: 'Please Enter a Valid Email!',
            position: 'top',
            visibilityTime: 3000,
            bottomOffset: 30,
        });
        console.log('Drawar Icon is Pressed : ', isPressed);
    };
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 30,
                }}>
                    <TouchableOpacity onPress={handleIcon} style={{ marginBottom: 5 }}>
                        <FontAwesomeIcon icon={faBarsStaggered} size={23} color={'#000000'} />
                    </TouchableOpacity>
                    <Image source={Logo} style={styles.logo}/>
                    <TouchableOpacity onPress={() => {navigation.navigate('Account');}}>
                        <Ionicons name="person-circle-outline" size={33} color={'#000000'} />
                    </TouchableOpacity>
                </View>
                <View style={{ paddingVertical: 13, paddingHorizontal: 25 }}>
                    <Text style={styles.headerStyle}>
                        Find Your Best Property</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Filter')}
                    style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 25 }}>
                    <View style={{ backgroundColor: '#00000015', flexDirection: 'row', borderRadius: 10, width: '83%' }}>
                        <Ionicons name="search" color={'#000000'} size={23} style={{ padding: 10, marginTop: 2 }} />
                        <TextInput editable={false} placeholder="Search..." />
                    </View>
                    <View style={{ backgroundColor: '#000000', width: '15%', padding: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                            <Ionicons name="options-outline" color="#fff" size={20} />
                    </View>
                </TouchableOpacity>
                <ScrollView style={{ width: '100%', height: '76%', marginVertical: 20, paddingHorizontal: 25 }}>
                    <View style={{ borderRadius: 10 }}>
                        <Image source={Demo}
                            style={{
                                width: '100%',
                                height: 100,
                                borderRadius: 7,
                            }} />
                    </View>
                    <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text variant="titleLarge" style={styles.headerStyle}>Recommended For You</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('AllHouses')}>
                            <Text style={styles.smallHeadingStyle}>View All <Ionicons name="chevron-forward" size={14} /></Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginVertical: 20 }}>
                        <MyCarousel />
                    </View>
                    <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text variant="titleLarge" style={styles.headerStyle}>Suggested for You</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Suggested')}>
                            <Text style={styles.smallHeadingStyle}>View All <Ionicons name="chevron-forward" size={14} /></Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginVertical: 20 }}>
                        <MyCarousel />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({
    safeArea: {
        paddingVertical: 15,
        flex: 1,
        marginTop: 35,
        backgroundColor: '#ffff',
    },
    container: {
        width: '100%',
        fontFamily: 'Montserrat-Bold',
    },
    headerStyle: {
        fontWeight: 'normal',
        fontSize: 18,
        fontFamily: 'Montserrat-Bold',
        color: '#333333',
    },
    smallHeadingStyle: {
        fontWeight: 'normal',
        fontSize: 13,
        fontFamily: 'Montserrat-Bold',
        color: 'gray',
        borderBottomWidth: 1,
        borderColor: 'gray',
    },
});
