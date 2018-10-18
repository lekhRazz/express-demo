const startupDebugger=require('debug')('app:startup');
const dbDebugger=require('debug')('app:db');
const helmet=require('helmet');
const morgan=require('morgan');
const winston=require('winston');
const express=require('express');
const app=express();


require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();


// console.log(`NODE_ENV:${process.env.NODE_ENV}`);
// console.log(`app:${app.get('env')}`);


//Configuration
// console.log('Application Name:' +config.get('name'));
// console.log('Mail Server:' +config.get('mail.host'));
// console.log('Mail Password:' +config.get('mail.password'));


app.set('view engine','pug');
app.set('views','./views')





if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled.......');
}
//PORT 
const port=process.env.PORT || 3000;
app.listen(port,() => winston.info(`listenening on port ${port}`));

