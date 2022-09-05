/* eslint-disable prettier/prettier */
import React, { createContext, useReducer, useContext } from 'react';
import { ToastAndroid } from 'react-native';
const FavContext = createContext();
const FavReducer = (state, action) => {

    const { favHouses } = state;

    let product;

    switch (action.type) {

        case 'ADD_TO_FAV':

            const check = favHouses.find((product) => product.uid === action.id);
            if (check) {
                ToastAndroid.show('This House is Already in your Wishlist', ToastAndroid.SHORT);
                return state;
            }
            else {
                product = action.item;
                ToastAndroid.show('This House is Added To Your Wishlist', ToastAndroid.SHORT);
                return ({
                    favHouses: [product, ...favHouses],

                }

                );
            }



        case 'DELETE':
            const filtered = favHouses.filter((product) => product.uid !== action.id);
            product = action.item;
            ToastAndroid.show('House remove from your Wishlist', ToastAndroid.SHORT);
            return {
                favHouses: [...filtered],
            };


        case 'EMPTY':
            ToastAndroid.show('All Data Remove from your Wishlist', ToastAndroid.SHORT);

            return {
                favHouses: [],
            };

        default:
            return state;

    }

};
export const FavouriteContextProvider = (props) => {

    const [state, dispatch] = useReducer(FavReducer, { favHouses: [] });

    return (
        <FavContext.Provider value={{ ...state, dispatch }}>
            {props.children}
        </FavContext.Provider>
    );
};
export const useFavContext = () => {
    return useContext(FavContext);
};
