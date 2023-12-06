import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import Tabs from './Tabs';
import SplashScreen from '../../src/screens/Splashscreen';
import Favorite from '../../src/screens/Favorite';
import NewsDetails from '../../src/screens/NewsDetails';
import NewsList from '../components/lists/NewsList';
import EditProfile from '../screens/Account/EditProfile';
import Newnews from '../screens/Newnews';

const MainStack = () => {

    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="Splash">
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Tabs" component={Tabs} />
            <Stack.Screen name="NewsDetails" component={NewsDetails} />
            <Stack.Screen name='NewsList' component={NewsList} />
            <Stack.Screen name='Favorite' component={Favorite} />
            <Stack.Screen name='Newnews' component={Newnews} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
        </Stack.Navigator>
    )
}


export default MainStack;
