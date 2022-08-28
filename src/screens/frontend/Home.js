/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { SafeAreaView, StyleSheet, Image, TouchableOpacity, TextInput, View, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyCarousel from '../../components/MyCarousel';
import Demo from '../../assets/images/Demo.jpg';
const Home = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <View style={styles.container}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <Ionicons name="reorder-three-outline" size={32} color={'#00aeef'} />
                            <Ionicons name="person-circle-outline" size={32} color={'#00aeef'} />
                        </View>
                        <View style={{ paddingVertical: 13 }}>
                            <Text variant="titleLarge"
                                style={{
                                    fontWeight: 'bold',
                                    textAlign: "center",
                                }}>
                                Find Your Best Property</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ backgroundColor: '#00afef35', flexDirection: 'row', borderRadius: 10, width: '83%' }}>
                                <Ionicons name="search-outline" size={20} style={{ padding: 10, marginTop: 2 }} />
                                <TextInput placeholder="Search..."  />
                            </View>
                            <View style={{ backgroundColor: '#00aeef', width: '15%', padding: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                                <TouchableOpacity>
                                    <Ionicons name="options-outline" color="#fff" size={20} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <ScrollView style={{width: '100%', height: 400}}>
                            <View style={{ marginTop: 20, borderRadius: 10 }}>
                                <Image source={Demo}
                                    style={{
                                        width: '100%',
                                        height: 100,
                                        borderRadius: 7,
                                    }} />
                            </View>
                            <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text variant="titleLarge" style={{ color: '#35455D' }}>Recommended For You</Text>
                                <Text style={{ color: 'gray', borderBottomWidth: 1 }}>View All</Text>
                            </View>
                            <View style={{ marginTop: 20, }}>
                                <MyCarousel />
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({
    safeArea: {
        padding: 15,
        paddingHorizontal: 25,
        flex: 1,
    },
    container: {
        width: '100%',
    },

});
