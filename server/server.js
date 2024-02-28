const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db');

// controllers
const routes = require('./routes/routes');
const ascents = require('./routes/ascents');

// middleware
const app = express();
app.use(bodyParser.json());

// global variables
const PORT = 5000;
const username = 'kelly'
const password = 'lollipop1'

// Routes
// TODO: Fix this
app.use('/api', routes);
app.use('/api', ascents);

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
