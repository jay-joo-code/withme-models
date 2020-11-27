const mongoose = require('mongoose');

const { Schema } = mongoose;

const counselSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    // 상담일 
    type: Date,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date,
  },
});

counselSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Counsel', counselSchema);
