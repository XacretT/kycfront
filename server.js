const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require ('body-parser');

const users = require('./routes/api/users');
const form = require('./routes/api/form');
const kyc = require('./routes/api/kyc');

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to DB
mongoose
    .connect(db)
    .then(() => console.log(`MongoB Connected at ${db}`))
    .catch (err => console.log(err));
    
app.get('/', (req,res) => res.send('Hello') );

//User routes
app.use('/api/users', users);
app.use('/api/form', form);
app.use('/api/kyc', kyc);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`)); 