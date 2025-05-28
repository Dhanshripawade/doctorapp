const consultant = require('../model/consultant')
const response = require('../utils/response')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.registerUser = async (req, res) => {
    try {
        const { name, email, username, password } = req.body;
        const existingUser = await consultant.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            // return res.send('Username or email already exists')
            return response.respond(res, 'Username or email already exist', existingUser.name, status = 409, false)
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        // const newUser = new doctordb({ name, email, username, password: hashedPassword });
        const consultantData = new consultant({
            cIN: req.body.cIN,
            name: req.body.name,
            gender: req.body.gender,
            dateOfBirth: req.body.dateOfBirth,
            specialty: req.body.specialty,
            qualifications: req.body.qualifications,
            medicalLicenseNumber: req.body.medicalLicenseNumber,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            yearsOfExperience: req.body.yearsOfExperience,
            languagesSpoken: req.body.languagesSpoken,
            consultationFees: req.body.consultationFees,
            username: req.body.username,
            password: hashedPassword,
        });
        const savedUser = await consultantData.save();
        // res.status(201).send(savedUser);
        response.respond(res, 'User created successfully', savedUser, 201, true);
    }
    catch (error) {
        return response.error(res, 'error creating User!', error);
    }
}


exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await consultant.findOne({ username });
        if (!user) {
            return response.respond(res, 'Invalid Username', user, 401, false)
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return response.respond(res, 'Invalid password', null, 401, false)
        }
        const payload = {
            userId: user._id,
            username: user.username,
            role: 'doctor'
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' })
        res.json({ token })
    }
    catch (error) {
        response.error(res, 'error while login', error);
    }
}


exports.save = async (req, res) => {
    try {
        const consultantData = new consultant({
            name: req.body.name,
            gender: req.body.gender,
            dateOfBirth: req.body.dateOfBirth,
            specialty: req.body.specialty,
            qualifications: req.body.qualifications,
            medicalLicenseNumber: req.body.medicalLicenseNumber,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            experience: req.body.experience,
            languagesSpoken: req.body.languagesSpoken,
            consultationFees: req.body.consultationFees,
            notes: req.body.notes
        });
        const consultantDataToSave = await consultantData.save();
        if (!consultantDataToSave) {
            return response.respond(res, 'error saving consultant', consultantDataToSave, 401, false);
        }
        response.respond(res, 'consultant saved successfully', consultantDataToSave, 201, true);
    }
    catch (error) {
        return response.error(res, 'error', error);
    }
}

//by cID
exports.getbycin = async (req, res) => {
    try{
        const getResult = await consultant.find({cIN:req.params.cin});
    if(!getResult){
        return response.respond(res, 'consultant not found', getResult, 401,false);
    }
    response.respond(res, 'found consultant data', getResult, 200, true);
    }
    catch(error){
        return response.error(res, 'error', error);
    }
}

exports.update = async (req, res) => {
    try{
        id = req.params.id;
        dataToUpdate = req.body;
        option = {new:true};
        const updateResult = await consultant.findByIdAndUpdate(id, dataToUpdate, option);
        if(!updateResult){
            return response.respond(res, 'not found', null, 401, false);
        }
        response.respond(res, 'consultant updated successfully', updateResult, 200, true);
    }
    catch(error){
        response.error(res, 'error', error);
    }
}

exports.getall = async (req, res) => {
    try {
        const alldata = await consultant.find();
        if (alldata.length == 0) {
            return response.respond(res, 'no consultant found', alldata, 404, false);
        }
        response.respond(res, 'All consultant data', alldata, 200, true);
    }
    catch (error) {
        return response.respond(res, 'error', error);
    }
}

exports.delete = async (req, res) => {
    try{
        const deletedData = await consultant.findByIdAndDelete(req.params.id);
        if(!deletedData){
            return response.respond(res, 'no consultant found', null, 401, false);
        }
        response.respond(res, 'consultant deleted successfully',deletedData, 200, true);
    }
    catch(error){
        return response.error(res, 'error', error);
    }
}

exports.lastcIN = async (req, res) => {
    try{
        const lastconsultant = await consultant.find({}, {username: 0, password: 0}).sort({ _id: -1 }).limit(1);
// -        const lastconsultant = await consultant.find().sort({ _id: -1 }).limit(1);
        if(!lastconsultant){
            return response.respond(res, 'no consultant found', lastconsultant, 401, false);
        }
        response.respond(res, 'found last consultant', lastconsultant, 200, true);
    }
    catch(error){
        return response.error(res, 'error getting last consultant', error)
    }
}
