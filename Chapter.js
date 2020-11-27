const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const chapterSchema = Schema({
  _id: { 
    type: Number, 
    required: true,
  },
  curriculumNumber: {
    type: Number,
    required: true,
  },
  schoolType: {
    // 1: 초등 
    // 2: 중등
    // 3: 고등
    type: Number,
    required: true,
  },
  subjectCode: {
    type: Number,
    required: true,
  },
  chapterBigCode: {
    type: Number,
    required: true,
  },
  chapterMiddleCode: {
    type: Number,
    required: true,
  },
  chapterSmallCode: {
    type: Number,
    required: true,
  },
  chapterCode: {
    type: Number,
    required: true,
  },
  chapterBig: {
    type: String,
    required: true,
  },
  chapterMiddle: {
    type: String,
    required: true,
  },
  chapterSmall: {
    type: String,
    required: true,
  },
  chapter: {
    type: String,
    required: true,
  },
  outOfCurriculum: {
    // 0: 아님
    // 1: 이전교육과정
    // 2: 교육과정외
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

chapterSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Chapter', chapterSchema);
