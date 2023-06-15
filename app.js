const http = require("http"); // for creating server in http
const routes = require('./router')

//creating server
const server = http.createServer(routes);
server.listen(3001);
