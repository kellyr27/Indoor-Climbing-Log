// Convert CSV file to list of objects
const csv = require('csv-parser');
const fs = require('fs');

const results = [];

fs.createReadStream('./uploadRoutes.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        console.log(results.length);
        // Do something with the list of objects
    });