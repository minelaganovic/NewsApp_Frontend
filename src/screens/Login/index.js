import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity,Image, ActivityIndicator, } from 'react-native';
import { styles } from './styles';
import { useTheme } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { scale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';
import { Formik, Field } from 'formik';
import { loginUser } from '../../api/Auth';
import {showSnackBar} from '../../utils/SnackBar.js';
import { connect } from 'react-redux';
import * as authActions from '../../redux/actions/authActions';
import PropTypes from 'prop-types';
import {setTokenInterceptor} from '../../utils/setTokenInterceptor.js';
import axios from 'axios';

const signInValidationSchema = yup.object().shape({
    email: yup.string()
        .email('Please enter a valid email')
        .required('Email is requred'),
    password: yup.string().required('Password is required')
});


const Login = ({...props}) => {

    const {updateUserLogin, updateUserAccessToken, user, isLoggedIn } = props;

    const navigation = useNavigation();

    const [showSpinner, setShowSpinner] = useState(false);
    const [showPassword, setShowPassword] = useState(true);

    const { colors: { background, text, lightGray5, card, secondary, primary }, dark } = useTheme();

    useEffect(() => {
    }, []);

    return (
        <View style={styles(background).loginMain}>
            <ScrollView showsHorizontalScrollIndicator={false}>
            <View style={styles().headerContainer}>
           <Image source={require('../../assets/logonws.png')} style={{ width: 110, height: 100 }} />
           <Text style={[styles(background, text, lightGray5).signInText, { alignSelf: 'center' }]}>
            SIGN IN 
        </Text>
        </View>

                <View style={styles().formContainer}>
                    <Formik
                        validationSchema={signInValidationSchema}
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                        onSubmit={async (values) => {
                          setShowSpinner(true);
                          console.log("values ", values);
                          try {
                              const res = await loginUser(values);
                              console.log("Response ", res);
                              setShowSpinner(false);
                              if (res) {
                                  navigation.navigate('Home');
                                  updateUserLogin(res, true);
                                  updateUserAccessToken(res.token);
                                  showSnackBar('Successfully LoggedIn');
                                  setTokenInterceptor(res);
                                  console.log("User coming from state", user);
                                  console.log("isLoggedIn coming from state", isLoggedIn);
                              } else {
                                  // Obrada slučaja kada odgovor nije došao od servera
                                  console.error('No response received from the server');
                              }
                          } catch (err) {
                              // Obrada greške
                              if (err.response && err.response.data && err.response.data.msg) {
                                  console.error("Error", err.response.data.msg);
                                  showSnackBar(err.response.data.msg, 'ERROR');
                              } else {
                                  console.error("Error", err);
                                  showSnackBar('An error occurred', 'ERROR');
                              }
                              setShowSpinner(false);
                          }
                      }}
                      >
                        {({ handleSubmit, isValid, values, errors, handleChange, touched }) => (

                            <>
                                <View style={styles().inputContainer}>
                                    <View style={styles().wrapper}>
                                        <TextInput
                                            style={styles(background, text, lightGray5).input}
                                            placeholder="Enter Email"
                                            keyboardType="email-address"
                                            name="email"
                                            onChangeText={handleChange('email')}
                                        />
                                        {(errors.email && touched.email) &&
                                            <Text style={{ fontSize: 10, color: 'red', marginTop: scale(5) }}> {errors.email}</Text>}
                                    </View>

                                    <View style={styles().wrapper}>
                                        <View style={styles(background, text, lightGray5).input}>

                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                    <TextInput
                                                        placeholder="Enter Password"
                                                        secureTextEntry={showPassword}
                                                        style={{ height: scale(50), color: text }}
                                                        name="password"
                                                        onChangeText={handleChange('password')}
                                                    />

                                                <TouchableOpacity 
                                                    onPress={() => setShowPassword(prevState => !prevState)}
                                                    style={{ alignSelf: 'center' }}>
                                                    <Icon name={showPassword ? 'key-outline' : 'key'} size={20} color={text} />
                                                </TouchableOpacity>
                                            </View>
                                             {(errors.password && touched.password) &&
                                                        <Text style={{ fontSize: 10, color: 'red',marginTop: scale(5) }}>{errors.password}</Text>}
                                        </View>
                                    </View>

                                    <View style={styles().forgotPasswordContainer}>
                                        <TouchableOpacity>
                                            <Text style={styles().forgotPasswordText}>
                                                Forgot Password
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles().btnContainer}>
                                    <TouchableOpacity
                                        onPress={handleSubmit}
                                        style={{ backgroundColor: dark ? card : secondary, height: scale(50), borderRadius: scale(10), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: '#fff', marginLeft: scale(5) }}>
                                            Login
                                        </Text>
                                        {showSpinner && (<ActivityIndicator color={'#fff'} />)}
                                    </TouchableOpacity>
                                </View>

                            </>
                        )}
                    </Formik>
                </View>
                <View style={styles().footerContainer}>
                    <View style={styles().footerContainerInner}>
                        <Text style={styles().newUserText}>
                            I am new user,
                        </Text>

                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={{color: 'darkblue'}}> Sign Up</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate('OnBoarding')}>
                        <Text style={{ color: 'darkblue' }}>
                            Skip
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

Login.propTypes = {
    user: PropTypes.object.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    updateUserLogin: PropTypes.func.isRequired,
    updateUserAccessToken: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        isLoggedIn: state.auth.isLoggedIn
    }
}

const mapDispatchToProps = (dispatch) => ({
    updateUserLogin: (user, isLoggedIn) => dispatch(authActions.updateUserLogin(user, isLoggedIn)),
    updateUserAccessToken: (token) => dispatch(authActions.updateUserAccessToken(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
