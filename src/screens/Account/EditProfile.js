import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image ,StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { updateUserProfile } from '../../api/Auth';
import { useNavigation } from '@react-navigation/native';
import logonews from '../../assets/users.png';


const EditProfile = ({ user, error, updateUserProfile }) => {
  const navigation = useNavigation();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState(user.avatar);

  const handleSaveProfile = () => {
    updateUserProfile({
      name,
      email,
      avatar,
    });
    navigation.navigate('Account');

  };

  return (
    <View style={styles.container}>
      <Text>Click on the text and edit the data</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}

      <Image source={logonews} style={styles.avatar} />
      <Text>Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Text>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <Button title="Save" onPress={handleSaveProfile} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
  },
  errorText: {
    color: 'red',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 50,
    paddingBottom: 30,
  },
  input: {
    height: 25, // Visina polja
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10, 
    paddingBottom: 3,
    paddingLeft: 3
  },
});

const mapStateToProps = (state) => ({
  user: state.auth.user,
  error: state.auth.error,
});

export default connect(mapStateToProps, { updateUserProfile })(EditProfile);
