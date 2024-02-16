const express = require('express')
const validateToken = require("../middleware/validateToken")
const router = express.Router()
const {
    register,
    login,
    owner
} = require('../controllers/loginsignupcontroller')

router.route('/register').post(register)

router.route('/login').post(login)

router.route('/owner').get(validateToken, owner)

module.exports = router;