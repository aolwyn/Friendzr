import React from "react";

import  './profile.css';

function Connection() {
  return (
    <div className="Card" style={{
      display: "flex",
      flexDirection: "column",
      padding: "1em"
    }}>
      <img className="ProfilePhoto" />
      <span style={{padding: "1em"}}>Sinan</span>
    </div>
  )
}

// NOTE(Noah): Profile is a sub-component of App and will be passed
// needed information about the currently logged-in user.
export default function Profile() {
  return (
    <div id="topContainer">

      {/* top banner */}
      <div style={{
        background: "linear-gradient(to right, #5E17EB, #ffffff 150%)",
        height: "25vh",
        width: "100vw"
      }}>        
      </div>   

      <div id="top2Container">
        {/* column with profile info + editing capability */}
        <div id="userColumn">
          {/* profile image */}
          <div className="profilePhoto"/>
          <h1 style={{textAlign: "center", paddingTop: "0.5em"}}>Noah Cabral</h1>
          {/*<h4>About</h4>
          <span><i class="bi bi-briefcase-fill"></i>&nbsp;Your Role</span>
          <span><i class="bi bi-people-fill"></i>&nbsp;Your Organization</span>
          <span><i class="bi bi-geo-alt-fill"></i>&nbsp;Your Location</span>*/}
          <h4>Contact</h4>
          {/*<span><i class="bi bi-phone-fill"></i>&nbsp;Your Phone Number</span>*/}
          <span><i class="bi bi-envelope-fill"></i>&nbsp;Your Email</span>
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
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's 
                standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a 
                type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining 
                essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum 
                passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
            </div>
          </div>
          <div className="Spacer"></div>
          {/* connections */}
          <div id="connectionsContainer">
            <h1>Connections</h1>
            <div className="Spacer"></div>
            <div id="connectionsList">
              <Connection />
              <div className="Spacer"></div>
              <Connection />
              <div className="Spacer"></div>
              <Connection />
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}