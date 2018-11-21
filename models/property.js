const mongoose = require('mongoose');

const propertySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    address: { type: String, required: true },
    isAvailable: { type: boolean, required: true },
    createdAt: { type: Date, require: true },
    images: [{type: String, required: true}]
});

module.exports = mongoose.model('Property', propertySchema);