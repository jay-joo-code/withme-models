const mongoose = require('mongoose');

const { Schema } = mongoose;

const problemSchema = Schema({
  _id: {
    type: Number,
    required: true,
  },
  chapter: {
    type: Number,
    required: true,
  },
  p: {
    type: String,
    required: true,
  },
  s: {
    type: String,
    required: true,
  },
  a: {
    type: String,
    required: true,
  },
  pHwp: {
    type: String,
    required: true,
  },
  sHwp: {
    type: String,
    required: true,
  },
  aHwp: {
    type: String,
    required: true,
  },
  level: {
    // 난이도
    // 1~5 (하~상)
    type: Number,
    required: true,
  },
  type: {
    // 1: 객관식 
    // 2: 선다형 
    // 3: 주관식
    type: Number,
    required: true,
  },
  answer: {
    // 텍스트 형식의 정답 
    // 문제에 따라 없을수도 있음
    type: String,
  },
  source: {
    // 문제 제공자 
    // 1: 김수지 
    // 2: 손상진 
    // 3: 송교섭
    type: Number,
    default: 0,
  },
  isMo: {
    // 0: 아님 (default)
    // 1: 모의고사
    // 2: 모쌍
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  usages: {
    type: [{
      academy: {
        ref: 'Academy',
        type: Schema.Types.ObjectId,
      },
      date: {
        // latest use of this problem
        type: Date,
        default: new Date,
      }
    }]
  },
  bookmarkedBy: {
    type: [{
      ref: 'Academy',
      type: Schema.Types.ObjectId,
    }],
    default: [],
  }
}, { timstamps: true });

problemSchema.virtual('chapterData', {
  ref: 'Chapter', // The model to use
  localField: 'chapter', // Find people where `localField`
  foreignField: '_id', // is equal to `foreignField`
  justOne: true,  // single doc instead of an array of matches
  autopopulate: true,
});

problemSchema.set('toObject', { virtuals: true });
problemSchema.set('toJSON', { virtuals: true });

problemSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Problem', problemSchema);
