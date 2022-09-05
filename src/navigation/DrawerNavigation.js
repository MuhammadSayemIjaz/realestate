/* eslint-disable prettier/prettier */
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MyTabs } from './AppNavigation';
import { useAuthContext } from '../context/AuthContext';
import Favourites from '../components/Favourites';
import Account from '../screens/frontend/Account';
import AddProduct from '../screens/frontend/AddProduct';
import Filter from '../components/Filter';
import Login from '../screens/auth/Login';
import CustomDrawer from '../components/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
    const { isAuthenticated } = useAuthContext();
    return (
            <Drawer.Navigator
                drawerContent={props => <CustomDrawer {...props} />}
                screenOptions={{
                    headerShown: false,
                    drawerActiveBackgroundColor: '#00000031',
                    drawerActiveTintColor: '#000000',
                    drawerInactiveTintColor: '#333',
                    drawerLabelStyle: {
                        marginLeft: -20,
                        fontFamily: 'Montserrat-Medium',
                        fontSize: 20,
                    },
                }}>
                <Drawer.Group screenOptions={{headerShown: false}}>
                    <Drawer.Screen
                        name="Home"
                        component={MyTabs}
                        options={{
                            drawerIcon: ({ focused, color }) => (
                                <Ionicons name={focused ? 'home-sharp' : 'home-outline'} size={30} color={color} />
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
                        component={isAuthenticated ? Account : Login}
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
                </Drawer.Group>
            </Drawer.Navigator>
    );
};

export default DrawerNavigation;
