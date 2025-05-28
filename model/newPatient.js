const mongoos = require('mongoose')

const newPatientSchema = new mongoos.Schema({
    pIN:{type:String},
    patienttype:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    personal_ph_no:{
        type:Number,
        required:true,
        minlength:10
    },
    alternate_ph_no:{
        type:Number,
        minlength:10
    },
    dob:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    sex:{
        type:String,
        required:true
    },
    prev_history:{
        type:String
    },
    
    history:[{type: mongoos.Schema.Types.ObjectId, ref:'patientHistory'}],
    treatmentstatus:{type:String}
}, { timestamps: true });

const patient = mongoos.model('patients', newPatientSchema);
module.exports = patient;