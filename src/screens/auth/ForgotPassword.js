/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Bg from '../../assets/images/Bg.png';
import auth from '@react-native-firebase/auth';

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [isProcess, setIsProcess] = useState(false);
    const handleSend = () => {
        setIsProcess(true)
        if (!email) {
            setIsProcess(false)
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
            setIsProcess(false);
            // Toast.show({
            //     type: 'success',
            //     text1: "Email Send",
            //     text2: 'Please Check Your Email Address',
            //     position: 'top',
            //     visibilityTime: 2000,
            //     bottomOffset: 30
            // })
            navigation.navigate('SignIn');
        }).catch(err => console.log(err))



    }


    return (
        <ImageBackground source={Bg} style={styles.bgImage}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.header}>Forgot Password</Text>
                    <View style={styles.formSection}>
                        <TextInput
                            style={styles.input}
                            mode="fill"
                            label={'Email'}
                            keyboardType="email-address"
                            left={<TextInput.Icon icon="email" iconColor={'#00aeef'} />}
                        />
                        <TouchableOpacity
                        onPress={handleSend}>
                            <Button style={styles.btn}
                                mode="contained"
                                icon={'email-send'}
                                labelStyle={{ fontSize: 20, fontWeight: '900' }}
                            >Send
                            </Button>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.bottomSection}>
                    <TouchableOpacity>
                        <Button mode='text' textColor='white' labelStyle={{ fontSize: 20 }} onPress={() => navigation.navigate('Login')} >Back to Login ?</Button>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

export default ForgotPassword;

const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        fontFamily: 'Poppins',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        width: '100%',
        marginTop: 60,
    },
    header: {
        fontSize: 30,
        fontWeight: "700",
        color: "#ffff",
        textAlign: 'center',
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

    bottomSection: {
        marginTop: 60,
        paddingHorizontal: 50,
    },
});
