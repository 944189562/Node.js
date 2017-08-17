/**
 * Created by Dell on 2017/8/11.
 */
var http = require('http');

var server = http.createServer(function (req, res) {
    res.writeHeader(200,{'Content-type':'text/html,charset=UTF'});
    res.end('success!');
})

server.listen(80, '127.0.0.1');
console.log('server listen 127.0.0.1');