
const response = require('../utils/response')
const doctordb = require('../model/userDoctor')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.registerUser = async (req, res) => {
    try {
        const { name, email, username, password } = req.body;
        const existingUser = await doctordb.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            // return res.send('Username or email already exists')
            return response.respond(res, 'Username or email already exist', existingUser.name, status = 409, false)
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new doctordb({ name, email, username, password: hashedPassword });
        const savedUser = await newUser.save();
        // res.status(201).send(savedUser);
        response.respond(res, 'User created successfully', savedUser, status = 201, true);
    }
    catch (error) {
        return response.error(res, 'error creating User!', error);
    }
}


exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await doctordb.findOne({ username });
        if (!user) {
            return response.respond(res, 'Invalid Username', user, 401, false)
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            return response.respond(res, 'Invalid password', '', 401, false)
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
        response.respond(res, 'error while login', error);
    }
}

