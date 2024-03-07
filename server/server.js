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

sequelize.sync().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => {
    console.error('Unable to sync database:', error);
});
