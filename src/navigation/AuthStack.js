import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Tabs from './Tabs';
import SplashScreen from '../../src/screens/Splashscreen';
import NewsDetails from '../../src/screens/NewsDetails';
import Register from '../../src/screens/Register';
import OnBoarding from '../../src/screens/OnBoarding';
import Login from '../../src/screens/Login';
import NewsList from '../components/lists/NewsList';
import EditProfile from '../screens/Account/EditProfile';
import Favorite from '../../src/screens/Favorite';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Newnews from '../screens/Newnews';
const AuthStack = ({...props}) => {

    const {isOnboardingDisabled} = props;
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName={isOnboardingDisabled ? 'Splash' : 'OnBoarding' }>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Home" component={Tabs} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="OnBoarding" component={OnBoarding} />
            <Stack.Screen name="NewsDetails" component={NewsDetails} />
            <Stack.Screen name='NewsList' component={NewsList} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="Favorite" component={Favorite} />
            <Stack.Screen name='Newnews' component={Newnews} />
        </Stack.Navigator>
    )
}

AuthStack.propTypes = {
    isOnboardingDisabled: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
    return {
        isOnboardingDisabled: state.auth.isOnboardingDisabled
    }
}

export default connect(mapStateToProps)(AuthStack);
