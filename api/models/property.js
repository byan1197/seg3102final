const mongoose = require('mongoose');

const propertySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    address: { type: String, required: true },
    isAvailable: { type: Boolean, required: true },
    createdAt: { type: Date, require: true },
    images: [{ type: String, required: false }], //imgur ids
    leasedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    numWashrooms: { type: Number, require: true },
    numBedrooms: { type: Number, require: true },
    numOtherRooms: { type: Number, require: true },
    type: { type: String, require: true }, //one of : HOUSE, APPARTMENT
    rent: { type: Number, require: true },
    location: { type: String, required: true},
    deleted: { type: Boolean, required: true}
});

module.exports = mongoose.model('Property', propertySchema);
