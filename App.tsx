import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './WelcomeScreen';
import SignUpScreen from './SignUpScreen';
import LoginScreen from './LoginScreen';
import ChatScreen from './ChatsScreen';
import ContactChatScreen from './ContactChatScreen';
import ProfileScreen from './ProfileScreen'; // Import the ProfileScreen
import { RootStackParamList } from './navigation/ParamList';

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ title: 'Sign Up' }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="Chats"
          component={ChatScreen}
          options={{ title: 'Chats' }}
        />
        <Stack.Screen
          name="ContactChat"
          component={ContactChatScreen}
          options={({ route }) => ({ title: route.params.contactName })}
        />
        <Stack.Screen
          name="ProfileScreen" // Ensure this matches what you're using in the navigation
          component={ProfileScreen}
          options={{ title: 'Profile' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
