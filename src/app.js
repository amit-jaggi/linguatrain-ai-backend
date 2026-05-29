// app.js file is used for creating a server

const express = require('express'); // requiring/importing the express-package
require('dotenv').config();
const cors = require('cors');


const chatRoutes = require('./routes/chat.routes');
const userRoutes = require('./routes/user.routes');
const tipRoutes = require('./routes/tip.routes');


const app = express(); // creating an server-instance when calling an express


// middleware(s)
app.use(cors());
app.use(express.json());


// routes
app.use('/chat', chatRoutes);
app.use('/user', userRoutes);
app.use('/tip', tipRoutes);


app.get('/', (req, res) => {
  res.send('AI Training Bot Backend Running');
});


module.exports = app; // exporting the app-module