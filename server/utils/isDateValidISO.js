/** Check if a date is valid ISO format */
const isDateValidISO = (date) => {
    return date.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/);
}

module.exports = isDateValidISO;