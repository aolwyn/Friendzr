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
  const [video, setVideo] = useState('');
  const [stop, setStop] = useState(false);

  const onSubmit = async e => {
    e.preventDefault();
    setStop(false);
    handleDownload();
  }

  const sendData = async () => {
    const formData = new FormData();
    formData.append('file', video);
    console.log(video)
    auth.currentUser.getIdToken(true).then(function(idToken) {
      axios.post('http://localhost:5000/api/user/video', formData, {
        jwt: idToken,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    });
  }

  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);
  const [capturing, setCapturing] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);
    
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

  const handleDataAvailable = React.useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = React.useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
    setStop(true);
    
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const handleDownload = React.useCallback( async () => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const myFile = new File([blob], auth.currentUser.uid + ".webm", {
        type: "video/webm",
      });
      setRecordedChunks([]);
      setVideo(myFile);
    }
  }, [recordedChunks]);

  
  React.useEffect( async () => {
    setTimeout( ()=>{  }, 100);
    sendData();
  }, [stop, video]);

  return (
    <div className="camera">
      <form id="video" onSubmit={onSubmit} action="#" encType='media/webm'>     
        <h1> Record your profile video below! </h1>
          <Webcam audio={true} ref={webcamRef} />
          <br></br>
          {capturing ? (<input type="button" id="stopButton" value="Stop Capture" onClick={handleStopCaptureClick} />) : (<input type="button" id="startButton" value="Start Capture" onClick={handleStartCaptureClick}/>)}
          {recordedChunks.length > 0 && (<button type="submit" id="#downloadButton"> <Link to="/"> Next </Link></button>)}
      </form>
    </div>
  );
};