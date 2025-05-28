const response = require('../utils/response')
const receptiondb = require('../model/userReception')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.register = async (req, res) => {
    try {
        // const { name, email, username, password } = req.body;

        const existingUser = await receptiondb.findOne({ $or: [{ username:req.body.username }, { email:req.body.email }] });

        if (existingUser) {
            return response.respond(res, 'Username or email already exist', null, 409, false);
        }
        const hashedpassword = await bcrypt.hash(req.body.password, 10);
        //name, email, username, password: hashedpassword 
        const newReceptionist = new receptiondb({ 
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
    try{
        const {username, password} = req.body;
        const user = await receptiondb.findOne({username})
        if(!user){
            return response.respond(res, 'Invalid Username', user, 401, false);
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            return response.respond(res, 'Invalid Password', user, 401, false);
        }
        const payload = {
            userID:user._id,
            username:user.username,
            role:'receptionist'
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:'12h'});
        res.json({token});
    }
    catch(error){
        return response.error(res, 'error while login', error);
    }
}