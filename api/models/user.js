const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    email : {type: String, required: true},
    password :{type : String, required : true},
    type: { type: String, required: true }, //one of: customer, owner, agent
});



module.exports = mongoose.model('User', userSchema);
