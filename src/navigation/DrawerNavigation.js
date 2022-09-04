/* eslint-disable prettier/prettier */
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MyTabs } from './AppNavigation';
import { useAuthContext } from '../context/AuthContext';
import Home from '../screens/frontend/Home';
import Favourites from '../screens/frontend/Favourites';
import Account from '../screens/frontend/Account';
import AddProduct from '../screens/frontend/AddProduct';
import Filter from '../components/Filter';
import Login from '../screens/auth/Login';
import CustomDrawer from '../components/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
    const { user ,isAuthenticated } = useAuthContext();
    console.log(user?.email);
    return (
        <NavigationContainer>
            <StatusBar barStyle="dark-content" translucent
                backgroundColor="#eeeeeef8" />
            <Drawer.Navigator
                drawerContent={props => <CustomDrawer {...props} />}
                screenOptions={{
                    headerShown: false,
                    drawerActiveBackgroundColor: '#000000',
                    drawerActiveTintColor: '#fff',
                    drawerInactiveTintColor: '#333',
                    drawerLabelStyle: {
                        marginLeft: -20,
                        fontFamily: 'Montserrat-Medium',
                        fontSize: 20,
                    },
                }}>
                <Drawer.Screen
                    name="Home"
                    component={MyTabs}
                    options={{
                        drawerIcon: ({ focused, color }) => (
                            <Ionicons name={focused ? 'home' : 'home-outline'} size={30} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Favourites"
                    component={isAuthenticated ? Favourites : Login}
                    options={{
                        drawerIcon: ({ focused, color }) => (
                            <Ionicons name={focused ? 'heart' : 'heart-outline'} size={30} color={color} />
                        ),
                    }}
                />
                <Drawer.Screen
                    name="Account"
                    component={Account}
                    options={{
                        drawerIcon: ({ focused, color }) => (
                            <Ionicons name={focused ? 'person-circle' : 'person-circle-outline'} size={30} color={color} />
                        ),
                    }}
                />
                {isAuthenticated && <Drawer.Screen
                    name="AddProduct"
                    component={AddProduct}
                    options={{
                        drawerLabel: 'Add Property',
                        drawerIcon: ({ focused, color }) => (
                            <Ionicons name={focused ? 'add-circle' : 'add-circle-outline'} size={30} color={color} />
                        ),
                    }}
                />}
                <Drawer.Screen
                    name="Filter"
                    component={Filter}
                    options={{
                        drawerIcon: ({ focused, color }) => (
                            <Ionicons name={focused ? 'options' : 'options-outline'} size={30} color={color} />
                        ),
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default DrawerNavigation;
