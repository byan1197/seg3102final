const mongoose = require('mongoose');

const propertySchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    email :{type : String, required : true}
    
    
});

module.exports = mongoose.model('Property',propertySchema);
