const mongoos = require('mongoose')
const diagnosis = require('../model/diagnosis')
const response = require('../utils/response')

exports.save = async (req, res) => {

    try{
        const diagnosisData = new diagnosis({
            patientId: req.body.patientId,
            symptoms: req.body.symptoms,
            diagnosis: req.body.diagnosis,
            testRequired: req.body.testRequired,
            testName: req.body.testName,
            nextvisitDate: req.body.nextvisitDate
        });
        const diagnoseToSave = await diagnosisData.save();
        if (!diagnoseToSave){
            return response.respond(res, 'error saving diagnosis data', diagnoseToSave, 401, false);
        }
        response.respond(res, 'diagnosis data saved successfully', diagnoseToSave, 201, true);
    }
    catch(error){
        return response.error(res, 'error', error);
    }
}