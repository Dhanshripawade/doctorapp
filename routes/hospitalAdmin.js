const express = require('express')
const authenticator = require('../middleware/auth');
const authorizer = require('../middleware/authorizer');
const hospitalAdminController = require('../controller/hospitalAdmin')
const consultantController = require('../controller/consultant')
const receptionistController = require('../controller/receptionist')
const departmentController = require('../controller/department')
const patientController = require('../controller/patient')
const patientHistoryController = require('../controller/patientHistory')


const router = express.Router();

router.post('/register', hospitalAdminController.register);
router.post('/login', hospitalAdminController.login);

/////////Consultant//////////////
router.post('/registerconsultant',
    authenticator.authenticateUser,
    authorizer.authorizer('admin'),
    consultantController.registerUser);

router.get('/getallconsultant',
    authenticator.authenticateUser,
    authorizer.authorizer('admin'),
    consultantController.getall);                                                                                                                                   

router.get('/consutantbyid/:cin',
    authenticator.authenticateUser,
    authorizer.authorizer('admin'),
    consultantController.getbycin);

router.patch('/updateconsultant/:id',
    authenticator.authenticateUser,
    authorizer.authorizer('admin'),
    consultantController.update);

router.delete('/deleteconsultant/:id',
    authenticator.authenticateUser,
    authorizer.authorizer('admin'),
    consultantController.delete);
/////////Consultant//////////////

/////////Receptionist////////////
router.post('/registerreceptionist',
    authenticator.authenticateUser,
    authorizer.authorizer('admin'),
    receptionistController.register);

router.get('/receptionistbyid/:rid',
    authenticator.authenticateUser,
    authorizer.authorizer('admin'),
    receptionistController.getbyid);

router.get('/allreceptionist',
    authenticator.authenticateUser,
    authorizer.authorizer('admin'),
    receptionistController.getall);

router.patch('/updatereceptionist/:id',
    authenticator.authenticateUser,
    authorizer.authorizer('admin'),
    receptionistController.update);

router.delete('/deletereceptionist/:id',
    authenticator.authenticateUser,
    authorizer.authorizer('admin'),
    receptionistController.delete);
/////////Receptionist////////////


/////////Department//////////////
router.post('/createdepartment',
    authenticator.authenticateUser,
    authorizer.authorizer('admin'),
    departmentController.save);

router.get('/departmentbyid/:din',
    authenticator.authenticateUser,
    authorizer.authorizer('admin'),
    departmentController.getbydin);

router.get('/alldepartment',
    authenticator.authenticateUser,
    authorizer.authorizer('admin'),
    departmentController.getallDepartment);

router.patch('/updatedepartment/:id',
    authenticator.authenticateUser,
    authorizer.authorizer('admin'),
    departmentController.update);

router.delete('/deletedepartment/:id',
    authenticator.authenticateUser,
    authorizer.authorizer('admin'),
    departmentController.delete);
/////////Department//////////////

/////////Patient////////////////
router.post('/savepatient',
    authenticator.authenticateUser,
    authorizer.authorizer('admin'),
    patientController.save);

router.get('/getbypin/:pin',
    authenticator.authenticateUser,
    authorizer.authorizer('admin'),
    patientController.getpatientbypin);

router.get('/getbyid/:id',
    authenticator.authenticateUser,
    authorizer.authorizer('admin'),
    patientController.getPatientbyid);

router.get('/getallpatient',
    authenticator.authenticateUser,
    authorizer.authorizer('admin'),
    patientController.getallpatients);

router.patch('/updatepatient/:id',
    authenticator.authenticateUser,
    authorizer.authorizer('admin'),
    patientController.update);

router.delete('/deletepatient/:id',
    authenticator.authenticateUser,
    authorizer.authorizer('admin'),
    patientController.deletePatient);
/////////Patient////////////////

/////////Patient History///////
/////////Patient History///////

// router.get('receptionistbyid/:rid')
module.exports = router;