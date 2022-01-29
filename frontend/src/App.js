import './App.css';
import './signin.css'

import { useState } from "react";

function DEBUG_BUTTON() {
  console.log("")
}

function MyForm() {
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
    <form class="form-signin">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <input 
        type="email" 
        class="form-control" 
        placeholder="Email address" 
        value={email}
        onChange={(e) => setName(e.target.value)}
        required 
        autofocus 
      />
      <input 
        type="password" 
        class="form-control" 
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />
      <div class="checkbox mb-3">
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
        class="btn btn-lg btn-primary btn-block" 
        onClick={DEBUG_BUTTON}>
          Sign in
      </button>
      <p class="mt-5 mb-3 text-muted">&copy; 2022</p>
    </form>
    
  )
}

function App() {
  return (
    <div className="App">
      <MyForm />
    </div>
  );
}

export default App;
