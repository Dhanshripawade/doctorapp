const mongoos = require('mongoose')

const appointmentSchema = new mongoos.Schema({
    pIN:{type:String},
    tokenNo:{type:Number, required:true},
    patientType:{type:String, required:true},
    consultantID:{type:String},
    consultant:{type:String, required:true},
    patientname:{type:String, required:true},
    consultfee: { type: Number },
    paymentmode: { type: String },
    paymentStatus: { type: Boolean },
}, { timestamps: true });
const appointmentdb = mongoos.model('appointment', appointmentSchema);
module.exports = appointmentdb;