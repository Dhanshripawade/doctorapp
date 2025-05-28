const mongoos = require('mongoose')

const receptionistSchema = new mongoos.Schema({
    rID: { type: String },
    name: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    dateOfBirth: { type: String, required: true },
    email: { type: String, unique: true, lowercase: true },
    phoneNumber: { type: String },
    address: { type: String },
    department: { type: String },//{ type: Schema.Types.ObjectId, ref: 'Department' },
    username: { type: String, required: true, unique: true }, // Unique username for login
    password: { type: String, required: true },
    resetToken: { type: String },
    tokenExpire: { type: String }
    // Additional fields as needed
}, { timestamps: true });

const user = mongoos.model('userreception', receptionistSchema);
module.exports = user;