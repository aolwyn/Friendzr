// In reference to https://stackoverflow.com/questions/23691194/node-express-file-upload

import express from 'express';
const userRouter = express.Router();
//import path from 'path';     //used for file path
import db from '../database.js'; // Import the database.
import path from 'path';
import { VerifyUser } from '../server_util/authentication.js';

let __dirname = path.resolve(path.dirname(''));

userRouter.post('/video', (req, res) => {
    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    sampleFile = req.files.file;
    uploadPath = __dirname + '/public/videos/' + sampleFile.name;

    sampleFile.mv(uploadPath, function(err) {
        if (err)
          return res.status(500).send(err);
    
        res.send('File uploaded!');
      });

    //add req.uid and stuff

    // db('users').where({uid: user.uid}).update({
    //     video_uri: uri
    // }).returning('*').then(function(data) { /* who knows if we need this */
    //     res.send(data);
    // });
});

export default userRouter;