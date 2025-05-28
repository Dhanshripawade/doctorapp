const hotelAdminModel = require('../model/userHospitalAdmin')
const consultantModel = require('../model/consultant')
const receptionistModel = require('../model/userReception')
const patientModel = require('../model/newPatient')

exports.patient = async (req, res) => {
    try {
        const patient = await patientModel.findOne({}, {sort: {_id: -1}});
        if (patient.length == 0) {
            newID = "001";
            return response.respond(res, 'generated new id', newID, 201, true);
        }
        newID = parseInt(patient._id, 10) + 1;
        return response.respond(res, 'found patient and generated new id', newID, 201, true);
    } catch (err) {
        return response.error(res, 'error', err);
    }
}





