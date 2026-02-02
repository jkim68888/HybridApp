import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ShoppingScreen from './screens/ShoppingScreen';
import BrowserScreen from './screens/BrowserScreen';
import { RouteNames, RootStackParams } from './routes';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParams>();

const HomeTab = () => {
  return (
    <Tab.Navigator 
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        headerShown: false,
      }}>
      <Tab.Screen 
        name={RouteNames.HOME} 
        component={HomeScreen} 
        options={{ 
          title: '홈',
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="house" size={26} color={color} iconStyle="solid" />
          ) 
        }} 
      />
      <Tab.Screen 
        name={RouteNames.SHOPPING} 
        component={ShoppingScreen} 
        options={{ 
          title: '쇼핑',
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="cart-shopping" size={26} color={color} iconStyle="solid" />
          ) 
        }} 
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name={RouteNames.Home_Tab} 
          component={HomeTab} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name={RouteNames.BROWSER} 
          component={BrowserScreen} 
          options={{ headerBackTitleVisible: false }} 
        /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
