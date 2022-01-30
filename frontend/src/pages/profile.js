import axios from "axios";
import React, { useState, Component } from "react";
import {  initializeApp } from "firebase/app";
import  './profile.css';
import {getAuth } from "firebase/auth";
import {firebaseConfig} from "../config.js";



// NOTE(Noah): Profile is a sub-component of App and will be passed
// needed information about the currently logged-in user.
function Connection() {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  
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

export default class Profile extends Component {
  constructor(props) {
    super(props);
    initializeApp(firebaseConfig);
    this.state = {
      bio: '',
      first_name: '',
      last_name: '',
      email: '',
      uid: '',
      connections: ['','']
    }
  }
  async componentDidMount() {
  const auth = getAuth();
  const res = await axios.post("http://localhost:5000/api/auth/get-user", { uid: auth.currentUser.uid });
  this.setState({
    bio: res.data[0].bio,
    first: res.data[0].first_name,
    last: res.data[0].last_name,
    email: res.data[0].email
  });

  const connectRes = await axios.post("http://localhost:5000/api/auth/get-connections", { uid: auth.currentUser.uid });
  let connectionArr = []
  for (let connect of connectRes.data){
    connectionArr.push(connect.uid)
  }

  this.setState({
    connections: connectionArr
  });
  
  }

  async clicker(){
    console.log(this.state.connections)
  }

  render() {
    const connections = this.state.connections;
    const final = [];

    for(let connect of this.state.connections){
      final.push(<li key={connect}>{connect}</li>)
    }

    return (
      <div id="topContainer">
        {/* <button onClick={this.clicker}>TESTER</button> */}
        {/* top banner */}
        <div style={{
          background: "linear-gradient(to right, #5E17EB, #ffffff 150%)",
          width: "135%",
          height: "200px",
          padding: "1em",
          "margin-left": "-13%",
          "margin-top": "-10%",
        }}>        
        </div>   

        <div id="top2Container">
          {/* column with profile info + editing capability */}
          <div id="userColumn">
            {/* profile image */}
            <div className="profilePhoto"/>
            <h1 style={{textAlign: "left", paddingTop: "0.5em"}}>{this.state.first} {this.state.last}</h1>
            {/*<h4>About</h4>
            <span><i class="bi bi-briefcase-fill"></i>&nbsp;Your Role</span>
            <span><i class="bi bi-people-fill"></i>&nbsp;Your Organization</span>
            <span><i class="bi bi-geo-alt-fill"></i>&nbsp;Your Location</span>*/}
            <h4>Contact</h4>
            {/*<span><i class="bi bi-phone-fill"></i>&nbsp;Your Phone Number</span>*/}
            <span><i class="bi bi-envelope-fill"></i>&nbsp;{this.state.email}</span>
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
                  {this.state.bio}
                </p>
              </div>
            </div>
            <div className="Spacer"></div>
            {/* connections */}
            {/* <div id="connectionsContainer">
              <h1>Connections</h1>
              <div className="Spacer"></div>
              <div id="connectionsList">
                <ul>{final}</ul>

                <Connection />
                <div className="Spacer"></div>
                <Connection />
                <div className="Spacer"></div>
                <Connection />
                
              </div>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}