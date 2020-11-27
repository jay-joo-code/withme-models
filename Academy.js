const mongoose = require('mongoose');

const { Schema } = mongoose;

const academySchema = Schema({
  teachers: { 
    // list of references to teachers
    // first teacher is rep teacher
    // rep teacher cannot be deleted 
    type: [{
      type: Schema.Types.ObjectId, 
      ref: 'Teacher',
      autopopulate: true,
    }],
    default: []
  },
  students: { 
    // list of references to students
    type: [{
      type: Schema.Types.ObjectId, 
      ref: 'Student',
      autopopulate: true,
    }],
    default: []
  },
  classrooms: { 
    // list of references to classrooms
    type: [{
      type: Schema.Types.ObjectId, 
      ref: 'Classroom',
      autopopulate: true,
    }],
    default: []
  },
  levelRatio: {
    type: [[Number]],
    default: [
      [20, 20, 20, 20, 20], 
      [20, 20, 20, 20, 20],
      [20, 20, 20, 20, 20],
      [20, 20, 20, 20, 20],
      [20, 20, 20, 20, 20],
    ]
  },
  /* 계정 상태 및 설정 */
  name: {
    type: String,
    required: true,
  },
  logo: {
    // url of logo uploaded to firebase
    // if logo exists, logo should replace the withme logo
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  hasLeft: {
    // 이탈 여부 
    type: Boolean,
    default: false,
  },
  payDate: {
    // 0: 미설정
    // 1: 10일
    // 2: 25일 
    type: Number,
    default: 0,
  },
  activeDate: {
    type: Date,
  },
}, {
  timestamps: true,
  toObject : { virtuals: true },
  toJSON: { virtuals: true }
});

academySchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Academy', academySchema);
