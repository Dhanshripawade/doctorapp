const patienthistory = require('../model/patientHistory')
const response = require('../utils/response')

exports.save = async (req, res) => {
    try{
        const patientHistoryData = new patienthistory({
            pIN: req.body.pIN,
            consultant: req.body.consultant,
            visitdate: req.body.visitdate,
            prevvisitdate: req.body.prevvisitdate,
            ailment: req.body.ailment,
            diagnosis: req.body.diagnosis,
            prescription: req.body.prescription,
            consultfee: req.body.consultfee,
            paymentmode: req.body.paymentmode,
            paymentStatus: req.body.paymentdone,
            treatmentstatus: req.body.treatmentstatus
            });
            const patientHistoryToSave = await patientHistoryData.save();
            if(!patientHistoryToSave){
                return response.respond(res, 'error saving patient history data', patientHistoryToSave, 401, false);
            }
            response.respond(res, 'patient history saved successfully', patientHistoryToSave, 201, true);
    }
    catch(error){
        return response.error(res, 'error', error);
    }
}

exports.getbyid = async (req, res) => {
    try{
        const getResult = await patienthistory.findById(req.params.id);
        if(!getResult){
            return response.respond(res, 'Patient history not found', null, 401, false);
        }
        response.respond(res, 'Found patient history', getResult, 200, true);
    }
    catch(error){
        return response.respond(res, 'error', error);
    }
}

exports.getbypin = async (req, res) => {
    try{
        const getResult = await patienthistory.find({pIN:req.params.pin});
        if(getResult.length == 0){
            return response.respond(res, 'Patient history not found', null, 401, false);
        }
        response.respond(res, 'Found patient history', getResult, 200, true);
    }
    catch(error){
        return response.error(res, 'error', error);
    }
}