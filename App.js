import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/screens/Home';
import Analytics from './src/screens/Analytics';
import History from './src/screens/History';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from './src/utils/Colors';
import Search from './src/screens/Search';
import Filter from './src/screens/Filter';
import Students from './src/screens/Students';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

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
                color={colors.tabIcons}
                size={26}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          // component={Search}
          options={{
            tabBarLabel: 'Search',
            tabBarIcon: ({focused}) => (
              <Icon
                name={focused ? 'search' : 'search-outline'}
                color={colors.tabIcons}
                size={30}
              />
            ),
          }}>
          {() => (
            <Stack.Navigator>
              <Stack.Screen
                name="Search"
                component={Search}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="Filter"
                component={Filter}
                options={{headerShown: false}}
              />
            </Stack.Navigator>
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Analytics"
          component={Analytics}
          options={{
            tabBarLabel: 'Analytics',
            tabBarIcon: ({focused}) => (
              <Icon
                name={focused ? 'analytics' : 'analytics-outline'}
                color={colors.tabIcons}
                size={30}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Students"
          component={Students}
          options={{
            tabBarLabel: 'Students',
            tabBarIcon: ({focused}) => (
              <Icon
                name={focused ? 'person-circle-sharp' : 'person-circle-outline'}
                color={colors.tabIcons}
                size={30}
              />
            ),
          }}
        />
        <Tab.Screen
          name="History"
          component={History}
          options={{
            tabBarLabel: 'History',
            tabBarIcon: ({focused}) => (
              <Icon
                name={focused ? 'time' : 'time-outline'}
                color={colors.tabIcons}
                size={30}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
