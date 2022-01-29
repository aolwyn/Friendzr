const express = require('express');
const morgan = require('morgan');
// What is cors?????
var cors = require('cors');
const port = 5000;

const app = express();
app.use(cors());
app.use(morgan('dev')); // give back development data,

// WHEN WE ARE DONE BUILDING THE PROJECT
// app.use(express.static(`${__dirname}/build`));
// app.get(/.*/, (req, res) => res.sendFile(`build/index.html`, { root: __dirname }));
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})