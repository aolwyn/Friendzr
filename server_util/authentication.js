// NOTE(Noah): The code gets run exactly one time when you import
// a javscript module.
// see -> https://stackoverflow.com/questions/37325667/does-es6-module-importing-execute-the-code-inside-the-imported-file#:~:text=Yes%2C%20it%20does%2C%20exactly%20one%20time.

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {config} from "./config.js";

// NOTE: config.firebaseConfig
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
const app = initializeApp(config.firebaseConfig);
const auth = getAuth();

// TODO: Maybe look into adding analytics.
//import { getAnalytics } from "firebase/analytics";
//const analytics = getAnalytics(app);

// This function expects email and password to be strings, not-encrypted.
export function CreateUserWithEmailAndPassword(email, password) {

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        //const user = userCredential.user;
        // ...
        console.log(`New user with email: ${email} and password: ${password} !`);
    })
    .catch((error) => {
        //const errorCode = error.code;
        //const errorMessage = error.message;
        // ..
        console.log(`Unable to create user with email: ${email} and password: ${password}!`);
    });

}

// This function expects email and password to be strings, not-encrypted.
export function SignInWithEmailAndPassword(email, password) {
    
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });

}

