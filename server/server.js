require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db');

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

// Get the Token
app.post('/api/token', (req, res) => {
    const {code} = req.body;

    console.log(code, process.env.TOKEN)

    if (code === process.env.CODE) {
        res.status(200).json({token: process.env.TOKEN});
    } else {
        res.status(401).json({message: 'Unauthorized'});
    }

});

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => {
    console.error('Unable to sync database:', error);
});
