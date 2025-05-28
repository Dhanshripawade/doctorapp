const mongoos = require('mongoose')

const departmentSchema = new mongoos.Schema({
    dIN:{type:String, required:true},
    name:{type:String},
    description:{type:String}
}, { timestamps: true });

const departmentdb = mongoos.model('department', departmentSchema);
module.exports = departmentdb;