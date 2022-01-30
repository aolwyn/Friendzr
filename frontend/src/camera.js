import React, { useState } from 'react';
import Webcam from "react-webcam";
import axios from 'axios';
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./config.js";
initializeApp(firebaseConfig);
const auth = getAuth();

export default function Camera () {
  const [video, setVideo] = useState('');

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', video);

    auth.currentUser.getIdToken(true).then(function(idToken) {
      axios.post('http://localhost:5000/api/user/video', formData, {
        jwt: idToken,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    });
  }

  const onChange = e => {
    setVideo(e.target.files[0]);
  };

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
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "react-webcam-stream-capture.webm";
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  return (
    <div>
      <button onClick={debug}>Click</button>
      <form id="video" onSubmit={onSubmit} action="#" encType='media/webm'>
        <input type='file' name='video' onChange={onChange} />
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

  


