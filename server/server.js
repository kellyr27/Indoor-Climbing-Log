const express = require('express');
const app = express();
const port = 5000;

app.get('/api', (req, res) => {
    res.json({"users": ["Ally", "Bobby", "Cindy"]})
});

app.listen(port, () => console.log(`Listening on port ${port}`));