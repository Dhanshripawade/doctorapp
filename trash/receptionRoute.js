const express = require('express')
const authenticator = require('../middleware/auth')
const authorizer = require('../middleware/authorizer')

const router = express.Router();


router.use(authenticator.authenticateUser);
// router.use(authorizer.authorizer);

router.post('/',authorizer.authorizer(['receptionist']) ,(req,res) => {
    res.send('welcome to reception');
})

module.exports = router