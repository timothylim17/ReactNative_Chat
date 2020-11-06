import React from 'react';
import {Button} from 'react-native';
import {GoogleSignin} from '@react-native-community/google-signin';
import firebase from 'react-native-firebase';

import {WEB_CLIENT_ID} from 'Chat/App/env';

GoogleSignin.configure({
  webClienId: WEB_CLIENT_ID,
});

async function onGoogleButtonPress() {
  // Get the user's ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = firebase
    .auth()
    .GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

export default function GoogleSignInButton() {
  return (
    <Button
      title="Google Sign-In"
      onPress={() =>
        onGoogleButtonPress().then(() => console.log('Signed in with Google!'))
      }
    />
  );
}
