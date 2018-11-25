const mongoose = require('mongoose');

const visitingListSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    list: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }]
});

module.exports = mongoose.model('VisitingList', visitingListSchema);