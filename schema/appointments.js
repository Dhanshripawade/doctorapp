const mongoos = require('mongoose')

const appointmentSchema = new mongoos.Schema({
    patientID:{type:String, required:true},
    tokenNo:{type:Number, required:true},
    patientType:{type:String, required:true},
    consultant:{type:String, required:true},
    patientname:{type:String, required:true}
});
// const appointmentdb = mongoos.model('appointment', appointmentSchema);
module.exports = appointmentSchema;