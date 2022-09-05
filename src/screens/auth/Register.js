/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useAuthContext } from '../../context/AuthContext';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import demoProfile from '../../assets/images/Register.png';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Logo from '../../assets/images/logo.png';

const Register = ({ navigation }) => {
    const initialState = {
        fullName: '',
        userName: '',
        email: '',
        password: '',
        phoneNo: '',
    };
    const { dispatch } = useAuthContext();
    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const [state, setState] = useState(initialState);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleChange = (name, val) => {
        setState(s => ({ ...s, [name]: val }));
    };
    const handleIcon = () => {
        navigation.goBack();
    };
    const handleRegister = () => {
        setIsProcessing(true);
        const { email, password } = state;
        if (!email) { return ToastAndroid.show('Email is invalid',ToastAndroid.SHORT); }
        if (!password) { return ToastAndroid.show('Password is invalid', ToastAndroid.SHORT); }
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                createUserProfile(user);
                // ToastAndroid.show(`User Registered Succesfully With ${user.email}` ,ToastAndroid.SHORT);
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    ToastAndroid.show('User is already register with this email' ,ToastAndroid.SHORT);
                }
                if (error.code === 'auth/invalid-email') {
                ToastAndroid.show('Email is invalid' ,ToastAndroid.SHORT);
                }
                if (error.Code === 'auth/weak-password') {
                ToastAndroid.show('Please Enter Strong Password' ,ToastAndroid.SHORT);
                }
            }).finally(() => {
                setIsProcessing(false);
            });
        console.log(email, password);
    };


    const createUserProfile = (user) => {
        const { fullName, userName, phoneNo } = state;
        let formData = {
            fullName: fullName,
            userName: userName,
            phoneNo: phoneNo,
            email: user.email,
            uid: user.uid,
            dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
        };
        if (!fullName) { return ToastAndroid.show('Name is invalid',ToastAndroid.SHORT); }
        if (!userName) { return ToastAndroid.show('User Name is invalid', ToastAndroid.SHORT); }
        if (!phoneNo) { return ToastAndroid.show('Phone No is invalid',ToastAndroid.SHORT); }
        if (!userName) { return ToastAndroid.show('userName is invalid', ToastAndroid.SHORT); }
        firestore()
        .collection('users')
            .doc(user.uid)
            .set(formData)
            .then(() => {
                dispatch({ type: 'LOGIN', payload: { user } });
                setIsProcessing(false);
                ToastAndroid.show(`User Registered Succesfully With ${user.email}` ,ToastAndroid.SHORT);
            })
            .catch(err => {
                ToastAndroid.show(err ,ToastAndroid.SHORT);

            })
            .finally(() => {
                setIsProcessing(false);
            });
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
                        <Text style={styles.header}>REGISTER</Text>
                        <Text style={styles.heading}>Create An Account!</Text>
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
                                label={'Password'}
                                keyboardType="numbers-and-punctuation"
                                onChangeText={value => handleChange('password', value)}
                                secureTextEntry={isPasswordShow ? false : true}
                                right={<TextInput.Icon iconColor="#000000" name={isPasswordShow ? 'eye' : 'eye-off'} onPress={() => { setIsPasswordShow(!isPasswordShow); }} />}
                                left={<TextInput.Icon icon="lock" iconColor="#000000" />}
                            />
                            <TextInput
                                style={styles.input}
                                mode="outlined"
                                label={'Phone Number'}
                                onChangeText={value => handleChange('phoneNo', value)}
                                keyboardType="number-pad"
                                left={<TextInput.Icon iconColor="#000000" name={'phone-classic'} onPress={() => { setIsPasswordShow(!isPasswordShow); }} />}
                            />
                            <TouchableOpacity>
                                <Button style={styles.btn}
                                    mode="contained"
                                    icon={'account'}
                                    labelStyle={{ fontSize: 25 }}
                                    loading={isProcessing} disabled={isProcessing} onPress={handleRegister}
                                ><Text style={styles.registerText}>Register</Text>
                                </Button>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.bottomSection}>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.text}>Already have an Account?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Register;

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
        paddingHorizontal: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 30,
    },
    text: {
        color: '#000000',
        fontSize: 15,
        fontFamily: 'Montserrat-Medium',
    },
});
