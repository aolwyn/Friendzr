import express from 'express';
const authRouter = express.Router();
import { VerifyUser } from '../server_util/authentication.js';
import db from '../database.js';

// TODO(Noah): Add middleware here or do something more intelligent.
authRouter.post('/app', (req, res) => {
    // First we check the cookie headers, grab the JWT, and check if the 
    // user is valid
    let jwt = req.body.jwt;
    //console.log(`JWT received:${JSON.stringify(jwt)}`);
    //console.log("Cookie header", req.get('Cookie'));
    VerifyUser(jwt).then(() => {
      res.send("You are authenticated");
    }).catch(() => {
      res.status(401).send("You are not authenticated");
    });


});

<<<<<<< HEAD
router.post('/create-user', (req, res) => {
    let user = {
        uid: req.body.uid,
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        bio: req.body.bio,
        is_online: req.body.is_online,
        created_at: req.body.created_at,
        updated_at: req.body.updated_at
    };
    
    db('users').insert(user).returning('*').into('users').then(function(data) {
      res.send(data);
    });
  });

  router.put('/update-user', (req, res) => {
    let user = {
      uid: req.body.uid,
      email: req.body.email,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      video_uri: req.body.video_uri,
      photo_uri: req.body.profile_uri,
      bio: req.body.bio,
      is_online: req.body.is_online,
      created_at: req.body.created_at,
      updated_at: req.body.updated_at
    };

    console.log(user.uid);
    if(user.uid != null || user.uid != undefined) {
    db('users').where({uid: user.uid}).update({
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      video_uri: user.video_uri,
      photo_uri: user.photo_uri,
      bio: user.bio,
      is_online: user.is_online,
      updated_at: user.updated_at
    }).returning('*').then(function(data) {
        res.send(data);
    });
  } else {
    res.status(400).send("User not found");
  }
  });


  router.delete('/delete-user', (req, res) => {
    let user = {
      uid: req.body.uid
    };

    if(user.uid != null || user.uid != undefined) {
      db('users').del().where('uid', '=', user.uid).then(function(data) {
        if(data == 0) {
            res.send("User deleted");
        } else {
            res.send("User not deleted");
        }
    });
    } else {
      res.status(400).send("User not found");
    }
  });

  router.post('/get-user', (req, res) => {
    let user = {
      uid: req.body.uid
    };
    console.log(user.uid);
    if(user.uid != null || user.uid != undefined) {
      db('users').where('uid', '=', user.uid).then(function(data) {
        res.send(data);
    });
    } else {
      res.status(400).send("User not found");
    }
  });

export default router;
=======
export default authRouter; 
>>>>>>> 7eb03666b1a7040513df2953edd65c515fb5ba1a
