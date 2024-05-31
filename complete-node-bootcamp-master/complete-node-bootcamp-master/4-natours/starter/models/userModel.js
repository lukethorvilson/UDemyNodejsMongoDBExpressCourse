const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email.'],
    unique: [true, 'This email already exists, please enter a new email.'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on SAVE!!!
      validator: function (val) {
        return val === this.password;
      },
      message: 'Passwords must match!',
    },
  },
  passwordChangedAt: Date
});

userSchema.pre('save', async function (next) {
  // Only run this function is password was actually modified
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12); // salt: cost of 12, hashing the password and returns a promise
  this.passwordConfirm = undefined; // make this value not persist to the db
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
  if(this.passwordChangedAt){
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    console.log(changedTimestamp, JWTTimestamp)
    return JWTTimestamp < changedTimestamp;
  }
  // False means NOT changed
  return false;
}

const User = mongoose.model('User', userSchema);

module.exports = User;
