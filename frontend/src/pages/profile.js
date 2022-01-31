import axios from "axios";
import React, { useState, Component } from "react";
import {  initializeApp } from "firebase/app";
import  './profile.css';
import {getAuth, signOut} from "firebase/auth";
import {firebaseConfig} from "../config.js";
import {Link } from "react-router-dom";

// NOTE(Noah): Profile is a sub-component of App and will be passed
// needed information about the currently logged-in user.
function Connection(props) {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  
  if (props.uid != null) {
    // Call API here to get user information
    console.log(`posting to http://localhost:5000/api/auth/get-user with uid=${props.uid}`);
    axios.post("http://localhost:5000/api/auth/get-user", { uid: props.uid })
    .then((res) => {
      setFirst(res.data[0].first_name);
      setLast(res.data[0].last_name);
    });
    
  }

  return (
    <div className="Card" style={{
      display: "flex",
      flexDirection: "column",
      padding: "1em"
    }}>
      <img className="ProfilePhoto" />
      <span style={{padding: "1em"}}>{first} {last}</span>
    </div>
  )
}

export default function Profile(props) {

  const [bio, setBio] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [connections, setConnections] = useState([]);

  const auth = getAuth();

  React.useEffect(() => {

    if (props.uid != null) {
      // good to load in the user profile now.
      axios.post("http://localhost:5000/api/auth/get-user", { uid: props.uid }).
      then((res)=> {
        setBio(res.data[0].bio);
        setFirstName(res.data[0].first_name);
        setLastName(res.data[0].last_name);
        setEmail(res.data[0].email);
      });

      axios.post("http://localhost:5000/api/auth/get-connections", { uid: props.uid })
      .then((connectRes) => {
        let connectionArr = []
        for (let connect of connectRes.data){
          console.log('connect', connect);
          console.log(`adding connection of uid=${connect.connect_uid}`);
          connectionArr.push(connect.connect_uid)
        }

        setConnections(connectionArr);
        
      })
    }
    
  }, [props.uid]);

  return (
    <div id="topContainer">
      {/* <button onClick={this.clicker}>TESTER</button> */}
      {/* top banner */}
      <div style={{
        background: "linear-gradient(to right, #5E17EB, #ffffff 150%)",
        width: "135%",
        height: "200px",
        padding: "1em"
      }}>        
      </div>   

      <div id="top2Container">
        {/* column with profile info + editing capability */}
        <div id="userColumn">
          {/* profile image */}
          <div className="profilePhoto"/>
          <h1 style={{textAlign: "left", paddingTop: "0.5em"}}>{first_name} {last_name}</h1>
          {/*<h4>About</h4>
          <span><i class="bi bi-briefcase-fill"></i>&nbsp;Your Role</span>
          <span><i class="bi bi-people-fill"></i>&nbsp;Your Organization</span>
          <span><i class="bi bi-geo-alt-fill"></i>&nbsp;Your Location</span>*/}
          <h4>Contact</h4>
          {/*<span><i class="bi bi-phone-fill"></i>&nbsp;Your Phone Number</span>*/}
          <span><i class="bi bi-envelope-fill"></i>&nbsp;{email}</span>
          <button style={{margin:20}}
            className="btn btn-lg btn-primary btn-block" 
            onClick={(e) => { 
              signOut(auth); // TODO(Noah): Should we check if this did not work?
            }}>
              <Link to="/auth" className="MyLink"> Logout </Link>
          </button>
        </div>
        {/* bio + connections container */}
        <div id="bioconnectionsBox">
          {/* bio */}
          <div style={{
            minWidth: 300,
            maxWidth: 800
          }}>
            <h1>Profile</h1>
            <div className="Spacer"></div>
            <div className="Card" style={{
              padding: "2em"
            }}>
              <h3>Biography</h3>
              <p>
                {bio}
              </p>
            </div>
          </div>
          <div className="Spacer"></div>
          {/* connections */}
          <div id="connectionsContainer">
            <h1>Connections</h1>
            <div className="Spacer"></div>
            <div id="connectionsList">
              {
                connections.map((connection, index) => (
                  <React.Fragment key={index}>
                    <Connection uid={connection}/>
                    <div className="Spacer"></div>
                  </React.Fragment>  
                ))
              }  
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}