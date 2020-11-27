const mongoose = require('mongoose');

const { Schema } = mongoose;

const studentSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  parentMobile: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    default: '',
  },
  school: {
    // 학교 이름
    type: String,
    required: true,
  },
  schoolType: {
    // 1: 초등
    // 2: 중등
    // 3: 고등
    type: Number,
    required: true,
  },
  grade: {
    // 학년
    type: Number,
    required: true,
  },
  status: {
    // 0: 재원생, 
    // 1: 휴원생, 
    // 2: 퇴원생, 
    // 3: 삭제
    type: Number,
    default: 0,
  },
  notes: {
    type: String,
    default: '',
  },
  counsels: { 
    // list of references to counsels
    type: [{
      type: Schema.Types.ObjectId, 
      ref: 'Counsel',
      autopopulate: true,
    }],
    default: []
  },
  worksheets: {
    type: [{
      worksheetData: {
        type: Schema.Types.ObjectId, 
        ref: 'Worksheet',
        // autopopulate: true,
        required: true,
      },
      marks: {
        // [p1Mark, p2Mark, ...]
        // 0: unset
        // 1: correct
        // 2: incorrect
        type: [Number],
        default: [],
      },
    }],
    default: []
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date,
  },
});

studentSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Student', studentSchema);
