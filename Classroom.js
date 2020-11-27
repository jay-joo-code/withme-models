const mongoose = require('mongoose');

const { Schema } = mongoose;

const classroomSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  teacher: {
    type: Schema.Types.ObjectId, 
    ref: 'Teacher',
    autopopulate: true,
  },
  students: {
    // array of references to students
    type: [{
      type: Schema.Types.ObjectId, 
      ref: 'Student',
      autopopulate: true,
    }],
    default: [],
  },
  notes: {
    // 비고 
    type: String,
    default: '',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date,
  },
});

classroomSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Classroom', classroomSchema);
