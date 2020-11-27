const mongoose = require('mongoose');

const { Schema } = mongoose;

const worksheetSchema = Schema({
  academy: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  category: {
    // 1: 개념 
    // 2: 유형 
    // 3: 심화 
    // 4: 테스트 
    // 5: cdots
    type: Number,
    required: true,
  },
  chapterIds: {
    // array of chapter ids that are included in the worksheet
    type: [{
      type: String,
    }],
    required: true,
  },
  subject: {
    // 학습지에 포함된 과목 중에서 학년이 가장 낮은 과목
    type: {
      curriculumNumber: Number,
      schoolType: Number,
      subjectCode: Number,
      value: String,
      label: String,
    },
    required: true,
  },
  problemsCount: {
    // 테스트용 
    type: Number,
  },
  problemsPerChapter: {
    // non-테스트용
    type: Number,
  },
  level: {
    // 테스트용 학습지 - 1: 하, 2: 중하, 3: 중, 4: 중상, 5: 상
    // 이외 학습지 - 1: 더 쉽게, 2: 그대로, 3: 더 어렵게 
    type: Number,
    required: true,
  },
  problemType: {
    // 0: 전체
    // 1: 객관식 
    // 2: 선다형 (UI에 옵션 없음)
    // 3: 주관식
    type: Number,
    required: true,
  },
  mChoiceFirst: {
    // 객관식 상단 배치 여부
    type: Boolean,
    required: true,
  },
  includeMo: {
    // 0: 제외
    // 1: 포함 
    // 2: 모의고사만 
    type: Number,
    required: true,
  },
  includeOutOfCurriculum: {
    type: Boolean,
    required: true,
  },
  excludeRecentlyUsed: {
    type: Boolean,
    required: true,
  },
  problems: {
    type: [{
      type: Number,
    }],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  teacher: {
    ref: 'Teacher',
    type: Schema.Types.ObjectId,
    autopopulate: true,
    required: true,
  },
  design: {
    nickname: {
      type: String,
    },
    includeChapters: {
      // 문제 상단에 유형명 표시
      type: Boolean,
      default: false,
    },
    includeDates: {
      type: Boolean,
      default: true,
    },
    problemsPerPage: {
      type: Number,
      default: 4,
    },
    cover: {
      // 0: 기본 
      // 이외 표지 디자인 정의 안되있음 
      type: Number,
      default: 0,
    },
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { 
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

worksheetSchema.virtual('problemData', {
  ref: 'Problem', // The model to use
  localField: 'problems', // Find people where `localField`
  foreignField: '_id', // is equal to `foreignField`
  justOne: false,  // single doc instead of an array of matches
  autopopulate: true,
});

worksheetSchema.virtual('assignedStudents', {
  ref: 'Student', // The model to use
  localField: '_id', // Find people where `localField`
  foreignField: 'worksheets.worksheetData', // is equal to `foreignField`
  justOne: false,  // single doc instead of an array of matches
  autopopulate: true,
});

worksheetSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Worksheet', worksheetSchema);
