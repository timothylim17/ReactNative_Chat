import React from 'react';
import {FlatList} from 'react-native';
import firebase from 'react-native-firebase';

import {ThreadRow, Separator} from '../components/ThreadRow';

export default class Threads extends React.Component {
  state = {};

  componentDidMount() {
    this.removeThreadListener = firebase
      .firestore()
      .collection('MESSAGE_THREADS')
      .orderBy('latestMessage.createdAt', 'desc')
      .onSnapshot(querySnashot => {
        // console.log(querySnashot);
        const threads = querySnashot.docs.map(doc => {
          return {
            _id: doc.id,
            name: '',
            latestMessage: {text: ''},
            ...doc.data(),
          };
        });

        this.setState({threads});
      });
  }

  componentWillUnmount() {
    if (this.removeThreadListener) {
      this.removeThreadListener();
    }
  }

  render() {
    return (
      <FlatList
        data={this.state.threads}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
          <ThreadRow
            {...item}
            onPress={() =>
              this.props.navigation.navigate('Messages', {thread: item})
            }
            unread={item.unread}
          />
        )}
        ItemSeparatorComponent={() => <Separator />}
      />
    );
  }
}
