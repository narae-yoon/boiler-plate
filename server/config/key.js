// process env.NODE_ENV는 환경변수
// development / production 모드로 나뉨
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}
