import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAQgYMgzcDHfDvvMYUXEeCilFdCl-HeVc0",
    authDomain: "myblog-c1477.firebaseapp.com",
    projectId: "myblog-c1477",
    storageBucket: "myblog-c1477.appspot.com",
    messagingSenderId: "351753636551",
    appId: "1:351753636551:web:34c6aec4a834e850bfcce2"
  };

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase; 
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();