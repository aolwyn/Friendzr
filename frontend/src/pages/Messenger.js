import React from "react";
//var wrap = require('word-wrap');
import { useState, useEffect } from 'react';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

// TODO(Noah): actually consider the online data to render the green circle things.
// Do this for both inside the Connections component and the DirectMessenger component.
class Connections extends React.Component {
  constructor() {
    super();
    this.state = {
      // Minified array of the connections that the user has.
      connections: [
        { uid: 12, name: "Bob", profile_uri: "/bob_profile.png", online: false, 
          last_msg: { 
            timestamp: "20220129",
            message: "I am Bob from Marketing and I am not happy with your performance!"
          } 
        },
        { uid: 13, name: "Jim", profile_uri: "/jim_profile.png", online: false, 
          last_msg: { 
            timestamp: "20220129",
            message: "Hi there!"
          } 
        },
        { uid: 14, name: "Carol", profile_uri: "/carol_profile.png", online: true, 
          last_msg: { 
            timestamp: "20220129",
            message: "Hey so I was looking for hot singles in the area and you seem to be both\
            hot and single. How ya doin ;)"
          } 
        },
        { uid: 15, name: "Kevin", profile_uri: "/kevin_profile.png", online: true, 
          last_msg: { 
            timestamp: "20220129",
            message: "The Quantum factorial exponential bean is one to remember. And it certainly\
            BEANSSS you to the core. Namaste cunt."
          } 
        }
      ]
    };
  }

  render() {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#CFCFCF"
      }}>
        {this.state.connections.map((connection, index) => (
          <button key={index} onClick={ () => console.log(connection.name) }>
            <div style={{
              width:100,
              display: "flex",
              flexDirection: "row"
            }}>
              <img src={connection.profile_uri} />
              <span>{connection.name}</span>
              <span>{connection.last_msg.timestamp}</span>
            </div>
            <span>{connection.last_msg.message.slice(0, 10)}</span>
          </button>
        ))}
      </div>
    )
  }

}

// TODO(Noah): Make the textbox size increase on line-wrap.
// i.e., make it a SmartTextBox!!!!!
function SmartTextbox(props) {

  /*let lines = [];
  if (props.usrMsg) {
      let wrappedText = wrap(props.usrMsg, 400);
      console.log('wrappedText', wrappedText);
      lines = wrappedText.split("\n");
  }*/

  return (
    <div style={{

    }} >
      <textarea
        rows={1} 
        className="form-control"
        value={props.usrMsg} onChange={(e) => props.setUsrMsg(e.target.value)} 
        autoFocus
        style={{
          backgroundColor: "lightgrey",
          resize: "none",
          dataGramm: "false", // NOTE(Noah): Was trying to remove grammarly. But seems with no luck.
          dataGrammEditor: "false",
          dataEnableGrammarly: "false"
        }} 
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            console.log('textarea submit')
          }
        }}
      />
    </div>
  );
}

// TODO(Noah): Fix the fact that messages on the right-hand side are like,
// not symmetrical with the 5px margin that the left messages have.
class DirectMessenger extends React.Component {
  constructor() {
    super();
    this.lastMessage = React.createRef();  
    this.state = {
      myUid: 16,
      who: {
        uid: 12, name: "Bob", profile_uri: "/bob_profile.png", online: false
      },
      messages: [
        { from: 12, contains: "Yo." },
        { from: 16, contains: "Hey man." },
        { from: 12, contains: "Doing well?" },
        { from: 16, contains: "Couldn't be better. How are you doing?" },
        { from: 12, contains: "Man. I just got back from a CRAZY run." },
        { from: 16, contains: "Really? What distance did you log?" },
        { from: 16, contains: "Don't tell me you ran another 20k bro..." },
        { from: 12, contains: "You know it brother."},
        { from: 12, contains: "Just another day in the life." },
        { from: 16, contains: "fuck....." },
        { from: 16, contains: "fuck....." },
        { from: 16, contains: "fuck....." },
        { from: 16, contains: "fuck....." },
        { from: 16, contains: "fuck....." },
        { from: 16, contains: "fuck....." },
        { from: 16, contains: "fuck....." },
        { from: 16, contains: "fuck....." },
        { from: 16, contains: "fuck....." },
        { from: 16, contains: "fuck....." },
        { from: 16, contains: "fuck....." },
        { from: 16, contains: "fuck....." },
        { from: 16, contains: "fuck....." },
        { from: 16, contains: "fuck....." },
        { from: 16, contains: "fuck....." },
        { from: 16, contains: "fuck....." },
      ],
      usrMsg: ""
    }
  }

