const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {Course,validate}=require('../models/course')


router.get('/', async (req, res) => {
    const course = await Course.find().sort({name:1});
    res.send(course);

});

router.get('/:id', async (req, res) => {
    const course = await Course.findById(req.params.id)
    if (!course) return res.status(404).send('The course with the given ID was not found');
    res.send(course);
});

// router.get('/api/posts/:years/:month',(req,res) =>{
//     res.send(req.params);
// });

router.post('/', async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let course = new Course({ name: req.body.name });
    course = await course.save();
    res.send(course);
});


router.put('/:id', async (req, res) => {

    //Validate 
    //If invalid return 400
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    const course = await Course.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    //Look up the course
    //If not existing return 404
    if (!course) return res.status(404).send('The course with the given ID was not found');

    res.send(course);
   
});



router.delete('/:id', async (req, res) => {
    //Look up the course
    //Not exitsting,return 404
    const course = await Course.findByIdAndRemove(req.params.id);

    if (!course) return res.status(404).send('The course with the given ID was not found');

    //Return the same course
    res.send(course);

});

module.exports = router;