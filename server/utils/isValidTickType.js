// Check if the Tick Type is valid
const isValidTickType = (tickType) => {
    return ['Attempt', 'Hangdog', 'Redpoint'].includes(tickType);
}

module.exports = isValidTickType;