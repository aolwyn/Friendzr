import './App.css';
import './signin.css'
import { useState } from "react";

// --------------------- FIREBASE CLIENT SDK ----------------------
// Import the functions you need from the SDKs you need
import { 
  initializeApp, 
} from "firebase/app";

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import {firebaseConfig} from "./config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
// TODO(Noah): Maybe implement analytics.
// import { getAnalytics } from "firebase/analytics";
//const analytics = getAnalytics(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    // const uid = user.uid;
    
    // TODO(Noah): Is it safe to store the cookie like this?
    // Store JWT token as cookie "qcookie".
    user.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      // Send token to your backend via HTTPS
      // ...
      document.cookie = `qcookie=${idToken}`;

    }).catch(function(error) {
      // Handle error
    });

  } else {
    // User is signed out
    // ...
    document.cookie = `qcookie=`;
  }
});
// --------------------- FIREBASE CLIENT SDK ----------------------

// NOTE(Noah): We are able to use both common JS and ES6 module imports because of the React
// framework. Pretty sure there is tons of magic going on under the hood.
const axios = require('axios'); 

function LoginButtonOnClick(e, email, password) {

  e.preventDefault();
  // Regex to match the 99% of emails in use:
    // but not compliant to all emails in existence.
  // NOTE: When we are verifying the email, we leverage the default Bootstrap tooltip
  // that pops up on error.
    // we simply just need to match the tooltips... 
  // NOTE(Noah): The new keyword here make new object on heap. Javascript has GC.
  let email_regex = new RegExp("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$");
  let email_good = email_regex.test(email.toUpperCase());

  // TODO: Add validation feedback to the user, and make sure it is accessible.
  if (email_good) {
    console.log('Email passed regex test');
    
    // TODO(Noah): Do something intelligent on user sign-in if unable to sign-in.
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      // const user = userCredential.user;
      // ...

      // TODO(Noah): Ensure that the cookie thing actually works on the backend.
      //    Right now this is not possible because we are running the frontend as a
      //    development server. The cookies are only sent in the header if the frontend
      //    is actually on the same domain as the backend.
      // Do an axios test to see if our server is able to
      // authenticate us.
      console.log('RUNNING AXIOS BACKEND-AUTH TEST');
      axios.get('http://127.0.0.1:5000/app')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Unable to sign in with errorCode=${errorCode} and errorMessage=${errorMessage}`);
    });

    // NOTE(Noah): Axios code bleow is legacy, but keeping for reference on making
    // HTTP requests.
    /*axios.post('http://127.0.0.1:5000/login', {
      email,
      password
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });*/

  } else {
    console.error("Email did not pass regex test");
  }
  
}

function LoginForm() {
  const [email, setName] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRM] = useState(false);
  return (
    <form className="form-signin">
      <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
      <input 
        type="email" 
        className="form-control" 
        placeholder="Email address" 
        value={email}
        onChange={(e) => setName(e.target.value)}
        required 
        autoFocus 
      />
      <input 
        type="password" 
        className="form-control" 
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />
      <div className="checkbox mb-3">
        <label>
          <input 
            type="checkbox" 
            value={rememberMe}
            onChange={(e) => setRM(e.target.value)}
            style={{width: 20}} 
          /> 
          Remember me 
        </label>
      </div>
      <button 
        className="btn btn-lg btn-primary btn-block" 
        onClick={(e) => LoginButtonOnClick(e, email, password)}>
          Sign in
      </button>
      <span style={{margin:"1vh"}}>OR</span>
      {/* TODO(Noah): Make the Google sign-in form accessible. 
        Also make the font on the button larger, and 
        generally make the button appear better-looking. */}
      <div className="g-signin2" data-longtitle="true" />
      <p className="mt-5 mb-3 text-muted">&copy; 2022</p>
    </form>
    
  )
}

function App() {
  return (
    <div className="App">
      <div style={{
        position: "relative"
      }}>
        <LoginForm />
        { // TODO(Noah): Setup react redux to have global state so that we can update components like this.
        /*((auth.currentUser) ? <div>
            User is logged in.
        </div>:<div></div>)*/ }
      </div>
    </div>
  );
}

export default App;
