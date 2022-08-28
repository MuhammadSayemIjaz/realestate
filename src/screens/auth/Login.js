/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Bg from '../../assets/images/Bg.png';
import auth from '@react-native-firebase/auth';
import { useAuthContext } from '../../context/AuthContext';

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

        if (!email) {return alert('Email is invalid');}
        if (!password) {return alert('Password is invalid');}

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
        <ImageBackground source={Bg} style={styles.bgImage}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.header}>LOGIN</Text>
                    <Text style={styles.heading}>Welcome Back !</Text>
                    <View style={styles.formSection}>
                        <TextInput
                            style={styles.input}
                            mode="fill"
                            label={'Email'}
                            onChangeText={value => handleChange('email', value)}
                            keyboardType="email-address"
                            left={<TextInput.Icon icon="email" iconColor={'#00aeef'} />}
                        />
                        <TextInput
                            style={styles.input}
                            mode="fill"
                            label={'Password'}
                            onChangeText={value => handleChange('password', value)}
                            secureTextEntry={isPasswordShow ? false : true}
                            right={<TextInput.Icon iconColor={'#00aeef'} name={isPasswordShow ? 'eye' : 'eye-off'} onPress={() => { setIsPasswordShow(!isPasswordShow); }} />}
                            left={<TextInput.Icon icon="lock" iconColor={'#00aeef'} />}
                        />
                        <TouchableOpacity>
                            <Button style={styles.btn}
                                mode="contained"
                                icon={'login'}
                                loading={isProcessing} disabled={isProcessing} onPress={handleLogin}
                            ><Text style={styles.loginText}>Login</Text>
                            </Button>
                        </TouchableOpacity>
                        <TouchableOpacity style={{marginTop: 20}}>
                        <Button mode="text" textColor="white" onPress={()=> navigation.navigate('ForgotPassword')} >Forgot Password !</Button>
                    </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.bottomSection}>
                    <TouchableOpacity>
                        <Button mode="text" textColor="white" onPress={()=> navigation.navigate('Register')} >Don't have an Account !</Button>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

export default Login;

const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        fontFamily: 'Poppins',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        marginTop: 60,
    },
    heading: {
        fontSize: 26,
        marginTop: 30,
        fontWeight: 'bold',
        color: '#ffff',
    },
    header:{
        fontSize: 40,
        fontWeight: '700',
        color: '#ffff',
    },
    formSection: {
        width: '100%',
        paddingHorizontal: 40,
        marginTop: 30,
    },
    input: {
        marginVertical: 15,
        backgroundColor: '#ffff',
    },
    btn: {
        borderRadius: 3,
        marginTop: 15,
        padding: 6,
    },
    loginText: {
        fontSize: 20,
        letterSpacing: 1,
        fontWeight: '900',
    },
    bottomSection: {
        paddingHorizontal: 50,
        marginBottom: 20,
    },
});
