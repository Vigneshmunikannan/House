const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    
    username: {
        type: String,
        required: [true, "please add username"],
        unique: [true, "Username already taken"]
    },
    email: {
        type: String,
        required: [true, "please add email"],
        unique: [true, "Email address already taken"]
    },
    firstname: {
        type: String,
        required: [true, "please add firstname"]
    },
    lastname: {
        type: String
    },
    usertype: {
        type: String,
        required: [true, "please put usertype"]
    },
    phonenumber: {
        type: String,
        required: [true, "please add phonenumber"]

    },
    whatsappnumber: {
        type: String,
        required: [true, "please add whatsappnumber"]
    },
    password: {
        type: String,
        required: [true, "please add password"]
    }
}, {
    timestamps: true,
}
);

module.exports = mongoose.model("user", userSchema)