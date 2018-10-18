const express=require('express');
const error=require('../middleware/error');
const courses=require('../routes/courses');
const homes=require('../routes/home');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users=require('../routes/users');
const auth=require('../routes/auth');

module.exports=function(app){

    app.use(express.json()); //req.body
    app.use(express.urlencoded({ extended: true}));
    app.use(express.static('public'));
    // app.use(helmet());
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

}