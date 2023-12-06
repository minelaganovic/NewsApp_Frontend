import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  container: {},

  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    marginTop: 10,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  icon: {
    marginRight: 10,
  },
});
