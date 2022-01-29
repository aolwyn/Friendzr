import express from 'express';
const router = express.Router();

router.post('/app', (req, res) => {
    // First we check the cookie headers, grab the JWT, and check if the 
    // user is valid
    let jwt = req.body.jwt;
    console.log(`JWT received:${JSON.stringify(jwt)}`);
    //console.log("Cookie header", req.get('Cookie'));
    VerifyUser(jwt).then(() => {
      res.send("You are authenticated");
    }).catch(() => {
      res.status(401).send("You are not authenticated");
    });
  
  });

  export default router;