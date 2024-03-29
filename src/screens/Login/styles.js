import { Dimensions } from 'react-native';
import EstyleSheet from 'react-native-extended-stylesheet';
import { moderateScale } from 'react-native-size-matters';

export const styles = (background, text, lightGray5, primary, dark) => 
    EstyleSheet.create({
        loginMain: {
            flex: 1,
            backgroundColor: background||'lightblue',
            paddingLeft: moderateScale(20),
            paddingRight: moderateScale(20)
        },
        headerContainer: {
            height: Dimensions.get('window').height/4, justifyContent: 'center'
        },
        welcomeText: {
            fontSize: moderateScale(30),
            fontWeight: 'bold',
            color: text
        },
        signInText: {
            color: lightGray5,
            fontSize: moderateScale(25),
            marginTop: moderateScale(-60),
            letterSpacing: 0.5,
            fontWeight: 'bold'
        },
        formContainer: {
            backgroundColor: background||'lightblue',
            borderRadius: moderateScale(8),
            paddingHorizontal: moderateScale(10),
            height: moderateScale(285),
        },
        inputContainer: {
            placeholderTextColor: lightGray5 
        },
        wrapper: {
            marginTop: moderateScale(30)            
        },

        input: {
            height: moderateScale(55),
            color: text,
            borderWidth: moderateScale(1),
            borderColor: lightGray5,
            borderRadius: moderateScale(8),
            paddingHorizontal: moderateScale(10),
            fontWeight: 'bold'
        },
        forgotPasswordContainer: {
            alignItems: 'flex-end'
        },
        forgotPasswordText: {
            fontSize: moderateScale(12)
        },
        btnContainer: {
            marginTop: '10%'
        },
        footerContainer: {
            height: Dimensions.get('window').height/5,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        },
        footerContainerInner: {
            flexDirection: 'row'
        },
        signText: {
            marginLeft: moderateScale(5),
            color: dark ? text : primary
        }
    });
