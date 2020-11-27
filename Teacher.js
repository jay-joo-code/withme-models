const mongoose = require('mongoose');

const { Schema } = mongoose;

const teacherSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date,
  },
});

module.exports = mongoose.model('Teacher', teacherSchema);
