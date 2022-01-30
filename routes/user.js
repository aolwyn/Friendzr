// In reference to https://stackoverflow.com/questions/23691194/node-express-file-upload

import express from 'express';
const userRouter = express.Router();
//import path from 'path';     //used for file path
import fs from 'fs-extra';       //File System - for file manipulation
import db from '../database.js'; // Import the database.

import { VerifyUser } from '../server_util/authentication.js';

userRouter.post('/video', (req, res) => {;
    //upload file to server
    console.log(req.files);
});
// camera submit.
userRouter.post('/csubmit', (req, res) => {
    let jwt = req.body.jwt;
    console.log(req.body.jwt);
    VerifyUser(jwt).then((uid) => {

        // We basically want to save to the disk the 
        // file that we are being sent.

        // Like, we know that we are going to get video/webm
        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log("Uploading: " + filename);

            //Path where image will be uploaded
            let uri = __dirname + '/img/' + filename
            fstream = fs.createWriteStream(uri);
            file.pipe(fstream);
            fstream.on('close', function () {    
                console.log("Upload Finished of " + filename);              
                res.redirect('back');           //where to go next
            });

            // Next, once we are done storing the file, we need to store into the SQL database
            // precisely where this user should find their video on the file system.
            // get and set user by uid
            db('users').where({uid: user.uid}).update({
                video_uri: uri
            }).returning('*').then(function(data) { /* who knows if we need this */
                res.send(data);
            });

        });

    }).catch((e) => {
        res.status(401).send("You are not authenticated");
    })

});

export default userRouter;