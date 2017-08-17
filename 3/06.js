var http = require('http');
// 打开服务器的时候只执行一次
// 用户访问不执行
var a = 100;

http.createServer(function (req,res) {
    a++;
    res.end(a.toString());
}).listen(3000,'127.0.0.1');