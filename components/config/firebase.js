import firebase from "firebase/compat/app";
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: "AIzaSyDpQIip1saoRymSdUxwnE1Ryz0ho47ZWvM",
  authDomain: "fir-app-29f67.firebaseapp.com",
  projectId: "fir-app-29f67",
  storageBucket: "fir-app-29f67.appspot.com",
  messagingSenderId: "159741092654",
  appId: "1:159741092654:web:f026680c34adecc10490bf",
  measurementId: "G-8FDHDXM4WM"
};

if(!firebase.app.length == 0){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;