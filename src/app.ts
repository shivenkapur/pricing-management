const express = require('express');
const basicAuth = require('express-basic-auth');
const bodyParser = require('body-parser');
const cors = require('cors');

import bookingAutomation from './api/bookingAutomation';

const app = express();

/*app.use('/createPoll', basicAuth({
  challenge: true,
  realm: 'now-basic-auth.node-express',
  users: { 'admin': 'kapur' },
  unauthorizedResponse: 'Restricted area, please login'
}));*/

app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/bookingAutomation', bookingAutomation);

const port = 3000;
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

module.exports = app;
