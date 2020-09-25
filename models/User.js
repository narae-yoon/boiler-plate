const mongoose = require('mongoose');

// schema 생성
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, // 문자열의 공백 없애기
    unique: 1,
  },
  password: {
    type: String,
    maxlength: 10,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    // token의 유효기간
    type: Number,
  },
});

// userSchema가 포함된 User 모델 생성
const User = mongoose.model('User', userSchema);

// 다른 파일에서 사용 가능하도록 export
module.exports = { User };
