const mongoose = require('mongoose');
const listSchems=new mongoose.Schema({
    title:String,
    content:String,
    star:{
        type:Boolean,
        default:false
    },
    date:{
        type:Date,
        default:Date.now
    },
    status:{
        type:Number,
        default:1
    },
})
const List=mongoose.model('List',listSchems)
module.exports=List