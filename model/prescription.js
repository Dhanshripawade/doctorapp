const mongoos = require('mongoose')


const medicineSchema = new mongoos.Schema({
    medicineType:{type:String},
    medicineName:{type:String},
    quantity:{type:Number},
    days:{type:Number},
    whenTo:{type:String},
    taketime:{type:String}
}, {_id:false});

const prescriptionSchema = new mongoos.Schema({
    prescription: [medicineSchema],
    notes:{type:String}
}, { timestamps: true });

const prescriptiondb = mongoos.model('prescriptiondata', prescriptionSchema);
module.exports = prescriptiondb;