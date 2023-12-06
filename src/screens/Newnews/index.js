import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import { CheckBox } from 'react-native-elements';
import {launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

const defaultImage = require('../../assets/onboarding/createnews.webp');
const options={
  title:'Select Image',
  type:'library',
  options:{
    maxHeight:200,
    maxWidth:200,
    selectionLimit:1,
    mediaType:'photo',
    includeBase64:false,
  },
}

const Newnews = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('0');
  const [featured, setFeatured] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState(null);

  useEffect(() => {
    if (selectedImage && selectedImage.uri) {
      const fileName = selectedImage.uri.split('/').pop();
      setImageName(fileName);
    }
  }, [selectedImage]);
  
  const openGallery = async () => {
    try {
      const images = await launchImageLibrary(options);
      if (!images.didCancel) {
        setSelectedImage(images.assets[0]); // Postavljanje odabrane slike
      }
    } catch (error) {
      console.error('Greška prilikom izbora slike:', error);
    }
  };
  

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('category', category);
      formData.append('featured', featured.toString());
  
      if (selectedImage) {
        const imageData = {
          name: imageName || 'newsphoto.png',
          type: selectedImage.type,
          uri: selectedImage.uri,
        };
        formData.append('thumbnail', imageData);
      }

      const response = await axios.post('https://newsapplication-yoft.onrender.com/api/create', formData);
      if (response.data.success) {
        Alert.alert('Success', 'Your News has been created successfully.', [
          { text: 'OK', onPress: () => {
              // Isprazni polja za unos nakon što korisnik pritisne OK
              setTitle('');
              setContent('');
              setCategory('0');
              setFeatured(false);
              setSelectedImage(null);
              setImageName(null);
            }
          }
        ]);
      } else {
        if (response.data.errorType === 'validation') {
          Alert.alert('Error', 'Please correct the errors in the form.');
        } else {
          Alert.alert('Error', 'There was a problem sending your news.');
        }
      }      
    } catch (error) {
      console.error('Errror:', error);
    }
  };

  return (
    <View style={styles.viewedit}>

      <View style={{ marginTop: 20, alignItems: 'center' }}>
      <Text>Selected news image photo:</Text>

      {selectedImage ? (
      <Image
      source={{ uri: selectedImage.uri }}
      style={{ width: 250, height: 150, resizeMode: 'cover', marginBottom:15 }}
      />
      ) : (
      <Image
      source={defaultImage}
      style={{ width: 250, height: 150, resizeMode: 'cover',marginBottom:15 }}
       />
       )}
      </View>

      <Button style={{ width: 250,marginBottom:15 }}
         title="Upload Photo" onPress={openGallery}/>
      <Text style={styles.txsyle}>Title *</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <Text style={styles.txsyle}>Content *</Text>
      <TextInput
        style={styles.input}
        value={content}
        multiline={true}
        numberOfLines={4}
        onChangeText={(text) => setContent(text)}
      />
      <Text style={styles.txsyle}>Category *</Text>
      <Picker
        selectedValue={category}
        onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
      >
        <Picker.Item label="Category *" value="0" />
        <Picker.Item label="Breaking News" value="breaking-news" />
        <Picker.Item label="Tech" value="tech" />
        <Picker.Item label="Political" value="political" />
        <Picker.Item label="Entertainment" value="entertainment" />
      </Picker>   
      <Text style={styles.txsyle}>Featured content *</Text>
      <CheckBox
       checked={featured}
       iconRight
       onPress={() => setFeatured(!featured)}
       containerStyle={styles.checkboxContainer}
      />  
      <Button title="create news" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 25,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10, 
    paddingBottom: 3,
    paddingLeft: 3
  },
  viewedit:{
    margin:20,
  },
  txsyle:{
    marginTop:15,
    color: 'red',
  },
  checkboxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    margin: 0,
    padding: 0,
    marginBottom:15,
    color:'red',
  },
});

export default Newnews;
