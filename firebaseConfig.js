import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
 
// Initialize Firebase
const app = initializeApp ({
    apiKey: "AIzaSyCpltL90o-b7wGAHeP_P9PcueZhnw899BQ",
    authDomain: "myclinic-396ac.firebaseapp.com",
    projectId: "myclinic-396ac",
    storageBucket: "myclinic-396ac.appspot.com",
    messagingSenderId:  "133753937279",
    appId: "1:133753937279:web:dbcef3dc817e6e9b214e4a"
    /* measurementId: <measurementId>, */
});
 
// Firebase storage reference
const storage = getStorage(app);
export default storage;