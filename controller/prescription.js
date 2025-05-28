const prescription = require('../model/prescription')
const response = require('../utils/response')

exports.save = async (req, res) => {

    try{
        const prescriptionData = new prescription({
            prescription: req.body.prescription,
            notes: req.body.notes
        });
        const prescriptionToSave = await prescriptionData.save();
        if(!prescriptionToSave){
            return response.respond(res, 'error saving prescription', prescriptionToSave, 401, false);
        }
        response.respond(res, 'prescription saved successfully', prescriptionToSave, 201, true);
    }
    catch(error){
        return response.respond(res, 'error', error);
    }
}