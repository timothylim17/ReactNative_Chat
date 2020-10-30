import React from 'react';
import {FlatList} from 'react-native';

import {ThreadRow, Separator} from '../components/ThreadRow';
import {listenToThreads, listenToThreadTracking} from '../firebase';

export default class Threads extends React.Component {
  state = {
    threads: [],
    threadTracking: {},
  };

  componentDidMount() {
    this.removeThreadListener = listenToThreads().onSnapshot(querySnapshot => {
      const threads = querySnapshot.docs.map(doc => {
        return {
          _id: doc.id,
          name: '',
          latestMessage: {text: ''},
          ...doc.data(),
        };
      });

      this.setState({threads});
    });

    this.removeThreadTrackingListener = listenToThreadTracking().onSnapshot(
      querySnapshot => {
        console.log(querySnapshot.data());
        this.setState({threadTracking: querySnapshot.data() || {}});
      },
    );
  }

  componentWillUnmount() {
    if (this.removeThreadListener) {
      this.removeThreadListener();
    }

    if (this.removeThreadTrackingListener) {
      this.removeThreadTrackingListener();
    }
  }

  isThreadUnread = thread => {
    const {threadTracking} = this.state;

    // new message in thread since last checked
    // never viewed that thread before
    if (
      !threadTracking[thread._id] ||
      threadTracking[thread._id].lastRead < thread.latestMessage.createdAt
    ) {
      return true;
    }

    return false;
  };

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
            unread={this.isThreadUnread(item)}
          />
        )}
        ItemSeparatorComponent={() => <Separator />}
      />
    );
  }
}
