import React from 'react';
import Webcam from "react-webcam";
import './camera.css';


const onSkipClick = React.useCallback() => {
/*Insert Database Access to change to Next User*/ 

}

const onConnectClick = React.useCallback() =>{
/* InsertDatabase Access to change to Messenger Page in Connection with Connected User */
}

const onExitClick = React.useCallback() =>{
/*Insert Exit from Page to Profile */

}


function ProfilePage(){
    return{
     
        <div className='ProfilePage'> 
        /* Put Profile person's name in header: */
       <h1></h1>

        /* Embed the video:
        <video id="vid1" class="video-js">
        <source src="//vjs.zencdn.net/v/oceans.mp4">
        </video>
         */

       <button class="connectButton"onClick={onConnectClick}>Connect</button> 

       <button class="skipButton" onClick={onSkipClick} >Skip</button>

       <button onClick={onExitClick}> Exit</button>
    };
}






