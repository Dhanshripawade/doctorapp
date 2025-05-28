const mongoos = require('mongoose')

const consultFeeSchema = mongoos.Schema({
    newPatient:{type:Number},
    repeatWithSameAilment:{type:Number},
    repeatWithNewAilment:{type:Number}
}, { timestamps: true });
const consultFee = mongoos.model('consultationfee', consultFeeSchema);
module.exports = consultFee;