  componentDidMount() {
    this.lastMessage.current.scrollIntoView();
  }

  render() {
    
    return (
      
      <div style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}>
        {/* Top bar for whom I am messaging */}
        {/*<div style={{
          display: "flex",
          flexDirection: "row",
          padding: 20, 
          borderStyle: "solid"
        }}>
          <img src={this.state.who.profile_uri} />
          <span>{this.state.who.name}</span>
        </div>*/}
        
        {/* 
          The vertical scroll window showing the texts:
            - I think the simplest way to implement this is to go render, starting 
            from the top, oldest -> new.
            - Then we have to autoscroll the div to the as far as it can scroll. 
        */}

        {
        /* 
          So this should be like a container. Has some height. The whole height of the viewport.
          The actual message box is the very bottom portion of this window.
          What happens in that when the message box increases in height, we actually lose some of the container
          corresponding to the messages.
        */}
        <div style={{
            //overflow: "scroll",
            width: "inherit",
            overflow: "scroll",
            position: "static",
            paddingRight: 5,
            paddingTop: 5,
            paddingBottom: 5,
            borderStyle: "solid",
          }}>
            { 
              this.state.messages.map((message, index) => (
                <div key={index} style={{
                  position: "relative",
                  backgroundColor: "cyan",
                  padding:10,
                  marginLeft:5,
                  marginBottom:5,
                  marginTop:5,
                  maxWidth: 300,
                  borderRadius: 15,
                  left: (this.state.myUid == message.from) ? "100%" : 0,
                  transform: (this.state.myUid == message.from) ? "translate(-100%, 0)" : "translate(0,0)",
                }}>{message.contains}</div>
              ))
            }
          </div>
          {/* The bottom input bit for where the user will enter text
            to send to their friend / business associate. */}
          <textarea
            ref={this.lastMessage}
            rows={4} 
            className="form-control"
            value={this.state.usrMsg} onChange={(e) => this.setState({usrMsg: e.target.value})} 
            autoFocus
            style={{
              backgroundColor: "lightgrey",
              resize: "none",
              dataGramm: "false", // NOTE(Noah): Was trying to remove grammarly. But seems with no luck.
              dataGrammEditor: "false",
              dataEnableGrammarly: "false"
            }} 
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                console.log('textarea submit')
              }
            }}
          />
      </div>
    )
  }
}

export default function Messenger() {

  /*
  So, how the fuck is the messenger supposed to work?

  - Security concerns with messaging:
    - We basically do this thing called TODO: Asymetric Encryption.
      https://youtu.be/AQDCe585Lnc
      https://cloud.google.com/kms/docs/asymmetric-encryption#:~:text=Asymmetric%20encryption%20is%20the%20process,known%20as%20public%20key%20cryptography.
      - Problem Sinan says is that there might be a way to do something funky at the server level???
        - oof.
      - Apparently we want to be using like, RSA encryption.
      - Everyone has public and private key.
      - Can use public key to encrypt plaintext, then only private key will decrypt.
        - Can only be used for very small sizes of text. 
        - So we use to encrpyt a private key. 
          - So Alice can give Bob her private key. So they can just do communication afterwards.

  - TODO: REQUIREMENTS
    - I want to see that someone else is currently typing a message (...)
    - Be able to send utf8 strings.
    - See them, cascading left and right.
    - See connections
      - Last message.
      - If they are online.

  - Extra things to consider:
    - TODO(Noah): Optimize for many messages and many connections.
    - If there are many past messages (only want to load some).
    - If there are many connections that you have (only want to load some).

  */
  const { height, width } = useWindowDimensions();

  return (
    <div style={{
      height: "100vh"
    }}>
      <div style={{minHeight: 80}}></div>
      <div style={{
        display: "flex",
        flexDirection: "row",
        height: height - 80
      }}>
        <Connections />
        <DirectMessenger />
      </div>
    </div>
  );
}