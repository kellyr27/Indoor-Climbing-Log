// Check if the Tick Type is valid
const isValidTickType = (tickType) => {
    return ['Attempt', 'Hangdog', 'Redpoint', 'Flash'].includes(tickType);
}

module.exports = isValidTickType;