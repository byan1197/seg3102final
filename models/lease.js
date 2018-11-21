const mongoose = require('mongoose');

const leaseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    property: { type: mongoose.Schema.Types.ObjectId, ref: "Property" },
    expiry: { type: boolean, required: true },
    start: { type: boolean, required: true },
    agent: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    renter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, required: true }
});

module.exports = mongoose.model('Lease', leaseSchema);