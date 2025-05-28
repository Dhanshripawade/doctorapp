const express = require('express')
const consultantController = require('../controller/consultant')
const authenticator = require('../middleware/auth')
const authorizer = require('../middleware/authorizer')
// const doctorpanel = require('../controller/doctorPanel')
const patient = require('../controller/patient')
const diagnosis = require('../controller/diagnose')
const prescription = require('../controller/prescription')
const patientHistory = require('../controller/patientHistory')
const appointments = require('../controller/appointments')

const router = express.Router();

router.post('/register', consultantController.registerUser);
router.post('/login', consultantController.loginUser);

/////////Patient//////////////
router.get('/patientbyid/:id', authenticator.authenticateUser, authorizer.authorizer('doctor'), patient.getPatientbyid);
router.get('/patientbypin/:pin', authenticator.authenticateUser, authorizer.authorizer('doctor'), patient.getpatientbypin);
/////////Patient//////////////

/////////Appointment/////////
router.get('/allappointment', authenticator.authenticateUser, authorizer.authorizer('doctor'), appointments.getappointment)
router.get('/appointmentbypin/:pin', authenticator.authenticateUser, authorizer.authorizer('doctor'), appointments.getbypin);
router.get('/appointmentbyid/:id', authenticator.authenticateUser, authorizer.authorizer('doctor'), appointments.getbyid);
router.delete('/deleteappointment/:id', authenticator.authenticateUser, authorizer.authorizer('doctor'), appointments.delete);
/////////Appointment/////////

/////////PatientHistory//////
router.post('/savepatienthistory', authenticator.authenticateUser, authorizer.authorizer('doctor'), patientHistory.save);
router.get('/patienthistorybyid/:id', authenticator.authenticateUser, authorizer.authorizer('doctor'), patientHistory.getbyid);
router.get('/patienthistorybypin/:pin', authenticator.authenticateUser, authorizer.authorizer('doctor'), patientHistory.getbypin);
/////////PatientHistory//////

/////////Diagnose///////////
router.post('/savediagnose', authenticator.authenticateUser, authorizer.authorizer('doctor'), diagnosis.save);
/////////Diagnose///////////

/////////Prescription///////
router.post('/saveprescription', authenticator.authenticateUser, authorizer.authorizer('doctor'), prescription.save);
/////////Prescription///////


/////////Consultant///////////
router.get('/getlastconsultant', authenticator.authenticateUser, authorizer.authorizer('doctor'), consultantController.lastcIN);


module.exports = router