const express = require('express'); // express 모듈 가져오기
const app = express(); // 새로운 express app 만들기
const port = 5000;

// root 디렉토리에 Hello World! 출력
app.get('/', (req, res) => res.send('Hello World!'));

// 5000번 포트에서 앱 실행
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
