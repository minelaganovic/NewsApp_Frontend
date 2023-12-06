import React, { useState, useEffect } from 'react'
import { View, Text, Button , TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import Home from '../../src/screens/Home';
import Account from '../screens/Account';
import { moderateScale } from 'react-native-size-matters';
import LogoImage from './LogoImage';
import { logoutUser } from '../redux/actions/authActions';
import { connect } from 'react-redux'; 
import Newnews from '../screens/Newnews';
import Favorite from '../../src/screens/Favorite';

const Tabs = ({user,logoutUser} ) => {
    const navigation = useNavigation();
    const [selectedOption, setSelectedOption] = useState('0');
    const [pickerVisible, setPickerVisible] = useState(false);

    const handleLogout = () => {
  
        logoutUser();
        navigation.navigate('Login');
      }; 
      
      useEffect(() => {
        if (selectedOption === 'Favoritenews') {
          navigation.navigate('Favorite'); // Navigacija ka FavoriteNews ekranu
        } else if (selectedOption === 'Newnews') {
          navigation.navigate('Newnews'); // Navigacija ka Newnews ekranu
        } else if (selectedOption === 'Profile') {
          navigation.navigate('Profile'); // Navigacija ka Profile ekranu
        } 
      }, [selectedOption]);

    const Tab = createBottomTabNavigator();
     
    return (
       <Tab.Navigator
       screenOptions={{
        tabBarActiveTintColor: '#062743',
        tabBarInactiveTintColor: '#9ea9b3',
        tabBarItemStyle: {
          marginVertical: moderateScale(10),
        },
        tabBarShowLabel: false,
        headerStyle: {
            backgroundColor: 'lightblue',
          },
      }}
       >
           
        <Tab.Screen 
                name="All News" 
                component={Home} 
                options={{
                    headerLeft: () => <LogoImage />,
                    headerRight: () => (
                      <View style={{ marginRight: 10 }}>
                          <TouchableOpacity onPress={() => setPickerVisible(true)} style={{ marginRight: 10 }}>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Icon name="menu" size={30} color="black" />
                            {pickerVisible && (
                           <Picker
                            selectedValue={selectedOption}
                            style={{ height: 20, width: 150, backgroundColor: 'white', borderRadius: 20 }}
                            onValueChange={(itemValue, itemIndex) => {
                            setSelectedOption(itemValue);
                            setPickerVisible(false);
                            }}>
                           <Picker.Item label="Home" value="0" />
                           <Picker.Item label="Favorite News" value="Favoritenews" />
                           <Picker.Item label="New News" value="Newnews" />
                           <Picker.Item label="Profile" value="Profile" />
                           </Picker> )}
                           </View>
                           </TouchableOpacity>

                      </View>
                  ),
                    tabBarIcon: ({size, color}) => (
                        <Icon name="home-sharp" size={size} color={color} />
                    )
                }}
                />

        <Tab.Screen 
                name="Favorite News" 
                component={Favorite} 
                options={{
                    headerLeft: () => <LogoImage />,
                    tabBarIcon: ({size, color}) => (
                        <Icon name="heart-sharp" size={size} color={color} />
                    )
                }}
        />

            <Tab.Screen 
                name="Create new News" 
                component={Newnews} 
                options={{
                    headerLeft: () => <LogoImage />,
                    tabBarIcon: ({size, color}) => (
                        <Icon name="add-circle" size={size} color={color} />
                    )
                }}

            />
            <Tab.Screen 
                    name="Profile" 
                    component={Account} 
                    options={{
                        headerLeft: () => <LogoImage />,
                        headerRight: () => (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <Icon
                                name="exit" // Replace with your desired icon name
                                size={24}
                                color="black"
                                onPress={handleLogout}
                              />
                            </View>
                          ),
                        tabBarIcon: ({size, color}) => (
                            <Icon name="person-sharp" size={size} color={color} />
                        )
                    }}
            />
       </Tab.Navigator>
    )
}

const mapStateToProps = (state) => ({
    // Map your state properties here if needed
  });

  export default connect(mapStateToProps, { logoutUser })(Tabs); 
