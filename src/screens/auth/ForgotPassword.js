/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import ResetPass from '../../assets/images/ResetPass.png';

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSend = () => {
        setIsProcessing(true);
        if (!email) {
            setIsProcessing(false);
            // return (Toast.show({
            //     type: 'error',
            //     text1: "Invalid Email",
            //     text2: 'Enter Your Email',
            //     position: 'top',
            //     visibilityTime: 3000,
            //     bottomOffset: 30,
            // }))
        }
        auth().sendPasswordResetEmail(email).then(() => {
            setIsProcessing(false);
            // Toast.show({
            //     type: 'success',
            //     text1: "Email Send",
            //     text2: 'Please Check Your Email Address',
            //     position: 'top',
            //     visibilityTime: 2000,
            //     bottomOffset: 30
            // })
            navigation.navigate('SignIn');
        }).catch(err => console.log(err));
    };
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Image source={ResetPass} style={{alignItems: 'center'}}/>
                    <Text style={styles.header}>Forgot Password</Text>
                    <Text style={[styles.text, {paddingTop: 20, paddingHorizontal: 30, fontFamily: 'Montserrat-Light'}]}>Don't worry! It happens. Please enter the Email Address Associated with your account. </Text>
                    <View style={styles.formSection}>
                        <TextInput
                            style={styles.input}
                            mode="outlined"
                            label={'Email'}
                            onChangeText={(value) => setEmail(value)}
                            keyboardType="email-address"
                            left={<TextInput.Icon icon="at" iconColor="#000000" />}
                        />
                        <TouchableOpacity>
                            <Button style={styles.btn}
                                mode="contained"
                                icon={'send'}
                                loading={isProcessing} disabled={isProcessing} onPress={handleSend}
                            ><Text style={styles.loginText}>Login</Text>
                            </Button>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.bottomSection}>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.text}>Back to Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ForgotPassword;

const styles = StyleSheet.create({
    safeArea:{
        backgroundColor: '#fff',
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        alignItems: 'center',
        width: '100%',
        marginTop: 60,
    },
    header: {
        marginTop: 30,
        fontSize: 55,
        color: '#000000',
        fontFamily: 'Montserrat-Bold',
    },
    formSection: {
        width: '100%',
        paddingHorizontal: 40,
        marginTop: 10,
        marginBottom: 20,
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
        marginTop: 20,
        paddingHorizontal: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#000000',
        fontSize: 17,
        fontFamily: 'Montserrat-Medium',
    },
});
