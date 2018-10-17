const error=require('./middleware/error');
const startupDebugger=require('debug')('app:startup');
require('express-async-errors');
const winston=require('winston');
const config=require('config');
const dbDebugger=require('debug')('app:db');
const mongoose=require('mongoose');
const helmet=require('helmet');
const Joi = require('joi');
Joi.objectId=require('joi-objectid')(Joi);

//Import routers
const courses=require('./routes/courses');
const homes=require('./routes/home');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users=require('./routes/users');
const auth=require('./routes/auth');

const morgan=require('morgan');
const logger=require('./middleware/logger');
const express=require('express');
const app=express();


winston.add(winston.transports.File,{ filename: 'logfile.log'});
// console.log(`NODE_ENV:${process.env.NODE_ENV}`);
// console.log(`app:${app.get('env')}`);


//Configuration
// console.log('Application Name:' +config.get('name'));
// console.log('Mail Server:' +config.get('mail.host'));
// console.log('Mail Password:' +config.get('mail.password'));

mongoose.connect('mongodb://localhost/expressdemo')
    .then(()=>console.log('Connected to MongoDB...'))
    .catch(err=> console.log('Could not connect to MongoDB.....'));

app.set('view engine','pug');
app.set('views','./views')


app.use(express.json()); //req.body
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses',courses);
app.use('/',homes);
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users',users);
app.use('/api/auth',auth);

//error handler middleware
app.use(error);



if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled.......');
}

//DB  work
// dbDebugger('Connected to the database');

if(!config.get('jwtPrivateKey')){
    console.log('FATAL ERROR:jwtPrivateKey is not defined.');
    process.exit(1);
}

//PORT 
const port=process.env.PORT || 3000;
app.listen(port,() => console.log(`listenening on port ${port}`));

