const express=require('express');
const router=express.Router();
const Joi = require('joi');

router.get('/',(req,res)=> {
    res.render('index',{title:'my express app',message:'Hello world'});
    });
    

module.exports=router;