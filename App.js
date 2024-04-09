import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Home from './src/screens/Home';
import Analytics from './src/screens/Analytics';
import History from './src/screens/History';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from './src/utils/Colors';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: true,
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({focused}) => (
              <Icon
                name={focused ? 'home' : 'home-outline'}
                color={colors.primary}
                size={26}
              />
            ),
          }}
        />
        {/* <Tab.Screen
          name="Analytics"
          component={Analytics}
          options={{
            tabBarLabel: 'Analytics',
            tabBarIcon: ({focused}) => (
              <Icon
                name={focused ? 'analytics' : 'analytics-outline'}
                color={colors.primary}
                size={26}
              />
            ),
          }}
        /> */}
        <Tab.Screen
          name="History"
          component={History}
          options={{
            tabBarLabel: 'History',
            tabBarIcon: ({focused}) => (
              <Icon
                name={focused ? 'time' : 'time-outline'}
                color={colors.primary}
                size={26}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
