/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Image, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { useAuthContext } from '../../context/AuthContext';
import login from '../../assets/images/login1.png';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';

const initialState = { email: '', password: '' };

const Login = ({ navigation }) => {

    const { dispatch } = useAuthContext();

    const [state, setState] = useState(initialState);
    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleChange = (name, value) => {
        setState(s => ({ ...s, [name]: value }));

    };

    const handleLogin = () => {
        let { email, password } = state;

        if (!email) { return alert('Email is invalid'); }
        if (!password) { return alert('Password is invalid'); }

        setIsProcessing(true);

        auth()
            .signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                dispatch({ type: 'LOGIN', payload: { user } });
                console.log('User account created & signed in!');
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
            <ScrollView style={{height: '100%'}}>
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
                            left={<TextInput.Icon icon="lock"  iconColor="#000000"/>}
                        />
                        <TouchableOpacity>
                            <Button style={styles.btn}
                                mode="contained"
                                icon={'login'}
                                loading={isProcessing} disabled={isProcessing} onPress={handleLogin}
                            ><Text style={styles.loginText}>Login</Text>
                            </Button>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.bottomSection} onPress={() => navigation.navigate('ForgotPassword')}>
                            <Text style={styles.text}>Forgot Password !</Text>
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
    safeArea:{
        backgroundColor: '#fff',
        flex: 1,
    },
    image: {
        borderRadius: 10,
    },
    content: {
        alignItems: 'center',
        width: '100%',
        marginTop: 30,
    },
    heading: {
        fontSize: 30,
        marginTop: 30,
        fontFamily: 'Montserrat-Bold',
    },
    header: {
        marginTop: 30,
        fontSize: 40,
        fontFamily: 'Montserrat-ExtraBold',
    },
    formSection: {
        width: '100%',
        paddingHorizontal: 30,
        marginTop: 30,
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
        marginTop: 30,
        paddingHorizontal: 50,
        justifyContent: 'center',
        alignItems:'center',
    },
    text: {
        fontSize: 15,
        fontFamily: 'Montserrat-Medium',
    },
});
