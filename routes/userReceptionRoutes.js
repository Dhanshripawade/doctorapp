const express = require('express')
const userreceptionController = require('../controller/userReception')
const authenticator = require('../middleware/auth')
const authorizer = require('../middleware/authorizer')
// const patient = require('../controller/receptionPanel')
const patient = require('../controller/patient')
const consultant = require('../controller/consultant')
const appointment = require('../controller/appointments')

const idsGenerator = require('../module/idsGenerator')

const router = express.Router();


router.post('/register', userreceptionController.register);

router.post('/login', userreceptionController.login);

// router.use(authenticator.authenticateUser);
// router.post('/entry',authorizer.authorizer(['receptionist']) ,(req,res) => {
//     res.send('welcome to reception');
// })
//////////Patient/////////////
router.post('/savepatient',
    authenticator.authenticateUser,
    authorizer.authorizer('receptionist'),
    patient.save);

router.patch('/updatepatient/:id',
    authenticator.authenticateUser,
    authorizer.authorizer('receptionist'),
    patient.update);

router.get('/getbyname/:name',
    authenticator.authenticateUser,
    authorizer.authorizer('receptionist'),
    patient.getbyname);

router.get('/getbyphno/:phno',
    authenticator.authenticateUser,
    authorizer.authorizer('receptionist'),
    patient.getbyphno);

router.get('/getbyid/:id',
    authenticator.authenticateUser,
    authorizer.authorizer('receptionist'),
    patient.getPatientbyid);

router.get('/getbypin/:pin',
    authenticator.authenticateUser,
    authorizer.authorizer('receptionist'),
    patient.getpatientbypin);

router.get('/getallpatient',
    authenticator.authenticateUser,
    authorizer.authorizer('receptionist'),
    patient.getallpatients);

router.get('/getcount',
    authenticator.authenticateUser,
    authorizer.authorizer('receptionist'),
    patient.getpatientcount);

router.get('/lastpatient',
    authenticator.authenticateUser,
    authorizer.authorizer('receptionist'),
    patient.getLastPatient);

router.delete('/deletepatient/:id',
    authenticator.authenticateUser,
    authorizer.authorizer('receptionist'),
    patient.deletePatient);
//////////Patient/////////////

//////////Consultant//////////
router.get('/consultantlist',
    authenticator.authenticateUser,
    authorizer.authorizer('receptionist'),
    consultant.getall);
//////////Consultant//////////

//////////Appointment/////////
router.post('/createappointment',
    authenticator.authenticateUser,
    authorizer.authorizer('receptionist'),
    appointment.create);

router.get('/getappointment',
    authenticator.authenticateUser,
    authorizer.authorizer('receptionist'),
    appointment.getappointment);

router.get('/appointmentbyconsultant/:consultantname',
    authenticator.authenticateUser,
    authorizer.authorizer('receptionist'),
    appointment.getbyconsultant);

router.get('/appointmentbyid/:id',
    authenticator.authenticateUser,
    authorizer.authorizer('receptionist'),
    appointment.getbyid);

router.get('/appointmentbypin/:pin',
    authenticator.authenticateUser,
    authorizer.authorizer('receptionist'),
    appointment.getbypin);

router.patch('/updateappointment/:id',
    authenticator.authenticateUser,
    authorizer.authorizer('receptionist'),
    appointment.update);
//////////Appointment/////////

//////////idsGenerator/////////

//////////idsGenerator/////////



module.exports = router;