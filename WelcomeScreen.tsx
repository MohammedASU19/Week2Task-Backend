import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './navigation/ParamList';

type WelcomeScreenProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<WelcomeScreenProp>();

  const handleAgreeAndContinue = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Image
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/WhatsApp_icon.png/598px-WhatsApp_icon.png?20200503174721' }}
          style={styles.image}
        />
      </View>
      <Text style={styles.title}>Welcome to WhatsApp</Text>
      <Text style={styles.text}>
        Read our{' '}
        <Text
          style={styles.link}
          onPress={() =>
            Linking.openURL('https://www.whatsapp.com/legal/privacy-policy/')
          }>
          Privacy Policy
        </Text>
        . Tap "Agree & Continue" to accept the{' '}
        <Text
          style={styles.link}
          onPress={() =>
            Linking.openURL('https://www.whatsapp.com/legal/terms-of-service/')
          }>
          Terms of Service
        </Text>
        .
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={handleAgreeAndContinue}>
        <Text style={styles.buttonText}>Agree & Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'lightgrey',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  link: {
    color: 'blue',
  },
  button: {
    backgroundColor: '#3CC34E',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
