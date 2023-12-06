import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,TouchableOpacity,
  Image,
  View,
  Text,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useFavorites from '../../hooks/useFavorites';
import newsApi from '../../api/newsApi';
import HorizotalList from '../../components/lists/HorizotalList';
import Close from '../../components/common/Close';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const NewsDetails = ({ route }) => {
  const [news, setNews] = useState({});
  const [relatedNews, setRelatedNews] = useState([]);
  const { id: postId, category: postCategory } = route.params.item;

  const navigation = useNavigation();

  const { favorites, addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const isPostFavorite = isFavorite(postId);

  const fetchPost = async id => {
    const result = await newsApi.getSingle(id);
    setNews(result);
  };
  const handleFavorite = () => {
    if (isPostFavorite) {
      removeFromFavorites(postId);
      AsyncStorage.setItem('favorites', JSON.stringify([...favorites.filter((item) => item.id !== postId)]));
    } else {
      // Dodajemo URL slike uz vest koja se dodaje u omiljene
      addToFavorites({ ...news, image: news.thumbnail }); // Pretpostavka da se URL slike nalazi u news.thumbnail
      AsyncStorage.setItem('favorites', JSON.stringify([...favorites, { ...news, image: news.thumbnail }]));
    }
  };
  

  const fetchRelatedPosts = async category => {
    const result = await newsApi.getByCategory(postCategory, 6);
    setRelatedNews(result.filter(item => item.id !== postId));
  };

  useEffect(() => {
    fetchPost(postId);
    fetchRelatedPosts(postCategory);
  }, []);

  const { title, content, thumbnail } = news;
  return (
    <>
      <ScrollView>
      {thumbnail && (
      <Image style={styles.image} source={{ uri: thumbnail }} />
      )}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.content}>{content}</Text>
          <View style={styles.container}>
        <TouchableOpacity onPress={handleFavorite} style={styles.likeButton}>
        <AntDesign
          name={isPostFavorite ? 'heart' : 'hearto'}
          size={25}
          style={styles.icon}
          color={isPostFavorite ? 'red' : 'black'}
        />
        </TouchableOpacity>
        </View>
        </View>
        <View style={styles.relatedPostContainer}>
          <HorizotalList data={relatedNews} title='Related Posts' />
        </View>
        
      </ScrollView>
      
      <Close onPress={() => navigation.popToTop()} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end', 
    position:'relative',
    marginVertical: 20
  },
  image: {
    width: width,
    height: height / 3,
  },
  contentContainer: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  icon: {
    marginRight:10,
    padding: 10,
    borderRadius: 50,
  },
  content: {
    fontSize: 16,
    color: '#4e4d4d',
  },
  relatedPostContainer: {
    padding: 10,
  },
});

export default NewsDetails;
