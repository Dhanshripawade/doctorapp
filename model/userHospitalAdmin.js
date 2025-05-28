const mongoos = require('mongoose')



const hospitalAdminSchema = new mongoos.Schema({
    hIN: { type: String, required: false },
    username: { type: String, required: true, unique: true }, // Unique username for login
    password: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
    resetToken: { type: String },
    tokenExpire: { type: String },
    department: [{ type: mongoos.Schema.Types.ObjectId, ref: 'department' }]
}, { timestamps: true });

const hospitalAdmindb = mongoos.model('hospitalAdmin', hospitalAdminSchema);
module.exports = hospitalAdmindb;