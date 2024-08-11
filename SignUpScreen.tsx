import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, TextInput, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './navigation/ParamList';
import CountryPicker, { CountryCode, Country } from 'react-native-country-picker-modal';
import { launchImageLibrary } from 'react-native-image-picker';

type SignUpScreenProp = StackNavigationProp<RootStackParamList, 'SignUp'>;

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation<SignUpScreenProp>();
  const [date, setDate] = React.useState(new Date());
  const [show, setShow] = React.useState(false);
  const [dateText, setDateText] = React.useState("Pick Birthdate");
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [countryCode, setCountryCode] = React.useState<CountryCode>('US');
  const [country, setCountry] = React.useState<Country | null>(null);
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [avatarUri, setAvatarUri] = React.useState('https://www.pngkey.com/png/detail/115-1150152_default-profile-picture-avatar-png-green.png');

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    let fDate = currentDate.getDate() + '/' + (currentDate.getMonth() + 1) + '/' + currentDate.getFullYear();
    setDateText(fDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const handleConfirm = async () => {
    if (!email || !password || !firstName || !lastName || dateText === "Pick Birthdate" || !phoneNumber) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const newUser = {
      firstName,
      lastName,
      email,
      password,  
      dateOfBirth: dateText,
      phoneNumber: `+${country?.callingCode[0]} ${phoneNumber}`,
      avatarUri
    };

    try {
      const existingUsersJson = await AsyncStorage.getItem('users');
      const existingUsers = existingUsersJson ? JSON.parse(existingUsersJson) : [];
      if (existingUsers.some(user => user.email === email)) {
        Alert.alert("Error", "Email already exists");
        return;
      }
      existingUsers.push(newUser);
      await AsyncStorage.setItem('users', JSON.stringify(existingUsers));
      Alert.alert("Success", "Registration successful");
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert("Error", "Failed to register user");
    }
  };

  const handleAvatarPress = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 0.8,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        if (response.assets && response.assets.length > 0) {
          const source = { uri: response.assets[0].uri };
          setAvatarUri(source.uri);
        }
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleAvatarPress}>
        <Image
          source={{ uri: avatarUri }}
          style={styles.avatarCircle}
        />
      </TouchableOpacity>
      <TextInput style={styles.input} placeholder="First Name" value={firstName} onChangeText={setFirstName} />
      <TextInput style={styles.input} placeholder="Last Name" value={lastName} onChangeText={setLastName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={true} />
      <Text style={styles.hintText}>Birthdate</Text>
      <TouchableOpacity onPress={showDatepicker} style={styles.input}>
        <Text style={styles.dateButtonText}>{dateText}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
      <View style={styles.phoneNumberContainer}>
        <CountryPicker
          countryCode={countryCode}
          withFlag
          withCallingCode
          withFilter
          withCallingCodeButton
          onSelect={(country) => {
            setCountryCode(country.cca2);
            setCountry(country);
          }}
        />
        <TextInput
          style={styles.phoneNumberInput}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
      <Text style={styles.loginText}>
        Already have an account?{' '}
        <Text style={styles.loginLink} onPress={() => navigation.navigate('Login')}>
          Login here
        </Text>
      </Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  hintText: {
    alignSelf: 'flex-start',
    marginLeft: '10%',
    marginBottom: 5,
    color: 'gray',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  dateButtonText: {
    color: 'gray',
  },
  phoneNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
  phoneNumberInput: {
    flex: 1,
  },
  button: {
    backgroundColor: '#3CC34E',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loginText: {
    color: 'black',
  },
  loginLink: {
    color: 'blue',
  },
});

export default SignUpScreen;
