const mongoose = require('mongoose');

const { Schema } = mongoose;

const contactSchema = Schema({
  user: {
    // 문의를 넣은 User 의 userId
    type: Schema.Types.ObjectId, 
    ref: 'User',
    autopopulate: true,
  },
  problem: {
    // if query, undefined
    // if report, defines reference to reported problem
    type: Schema.Types.ObjectId, 
    ref: 'Problem',
    autopopulate: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
  },
  category: {
    // 0: 가입, 해지 문의
    // 1: 사용법 문의
    // 2: 콘텐츠 문의
    // 3: 기능 제안
    // 4: 버그 신고
    // 5: 기타
    // TODO: add report category 
    type: Number,
    required: true,
  },
  state: {
    // 0: 접수
    // 1: 답변 중 (어드민에서 확인 안누른 상태)
    // 2: 답변 완료
    type: Number,
    default: 0,
  },
}, { timestamps: true });

contactSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Contact', contactSchema);
