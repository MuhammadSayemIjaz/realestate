/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Bg from '../../assets/images/Bg.png';
import { useAuthContext } from '../../context/AuthContext';
import auth from '@react-native-firebase/auth';
import  firebase  from '@react-native-firebase/app';
import  firestore  from '@react-native-firebase/firestore';
import  Toast  from 'react-native-toast-message';
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
    const handleChange = (name, val) => {
        setState(s => ({ ...s, [name]: val }));
    };

    const handleRegister = () => {
        setIsProcess(true);
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
                setIsProcess(false);
            });


        // setIsProcess(false)
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
                setIsProcess(false);
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
                setIsProcess(false);
            });
    };


    return (
        <ImageBackground source={Bg} style={styles.bgImage}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.header}>REGISTER</Text>
                    <Text style={styles.heading}>Create An Account!</Text>
                    <View style={styles.formSection}>
                        <TextInput
                            style={styles.input}
                            mode="outlined"
                            label={'Full Name'}
                            onChangeText={value => handleChange('fullName', value)}
                            keyboardType="numbers-and-punctuation"
                            left={<TextInput.Icon icon="account" iconColor={'#00aeef'} />}
                        />
                        <TextInput
                            style={styles.input}
                            mode="outlined"
                            label={'User Name'}
                            keyboardType="numbers-and-punctuation"
                            onChangeText={value => handleChange('userName', value)}
                            left={<TextInput.Icon icon="account-circle" iconColor={'#00aeef'} />}
                        />
                        <TextInput
                            style={styles.input}
                            mode="outlined"
                            label={'Email'}
                            keyboardType="email-address"
                            onChangeText={value => handleChange('email', value)}
                            left={<TextInput.Icon icon="email" iconColor={'#00aeef'} />}
                        />
                        <TextInput
                            style={styles.input}
                            mode="outlined"
                            label={'Password'}
                            keyboardType="numbers-and-punctuation"
                            onChangeText={value => handleChange('password', value)}
                            secureTextEntry={isPasswordShow ? false : true}
                            right={<TextInput.Icon iconColor={'#00aeef'} name={isPasswordShow ? 'eye' : 'eye-off'} onPress={() => { setIsPasswordShow(!isPasswordShow); }} />}
                            left={<TextInput.Icon icon="lock" iconColor={'#00aeef'} />}
                        />
                        <TextInput
                            style={styles.input}
                            mode="outlined"
                            label={'Phone Number'}
                            onChangeText={value => handleChange('phoneNo', value)}
                            keyboardType="number-pad"
                            left={<TextInput.Icon iconColor={'#00aeef'} name={'phone-classic'} onPress={() => { setIsPasswordShow(!isPasswordShow); }} />}
                        />
                        <TouchableOpacity onPress={handleRegister}>
                            <Button style={styles.btn}
                                mode="contained"
                                icon={'account'}
                                labelStyle={{ fontSize: 25 }}
                            ><Text style={styles.RegisterText}>Register</Text>
                            </Button>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.bottomSection}>
                    <TouchableOpacity>
                        <Button mode="text" textColor="white" onPress={() => navigation.navigate('Login')} >Already have an Account ?</Button>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

export default Register;

const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        fontFamily: 'Poppins',
    },
    content: {
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
    },
    heading: {
        fontSize: 26,
        marginTop: 20,
        fontWeight: 'bold',
        color: '#ffff',
    },
    header: {
        fontSize: 40,
        fontWeight: '700',
        color: '#ffff',
    },
    formSection: {
        width: '100%',
        paddingHorizontal: 40,
        marginTop: 10,
    },
    input: {
        marginVertical: 5,
        backgroundColor: '#ffff',
    },
    btn: {
        borderRadius: 3,
        marginTop: 15,
        padding: 6,
    },
    RegisterText: {
        fontSize: 20,
        letterSpacing: 1,
        fontWeight: '900',
    },
    bottomSection: {
        paddingHorizontal: 50,
    },
});
