/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import ForgotPassword from '../screens/auth/ForgotPassword';
import { StatusBar } from 'react-native';
import Home from '../screens/frontend/Home';
import AddProduct from '../screens/frontend/AddProduct';
import Favourites from '../screens/frontend/Favourites';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MyTabs = () => {
    return (<Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
            let iconName;
            if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
                size = 20;
            } else if (route.name === 'AddProduct') {
                iconName = focused ? 'add' : 'add-outline';
                size = 30;
            } else if (route.name === 'Favourites') {
                iconName = focused ? 'heart' : 'heart-outline';
                size = 20;
            } 
            return <Ionicons name={iconName} size={size} color='#ffff' />
        },
        headerShown: false,
        tabBarStyle: {backgroundColor: '#00aeef' , borderTopStartRadius: 10,borderTopEndRadius: 10,},
        tabBarLabelStyle: {color: '#ffff'},
        tabBarActiveBackgroundColor: '#48cae4',
        tabBarItemStyle: {borderTopStartRadius: 7 , borderTopEndRadius: 7},
        tabBarShowLabel: false,
    })}>
        <Tab.Screen name="Home" component={Home}/>
        <Tab.Screen name="AddProduct" component={AddProduct}/>
        <Tab.Screen name="Favourites" component={Favourites} options={{tabBarBadge: 3}}/>
    </Tab.Navigator>);
};
const AppNavigation = () => {
    return (
        <NavigationContainer>
            <StatusBar  barStyle="light-content"
                backgroundColor="#023e8a" />

            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Group>
                    <Stack.Screen name="frontend" component={MyTabs} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Register" component={Register} />
                    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;


