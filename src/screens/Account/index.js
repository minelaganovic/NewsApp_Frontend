import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image } from 'react-native';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/authActions';
import { useNavigation } from '@react-navigation/native';
import logonews from '../../assets/users.png';

const fetchUserData = async () => {
  try {
    //http://10.0.2.2:3000/api/users/profile......https://newsapplication-yoft.onrender.com/
    const response = await fetch('https://newsapplication-yoft.onrender.com/api/users/profile');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Greška pri učitavanju podataka korisnika: ', error);
    return null;
  }
}

const Accounts = ({ user, logoutUser }) => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(user);

  useEffect(() => {
    const loadUserData = async () => {
      const data = await fetchUserData(); 
      if (data) {
        setUserData(data);
      }
    };

    loadUserData();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom:30 }}>
      {user.avatar ? (
        <Image source={{ uri: user.avatar, width: 150, height: 150, borderRadius: 50,paddingBottom:30 }} />
      ) : (
        <Image source={logonews} style={{ width: 150, height: 150, borderRadius: 50, paddingBottom:30}} />
      )}
      <Text style={{ paddingBottom:10 }} >Email: {user.email}</Text>
      <Text style={{ paddingBottom:10 }} >Name: {user.name}</Text>
      <Button title="Edit Profile" onPress={() => navigation.navigate('EditProfile')}/>
    </View>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { logoutUser })(Accounts);
