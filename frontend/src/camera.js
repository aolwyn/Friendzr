import React from 'react';
import Webcam from "react-webcam";
import './camera.css';

export default function Camera () { 
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
      a.click();

      /*line above auto clicks the download thing. need to figure out how to store and upload right from here */
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

 
  /*TO DO:
  - need to add connect and skip button functionality (const handle...)
  - error handling

   const handleSkipClick = React.useCallback() => {
    (add functionality?)

    onClick = {handleConnectButtonClick}
    onClick = {handleSkipButtonClick}
  };

  */

  return (
    <div className="camera">
      <h1> Record your profile video below! </h1>
      <Webcam audio={true} ref={webcamRef} />
      {capturing ? (
      <button id="stopButton" onClick={handleStopCaptureClick}>Stop Capture</button>
    ) : (
      <button id="startButton" onClick={handleStartCaptureClick}>Start Capture</button>
    )}
    {recordedChunks.length > 0 && (
      <button id="downloadButton" onClick={handleDownload}>Download</button>
    )}

    <button class="connectButton" >Connect</button> 

    <button class="skipButton" >Skip</button>

    </div>
  );
};