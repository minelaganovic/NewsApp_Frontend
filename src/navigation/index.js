import { View, Text } from 'react-native'
import React from 'react'
import AuthStack from './AuthStack';
import { NavigationContainer } from '@react-navigation/native';
import constants from '../constants';
import { useState, useEffect } from 'react';
import axios from 'axios';

const {MyLightTheme, BASE_URL} = constants;

const RootNavigation = () => {
    const setUrlConfig = () => {
       console.log("called setUrlConfig");
       axios.defaults.baseURL = BASE_URL;
     };
    
    useEffect(() => {
        setUrlConfig();
      }, []);

    return (
        <NavigationContainer theme={MyLightTheme}>
            <AuthStack />
        </NavigationContainer>
    )
}

export default RootNavigation;