import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyD5ikDBBt3fj2nrefXqoB4u1-J-d3jjkgM",
    authDomain: "kotikokki-db.firebaseapp.com",
    databaseURL: "https://kotikokki-db.firebaseio.com",
    projectId: "kotikokki-db",
    storageBucket: "kotikokki-db.appspot.com",
    messagingSenderId: "662925695053",
    appId: "1:662925695053:web:e41ee6e2fbc9855c13e404"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
  
    if (!snapShot.exists) {
      const { name, email } = userAuth;
      const createdAt = new Date();
  
      try {
        await userRef.set({
          name,
          email,
          createdAt,
          ...additionalData,
        });
      } catch (error) {
        console.log("error creating user", error.message);
      }
    }
    return userRef;
  };
  
  export const createChefProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const chefRef = firestore.doc(`chefs/${userAuth.uid}`);
    const snapShot = await chefRef.get();
  
    if (!snapShot.exists) {
      const { name, email } = userAuth;
      const createdAt = new Date();
  
      try {
        await chefRef.set({
          name,
          email,
          createdAt,
          ...additionalData,
        });
      } catch (error) {
        console.log("error creating chef", error.message);
      }
    }
    return chefRef;
  };

  firebase.initializeApp(config);
  
  //sign in with google
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  
  export default firebase;
  