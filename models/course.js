
const mongoose = require('mongoose');
const Joi = require('joi');



const Course = mongoose.model('Course', new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    }
}));



function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
}

module.exports.Course=Course;
module.exports.validate=validateCourse;