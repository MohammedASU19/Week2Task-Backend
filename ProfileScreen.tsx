import * as React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen: React.FC = () => {
  const [user, setUser] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    avatarUri: 'https://www.pngkey.com/png/detail/115-1150152_default-profile-picture-avatar-png-green.png' 
  });

  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('users');
        if (userData) {
          const users = JSON.parse(userData);
          const activeUser = users[users.length - 1]; 
          setUser({
            firstName: activeUser.firstName,
            lastName: activeUser.lastName,
            email: activeUser.email,
            phoneNumber: activeUser.phoneNumber || 'Not provided',
            avatarUri: activeUser.avatarUri || user.avatarUri
          });
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: user.avatarUri }} style={styles.avatar} />
      <Text style={styles.name}>{`${user.firstName} ${user.lastName}`}</Text>
      <Text style={styles.detail}>{user.email}</Text>
      <Text style={styles.detail}>{user.phoneNumber}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 20
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20
  },
  name: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 10
  },
  detail: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 10
  }
});

export default ProfileScreen;
