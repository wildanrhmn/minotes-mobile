import { auth, firestore, storage } from "./firebase";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import { Alert } from "react-native";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
});

export async function createNewUser(uid, username, email, avatar) {
  try {
    await firestore()
      .doc("users/" + uid)
      .set({
        displayName: username,
        email: email,
        avatar: avatar,
      });
  } catch (error) {
    console.log(error);
  }
}

export async function onGoogleSignIn() {
  try {
    // Google Sign in
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const data = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(data.idToken);
    const result = await auth().signInWithCredential(googleCredential);

    //User Data Create & Retrieval
    const userExist = await firestore().doc(`users/${result.user.uid}`).get();

    if(!userExist.exists) {
      await createNewUser(
        result.user.uid,
        data.user.name,
        data.user.email,
        data.user.photo
      );
    }
    const userDocRef = firestore().doc(`users/${result.user.uid}`);
    const userDocSnap = await userDocRef.get();

    if (userDocSnap.exists) {
      const userData = userDocSnap.data();
      return { success: true, message: "Login successful!", userData };
    }
  } catch (error) {
    console.log(error);
    Alert.alert("Error", error.message)
  }
}

export async function onFacebookSignIn() {
  try {
    const result = await LoginManager.logInWithPermissions([
      "public_profile",
      "email",
    ]);
    if (result.isCancelled) {
      throw "User cancelled the login process";
    }
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw "Something went wrong obtaining access token";
    }

    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken
    );

    //User Data Create & Retrieval
    const additionalData = await auth().signInWithCredential(facebookCredential);
    const userExist = await firestore().doc(`users/${additionalData.user.uid}`).get();

    if(!userExist.exists) {
      await createNewUser(
        result.user.uid,
        data.user.name,
        data.user.email,
        data.user.photo
      );
    }
    
    const userDocRef = firestore().doc(`users/${additionalData.user.uid}`);
    const userDocSnap = await userDocRef.get();

    if (userDocSnap.exists) {
      const userData = userDocSnap.data();
      return { success: true, message: "Login successful!", userData };
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getCurrentUser(uid) {
  const userDocRef = firestore().doc(`users/${uid}`);
  const userDocSnap = await userDocRef.get();
  if (userDocSnap.exists) {
    const userData = userDocSnap.data();
    return userData;
  }
}

export async function socialLogout() {
  try {
    await auth().signOut();
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    LoginManager.logOut();
  } catch (error) {
    console.log(error);
  }
}
