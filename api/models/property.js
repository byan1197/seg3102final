const mongoose = require('mongoose');

const propertySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    address: { type: String, required: true },
    isAvailable: { type: Boolean, required: true },
    createdAt: { type: Date, require: true },
    images: [{ type: String, required: false }], //imgur ids
    leasedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    yearBuilt: { type: Number, require: true },
    numWashrooms: { type: Number, require: true },
    numRooms: { type: Number, require: true },
    newlyRennovated: { type: Boolean, require: true },
});

module.exports = mongoose.model('Property',propertySchema);
