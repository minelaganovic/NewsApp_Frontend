import React from 'react'
import { View, Text, Image } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider';
import Ion from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';
import {connect } from 'react-redux';
import * as authActions from '../../redux/actions/authActions';
import PropTypes from "prop-types";

const Onboarding = ({...props}) => {

    const {updateOnboarding} = props;

    const navigation = useNavigation();
    const slides = [
        {
          key: "slide1",
          image: require("../../assets/onboarding/imgnews.webp"),
          title: "Get The Updated News",
          text:
            "Here you can read latest news updates. By registering to this application.",
        },
        {
          key: "slide2",
          image: require("../../assets/onboarding/readn.webp"),
          title: "Read News",
          text:
            "Read news at anywhere at any place just by connecting to the internet.",
        },
        {
          key: "slide3",
          image: require("../../assets/onboarding/createnews.webp"),
          title: "Create New News",
          text: "Create your new news to share on app.",
        },
      ];

      const _renderItem = ({ item }) => {
          return (
              <View style={styles().slide}>
                  <View style={styles().titleContainer}>
                      <Text style={styles().title}>
                          {item.title}
                      </Text>
                  </View>

                  <View style={styles().imageContainer}>
                      <Image source={item.image} style={styles().image} />
                  </View>

                  <View style={styles().textContainer}> 
                      <Text style={styles().text}>
                          {item.text}
                      </Text>
                  </View>
              </View>
          )
      }


    const _renderNextButton = () => {
        return (
            <View style={styles().buttonCircle}>
                <Ion name="arrow-forward-outline" color="rgba(255,255,255, .9 )" size={24} />
            </View>
        )
    }
    
    const _renderDoneButton = () => {
        return (
            <View style={styles().buttonCircle}>
                <Ion name="md-checkmark" color="rgba(255,255,255, .9 )" size={24} />
            </View>
        )
    }

    const _renderSkipButton = () => {
        return (
            <View style={styles().skipView}>
               <Text style={styles().skipTextColor}>Skip</Text>
            </View>
        )
    }
    
    const _onEndReached = () => {
        updateOnboarding(true);
        navigation.navigate('Login');
    }

    return (
       <AppIntroSlider
            data={slides}
            renderItem={_renderItem}
            renderDoneButton={_renderDoneButton}
            renderNextButton={_renderNextButton}
            renderSkipButton={_renderSkipButton}
            onDone={_onEndReached}
            onSkip={_onEndReached}
            dotClickEnabled={true}
            showNextButton={true}
            showDoneButton={true}
            showSkipButton={true}
        />

    )
}

Onboarding.propTypes = {
    isOnboardingDisabled: PropTypes.bool.isRequired,
    updateOnboarding: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        isOnboardingDisabled: state.auth.isOnboardingDisabled
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateOnboarding: (status) => dispatch(authActions.updateOnboarding(status))
});

export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);

