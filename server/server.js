require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db');
const nodemailer = require('nodemailer');

// controllers
const routes = require('./routes/routes');
const ascents = require('./routes/ascents');
const stats = require('./routes/stats');

// middleware
const app = express();
app.use(bodyParser.json());

// global variables
const PORT = 5000;

// Routes
// TODO: Fix this
app.use('/api', routes);
app.use('/api', ascents);
app.use('/api', stats);

// Allows a User to login
app.post('/login', (req, res) => {
    const { username: reqUsername, password: reqPassword } = req.body;

    if (reqUsername === username && reqPassword === password) {
        res.status(200).json({message: 'Login successful'});
    } else {
        res.status(401).json({message: 'Login failed'})
    }
});

sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => {
    console.error('Unable to sync database:', error);
});
