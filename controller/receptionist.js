const response = require('../utils/response')
const receptiondb = require('../model/userReception')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.register = async (req, res) => {
    try {
        // const { name, email, username, password } = req.body;

        const existingUser = await receptiondb.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] });

        if (existingUser) {
            return response.respond(res, 'Username or email already exist', null, 409, false);
        }
        const hashedpassword = await bcrypt.hash(req.body.password, 10);
        //name, email, username, password: hashedpassword 
        const newReceptionist = new receptiondb({
            rID: req.body.rID,
            name: req.body.name,
            gender: req.body.gender,
            dateOfBirth: req.body.dateOfBirth,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            department: req.body.department,
            username: req.body.username,
            password: hashedpassword
        });
        const savedUser = await newReceptionist.save();

        return response.respond(res, 'USer created successfully', savedUser, 201, true)
    }
    catch (error) {
        return response.error(res, 'error creating user', error)
    }
}


exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await receptiondb.findOne({ username })
        if (!user) {
            return response.respond(res, 'Invalid Username', user, 401, false);
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return response.respond(res, 'Invalid Password', user, 401, false);
        }
        const payload = {
            userID: user._id,
            username: user.username,
            role: 'receptionist'
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });
        res.json({ token });
    }
    catch (error) {
        return response.error(res, 'error while login', error);
    }
}

exports.getbyid = async (req, res) => {
    try {
        const getResult = await receptiondb.findOne({rID:req.params.rid});
        if(!getResult){
            return response.respond(res, 'receptionist not found', null, 401, false);
        }
        response.respond(res, 'found receptionist', getResult, 200, true);
    }
    catch(error){
        return response.error(res, 'error', error);
    }
}

exports.getall =async (req, res) => {
    try{
        const allData = await receptiondb.find();
        if(allData.length == 0){
            return response.respond(res, 'no data found', null, 401, false);
        }
        response.respond(res, 'found receptionist', allData, 200, true);
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
        const updateResult = await receptiondb.findByIdAndUpdate(id, dataToupdate, option);
        if (updateResult !== null) {
            response.respond(res, 'receptionist updated successfully', updateResult, 200, true);
        }
        else {
            return response.respond(res, 'not found', null, 404, false);
        }
    }
    catch (error) {
        response.error(res, 'error while updating receptionist', error)
    }
}

exports.delete =async (req, res) => {
    try{
        const deleteData = await receptiondb.findByIdAndDelete(req.params.id);
        if(!deleteData){
            return response.respond(res, 'receptionist not found', null, 401, false);
        }
        response.respond(res, 'receptionist deleted successfully', deleteData, 200, true);
    }
    catch(error){
        return response.error(res, 'error', error);
    }
}