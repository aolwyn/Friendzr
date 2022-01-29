import './App.css';
import './signin.css'
import React, { useState } from "react";

// --------------------- FIREBASE CLIENT SDK ----------------------
// Import the functions you need from the SDKs you need
import { 
  initializeApp, 
} from "firebase/app";

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  signOut,
  sendEmailVerification
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import {firebaseConfig} from "./config.js";

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();
// TODO(Noah): Maybe implement analytics.
// import { getAnalytics } from "firebase/analytics";
//const analytics = getAnalytics(app);

setPersistence(auth, browserLocalPersistence);
// --------------------- FIREBASE CLIENT SDK ----------------------

// NOTE(Noah): We are able to use both common JS and ES6 module imports because of the React
// framework. Pretty sure there is tons of magic going on under the hood.
const axios = require('axios'); 

function LoginButtonOnClick(e, email, password) {
  e.preventDefault();
  // Regex to match the 99% of emails in use:
  //     but not compliant to all emails in existence.
  // NOTE(Noah): The new keyword here make new object on heap. Javascript has GC.
  let email_regex = new RegExp("^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$");
  let email_good = email_regex.test(email.toUpperCase());

  // TODO: Add validation feedback to the user, and make sure it is accessible.
  if (email_good) {
    console.log('Email passed regex test');
    // TODO(Noah): Do something intelligent on user sign-in if unable to sign-in,
    // and also when the user signs in as well.
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {})
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Unable to sign in with errorCode=${errorCode} and errorMessage=${errorMessage}`);
    });
  } else {
    console.error("Email did not pass regex test");
  }
}

function SignUpButtonOnClick(e, email, password, confirmPassword) {
  e.preventDefault();
  // Regex to match the 99% of emails in use:
  //     but not compliant to all emails in existence.
  // NOTE(Noah): The new keyword here make new object on heap. Javascript has GC.
  let email_regex = new RegExp("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$");
  let email_good = email_regex.test(email.toUpperCase());
  let passwords_match = (password === confirmPassword);

  // TODO: Add validation feedback to the user, and make sure it is accessible.
  if (email_good ) {
    if (passwords_match) {
    console.log('Email passed regex test');
    // TODO(Noah): Do something intelligent on user sign-in if unable to sign-in,
    // and also when the user signs in as well.
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {})
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Unable to sign in with errorCode=${errorCode} and errorMessage=${errorMessage}`);
    });
    } else {
      console.error("Passwords do no match");
    }
  } else {
    console.error("Email did not pass regex test");
  }
  

}

// TODO(Noah): What is the cleanest way to make this sign up form not like, NOT
// mostly a duplicate of the Login Form?
function SignUpForm() {
  const [email, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRM] = useState(false);

  return (
    <form className="form-signin">
      <h1 className="h3 mb-3 font-weight-normal">Create a new Account</h1>
      <input 
        type="email" className="form-control" placeholder="Email address" 
        value={email} onChange={(e) => setName(e.target.value)}
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
      <input 
        type="password" 
        className="form-control" 
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)} 
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
        onClick={(e) => {SignUpButtonOnClick(e, email, password, confirmPassword)}}>
          Create Account
      </button>
    </form>
    
  )

}

// TODO(Noah): Implement remember-me to control if Firebase persists or does not persist.
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
        autoComplete="on"
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
        onClick={(e) => {LoginButtonOnClick(e, email, password)}}>
          Sign in
      </button>
      {/* TODO(Noah): Make the Google sign-in form accessible. 
        Also make the font on the button larger, and 
        generally make the button appear better-looking. */}
      {//<span style={{margin:"1vh"}}>OR</span>      
      /*<div className="g-signin2" data-longtitle="true" />*/}
    </form>
    
  )
}

function BackendTest(idToken) {
  console.log('RUNNING AXIOS BACKEND-AUTH TEST');
  axios.post('http://127.0.0.1:5000/api/auth/app', {
    jwt: idToken
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: "",
      emailVerified: false
    };
  }

  componentDidMount() {
    // Not sure if this has any use, but certainly should exist for safety purposes.
    if (auth.currentUser) {
      if (!this.state.loggedIn) {
        this.setLoggedIn(true);
      }
    }
    onAuthStateChanged(auth, (user) => {
      if (user) { // user is signed in.
        this.setLoggedIn(true);
        this.setUsername(user.email);
        this.setVerified(user.emailVerified);
        // TODO(Noah): What are we going to do in the case that we are unable go get an idToken?
        //    In fact, why would this even fail anyways?
        user.getIdToken(true).then(function(idToken) {
          BackendTest(idToken);
        });
      } else { // user has signed out
        this.setLoggedIn(false);
      }
    });
  }

  setVerified(b) {this.setState({emailVerified: b})}
  setUsername(name) { this.setState({username: name})}
  setLoggedIn(login) {this.setState({loggedIn: login});}  

  render() {
    return (
      <div className="App">
        <div style={{
          position: "relative"
        }}>
          <div style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "flex-start"
          }}>
            { /* TODO(Noah): For both of these forms, it is the case that the passwords and emails
              should be released from the input after hitting the button. */ }
            <LoginForm/>
            <SignUpForm/>
          </div>
          
          { /* NOTE(Noah): onClick takes in a function. So if we want to call a function here, need to pass
          a func literal (or arrow syntax) or whatever. */ }
          { /*<button onClick={() => {console.log(auth.currentUser)}} />*/ }
          
          {((this.state.loggedIn) ?
              <div style={{
                display: "flex",
                flexDirection: "column",
                padding: 20
              }}>
                <span>User is logged in.</span>
                <span>Name of user: {this.state.username}</span>
                <span>User verified: {(this.state.emailVerified) ? "Yes" : "No"}</span>
                <div><button style={{marginTop:20}}
                  className="btn btn-lg btn-primary btn-block"
                  onClick={(e) => {
                    // TODO(Noah): Certainly would be nice for there to be a popup here
                    // that's like, "Email verified!"
                    sendEmailVerification(auth.currentUser);
                  }}>Send Verification Email</button>
                </div>
                <div><button style={{margin:20}}
                  className="btn btn-lg btn-primary btn-block" 
                  onClick={(e) => { 
                    signOut(auth); // TODO(Noah): Should we check if this did not work?
                  }}>
                    Logout
                </button></div>
              </div> : <div></div>)}
          <p className="mt-5 mb-3 text-muted">&copy; 2022</p>
        </div>
      </div>
    );
  }
}

export default App;
