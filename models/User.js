const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; // salt의 길이
const jwt = require('jsonwebtoken');

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

// 비밀번호 암호화
userSchema.pre('save', function (next) {
  // save 메소드가 실행되기 전에 수행됨
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
  } else {
    next();
  }
});

// 로그인 시 비밀번호 확인
userSchema.methods.comparePassword = function (plainPassword, cb) {
  let user = this;
  // 암호화 된 비밀번호를 복호화 할 수 없기 때문에,
  // 로그인 시 입력받은 비밀번호를 암호화 하여 DB값과 비교해야 한다.
  bcrypt.compare(plainPassword, user.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// 로그인 성공 시 토큰 생성
userSchema.methods.generateToken = function (cb) {
  let user = this;
  let token = jwt.sign(user._id.toHexString(), 'secretToken');
  // token = user._id + 'secretToken'
  // token { key: 'secretToken', value: user._id}

  user.token = token;
  user.save((err, user) => {
    if (err) return cb(err);
    cb(null, user);
  });
};

// userSchema가 포함된 User 모델 생성
const User = mongoose.model('User', userSchema);

// 다른 파일에서 사용 가능하도록 export
module.exports = { User };
