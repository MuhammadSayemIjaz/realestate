/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useAuthContext } from '../../context/AuthContext';
import demoProfile from '../../assets/images/Register.png';
import auth from '@react-native-firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Logo from '../../assets/images/logo.png';

const Account = ({ navigation }) => {
    const { isAuthenticated, dispatch } = useAuthContext();

    const [state, setState] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const [value, setValue] = useState('');

    const handleSignOut = () => {
        auth()
            .signOut()
            .then(() => {
                dispatch({ type: 'LOGOUT' });
            })
            .catch(err => {
                console.error(err);
                alert('Something went wrong');
            });
    };
    const handleIcon = () => {
        navigation.openDrawer();
    };
    const handleChange = (name, val) => {
        setState(s => ({ ...s, [name]: val }));
    };

    const handleUpdate = () => {
        console.log('Profile Updated');
    };
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 30,
            }}>
                <TouchableOpacity onPress={handleIcon} style={{ marginBottom: 5 }}>
                    <FontAwesomeIcon icon={faArrowLeft} size={23} color={'#000000'} />
                </TouchableOpacity>
                <Image source={Logo} style={styles.logo} />
                <TouchableOpacity onPress={() => { navigation.navigate('Account'); }}>
                    <Ionicons name="person-circle-outline" size={33} color={'#000000'} />
                </TouchableOpacity>
            </View>
            <ScrollView style={{ maxheight: '100%' }}>
                <View style={styles.container}>
                    <View style={styles.content}>
                        <Text style={styles.header}>Profile</Text>
                        <TouchableOpacity>
                            <Image source={demoProfile} style={styles.image} />
                        </TouchableOpacity>
                        <View style={styles.formSection}>
                            <TextInput
                                style={styles.input}
                                mode="outlined"
                                label={'Full Name'}
                                onChangeText={value => handleChange('fullName', value)}
                                keyboardType="numbers-and-punctuation"
                                left={<TextInput.Icon icon="account" iconColor="#000000" />}
                            />
                            <TextInput
                                style={styles.input}
                                mode="outlined"
                                label={'User Name'}
                                keyboardType="numbers-and-punctuation"
                                onChangeText={value => handleChange('userName', value)}
                                left={<TextInput.Icon icon="account-circle" iconColor="#000000" />}
                            />
                            <TextInput
                                style={styles.input}
                                mode="outlined"
                                label={'Email'}
                                keyboardType="email-address"
                                onChangeText={value => handleChange('email', value)}
                                left={<TextInput.Icon icon="email" iconColor="#000000" />}
                            />
                            <TextInput
                                style={styles.input}
                                mode="outlined"
                                label={'Phone Number'}
                                onChangeText={value => handleChange('phoneNo', value)}
                                keyboardType="number-pad"
                                left={<TextInput.Icon iconColor="#000000" name={'phone'} onPress={() => { setIsPasswordShow(!isPasswordShow); }} />}
                            />
                        </View>
                    </View>
                    <View style={styles.bottomSection}>
                        <TouchableOpacity>
                            <Button style={styles.btn}
                                mode="contained"
                                icon={'card-account-details'}
                                labelStyle={{ fontSize: 25 }}
                                loading={isProcessing} disabled={isProcessing} onPress={handleUpdate}
                            ><Text style={styles.registerText}>Update Profile</Text>
                            </Button>
                        </TouchableOpacity>
                        {!isAuthenticated ?
                            '' : <TouchableOpacity>
                                <Button style={styles.btn}
                                    mode="contained"
                                    icon={'logout'}
                                    labelStyle={{ fontSize: 25 }}
                                    loading={isProcessing} disabled={isProcessing} onPress={handleSignOut}
                                ><Text style={styles.registerText}>Sign Out</Text>
                                </Button>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Account;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        marginTop: 30,
        backgroundColor: '#ffff',
    },
    content: {
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
    },
    heading: {
        color: '#000000',
        fontSize: 25,
        marginVertical: 20,
        fontFamily: 'Montserrat-Bold',
    },
    header: {
        color: '#000000',
        marginTop: 30,
        marginBottom: 20,
        fontSize: 40,
        fontFamily: 'Montserrat-ExtraBold',
    },
    formSection: {
        width: '100%',
        paddingHorizontal: 30,
        marginTop: 10,
    },
    input: {
        marginVertical: 5,
        fontFamily: 'Montserrat-Bold',
        fontSize: 18,
        padding: 4,
    },
    btn: {
        borderRadius: 7,
        marginTop: 15,
        padding: 6,
    },
    registerText: {
        fontSize: 20,
        letterSpacing: 1,
        fontFamily: 'Montserrat-Bold',
    },
    bottomSection: {
        paddingHorizontal: 30,
        marginTop: 30,
        marginBottom: 30,
    },
    text: {
        color: '#000000',
        fontSize: 15,
        fontFamily: 'Montserrat-Medium',
    },
});
