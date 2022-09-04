/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
} from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import { useAuthContext } from '../context/AuthContext';
import { Button } from 'react-native-paper';

const CustomDrawer = (props, {navigation}) => {
    const { dispatch, user, isAuthenticated } = useAuthContext();
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
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{}}>
                <View style={{ height: 110, width: '100%', borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                    <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Ionicons name="person-circle-outline" size={70} />
                        {isAuthenticated ? <View>
                            <Text style={{ fontFamily: 'Poppins-Bold' }}> {user?.email}</Text>
                            <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 10 }}> {user?.email}</Text>
                        </View> : <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Login')}>
                            <Button mode="contained" style={{ backgroundColor: '#333333d1', marginLeft: 20}}  labelStyle={{ fontFamily: 'Montserrat-Bold'}} icon={'login'}> Login </Button>
                        </TouchableOpacity>
                        }
                    </View>
                </View>
                <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 20 }}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
                <TouchableOpacity onPress={() => { }} style={{ paddingVertical: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="share-social-outline" size={30} />
                        <Text
                            style={{
                                fontSize: 20,
                                fontFamily: 'Montserrat-Medium',
                                marginLeft: 10,
                            }}>
                            Tell a Friend
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSignOut} style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="exit-outline" size={30} />
                        <Text
                            style={{
                                fontSize: 20,
                                fontFamily: 'Montserrat-Medium',
                                marginLeft: 10,
                            }}>
                            Sign Out
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CustomDrawer;
