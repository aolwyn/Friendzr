import express from 'express';
import morgan from 'morgan';
// TODO: What is cors?????
import cors from 'cors';
import {CreateUserWithEmailAndPassword} from './server_util/authentication.js';
const port = 5000;

const app = express();
app.use(cors());
app.use(morgan('dev')); // give back development data,
app.use(express.json()) // for parsing application/json

// WHEN WE ARE DONE BUILDING THE PROJECT
// app.use(express.static(`${__dirname}/build`));
// app.get(/.*/, (req, res) => res.sendFile(`build/index.html`, { root: __dirname }));
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// TODO(Noah): Routes or something?

// TODO(Noah): Add end-to-end encryption to this to make the login
// secure!
app.post('/login', function(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    console.log(email, password);
    res.send({email, password});
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})