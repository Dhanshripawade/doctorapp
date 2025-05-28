const mongoos = require('mongoose')


const testandrecommendSchema = new mongoos.Schema({
    name: { type: String },
    recommendation: { type: String }
}, { _id: false })


const diagnoseschema = new mongoos.Schema({
    patientId: {
        type: String, required:true
    },
    pIN:{type:String},
    symptoms: {
        type: String
    },
    diagnosis: {
        type: String
    },
    testRequired: {
        type: Boolean
    },
    testName:  [testandrecommendSchema] ,
    nextvisitDate: { type: String }
}, { timestamps: true });


const diagnose = mongoos.model('diagnosedata', diagnoseschema);
module.exports = diagnose;