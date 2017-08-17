var http = require('http');
var querystring = require('querystring');

var server = http.createServer(function (req, res) {
    if (req.url == '/dopost' && req.method.toLocaleLowerCase() == 'post') {
        var alldata = '';
        // 下面是post请求接收的一个公式
        // node追求极致，一段一段接收
        //防止表单过大阻塞进程
        req.addListener('data', function (chunk) {
            alldata += chunk;
            console.log(chunk.toString());
        })
        req.addListener('end',function () {
            var data = querystring.parse(alldata.toString());
            console.log(data);
            res.end('success'+data.name);
        })
    }
})

server.listen(3000, '127.0.0.1');