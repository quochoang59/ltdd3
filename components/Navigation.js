import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookView from './BookScreen';
import AddBook from './AddBookScreen';
import Register from './Register';
import Login from './Login';
import Home from './Home';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
function Admin(){
  return(
      <Tab.Navigator>
        <Tab.Screen name="Books" component={BookView}  options={{ headerShown: false }} />
        <Tab.Screen name="Add Books" component={AddBook}  options={{ headerShown: false }} />
      </Tab.Navigator>
  );

}

export default function Navigation() {
  return (
    
    

    <NavigationContainer initialRouteName="Login">
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen
            name="Admin"
            component={Admin}
            options={{ headerShown: false }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}