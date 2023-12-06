import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites !== null) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.log('Error loading favorites', error);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const removeFromFavorites = async (postId) => {
    try {
      const updatedFavorites = favorites.filter((item) => item.id !== postId);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    } catch (error) {
      console.log('Error removing from favorites', error);
    }
  };

  const renderCard = ({ item }) => {
    return (
        <View style={styles.card}>
        {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
        <Text style={styles.title}>{item.title}</Text>
        <TouchableOpacity onPress={() => removeFromFavorites(item.id)}>
          <Text style={styles.txtt} >Remove from Favorites</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCard}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 5,
  },
  txtt:{
    backgroundColor:'red',
    borderRadius: 5,
    textAlign:'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Favorites;
