const appointment = require('../model/appointment')
const response = require('../utils/response')
// const appointmentSchema = require('../schema/appointments')

exports.create = async (req, res) => {
    try {
        const appointmentdata = new appointment({
            pIN: req.body.pIN,
            tokenNo: req.body.tokenNo,
            patientType: req.body.patientType,
            consultant: req.body.consultant,
            patientname: req.body.patientname,
            consultfee: req.body.consultfee,
            paymentmode: req.body.paymentmode,
            paymentStatus: req.body.paymentStatus
        });

        const appointmentToSave = await appointmentdata.save();
        if (!appointmentToSave) {
            return response.respond(res, 'error creating appointments', appointmentToSave, 401, false);
        }
        response.respond(res, 'appointment created successfully', appointmentToSave, 201, true);

    }
    catch (error) {
        return response.error(res, 'error', error);
    }
}

exports.getappointment = async (req, res) => {
    try {
        const appointmentdata = await appointment.find();
        if (appointmentdata.length == 0) {
            return response.respond(res, 'no appointment found', appointmentdata, 401, false);
        }
        response.respond(res, 'found appointments', appointmentdata, 200, true);
    }
    catch (error) {
        response.error(res, 'error', error);
    }
}

exports.update = async (req, res) => {
    try {
        id = req.params.id;
        dataToupdate = req.body;
        option = { new: true };
        const updateAppointment = await appointment.findByIdAndUpdate(id, dataToupdate, option);
        if (updateAppointment == null) {
            return response.respond(res, 'no appointment found to update', updateAppointment, 401, false);
        }
        response.respond(res, 'appointment updated successfully', updateAppointment, 200, true);
    }
    catch (error) {
        return response.error(res, 'error', error);
    }
}

exports.delete = async (req, res) => {
    try {
        const deleteAppointment = await appointment.findByIdAndDelete(req.params.id);
        if (!deleteAppointment) {
            return response.respond(res, 'no appointment found to delete', deleteAppointment, 404, false);
        }
        response.respond(res, 'appointment deleted successfully', deleteAppointment, 200, true);
    }
    catch (error) {
        return response.error(res, 'error', error);
    }
}

exports.getbyconsultant = async (req, res) => {
    try {
        const appointmentByConsultant = await appointment.find({ consultant: req.params.consultantname });
        if (appointmentByConsultant.length == 0) {
            return response.respond(res, 'no appointment found', appointmentByConsultant, 401, false);
        }
        response.respond(res, 'found appointments', appointmentByConsultant, 200, true);
    }
    catch (error) {
        return response.error(res, 'error', error);
    }
}

exports.getbyconsultID = async (req, res) => {
    try {
        const appointmentByConsultID = await appointment.find({ consultantID: req.params.consultantID });
        if (appointmentByConsultID.length == 0) {
            return response.respond(res, 'no appointment found', appointmentByConsultID, 402, false);
        }
        response.respond(res, 'found appointment', appointmentByConsultID, 200, true);
    }
    catch (error) {
        return response.error(res, 'error', error);
    }
}

exports.getbyid = async (req, res) => {
    try {
        const getResult = await appointment.findById(req.params.id);
        if (!getResult) {
            return Response.respond(res, 'appointment not found', null, 401, false);
        }
        response.respond(res, 'found appointment', getResult, 200, true);
    }
    catch (error) {
        response.error(res, 'error', error);
    }
}

exports.getbypin = async (req, res) => {
    try {
        const getResult = await appointment.find({ pIN: req.params.pin });
        if (getResult.length == 0) {
            return response.respond(res, 'appointment not found', null, 401, false);
        }
        response.respond(res, 'found appointment', getResult, 200, true);
    }
    catch (error) {
        return response.error(res, 'error', error);
    }
}


exports.lastToken = async (req, res) => {
    try {
        const lastRecords = await appointment.find().sort({_id: -1}).limit(1);
        if (lastRecords.length == 0) {
            return response.respond(res, 'no records found', lastRecords, 404, false);
        }
        response.respond(res, 'found last records', lastRecords, 200, true);
    }
    catch (error) {
        return response.error(res, 'error', error);
    }
}


