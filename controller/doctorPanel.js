
const diagnose = require('../model/diagnosis')
const response = require('../utils/response')
const prescription = require('../model/prescription')
const patientHistory = require('../model/patientHistory')
const patients = require('../model/newPatient')

exports.saveDiagnose = async (req, res) => {
    try {
        const diagnodata = new diagnose({
            patientId: req.body.patientId,
            symptoms: req.body.symptoms,
            diagnosis: req.body.diagnosis,
            testRequired: req.body.testRequired,
            testName: req.body.testName,
            nextvisitDate: req.body.nextvisitDate
        });
        const datatosave = await diagnodata.save();
        response.respond(res, 'diagnose saved successfully', datatosave, 201, true);
    }
    catch (error) {
        response.error(res, 'error saving diagnose', error);
    }

}


exports.savePrescription = async (req, res) => {
    try {
        const prescripdata = new prescription({
            prescription: req.body.prescription,
            notes: req.body.notes
        });
        const datatosave = await prescripdata.save();
        response.respond(res, 'prescripdata saved successfully', datatosave, 201, true);
    }
    catch (error) {
        response.error(res, 'error saving prescripdata', error);
    }
}

exports.savePatienthistory = async (req, res) => {
    try {
        const patientHistorydata = new patientHistory({
            patientID: req.body.patientID,
            consultant: req.body.consultant,
            visitdate: req.body.visitdate,
            prevvisitdate: req.body.prevvisitdate,
            diagnosis: req.body.diagnosis,
            prescription: req.body.prescrip
        });
        const historytosave = await patientHistorydata.save();
        response.respond(res, 'patient history is saved', historytosave, 201, true);
    }
    catch (error) {
        return response.error(res, 'error saving patient history', error);
    }
}

exports.updatePatient = async (req, res) => {
    try {
        // res.send(req.params.id);
        id = req.params.id;
        dataToupdate = req.body;
        option = { new: true };
        const updateResult = await patients.findByIdAndUpdate(id, dataToupdate, option);
        if (updateResult !== null) {
            response.respond(res, 'patient updated successfully', updateResult, 200, true);
        }
        else {
            response.respond(res, 'not found', null, 404, false);
        }
    }
    catch (error) {
        response.error(res, 'error while updating patient', error)
    }
}

exports.getPatientbyid = async (req, res) => {
    try {
        const getResult = await patients.findById(req.params.id).populate('history')
            .populate({
                path: 'history',
                populate: { path: 'diagnosis' } // Populate 'diagnosis' field within each 'history' item
            })
            .populate({
                path: 'history',
                populate: { path: 'prescription' } // Populate 'prescription' field within each 'history' item
            });
        if (!getResult) {
            return response.respond(res, 'patient not found', getResult, 401, false);
        }
        response.respond(res, 'found patients data', getResult, 200, true);
    }
    catch (error) {
        return response.error(res, 'error', error);
    }

}