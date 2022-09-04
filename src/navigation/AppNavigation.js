/* eslint-disable prettier/prettier */
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthContext } from '../context/AuthContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from '../screens/auth/Login';
import Register from '../screens/auth/Register';
import ForgotPassword from '../screens/auth/ForgotPassword';
import Home from '../screens/frontend/Home';
import AddProduct from '../screens/frontend/AddProduct';
import Favourites from '../screens/frontend/Favourites';
import AllHouses from '../screens/frontend/AllHouses';
import Suggested from '../screens/frontend/Suggested';
import Item from '../components/Item';
import Filter from '../components/Filter';
import Account from '../screens/frontend/Account';
// import { createDrawerNavigator } from '@react-navigation/drawer';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();
// const MyDrawer = ()=>{
// return (
//     <Drawer.Navigator>
// <Drawer.Screen name="Home" component={Home} />
//     </Drawer.Navigator>
// );
// };


const MyTabs = ( ) => {
    const { isAuthenticated } = useAuthContext();
    console.log('Tab Auth' , isAuthenticated);
    let favItems = 0;
    return (<Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size, color }) => {
            let iconName;
            if (route.name === 'Home') {
                iconName = focused ? 'home-sharp' : 'home-outline';
                size = 30;
            } else if (route.name === 'AddProduct') {
                iconName = focused ? 'add-circle' : 'add-circle-outline';
                size = 40;
            } else if (route.name === 'Favourites') {
                iconName = focused ? 'heart' : 'heart-outline';
                size = 30;
            } else if (route.name === 'Account') {
                iconName = focused ? 'person-circle' : 'person-circle-outline';
                size = 30;
            }
            return <Ionicons name={iconName} size={size} color="#ffff" />;
        },
        headerShown: false,
        tabBarStyle: { backgroundColor: '#121212', height: 70, borderTopEndRadius: 13, borderTopStartRadius: 13 },
        tabBarLabelStyle: { color: '#ffff' },
        tabBarActiveBackgroundColor: 'transparent',
        tabBarActiveTintColor: '00aeef',
        tabBarItemStyle: { marginVertical: 5 },
        tabBarBadgeStyle: { backgroundColor: '#ffff', fontWeight: '900' },
    })}>
        {!isAuthenticated ? (
            <Tab.Group>
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Favourites" component={Favourites} options={{ tabBarBadge: favItems }} />
                <Tab.Screen name="Account" component={!isAuthenticated ? Login : Account} />
            </Tab.Group>
        ) : (
            <Tab.Group>
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="AddProduct" component={AddProduct} />
                <Tab.Screen name="Favourites" component={Favourites} options={{ tabBarBadge: favItems }} />
                <Tab.Screen name="Account" component={Account} initialParams={isAuthenticated} />
            </Tab.Group>
        )}

    </Tab.Navigator>);
};
const AppNavigation = () => {
    const { isAuthenticated } = useAuthContext();
    console.log('App Auth' , isAuthenticated);

    return (
        <NavigationContainer>
            <StatusBar barStyle="dark-content" translucent
                backgroundColor="#eeeeeef8" />
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!isAuthenticated ? (
                    <Stack.Group>
                        <Stack.Screen name="frontend" component={MyTabs} initialParams={isAuthenticated} />
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Register" component={Register} />
                        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                    </Stack.Group>
                ) : (
                    <Stack.Group>
                        <Stack.Screen name="frontend" component={MyTabs} initialParams={isAuthenticated} />
                    </Stack.Group>
                )}
                    <Stack.Screen name="Item" component={Item} />
                    <Stack.Screen name="AllHouses" component={AllHouses} />
                    <Stack.Screen name="Suggesetd" component={Suggested} />
                    <Stack.Screen name="Filter" component={Filter} />
                    <Stack.Screen name="Account" component={Account} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigation;


