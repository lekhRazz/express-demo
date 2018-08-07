const startupDebugger=require('debug')('app:startup');
const dbDebugger=require('debug')('app:db');
const config=require('config');
const helmet=require('helmet');
const courses=require('./routes/courses');
const homes=require('./routes/home');
const morgan=require('morgan');
const Joi=require('joi');
const logger=require('./middleware/logger');
const authentication=require('./authentication');
const express=require('express');
const app=express();

// console.log(`NODE_ENV:${process.env.NODE_ENV}`);
// console.log(`app:${app.get('env')}`);


//Configuration
// console.log('Application Name:' +config.get('name'));
// console.log('Mail Server:' +config.get('mail.host'));
// console.log('Mail Password:' +config.get('mail.password'));


app.set('view engine','pug');
app.set('views','./views')
app.use(express.json()); //req.body
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses',courses);
app.use('/',homes);
// app.use(logger);
// app.use(authentication);


if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled.......');
}

//DB  work
dbDebugger('Connected to the database');


//PORT 
const port=process.env.PORT || 3000;
app.listen(port,() => console.log(`listenening on port ${port}`));

