const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    email :{type : String, required : true},
    address :{type : String, required : true}
    password: {
      type: String,
      required: true,
      set(val) {
        this.setDataValue('password', bcrypt.hashSync(val, 12));
      } }
});

userSchema.prototype.validatePassword = function validatePassword(val) {
  return bcrypt.compare(val, this.password);
};

module.exports = mongoose.model('User', userSchema);
