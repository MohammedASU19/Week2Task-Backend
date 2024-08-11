import * as React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Avatar, ListItem, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './navigation/ParamList';

type ChatScreenProp = StackNavigationProp<RootStackParamList, 'Chats'>;

const contacts = [
  {
    name: 'Ahmad',
    message: 'Hey! How are you?',
    time: '11:30',
    avatar_url: 'https://static.vecteezy.com/system/resources/previews/011/459/666/original/people-avatar-icon-png.png',
    status: 'read',
    unread: false,
  },
  {
    name: 'Sarah',
    message: 'See you soon!',
    time: '10:45',
    avatar_url: 'https://static.vecteezy.com/system/resources/previews/011/459/669/original/people-avatar-icon-png.png',
    status: 'delivered',
    unread: false,
  },
  {
    name: 'Khaled',
    message: 'Let\'s meet tomorrow',
    time: '09:30',
    avatar_url: 'https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png',
    status: 'sent',
    unread: false,
  },
  {
    name: 'Ibrahim',
    message: 'Can you call me?',
    time: '08:15',
    avatar_url: 'https://cdn-icons-png.flaticon.com/512/5556/5556468.png',
    status: 'read',
    unread: true,
  },
  {
    name: 'Noor',
    message: 'Great job!',
    time: '07:50',
    avatar_url: 'https://cdn.icon-icons.com/icons2/3708/PNG/512/girl_female_woman_person_people_avatar_icon_230018.png',
    status: 'delivered',
    unread: false,
  },
  {
    name: 'Fatima',
    message: 'See you at the event',
    time: 'Yesterday',
    avatar_url: 'https://cdn-icons-png.flaticon.com/512/6889/6889369.png',
    status: 'sent',
    unread: true,
  },
];

const ChatScreen: React.FC = () => {
  const navigation = useNavigation<ChatScreenProp>();

  const handlePress = (contact: { name: string, avatar_url: string }) => {
    navigation.navigate('ContactChat', { contactName: contact.name, contactAvatar: contact.avatar_url });
  };

  const navigateToProfile = () => {
    navigation.navigate('ProfileScreen'); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>WhatsApp</Text>
        <View style={styles.headerIcons}>
          <Icon name="search" type="material" color="white" style={styles.icon} />
          <Icon name="more-vert" type="material" color="white" style={styles.icon} />
          <Icon name="account-circle" type="material" color="white" style={styles.icon} onPress={navigateToProfile} />
        </View>
      </View>
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option} onPress={() => console.log('Archived Chats')}>
          <Text style={styles.optionText}>Archived Chats</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => console.log('Calls')}>
          <Text style={styles.optionText}>Calls</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => console.log('Groups')}>
          <Text style={styles.optionText}>Groups</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)}>
            <ListItem bottomDivider>
              <Avatar source={{ uri: item.avatar_url }} rounded size="large" />
              <ListItem.Content>
                <ListItem.Title style={styles.listItemTitle}>{item.name}</ListItem.Title>
                <View style={styles.messageContainer}>
                  {item.status === 'sent' && (
                    <Image source={{ uri: 'https://static.thenounproject.com/png/207135-200.png' }} style={styles.tickIcon} />
                  )}
                  {item.status === 'delivered' && (
                    <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1370/1370907.png' }} style={styles.tickIcon} />
                  )}
                  {item.status === 'read' && (
                    <Image source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Check-double-icon.png' }} style={styles.tickIcon} />
                  )}
                  <ListItem.Subtitle>{item.message}</ListItem.Subtitle>
                </View>
              </ListItem.Content>
              <View style={styles.timeContainer}>
                <Text style={styles.time}>{item.time}</Text>
                {item.unread && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>1</Text>
                  </View>
                )}
              </View>
            </ListItem>
          </TouchableOpacity>
        )}
      />
      <Icon
        name="message"
        type="material"
        color="white"
        containerStyle={styles.fab}
        reverse
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#3CC34E',
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#EDEDED',
    paddingVertical: 10,
  },
  option: {
    padding: 10,
  },
  optionText: {
    color: '#3CC34E',
    fontWeight: 'bold',
  },
  listItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tickIcon: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  timeContainer: {
    alignItems: 'flex-end',
  },
  time: {
    color: 'gray',
    fontSize: 12,
  },
  unreadBadge: {
    backgroundColor: '#25D366',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginTop: 5,
  },
  unreadText: {
    color: 'white',
    fontSize: 12,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#25D366',
  },
});

export default ChatScreen;
