const hospitalAdmin = require('../model/userHospitalAdmin')
const response = require('../utils/response')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



exports.register = async (req, res) => {
    try {
        const existingUser = await hospitalAdmin.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] });

        if (existingUser) {
            return response.respond(res, 'Username or email already exist', null, 409, false);
        }
        const hashedpassword = await bcrypt.hash(req.body.password, 10);
        const adminToSave = new hospitalAdmin({
            hIN: req.body.hIN,
            username: req.body.username,
            password: hashedpassword,
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address
        });
        
        const savedAdmin = await adminToSave.save();
        return response.respond(res, 'Admin created successfully', savedAdmin, 201, true)
    }
    catch (error) {
        return response.error(res, 'error while login', error);
    }

}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await hospitalAdmin.findOne({ username })
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
            role: 'admin'
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });
        res.json({ token });
    }
    catch (error) {
        return response.error(res, 'error while login', error);
    }
}


