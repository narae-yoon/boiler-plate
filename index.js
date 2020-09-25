const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { User } = require('./models/User');
const config = require('./config/key');

// application/x-www-form-unlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// application/json
app.use(bodyParser.json());
app.use(cookieParser());

mongoose // mongoDB 연결
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => res.send('Hello World! nodemon test'));
app.post('/register', (req, res) => {
  // 회원가입
  // 회원 가입에 필요한 정보를 client에서 가져오면 그 정보를 db에 넣는다.
  const user = new User(req.body);
  user.save((err, doc) => {
    // 가져온 정보를 User 모델에 저장
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.post('/login', (req, res) => {
  // 1. 요청된 이메일이 DB에 있는지 찾기
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: '제공된 이메일에 해당하는 유저가 없습니다.',
      });
    }
    // 2. 이메일이 있으면 비밀번호가 맞는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: '비밀번호가 틀렸습니다.',
        });
      // 3. 비밀번호가 맞으면 토큰 생성하기
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 (Cookie, localStorage)에 저장한다. : 쿠키에 저장
        res.cookie('x_auth', user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  });
});

// 5000번 포트에서 앱 실행
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
