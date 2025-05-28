const express = require('express')
const authenticator = require('../middleware/auth')
const authorizer = require('../middleware/authorizer')

const router = express.Router();


router.use(authenticator.authenticateUser);
// router.use(authorizer.authorizer);

router.get('/',authorizer.authorizer(['doctor']) ,(req,res) => {
    res.send('welcome to dashboard');
})

module.exports = router