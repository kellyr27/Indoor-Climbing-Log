const { format } = require('date-fns');

// Function to convert date object to d mmm yyyy format
const dateToDisplay = (date) => {
    try {
        return format(new Date(date), 'd MMM yyyy');
    } catch (error) {
        return null
    }
}

export default dateToDisplay;