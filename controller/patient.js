const response = require('../utils/response');
const patients = require('../model/newPatient');



exports.save = async (req, res) => {
    // res.send('saving patient data');

    try {
        const pdata = new patients({
            pIN:req.body.pIN,
            patienttype: req.body.patienttype,
            name: req.body.name,
            address: req.body.address,
            personal_ph_no: req.body.personal_ph_no,
            alternate_ph_no: req.body.alternate_ph_no,
            dob: req.body.dob,
            sex: req.body.sex,
            age: req.body.age,
            history: req.body.history,
            amount: req.body.amount,
            paymentmode: req.body.paymentmode,
            paymentdone: req.body.paymentdone
        })
        const datatosave = await pdata.save();
        response.respond(res, 'patient data saved successfully', datatosave, 201, true);
    }
    catch (error) {
        return response.error(res, 'error while saving data', error);
    }
}

exports.getbyname = async (req, res) => {
    try{
        const getResult = await patients.find({name:req.params.name});
    if(getResult.length ==0){
        return response.respond(res, 'patient not found', getResult, 401,false);
    }
    response.respond(res, 'found patients data', getResult, 200, true);
    }
    catch(error){
        return response.error(res, 'error', error);
    }
}

exports.getbyphno = async (req, res) => {
    try{
        const getResult = await patients.find({personal_ph_no:req.params.phno});
        if(getResult.length == 0){
            return response.respond(res, 'patient not found', getResult, 401, false);
        }
        response.respond(res, 'found patient data', getResult, 200, true);
    }
    catch(error){
        return response.error(res, 'error', error)
    }
}

exports.getallpatients = async(req, res) => {
    try{
        const alldata = await patients.find();
        if(!alldata){
            return response.respond(res, 'no data', alldata, 401, false);
        }
        return response.respond(res, 'all data', alldata, 200, true);
    }
    catch(error){
        return response.error(res, 'error getting data', error);
    }
}


exports.getPatientbyid = async (req, res) => {
    try{
        const getResult = await patients.findById(req.params.id).populate('history')
        .populate({
            path: 'history',
            populate: { path: 'diagnosis' } // Populate 'diagnosis' field within each 'history' item
        })
        .populate({
            path: 'history',
            populate: { path: 'prescription' } // Populate 'prescription' field within each 'history' item
        });
    if(!getResult){
        return response.respond(res, 'patient not found', getResult, 401,false);
    }
    response.respond(res, 'found patients data', getResult, 200, true);
    }
    catch(error){
        return response.error(res, 'error', error);
    }
}

exports.getpatientbypin = async (req, res) => {
    try{
        const getResult = await patients.find({pIN:req.params.pin}).populate('history')
        .populate({
            path: 'history',
            populate: { path: 'diagnosis' } // Populate 'diagnosis' field within each 'history' item
        })
        .populate({
            path: 'history',
            populate: { path: 'prescription' } // Populate 'prescription' field within each 'history' item
        });
        if(!getResult){
            return response.respond(res, 'patient not found', null, 401, false);
        }
        response.respond(res, 'found patient', getResult, 200, true);
    }
    catch(error){
        return response.error(res, 'error', error);
    }
}

exports.update = async (req, res) => {
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

exports.getpatientcount = async (req, res) => {
    try{
        const count = await patients.countDocuments();
        response.respond(res, 'total no. of records', count.toString(), 200, true);
    }
    catch(error){
        return response.error(res, 'error getting total no. of records', error);
    }
}

exports.deletePatient = async (req, res) => {
    try{
        const result = await patients.findByIdAndDelete(req.params.id);
        if(!result){
            return response.respond(res, 'patient not found', result, 401, false);
        }
        response.respond(res, 'patient deleted', result, 200, true);
    }
    catch(error){
        return response.error(res, 'error deleting patient', error)
    }
}


exports.getLastPatient = async (req, res) => {
    try{
        const lastPatient = await patients.find().sort({ _id: -1 }).limit(1);
        if(!lastPatient){
            return response.respond(res, 'no patient found', lastPatient, 401, false);
        }
        response.respond(res, 'found last patient', lastPatient, 200, true);
    }
    catch(error){
        return response.error(res, 'error getting last patient', error)
    }
}


