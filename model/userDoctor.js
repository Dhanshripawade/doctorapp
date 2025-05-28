const mongoos = require('mongoose');

const doctorSchema = new mongoos.Schema({
    // _id:{
    //     type:Number
    // },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:8
    }
})


const user = mongoos.model('userDoctor', doctorSchema);

module.exports = user