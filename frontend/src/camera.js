import React, { useState } from 'react';
import Webcam from "react-webcam";
import axios from 'axios';
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./config.js";
import './camera.css';
import {Link} from "react-router-dom";
initializeApp(firebaseConfig);
const auth = getAuth();

export default function Camera () {
  const [stop, setStop] = useState(false);
  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);
  const [capturing, setCapturing] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);

  const sendData = () => {
    /*
      NOTE(Noa): As of right now, the problem as we see it is such:
        - handleDownload will set some of the react state.
        - we basically cannot guarantee that this react state is updated appropriately.
          - the real question is, why are we using this react state? Is this not just an 
          intermediate variable?
    */
    return new Promise((resolve, revoke) => {
      let video = handleDownload();
      const formData = new FormData();
      formData.append('file', video);
      console.log("videoFile:", video);
      auth.currentUser.getIdToken(true).then(function(idToken) {
        axios.post('http://localhost:5000/api/user/video', formData, {
          jwt: idToken,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(() => resolve()).catch((e) => revoke());
      });
    });
  }
    
  const handleStartCaptureClick = React.useCallback(() => {
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm"
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  /*
    NOTE(Noah): The big question then remains: will the react state be stable
    at the time of calling the handleDownload??? 
  */  

  // NOTE(Noah): React.useCallback is a memoized thing. So if the same inputs 
  // are seen again, it uses the cached return value to speeed things up.
  const handleDataAvailable = React.useCallback(
    ({ data }) => {
      console.log('handleDataAvailable was called. mediaRecording is flushing chunks');
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [mediaRecorderRef, setRecordedChunks]
  );

  const handleStopCaptureClick = React.useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false); // Just boolean, don't care about synchronous state
    setStop(true); // Just boolean, don't care about synchronous state
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const handleDownload = () => {

    console.log("recordedChunks at time of handleDownload", recordedChunks);

    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      }); // Not async.
      const myFile = new File([blob], auth.currentUser.uid + ".webm", {
        type: "video/webm",
      }); // Not async.
      console.log("File from blobs", myFile);
      // setRecordedChunks([]);
      return myFile;
    }
  }

  // NOTE(Noah): We are making the assumption that the mediaRecorder, after a stop, will
  // only make one event.
  // and thus if we are in this call and the mediaRecorder is not recording, we are good to
  // send over data to the backend.  
  React.useEffect(() => {
    // Need to check that the mediaRecorder is done. Might be the case that it flushes early.
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'inactive') {
      sendData().then(() => {
        // TODO: Log to the user that their file has been uploaded.
        // Also maybe include like, a loading icon to indicate that the video
        // is being sent to the server.

        // Now we tell React Router to redirect back to '/'
        console.log('Video uploaded to backend');

      }).catch((e) => console.error('Video not uploaded to backend'));  
    } 
  }, [recordedChunks]);

  return (
    <div className="camera">
      <h1> Record your profile video below! </h1>
      <Webcam audio={true} ref={webcamRef} />
      <br></br>
      {capturing ? (<button id="stopButton" value="Stop Capture" onClick={(e) => {
        e.preventDefault();
        handleStopCaptureClick();
      }} />) : 
      (<button id="startButton" value="Start Capture" onClick={(e) => {
        e.preventDefault();
        handleStartCaptureClick();
      }}/>)}
    </div>
  );
};