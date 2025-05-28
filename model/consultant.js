const mongoos = require('mongoose')

const consultantSchema = mongoos.Schema({
    cIN: { type: String },
    name: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    dateOfBirth: { type: String, required: true },
    specialty: { type: String, required: true },
    qualifications: { type: String, required: true },
    medicalLicenseNumber: { type: String, required: true },
    role: { type: String },
    email: { type: String},
    phoneNumber: { type: String, required: true },
    address: { type: String },
    yearsOfExperience: { type: Number, required: true },
    languagesSpoken: { type: [String] },
    consultationFees: { type: Number },
    username: { type: String, required: true, unique: true }, // Unique username for login
    password: { type: String, required: true },
    resetToken: { type: String },
    tokenExpire: { type: String },
    notes: { type: String }
}, { timestamps: true });

const consultant = mongoos.model('consultant', consultantSchema);
module.exports = consultant;