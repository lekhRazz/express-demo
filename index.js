const config=require('config');
const helmet=require('helmet');
const morgan=require('morgan');
const Joi=require('joi');
const logger=require('./logger');
const authentication=require('./authentication');
const express=require('express');
const app=express();

// console.log(`NODE_ENV:${process.env.NODE_ENV}`);
// console.log(`app:${app.get('env')}`);


//Configuration
console.log('Application Name:' +config.get('name'));
console.log('Mail Server:' +config.get('mail.host'));
console.log('Mail Password:' +config.get('mail.password'));



app.use(express.json()); //req.body
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
app.use(helmet());
app.use(logger);
app.use(authentication);
if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log('Morgan enabled.......')
}

const courses =[
    { id:1,name:'course1'},
    { id:2,name:'course2'},
    { id:3,name:'course3'},
]

app.get('/',(req,res)=> {
    res.send('Hello world!!!!');

});

app.get('/api/courses', (req,res) => {
    res.send(courses);

});

app.get('/api/courses/:id',(req,res) =>{
   const course= courses.find(c => c.id === parseInt(req.params.id));
   if(!course) return res.status(404).send('The course with the given ID was not found');
   res.send(course);

});

app.get('/api/posts/:years/:month',(req,res) =>{
    res.send(req.params);
});

app.post('/api/courses/',(req,res) => {

    const { error }=validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);
   

    const course={
        id:courses.length+1,
        name:req.body.name

    };
    courses.push(course);
    res.send(course);
});
// app.post();
// app.put();
app.put('/api/courses/:id',(req,res) => {

        //Look up the course
        //If not existing return 404
        const course= courses.find(c => c.id === parseInt(req.params.id));
        if(!course) return res.status(404).send('The course with the given ID was not found');

        //Validate 
        //If invalid return 400
      const { error }=validateCourse(req.body);
        if(error) return res.status(400).send(error.details[0].message);

       course.name=req.body.name;
       res.send(course);
        //update course
        //return updated course
});
// app.delete();
app.delete('/api/courses/:id', (req,res) => {
    //Look up the course
    //Not exitsting,return 404
    const course= courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course with the given ID was not found');

    //delete
  const index= courses.indedOf(course);
  courses.splice(index,1);

  //Return the same course
  res.send(course);

});
//PORT 
const port=process.env.PORT || 3000;
app.listen(port,() => console.log(`listenening on port ${port}`));

function validateCourse(course){
    const schema={
        name:Joi.string().min(3).required()
    };
    return Joi.validate(course,schema);
}