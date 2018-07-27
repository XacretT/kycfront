const express = require('express');
const mongoose = require('mongoose');

const app = express();

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to DB
mongoose
    .connect(db)
    .then(() => console.log(`MongoB Connected at ${db}`))
    .catch (err => console.log(err));

app.get('/', (req,res) => res.send('H222ell22323o') );

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`)); 