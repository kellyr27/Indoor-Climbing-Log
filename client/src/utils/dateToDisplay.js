const { format } = require('date-fns');

// Function to convert date object to d mmm yyyy format
const dateToDisplay = (date) => {
    return format(new Date(date), 'd MMM yyyy');
}

export default dateToDisplay;