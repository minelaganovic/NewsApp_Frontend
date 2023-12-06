import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useState, useEffect } from 'react'
import { View, Text, Image } from 'react-native'
import { connect } from 'react-redux';
import { styles } from './styles';
import PropTypes from 'prop-types';
import { setTokenInterceptor } from '../../utils/setTokenInterceptor';

const SplashScreen = (props) => { // Dodamo 'props' kao parametar

    const { isLoggedIn, user } = props; // Pristupamo'props' objektu

    const [isVisible, setIsVisible] = useState(true);
    const navigation = useNavigation();

    const theme = useTheme();
    const { background, dark } = theme;

    const hideSplashScreen = () => {
        setIsVisible(false);
    }

    useEffect(() => {
        setTimeout(() => {
            if (isLoggedIn) {
                setTokenInterceptor(user);
            }
            hideSplashScreen();
           navigation.navigate(isLoggedIn ? 'Home' : 'Login');
           //navigation.navigate('OnBoarding');
                }, 1000);
    }, []);

    const renderSplash = () => {
        return (
            <View style={styles().SplashScreen_RootView}>
                <View style={styles().SplashScreen_ChildView}>
                    <Image source={dark ? require('../../assets/logonews.png') : require('../../assets/logonws.png')}
                        style={{ width: 390, height: 390, resizeMode: "contain" }} />
                </View>
            </View>
        )
    }

    return (
        <View style={styles(background).MainContainer}>
            {isVisible === true ? renderSplash() : null}
        </View>
    )
}
SplashScreen.defaultProps = {
    isLoggedIn: false,
    user: {},
  };

SplashScreen.propTypes = {
    user: PropTypes.object.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
  });

const mapDispatchToProps = (dispatch) => { return {} }

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
