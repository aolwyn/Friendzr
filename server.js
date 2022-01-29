import express from 'express';
import morgan from 'morgan';
// TODO: What is cors?????
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.js';


const port = 5000;

const app = express();
app.use(cors());
app.use(cookieParser()); // populates req.cookies.
app.use(morgan('dev')); // give back development data,
app.use(express.json()) // for parsing application/json

// TODO(Noah): WHEN WE ARE DONE BUILDING THE PROJECT
// app.use(express.static(`${__dirname}/build`));
// app.get(/.*/, (req, res) => res.sendFile(`build/index.html`, { root: __dirname }));
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/auth', authRouter);

// TODO(Noah): Add middleware here or do something more intelligent.


app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

/*
app.post('/login', function(req, res) {
    let email = req.body.email;
    let password = req.body.password;

    /* So, what is going on with the cookies here?
    They are sent on each request, apparently.
    We can set expiration times for cookies.
      - So the auth flow is kind of like this, then. The browser client
      logs in. The server gives it back a cookie. And the browser client
      continues each request with that cookie.
      - And this cookie expires after some time, maybe a few months, lets say.

    Seems that we can use the Set-Cookie header to store a cookie in the client.

    We should always be seing session cookies.

    We want to update this to make it secure and to prevent 
    session fixation attacks: https://developer.mozilla.org/en-US/docs/Web/Security/Types_of_attacks#session_fixation
    SignInWithEmailAndPassword(email, password)
    .then((cookie) => {

    }).catch(() => {
      // what do we even do here lol.
    });
    
    // res.send({email, password});
});
*/