/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { useAuthContext } from '../../context/AuthContext';
import login from '../../assets/images/login1.png';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Logo from '../../assets/images/logo.png';

const initialState = { email: '', password: '' };

const Login = ({ navigation }) => {

    const { dispatch } = useAuthContext();

    const [state, setState] = useState(initialState);
    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleChange = (name, value) => {
        setState(s => ({ ...s, [name]: value }));

    };
    const handleIcon = () => {
        navigation.openDrawer();
    };
    const handleLogin = () => {
        let { email, password } = state;

        if (!email.trim()) { return alert('Email is invalid'); }
        if (!password.trim()) { return alert('Password is invalid'); }

        setIsProcessing(true);

        auth()
            .signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch({ type: 'LOGIN', payload: { user } });
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
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
                    <FontAwesomeIcon icon={faBarsStaggered} size={23} color={'#000000'} />
                </TouchableOpacity>
                <Image source={Logo} style={styles.logo} />
                <TouchableOpacity onPress={() => { navigation.navigate('Account'); }}>
                    <Ionicons name="person-circle-outline" size={33} color={'#000000'} />
                </TouchableOpacity>
            </View>
            <ScrollView style={{ height: '100%' }}>
                <View style={styles.container}>
                    <View style={styles.content}>
                        <Image source={login} style={styles.image} />
                        <Text style={styles.header}>LOGIN</Text>
                        <Text style={styles.heading}>Welcome Back !</Text>
                        <View style={styles.formSection}>
                            <TextInput
                                style={styles.input}
                                mode="outlined"
                                label={'Email'}
                                onChangeText={value => handleChange('email', value)}
                                keyboardType="email-address"
                                left={<TextInput.Icon icon="at" iconColor="#000000" />}
                            />
                            <TextInput
                                style={styles.input}
                                mode="outlined"
                                label={'Password'}
                                onChangeText={value => handleChange('password', value)}
                                secureTextEntry={isPasswordShow ? false : true}
                                right={<TextInput.Icon iconColor="#000000" name={isPasswordShow ? 'eye' : 'eye-off'} onPress={() => { setIsPasswordShow(!isPasswordShow); }} />}
                                left={<TextInput.Icon icon="lock" iconColor="#000000" />}
                            />
                            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                                <Text style={[styles.text, {textAlign: 'right'}]}>Forgot Password !</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Button style={styles.btn}
                                    mode="contained"
                                    icon={'login'}
                                    loading={isProcessing} disabled={isProcessing} onPress={handleLogin}
                                ><Text style={styles.loginText}>Login</Text>
                                </Button>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.bottomSection}>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.text}>Don't have an Account?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Login;

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#fff',
        flex: 1,
    },
    image: {
        borderRadius: 10,
    },
    content: {
        alignItems: 'center',
        width: '100%',
    },
    heading: {
        fontSize: 30,
        marginTop: 30,
        fontFamily: 'Montserrat-Bold',
    },
    header: {
        marginTop: 20,
        fontSize: 40,
        fontFamily: 'Montserrat-ExtraBold',
    },
    formSection: {
        width: '100%',
        paddingHorizontal: 30,
        marginTop: 15,
    },
    input: {
        marginVertical: 10,
        fontFamily: 'Montserrat-Bold',
        fontSize: 18,
        padding: 4,
    },
    btn: {
        borderRadius: 7,
        marginTop: 15,
        padding: 6,
    },
    loginText: {
        fontSize: 20,
        letterSpacing: 1,
        color: '#ffff',
        fontFamily: 'Montserrat-Bold',
    },
    bottomSection: {
        marginVertical: 20,
        paddingHorizontal: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 15,
        fontFamily: 'Montserrat-Medium',
    },
});
