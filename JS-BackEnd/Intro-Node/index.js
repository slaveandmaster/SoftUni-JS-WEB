const http = require('http');
const router = require('./router');
const { home }  = require('./controller/home');

const server = http.createServer(router.main);

router.get('/' , home);
server.listen(3000);