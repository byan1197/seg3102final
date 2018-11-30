const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    email : {type: String, required: true},
    username: {type: String, required: true},
    name: {type: String, required: true},
    lastName: {type: String, required: true},
    password :{type : String, required : true},
    type: { type: String, required: true }, //one of: CUSTOMER, OWNER, AGENT
    maxRent: { type: Number, required: true }
});



module.exports = mongoose.model('User', userSchema);
