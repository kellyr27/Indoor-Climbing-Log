const XLSX = require('xlsx');
const path = require('path');
const Ascent = require('../models/Ascent');
const Route = require('../models/Route');

const excelDateToJSDate = (serial) => {
    const utc_days  = Math.floor(serial - 25569);
    const utc_value = utc_days * 86400;                                        
    const date_info = new Date(utc_value * 1000);

    const fractional_day = serial - Math.floor(serial) + 0.0000001;

    let total_seconds = Math.floor(86400 * fractional_day);

    const seconds = total_seconds % 60;
    total_seconds -= seconds;

    const hours = Math.floor(total_seconds / (60 * 60));
    const minutes = Math.floor(total_seconds / 60) % 60;

    // Create the Date object in UTC
    return new Date(Date.UTC(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds));
};

// Load the Excel file
const uploadAll = async () => {
    const workbook = XLSX.readFile(path.resolve(__dirname, 'Climbing Log - Copy.xlsx'));

    // Get the first sheet
    const ascentsSheet = workbook.SheetNames[0];
    const routesSheet = workbook.SheetNames[1];
    const ascentsWorksheet = workbook.Sheets[ascentsSheet];
    const routesWorksheet = workbook.Sheets[routesSheet];

    // // Convert the sheet to JSON
    const ascentsJsonData = XLSX.utils.sheet_to_json(ascentsWorksheet);
    const routesJsonData = XLSX.utils.sheet_to_json(routesWorksheet);

    // // Convert the JSON data to a list of objects
    const routesObjectsList = routesJsonData.map(item => {
        return item;
    });

    const ascentsObjectsList = ascentsJsonData.map(item => {
        // Save the route name and grade
        const route = routesObjectsList.find(route => route.Id === item.RouteId);
        const routeName = route.Name;
        const routeGrade = route.Grade;
        const routeColour = route.Colour;
        item.Date = excelDateToJSDate(item.Date);
        
        if (item.Notes === undefined) {
            item.Notes = '';
        }
        // Convert excel date to JS date



        return {...item, routeName, routeGrade, routeColour};
    });

    for (const ascent of ascentsObjectsList) {

        const {
            routeName,
            routeGrade,
            routeColour,
            TickType,
            Date,
            Notes,
        } = ascent;

        try {
            const route = await Route.findOne({ where: { Name: routeName } });
    
            if (!route) {
    
                const newRoute = await Route.create({ 
                    Name: routeName, 
                    Grade: routeGrade, 
                    Colour: routeColour 
                });
                const newAscent = await Ascent.create({ 
                    RouteId: newRoute.id, 
                    TickType: TickType, 
                    Date: Date, 
                    Notes: Notes,  
                });
            } else {
                const newAscent = await Ascent.create({ 
                    RouteId: route.id, 
                    TickType: TickType, 
                    Date: Date, 
                    Notes: Notes 
                });
            }

        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = {uploadAll};
// Upload the routes to the database
