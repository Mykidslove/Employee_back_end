const express=require('express');
const mongoose=require('mongoose');

const crecSchema=new mongoose.Schema({
    
    email:{
        type:String
    },
    password:{
        type:String
    },
    
})

const Crec=new mongoose.model('Crec',crecSchema);

module.exports=Crec