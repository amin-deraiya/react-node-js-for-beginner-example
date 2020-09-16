const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Login = new Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        required : true
    },
    password: {
        type: String,
       // required : true
    }
});
module.exports = mongoose.model('Login', Login);