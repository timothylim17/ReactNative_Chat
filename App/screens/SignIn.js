import React from 'react';
import firebase from 'react-native-firebase';

export default class SignIn extends React.Component {
  // componentDidMount() {

  // }

  // componentWillUnmount() {
  //   if (this.removeAuthListener) {
  //     this.removeAuthListener();
  //   }
  // }

  // onLoginOrRegister = () => {
  //   GoogleSignin.signIn()
  //     .then(data => {
  //       // Create firebase credential with token
  //       const credential = firebase.auth().GoogleAuthProvider.credential(data.idToken, data.accessToken);

  //       // Login with the credential
  //       return firebase.auth().signInWithCredential(credential);
  //     })
  //     .then(user => {
  //       // maybe navigate to Threads.js
  //     })
  //     .catch(e => {
  //       const { code, message } = e;
  //       console.log(`ERROR: ${message}, CODE: ${code}`);
  //     });
  // }

  render() {
    return null;
  }
}
