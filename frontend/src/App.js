import './App.css';
import './signin.css'

import { useState } from "react";

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
    // Perform post request with axios.
    // TODO(Noah): Consider if this will look any different in production.
    axios.post('http://127.0.0.1:5000/login', {
      email,
      password
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  } else {
    console.error("Email did not pass regex test");
  }
  
}

function LoginForm() {
  const [email, setName] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRM] = useState(false);
  /*<form>
    <label>Enter your name:
      <input
        type="text" 
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </label>
  </form>*/
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
      <p className="mt-5 mb-3 text-muted">&copy; 2022</p>
    </form>
    
  )
}

function App() {
  return (
    <div className="App">
      <LoginForm />
    </div>
  );
}

export default App;
