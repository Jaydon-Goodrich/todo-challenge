const express = require('express');
const path = require('path');

const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(require('./routes'));

app.get('/', (req, res) => {
    res.send('HELLO WORLD');
})

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}!`);
    });
});

