const response = require('../utils/response')
const department = require('../model/departments')


exports.save = async (req, res) => {
    const departmentData = new department({
        dIN: req.body.dIN,
        name: req.body.name,
        description: req.body.description
    });
    const departmentToSave = await departmentData.save();
    if (!departmentToSave) {
        return response.respond(res, 'error saving department', null, 500, false);
    }
    response.respond(res, 'Department created successfully', departmentToSave, 201, true);
}

//by dIN
exports.getbydin = async (req, res) => {
    try {
        const getResult = await department.find({ dIN: req.params.din });
        if (getResult.length == 0) {
            return response.respond(res, 'department not found', null, 401, false);
        }
        response.respond(res, 'found department', getResult, 200, true);
    }
    catch (error) {
        return response.error(res, 'error', error);
    }
}

exports.getallDepartment = async (req, res) => {
    try {
        const allData = await department.find();
        if (allData.length == 0) {
            return response.respond(res, 'no departments found', null, 401, false);
        }
        response.respond(res, 'found departments', allData, 200, true);
    }
    catch (error) {
        return response.error(res, 'error', error);
    }
}

exports.update = async (req, res) => {
    try {
        id = req.params.id;
        dataToUpdate = req.body;
        option = { new: true };
        const updatedData = await department.findByIdAndUpdate(id, dataToUpdate, option);
        if (!updatedData) {
            return response.respond(res, 'department not found', null, 401, false);
        }
        response.respond(res, 'department updated successfully', updatedData, 200, true);
    }
    catch(error){
        return response.error(res, 'error', error);
    }
}

exports.delete = async (req, res) => {
    try{
        const deletedData = await department.findByIdAndDelete(req.params.id);
        if(!deletedData){
            return response.respond(res, 'department not found', null, 401, false);
        }
        response.respond(res, 'department deleted successfully', deletedData, 200, true);
    }
    catch(error){
        return response.respond(res, 'error', error);
    }
}


exports.lastdIN = async (req, res) => {
    try {
        const lastdIN = await department.find().sort({ _id: -1 }).limit(1);
        if (lastdIN.length == 0) {
            return response.respond(res, 'no departments found', null, 401, false);
        }
        response.respond(res, 'last department', lastdIN, 200, true);
    }
    catch (error) {
        return response.error(res, 'error', error);
    }
}

