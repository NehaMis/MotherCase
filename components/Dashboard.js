import React from 'react';
import {Image, View, TouchableOpacity, Text, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// // Modules
import Profile from './Profile.js';
import Menu from './Menu.js';
import Recipe from './Recipe.js';

// Icons

 import diet from '../assets/diet.png';

// import Home from '../../assets/Home.png';
// import bmi from '../../assets/bmi.png';
// import diet from '../../assets/diet.png';
// import newUser from '../../assets/newUser.png';
// import newUserSelected from '../../assets/newUserSelected.png';


const MenuStack = createStackNavigator();

const MenuBmiNavigator = ({navigation}) => (
  <MenuStack.Navigator>
    <MenuStack.Screen
      name="Menu"
      component={Menu}
      options={{
        title: 'Menu',

        headerStyle: {
          backgroundColor: '#009FFD',
          height: 50,
        },
        headerTitleStyle: {
          alignSelf: 'center',
          color: 'white',
        },
      }}
    />
     <MenuStack.Screen
      name="Recipe"
      component={Recipe}
      options={{
        title: 'Recipe',

        headerStyle: {
          backgroundColor: '#009FFD',
          height: 50,
        },
        headerTitleStyle: {
          alignSelf: 'center',
          color: 'white',
        },
      }}
    />
  </MenuStack.Navigator>
);





const ProfileStack = createStackNavigator();

const ProfileNavigator = ({navigation}) => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name="Profile"
      component={Profile}
      options={{
        title: 'Profile',

        headerStyle: {
          backgroundColor: '#009FFD',
          height: 50,
        },
        headerTitleStyle: {
          alignSelf: 'center',
          color: 'white',
        },
      }}
    />
  </ProfileStack.Navigator>
);

const Tabs = createBottomTabNavigator();

function MyTabBar({state, descriptors, navigation}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 50,
        borderTopWidth: 1,
        //   borderTopColor: '#ccc',
        backgroundColor: '#009FFD',
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let iConName = '';
        switch (label) {
          case 'Menu':
            iConName = isFocused ? diet : diet;
            break;
          default:
            break;
        }

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
             {/* <Image source={iConName} style={{width: px(20), height: px(20)}} />  */}
            <Text style={{color: isFocused ? 'white' : '#DC6099', fontSize: 17}}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        initialRouteName="Menu"
        tabBarOptions={{
          activeTintColor: 'black',
        }}
        tabBar={(props) => <MyTabBar {...props} />}>
        <Tabs.Screen
          name="Menu"
          component={MenuBmiNavigator}
         tabBarIcon={diet}
          options={{
            tabBarLabel: 'Menu',
          }}
        />
         <Tabs.Screen
          name="Profile"
          component={ProfileNavigator}
        //  tabBarIcon={bmi}
          options={{
            tabBarLabel: 'Profile',
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};
