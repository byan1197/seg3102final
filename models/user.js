const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true },
    name: {
        first: { type: String, required: true },
        last: { type: String, required: true },
        other: { type: String, required: true }
    },
    createdAt: { type: Date, require: true },
    type: {type: StorageManager, required: true} //one of: customer, owner, agent
});

module.exports = mongoose.model('User', userSchema);