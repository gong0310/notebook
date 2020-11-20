const mongoose = require('./index');
const classifySchems=new mongoose.Schema({
    name:String,
    status:{
        type:Number,
        default:1
    },
    passwads:''
})
const Classify=mongoose.model('Classify',classifySchems)
module.exports=Classify