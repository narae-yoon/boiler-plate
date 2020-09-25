const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; // salt의 길이

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

// save 메소드가 실행되기 전에 수행할 함수 정의
userSchema.pre('save', function (next) {
  let user = this;

  if (user.isModified('password')) {
    //salt를 만든 후 salt를 이용해 비밀번호 암호화
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);

        user.password = hash;
        next();
      });
    });
  }
});

// userSchema가 포함된 User 모델 생성
const User = mongoose.model('User', userSchema);

// 다른 파일에서 사용 가능하도록 export
module.exports = { User };
