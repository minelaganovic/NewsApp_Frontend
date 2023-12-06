import EStyleSheet from 'react-native-extended-stylesheet';
import constants from '../../constants';

console.log(constants);
const { THEME: {primary, secondary} } = constants;

export const styles = () =>
    EStyleSheet.create({
          slide: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: 'lightblue',
          },
          titleContainer: {
            flex: 1,
            justifyContent: "flex-end",
            paddingStart: "8%",
            paddingRight: "8%",
          },
          title: {
            color: secondary,
            fontSize: 25,
            fontWeight: "bold",
            textAlign: "center",
          },
          imageContainer: {
            flex: 3,
            justifyContent: "center",
          },
          image: {
            width: 300,
            height: 300,
            resizeMode: "contain",
          },
          textContainer: {
            flex: 1,
            justifyContent: "flex-start",
            paddingStart: "8%",
            paddingRight: "8%",
          },
      
          text: {
            textAlign: "center",
            fontWeight: "bold",
            color:"#ffff",
          },
          buttonCircle: {
            width: 40,
            height: 40,
            backgroundColor: "rgba(0, 0, 0, .2)",
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          },
          skipTextColor: {
            color: primary,
            fontWeight: "bold",
          },
          skipView: {
            width: 40,
            height: 40,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          },
    })
