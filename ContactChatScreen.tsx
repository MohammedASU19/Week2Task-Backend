import * as React from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from './navigation/ParamList';

const messages = [
  { id: '1', text: 'Hey! How are you?', time: '8:45', type: 'received' },
  { id: '2', text: 'I am good, thank you!', time: '8:46', type: 'sent', status: 'read' },
  { id: '3', text: 'How about you?', time: '8:47', type: 'sent', status: 'read' },
  { id: '4', text: 'I am doing well, just busy with work.', time: '8:48', type: 'received' },
  { id: '5', text: 'That sounds great!', time: '8:49', type: 'sent', status: 'read' },
  { id: '6', text: '', time: '', type: 'gif', url: 'https://www.icegif.com/wp-content/uploads/2022/10/icegif-1348.gif' },
];

type ContactChatScreenRouteProp = RouteProp<RootStackParamList, 'ContactChat'>;

const ContactChatScreen: React.FC = () => {
  const route = useRoute<ContactChatScreenRouteProp>();
  const { contactName, contactAvatar } = route.params;

  const renderMessage = ({ item }) => {
    if (item.type === 'gif') {
      return (
        <View style={styles.gifContainer}>
          <Image source={{ uri: item.url }} style={styles.gif} />
        </View>
      );
    }
    return (
      <View style={[styles.messageContainer, item.type === 'sent' ? styles.sentMessage : styles.receivedMessage]}>
        <Text style={styles.messageText}>{item.text}</Text>
        <View style={styles.messageInfo}>
          <Text style={styles.messageTime}>{item.time}</Text>
          {item.type === 'sent' && (
            <Image
              source={{ uri: item.status === 'read' ? 'https://upload.wikimedia.org/wikipedia/commons/1/1b/Check-double-icon.png' : 'https://cdn-icons-png.flaticon.com/512/1370/1370907.png' }}
              style={styles.tickIcon}
            />
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="arrow-back" type="material" color="white" />
        <Avatar
          source={{ uri: contactAvatar }}
          rounded
          size="medium"
          containerStyle={styles.avatar}
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerName}>{contactName}</Text>
          <Text style={styles.headerStatus}>online</Text>
        </View>
        <View style={styles.headerIcons}>
          <Icon name="videocam" type="material" color="white" style={styles.icon} />
          <Icon name="call" type="material" color="white" style={styles.icon} />
          <Icon name="more-vert" type="material" color="white" style={styles.icon} />
        </View>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.messagesList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
        />
        <TouchableOpacity>
          <Icon name="emoji-emotions" type="material" color="gray" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="attach-file" type="material" color="gray" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="camera-alt" type="material" color="gray" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendButton}>
          <Icon name="send" type="material" color="white" />
        </TouchableOpacity>
      </View>
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
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginHorizontal: 10,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerStatus: {
    color: 'white',
    fontSize: 14,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 10,
  },
  messagesList: {
    padding: 10,
  },
  messageContainer: {
    marginBottom: 10,
    maxWidth: '75%',
    padding: 10,
    borderRadius: 10,
  },
  sentMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    backgroundColor: '#ADD8E6',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  messageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  messageTime: {
    fontSize: 12,
    color: 'gray',
  },
  tickIcon: {
    width: 15,
    height: 15,
    marginLeft: 5,
  },
  gifContainer: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  gif: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#EDEDED',
    backgroundColor: '#FFF',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#EDEDED',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#3CC34E',
    borderRadius: 25,
    padding: 10,
  },
});

export default ContactChatScreen;
