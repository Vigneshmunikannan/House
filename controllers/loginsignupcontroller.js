const asynchandler = require('express-async-handler')
const User = require('../model/usermodel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// resgister user information
// public

const register = asynchandler(async (req, res) => {
    const { username, email, firstname, lastname, usertype, phonenumber, whatsappnumber, password } = req.body;
    if (!username || !email || !password || !phonenumber || !firstname || !whatsappnumber || !password) {
        res.status(400);
        throw new Error('All fields are mandatory')
    }

    const usernameAvilable = await User.findOne({ username })
    if (usernameAvilable) {
        res.status(409).json({ msg: "username already exit" });
        throw new Error("username already taken")
    }
    const emailAvilable = await User.findOne({ email })
    if (emailAvilable) {
        res.status(409).json({ msg: "Email already exits" });
        throw new Error("Email already taken")
    }


    // hash password for encryption
    const hasedPassword = await bcrypt.hash(password, 10);
    //console.log("hased password: ",hasedPassword)




    // creating new user after checking all details
    const user = await User.create({
        username,
        email,
        firstname,
        lastname,
        usertype,
        phonenumber,
        whatsappnumber,
        password: hasedPassword,
    })
    if (user) {
        res.status(200).json({
            _id: user.id,
            email: user.email
        })
    }
    else {
        res.status(400);
        throw new Error('User data not valid')
    }
});



////////////////////////////////////////////////////////////////////////////////////////////////
//login module avil to everyone

const login = asynchandler(async (req, res) => {

    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ msg: "All fields are mandatory" });
        throw new Error('All fields are mandatory')
    }
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {

        // jwt has 3 parameter
        // 1. user deatails,
        // 2. ACCESS_TOKEN_SECERT
        // 3.expiry time
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
                usertype: user.usertype
            }
        }, process.env.ACCESS_TOKEN_SECERT, { expiresIn: "30m" })
        res.status(200).json({
            accessToken: accessToken,
            usertype: user.usertype
        })
    }
    else {
        res.status(401).json({ msg: "Invalid username or password" })
        throw new Error("email or password is not valid")
    }

    res.json({ username, password })

})


////////////////////////// owner checking

const owner = asynchandler(async (req, res) => {
    res.json(req.user);
})

module.exports = { register, login, owner }