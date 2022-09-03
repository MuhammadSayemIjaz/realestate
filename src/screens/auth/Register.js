/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useAuthContext } from '../../context/AuthContext';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
import demoProfile from '../../assets/images/Register.png';
import { ScrollView } from 'react-native-gesture-handler';

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
    const [isProcess, setIsProcess] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleChange = (name, val) => {
        setState(s => ({ ...s, [name]: val }));
    };

    const handleRegister = () => {
        setIsProcessing(true);
        const { email, password } = state;
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                createUserProfile(user);
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    Toast.show({
                        type: 'error',
                        text1: 'Email Already Have an Account',
                        text2: 'Please Enter a Valid Email!',
                        position: 'top',
                        visibilityTime: 3000,
                        bottomOffset: 30,
                    });
                }
                // if (error.code === 'auth/invalid-email') {
                //     // Toast.show({
                //     //     type: 'error',
                //     //     text1: 'Invalid Email',
                //     //     text2: 'Please Enter a Valid Email!',
                //     //     position: 'top',
                //     //     visibilityTime: 3000,
                //     //     bottomOffset: 30,
                //     // });
                //     alert('That email address is invalid!');
                // }
                // if (error.Code === 'auth/weak-password') {
                //     return (
                //         // Toast.show({
                //         //     type: 'error',
                //         //     text1: 'Weak Password',
                //         //     text2: 'Please Enter Strong Password!',
                //         //     position: 'top',
                //         //     visibilityTime: 3000,
                //         //     bottomOffset: 30,
                //         // })
                //     );
                // }
                alert(error);
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
        firestore()
            .collection('users')
            .doc(user.uid)
            .set(formData)
            .then(() => {
                console.log('User added!');
                dispatch({ type: 'LOGIN', payload: { user } });
                setIsProcessing(false);
                Toast.show({
                    type: 'success',
                    text1: 'Account Created Successfully',
                    position: 'top',
                    visibilityTime: 3000,
                    bottomOffset: 30,
                });
            })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                setIsProcessing(false);
            });
    };


    return (
        <SafeAreaView style={styles.safeArea}>
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
        backgroundColor: '#ffff'
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
