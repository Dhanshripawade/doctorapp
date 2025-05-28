const mongoos = require('mongoose')

const patienthistorySchema = new mongoos.Schema({
    pIN: { type: String },
    consultant: { type: String, required: true },
    visitdate: { type: String },
    prevvisitdate: { type: String },
    ailment: { type: String },
    diagnosis: { type: mongoos.Schema.Types.ObjectId, ref: 'diagnosedata' },
    prescription: { type: mongoos.Schema.Types.ObjectId, ref: 'prescriptiondata' },
    consultfee: { type: Number },
    paymentmode: { type: String },
    paymentStatus: { type: Boolean },
    treatmentstatus: { type: String, required: true }
}, { timestamps: true });

const patientHistory = mongoos.model('patientHistory', patienthistorySchema);
module.exports = patientHistory;
