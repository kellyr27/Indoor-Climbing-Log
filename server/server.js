require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db');
const cors = require('cors');

const {uploadAll} = require('./uploads/uploadDb');

// controllers
const routes = require('./routes/routes');
const ascents = require('./routes/ascents');
const stats = require('./routes/stats');

// models
const Route = require('./models/Route');
const Ascent = require('./models/Ascent');


// middleware
const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: ['http://localhost:3000', 'https://indoor-climbing-log.onrender.com/'],
}));

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

    if (code === process.env.CODE) {
        res.status(200).json({token: process.env.TOKEN});
    } else {
        res.status(401).json({message: 'Unauthorized'});
    }

});

// app.post('/api/upload', async (req, res) => {
//     try {
//         // Clear the database
//         await Route.destroy({ where: {} });
//         await Ascent.destroy({ where: {} });


//         await uploadAll();
//         res.status(200).send('Data uploaded successfully');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('An error occurred while uploading data');
//     }
// })

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => {
    console.error('Unable to sync database:', error);
});
