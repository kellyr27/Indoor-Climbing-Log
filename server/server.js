require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db');
const cors = require('cors');

const {uploadAll} = require('./uploads/uploadDb');

// models
const Route = require('./models/Route');
const Ascent = require('./models/Ascent');


// middleware
const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: ['http://localhost:3000', 'https://indoor-climbing-log.onrender.com/'],
}));

// Set middleware of CORS 
app.use((req, res, next) => {

    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://indoor-climbing-log.onrender.com/"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Private-Network", true);
    //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
    res.setHeader("Access-Control-Max-Age", 7200);
  
    next();
});


// global variables
const PORT = 5000;

// controllers
const routes = require('./routes/routes');
const ascents = require('./routes/ascents');
const stats = require('./routes/stats');

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
