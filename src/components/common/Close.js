import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const Close = ({ onPress }) => {
    const navigation = useNavigation();
    const handleClose = () => {
      navigation.navigate('Home');
    };
  return (
    <View style={styles.container}>
      <AntDesign
        name='close'
        size={25}
        color='black'
        style={styles.icon}
        onPress={handleClose}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-end', 
    position: 'absolute',
    top: 0,
    right: 0, 
    marginVertical: 20,
  },
  icon: {
    backgroundColor: 'rgba(113, 216, 230, 0.7)',
    marginRight:10,
    padding: 10,
    borderRadius: 50,
  },
  
});

export default Close;
