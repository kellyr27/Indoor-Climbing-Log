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

// Send a database backup to an email
// app.post('/send-db-backup', async (req, res) => {
//     console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS)
//     let transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: process.env.EMAIL_USER,
//             pass: process.env.EMAIL_PASS
//         }
//     });

//     let mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: 'kellyriz27@gmail.com',
//         subject: 'Database Backup',
//         text: 'Find attached the backup of the database.',
//         // attachments: [
//         //     {
//         //         path: './db/database.sqlite3'
//         //     }
//         // ]
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.log(error);
//             res.status(500).send('Error while sending email');
//         } else {
//             console.log('Email sent: ' + info.response);
//             res.send('Email sent successfully');
//         }
//     });
// });