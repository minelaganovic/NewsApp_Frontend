import React from 'react';
import { Image } from 'react-native';

const LogoImage = () => {
  return (
    <Image
      source={require('../assets/logonws.png')} 
      style={{ width: 80, height: 50 }}
    />
  );
};

export default LogoImage;
