import React, { useState } from 'react';
import Webcam from "react-webcam";
import axios from 'axios';
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./config.js";
initializeApp(firebaseConfig);
const auth = getAuth();

function debug(){

}

function sendVideo(video) {
  console.log("Sending video");
 
  auth.currentUser.getIdToken(true).then(function(idToken) {
    console.log(idToken);
    axios.post('http://localhost:5000/api/user/csubmit', {
      busboy: video,
      jwt: idToken,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  });

  // auth.currentUser.getIdToken(true).then(function(idToken) {
  //   axios.post('http://localhost:5000/api/video', {
  //     busboy: video.target.files[0],
  //     jwt: idToken
  //   });
  // });
  //csubmit
  return false;
}

export default function Camera () {
  const [video, setVideo] = useState(true);

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
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const handleDownload = React.useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm"
      });
      const url = URL.createObjectURL(blob);
      setVideo(url);
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  return (
    <div>
      <button  onClick={debug}>Click</button>
      <form id="video" onSubmit={sendVideo(video)} action="#" encType='media/webm'>
        <input type='file' name='busboy' />
        <input type='submit'></input>
      </form>
      <h1> Say Cheese! </h1>
      <Webcam audio={false} ref={webcamRef} />
      {capturing ? (
      <button onClick={handleStopCaptureClick}>Stop Capture</button>
    ) : (
      <button onClick={handleStartCaptureClick}>Start Capture</button>
    )}
    {recordedChunks.length > 0 && (
      <button onClick={handleDownload}>Download</button>
    )}
    </div>
  );
};

  


