const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { User } = require('./models/User');
const config = require('./config/key');

// application/x-www-form-unlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// application/json
app.use(bodyParser.json());

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

// 5000번 포트에서 앱 실행
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
