const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const config= require('./src/config')
const cors = require('cors');
const PORT = process.env.PORT || 3003;
app.use(bodyparser.json());

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);  //for error
app.use(cors());
const passport = require('passport');
app.use(passport.initialize())

app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})
app.get('/', (req, res) => {
    res.json({
        message: "Hello World! 2"
    })
})
const jwt = require('jsonwebtoken')

mongoose.connect(process.env.databaseURL, (err, bd) => {
    if (err) {
        console.log('Unable to connect mongoDB');
    }
    console.log('connected to mongoDB');

 
})


module.export = app;

const routes = require('./src/api/routes');
const ROUTE_PREFIX = '/api/v1';
app.use(ROUTE_PREFIX, routes);



//initialize passport service
const {passportService} = require('./src/services');
passportService.initializePassport();