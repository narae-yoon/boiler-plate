const express = require('express'); // express 모듈 가져오기
const app = express(); // 새로운 express app 만들기
const port = 5000;

// mongoDB 연결
const mongoose = require('mongoose');
mongoose
  .connect(
    'mongodb+srv://narae:narae@cluster0.un05t.mongodb.net/narae-db?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

// root 디렉토리에 Hello World! 출력
app.get('/', (req, res) => res.send('Hello World!'));

// 5000번 포트에서 앱 실행
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
